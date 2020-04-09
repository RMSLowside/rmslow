package rms.processors.json;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.nifi.annotation.behavior.InputRequirement;
import org.apache.nifi.annotation.behavior.ReadsAttributes;
import org.apache.nifi.annotation.behavior.WritesAttribute;
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
import rms.models.RulesInputMessage;
import rms.processors.AbstractRmsProcessor;

import java.nio.charset.Charset;
import java.util.List;
import java.util.Set;

@Tags({"rms", "json", "validation"})
@SeeAlso({})
@CapabilityDescription("Validate flow file content against the RMS Rules Input Schema")
@InputRequirement(InputRequirement.Requirement.INPUT_ALLOWED)
@ReadsAttributes({})
@WritesAttributes({
        @WritesAttribute(attribute = "Valid", description = "Is the JSON message schema valid."),
        @WritesAttribute(attribute = "ValidationErrors", description = "If JSON is not valid, the error will be written here.")
})
public class VerifyJsonContentsProcessor extends AbstractRmsProcessor {

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
        relationships.add(new Relationship.Builder().name(REL_SUCCESS.getName()).description("All FlowFiles that have schema valid JSON content are routed to this relationship.").build());
        relationships.add(new Relationship.Builder().name(REL_FAILURE.getName()).description("All FlowFiles that doo not have schema valid JSON content are routed to this relationship.").build());
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
            log.error("Flow File is empty.");

            return;
        }

        log.info("Reading the Flow File content.");

        try {
            Charset charset = Charset.forName(context.getProperty(CHARACTER_SET).getValue());
            final int maxBufferSize = context.getProperty(MAX_BUFFER_SIZE).asDataSize(DataUnit.B).intValue();

            byte[] buffer = new byte[maxBufferSize];
            session.read(flowFile, inputStream -> StreamUtils.fillBuffer(inputStream, buffer, false));
            final long len = Math.min(buffer.length, flowFile.getSize());
            String fullText = new String(buffer, 0, (int) len, charset);

            log.info("Converting Flow File content to JSON.");

            RulesInputMessage message = mapper.readValue(fullText, RulesInputMessage.class);
            message.validate();
        } catch (Exception e) {
            log.error("Failed to map text to expected POJO due to " + e.getMessage());

            session.putAttribute(flowFile, "Valid", "false");
            session.putAttribute(flowFile, "ValidationErrors", e.getMessage());

            session.transfer(flowFile, REL_FAILURE);
            return;
        }

        session.putAttribute(flowFile, "Valid", "true");
        session.transfer(flowFile, REL_SUCCESS);
    }
}
