package rms.processors.json;

import org.apache.nifi.annotation.documentation.Tags;
import org.apache.nifi.components.PropertyDescriptor;
import org.apache.nifi.flowfile.FlowFile;
import org.apache.nifi.logging.ComponentLog;
import org.apache.nifi.processor.ProcessContext;
import org.apache.nifi.processor.ProcessSession;
import org.apache.nifi.processor.Relationship;
import org.apache.nifi.processor.exception.ProcessException;
import org.apache.nifi.processor.util.StandardValidators;
import rms.processors.AbstractRmsProcessor;

import java.util.List;
import java.util.Set;

@Tags({"rms", "xml", "json", "convert"})
public class ConvertXmlToJsonProcessor extends AbstractRmsProcessor {

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

    @Override
    protected void addSupportedRelationships(Set<Relationship> relationships) {
        relationships.add(new Relationship.Builder().name(REL_SUCCESS.getName()).description("All FlowFiles that have been converted to valid JSON are routed to this relationship.").build());
        relationships.add(new Relationship.Builder().name(REL_FAILURE.getName()).description("All FlowFiles that have not been converted to valid JSON are routed to this relationship.").build());
    }

    @Override
    protected void addSupportedProperties(List<PropertyDescriptor> descriptors) {
        descriptors.add(MAX_BUFFER_SIZE);
        descriptors.add(CHARACTER_SET);
    }

    @Override
    public void onTrigger(ProcessContext processContext, ProcessSession processSession) throws ProcessException {
        final ComponentLog log = getLogger();

        FlowFile flowFile = processSession.get();
        if (flowFile == null) {
            return;
        }

        // TODO read current XML content.

        // Attach original XML as attribute

        // Extract metadata and convert to JSON Schema.

        // Change content to JSON messages

        processSession.transfer(flowFile, REL_SUCCESS);
    }
}
