package rms.processors.json;

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
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import rms.exceptions.RmsGeneralException;
import rms.models.RulesInputMessage;
import rms.processors.AbstractRmsProcessor;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;
import java.io.BufferedOutputStream;
import java.io.OutputStream;
import java.io.StringReader;
import java.nio.charset.Charset;
import java.util.List;
import java.util.Set;

import static rms.utilities.RmsEnums.*;

@Tags({"rms", "xml", "json", "convert"})
@SeeAlso({})
@CapabilityDescription("Convert a XML document into the standard RMS rules engine ingest object.")
@InputRequirement(InputRequirement.Requirement.INPUT_REQUIRED)
@ReadsAttributes({})
@WritesAttributes({})
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

    private static final ObjectMapper mapper = new ObjectMapper();
    private XPath documentXpath;
    private Document documentXml;

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
    public void onTrigger(ProcessContext context, ProcessSession session) throws ProcessException {
        final ComponentLog log = getLogger();

        FlowFile flowFile = session.get();
        if (flowFile == null) {
            return;
        }

        String xmlContent = getFlowFileContent(flowFile, context, session);
        session.putAttribute(flowFile, ATTRIBUTE_ORIGINAL_XML, xmlContent);

        RulesInputMessage rulesInputMessage;
        try {
            rulesInputMessage = extractMetadata(xmlContent);
        } catch (Exception e) {
            log.error(e.getMessage());

            session.putAttribute(flowFile, ATTRIBUTE_VALIDATION_ERRORS, e.getMessage());
            session.transfer(flowFile, REL_FAILURE);

            return;
        }

        // Write the JSON to a flow file
        FlowFile outputFlowFile = session.write(flowFile, (in, out) -> {
            try (OutputStream outputStream = new BufferedOutputStream(out)) {
                outputStream.write(mapper.writeValueAsBytes(rulesInputMessage));
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

    private RulesInputMessage extractMetadata(String xmlContent) throws Exception {
        InputSource inputXML = new InputSource(new StringReader(xmlContent));
        String schemaVersion = determineXmlSchema(inputXML);

        return getMetadata(schemaVersion);
    }

    private String determineXmlSchema(InputSource inputXML) throws Exception {
        try {
            //Get DOM
            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            DocumentBuilder db = dbf.newDocumentBuilder();
            documentXml = db.parse(inputXML);

            //Get XPath
            XPathFactory xpf = XPathFactory.newInstance();
            documentXpath = xpf.newXPath();

            //Get all matches
            NodeList is_v5 = (NodeList) documentXpath.evaluate("/documentRoot[@desVersion='5' and @type='fake']", documentXml, XPathConstants.NODESET);
            if (is_v5.getLength() > 0) {
                getLogger().info("Input XML is schema version 5");
                return V5;
            } else {
                // TODO implement various schemas when back at work.
                throw new RmsGeneralException("Unknown schema version.");
            }
        } catch (Exception e) {
            if (e instanceof RmsGeneralException) {
                throw e;
            } else {
                throw new RmsGeneralException("Failed to evaluate XML schema version due to " + e.getMessage());
            }
        }
    }

    private RulesInputMessage getMetadata(String schemaVersion) throws XPathExpressionException, RmsGeneralException {
        RulesInputMessage rim = new RulesInputMessage();

        switch (schemaVersion) {
            // TODO add more schema versions.
            case V5:
                // TODO actually evaluate real XPATHS one day
                rim.setGuide((String) documentXpath.evaluate("/documentRoot/guide", documentXml, XPathConstants.STRING));
                rim.setProducer((String) documentXpath.evaluate("/documentRoot/producer", documentXml, XPathConstants.STRING));
                rim.setCreateDate((String) documentXpath.evaluate("/documentRoot/createDate", documentXml, XPathConstants.STRING));
                break;
            default:
                throw new RmsGeneralException("Unknown schema version.");
        }

        rim.validate();

        return rim;
    }
}
