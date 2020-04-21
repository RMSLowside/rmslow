package rms.processors.http;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.nifi.annotation.behavior.InputRequirement;
import org.apache.nifi.annotation.behavior.ReadsAttributes;
import org.apache.nifi.annotation.behavior.WritesAttributes;
import org.apache.nifi.annotation.documentation.CapabilityDescription;
import org.apache.nifi.annotation.documentation.SeeAlso;
import org.apache.nifi.annotation.documentation.Tags;
import org.apache.nifi.components.PropertyDescriptor;
import org.apache.nifi.flowfile.FlowFile;
import org.apache.nifi.logging.ComponentLog;
import org.apache.nifi.processor.DataUnit;
import org.apache.nifi.processor.ProcessContext;
import org.apache.nifi.processor.ProcessSession;
import org.apache.nifi.processor.Relationship;
import org.apache.nifi.processor.exception.ProcessException;
import org.apache.nifi.processor.util.StandardValidators;
import org.apache.nifi.stream.io.StreamUtils;
import rms.models.Actions;
import rms.models.RulesDecisionMessage;
import rms.models.RulesInputMessage;
import rms.processors.AbstractRmsProcessor;

import java.io.BufferedOutputStream;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Set;

import static rms.utilities.RmsEnums.*;

@Tags({"rms", "json", "rules", "https"})
@SeeAlso({})
@CapabilityDescription("Send a RulesInputMessage JSON to the Rules Engine API to get a rules decision.")
@InputRequirement(InputRequirement.Requirement.INPUT_REQUIRED)
@ReadsAttributes({})
@WritesAttributes({})
public class GetRulesEngineResultProcessor extends AbstractRmsProcessor {

    public static final PropertyDescriptor MAX_BUFFER_SIZE = new PropertyDescriptor.Builder()
            .name("Maximum Buffer Size")
            .description("Specifies the maximum amount of data to buffer (per file) in order to read flow file content.  Files larger than the specified maximum will not be processed.")
            .required(true)
            .addValidator(StandardValidators.DATA_SIZE_VALIDATOR)
            .addValidator(StandardValidators.createDataSizeBoundsValidator(0, Integer.MAX_VALUE))
            .defaultValue("1 MB")
            .build();

    public static final PropertyDescriptor CHARACTER_SET = new PropertyDescriptor.Builder()
            .name("Character Set")
            .description("The Character Set in which the file is encoded")
            .required(true)
            .addValidator(StandardValidators.CHARACTER_SET_VALIDATOR)
            .defaultValue("UTF-8")
            .build();

    private static final ObjectMapper mapper = new ObjectMapper();

    @Override
    protected void addSupportedRelationships(Set<Relationship> relationships) {
        relationships.add(new Relationship.Builder().name(REL_SUCCESS.getName()).description("All FlowFiles that have successfully been sent to the Rules Engine API and received a result.").build());
        relationships.add(new Relationship.Builder().name(REL_FAILURE.getName()).description("All FlowFiles that have failed to receive a Rules Engine result.").build());
    }

    @Override
    protected void addSupportedProperties(List<PropertyDescriptor> descriptors) {
        descriptors.add(MAX_BUFFER_SIZE);
        descriptors.add(CHARACTER_SET);
    }

    @Override
    public void onTrigger(ProcessContext context, ProcessSession session) throws ProcessException {
        final ComponentLog log = getLogger();

        FlowFile flowFile = session.get();
        if (flowFile == null) {
            return;
        }

        String jsonContent = getFlowFileContent(flowFile, context, session);
        RulesInputMessage message;
        try {
            message = mapper.readValue(jsonContent, RulesInputMessage.class);
            message.validate();

            // TODO call the actual API endpoint on day
            // For now make a fake result
            HashMap<String, String> fakeValues = new HashMap<>();
            fakeValues.put(VALUE_RCS_ID, "54");
            fakeValues.put(VALUE_RCS_NAME, "FRCS-Q2a");
            fakeValues.put(VALUE_RULE_MATCHED_ID, "13");

            Actions fakeAction = new Actions();
            fakeAction.setAction(ACTION_ADD_TO_RMM);
            fakeAction.setValues(fakeValues);

            ArrayList<Actions> allFakeActions = new ArrayList<>();
            allFakeActions.add(fakeAction);

            RulesDecisionMessage fakeResult = new RulesDecisionMessage();
            fakeResult.setRulesInputMessage(message);
            fakeResult.setActions(allFakeActions);

            // Write the Rules Decision JSON to a flow file
            FlowFile outputFlowFile = session.write(flowFile, (in, out) -> {
                try (OutputStream outputStream = new BufferedOutputStream(out)) {
                    outputStream.write(mapper.writeValueAsBytes(fakeResult));
                }
            });

            session.transfer(outputFlowFile, REL_SUCCESS);
        } catch (Exception e) {
            log.error(e.getMessage());

            session.putAttribute(flowFile, ATTRIBUTE_VALIDATION_ERRORS, e.getMessage());
            session.transfer(flowFile, REL_FAILURE);

            return;
        }
    }

    private String getFlowFileContent(FlowFile flowFile, ProcessContext context, ProcessSession session) {
        Charset charset = Charset.forName(context.getProperty(CHARACTER_SET).getValue());
        final int maxBufferSize = context.getProperty(MAX_BUFFER_SIZE).asDataSize(DataUnit.B).intValue();

        byte[] buffer = new byte[maxBufferSize];
        session.read(flowFile, inputStream -> StreamUtils.fillBuffer(inputStream, buffer, false));
        final long len = Math.min(buffer.length, flowFile.getSize());

        return new String(buffer, 0, (int) len, charset);
    }
}