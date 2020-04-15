package rms.processors.http;

import org.apache.nifi.annotation.documentation.Tags;
import org.apache.nifi.components.PropertyDescriptor;
import org.apache.nifi.flowfile.FlowFile;
import org.apache.nifi.processor.DataUnit;
import org.apache.nifi.processor.ProcessContext;
import org.apache.nifi.processor.ProcessSession;
import org.apache.nifi.processor.Relationship;
import org.apache.nifi.processor.exception.ProcessException;
import org.apache.nifi.processor.util.StandardValidators;
import org.apache.nifi.stream.io.StreamUtils;
import rms.processors.AbstractRmsProcessor;

import java.nio.charset.Charset;
import java.util.List;
import java.util.Set;

@Tags({"rms"})
public class FetchXmlFromUrlProcessor extends AbstractRmsProcessor {

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
        relationships.add(new Relationship.Builder().name(REL_SUCCESS.getName()).description("All FlowFiles that have been fetched from a URL are routed to this relationship.").build());
        relationships.add(new Relationship.Builder().name(REL_RETRY.getName()).description("All FlowFiles that fail to fetched from a URL are routed to this relationship 2 times.").build());
        relationships.add(new Relationship.Builder().name(REL_FAILURE.getName()).description("All FlowFiles that have not been fetched from a URL after reties are routed to this relationship.").build());
    }

    @Override
    protected void addSupportedProperties(List<PropertyDescriptor> descriptors) {
        descriptors.add(MAX_BUFFER_SIZE);
        descriptors.add(CHARACTER_SET);
    }

    @Override
    public void onTrigger(ProcessContext context, ProcessSession session) throws ProcessException {
        FlowFile flowFile = session.get();
        if (flowFile == null) {
            return;
        }

        String content = getFlowFileContent(flowFile, context, session);

        // TODO convert to JSON

        // TODO get URL from JSON

        //TODO fetch XML from URL

        // TODO make Flow FIle content the XML

        // TODO handle failures by retrying a few times

        session.transfer(flowFile, REL_SUCCESS);
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
