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
import rms.models.PublisherJsonMessage;
import rms.processors.AbstractRmsProcessor;

import java.io.BufferedOutputStream;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

import static rms.processors.utilities.RmsEnums.ATTRIBUTE_IS_VALID;
import static rms.processors.utilities.RmsEnums.ATTRIBUTE_VALIDATION_ERRORS;

@Tags({"rms", "xml", "https"})
@SeeAlso({})
@CapabilityDescription("Fetch a XML document from a URL and set the Flow File's content.")
@InputRequirement(InputRequirement.Requirement.INPUT_REQUIRED)
@ReadsAttributes({})
@WritesAttributes({})
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

    private static final ObjectMapper mapper = new ObjectMapper();
    private static final ArrayList<String> producers = new ArrayList<>(Arrays.asList("Amazon", "Alphabet", "Microsoft", "Apple", "SpaceX", "Walmart", "Costco", "UnitedHealth"));
    private static final String RANDOM_XML = "<documentRoot desVersion='5' type='fake'><guide>rms.guide</guide><producer>rms.producer</producer><createDate>rms.date</createDate></documentRoot>";

    @Override
    public void onTrigger(ProcessContext context, ProcessSession session) throws ProcessException {
        final ComponentLog log = getLogger();

        FlowFile flowFile = session.get();
        if (flowFile == null) {
            return;
        }

        String content = getFlowFileContent(flowFile, context, session);
        PublisherJsonMessage message;

        try {
            message = mapper.readValue(content, PublisherJsonMessage.class);
        } catch (Exception e) {
            log.error("Failed to map text to expected POJO due to " + e.getMessage());
            session.transfer(flowFile, REL_FAILURE);

            return;
        }

        String url = message.getDocUrl();

        // TODO fetch XML from URL. For now just use random XML
        log.info("Fetching document from URL: " + url);
        // Set guide
        String aGuide = UUID.randomUUID().toString();
        // Set producer
        int randomIndex = (int) (Math.random() * producers.size());
        String aProducer = producers.get(randomIndex);
        // Set date
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date firstDate;
        Date lastDate;
        try {
            firstDate = sdf.parse("1950-01-01");
            lastDate = sdf.parse("2020-01-01");
        } catch (ParseException e) {
            log.error("Failed to generate dates due to " + e.getMessage());

            session.putAttribute(flowFile, ATTRIBUTE_IS_VALID, "false");
            session.putAttribute(flowFile, ATTRIBUTE_VALIDATION_ERRORS, e.getMessage());
            session.transfer(flowFile, REL_FAILURE);

            return;
        }
        long random = ThreadLocalRandom.current().nextLong(firstDate.getTime(), lastDate.getTime());
        Date date = new Date(random);

        // Insert values into XML
        log.info("VALUES [" + aGuide + ", " + aProducer + ", " + sdf.format(date) + "]");
        String output = RANDOM_XML.replace("rms.guide", aGuide).replace("rms.producer", aProducer).replace("rms.date", sdf.format(date));

        // Write the XML to a flow file
        FlowFile outputFlowFile = session.write(flowFile, (in, out) -> {
            try (OutputStream outputStream = new BufferedOutputStream(out)) {
                outputStream.write(output.getBytes());
            }
        });

        session.transfer(outputFlowFile, REL_SUCCESS);
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
