package rms.processors.json;

import org.apache.nifi.util.MockFlowFile;
import org.apache.nifi.util.TestRunner;
import org.apache.nifi.util.TestRunners;
import org.junit.Before;
import org.junit.Test;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

import static junit.framework.TestCase.assertTrue;
import static rms.utilities.RmsEnums.ATTRIBUTE_VALIDATION_ERRORS;

public class ConvertXmlToJsonProcessorTest {
    private TestRunner testRunner;

    private String VALID_XML = "<documentRoot desVersion='5' type='fake'><guide>123456789</guide><producer>kimmela</producer><createDate>2020-04-13</createDate></documentRoot>";
    private String INVALID_XML = "<documentRoot desVersion='5' type='fake'><guide>123456789</guide><producer></producer><createDate>2020-04-13</createDate></documentRoot>";
    private String UNKNOWN_XML = "<documentRoot desVersion='13' type='fake'><guide>123456789</guide><producer>kimmela</producer><createDate>2020-04-13</createDate></documentRoot>";

    @Before
    public void init() {
        testRunner = TestRunners.newTestRunner(new ConvertXmlToJsonProcessor());
    }

    @Test
    public void testKnownSchema() {
        InputStream content = new ByteArrayInputStream(VALID_XML.getBytes());

        testRunner.enqueue(content);
        testRunner.run();

        testRunner.assertQueueEmpty();
        assertTrue("Did not have 1 SUCCESS", testRunner.getFlowFilesForRelationship(ConvertXmlToJsonProcessor.REL_SUCCESS).size() == 1);
        assertTrue("Did not have 0 FAILURE", testRunner.getFlowFilesForRelationship(ConvertXmlToJsonProcessor.REL_FAILURE).size() == 0);
    }

    @Test
    public void testInvalidSchema(){
        InputStream content = new ByteArrayInputStream(INVALID_XML.getBytes());

        testRunner.enqueue(content);
        testRunner.run();

        testRunner.assertQueueEmpty();
        assertTrue("Did not have 0 SUCCESS", testRunner.getFlowFilesForRelationship(ConvertXmlToJsonProcessor.REL_SUCCESS).size() == 0);
        assertTrue("Did not have 1 FAILURE", testRunner.getFlowFilesForRelationship(ConvertXmlToJsonProcessor.REL_FAILURE).size() == 1);

        MockFlowFile flowFile = testRunner.getFlowFilesForRelationship(ConvertXmlToJsonProcessor.REL_FAILURE).get(0);
        assertTrue("Did not have correct 'ValidationErrors' attribute", flowFile.getAttribute(ATTRIBUTE_VALIDATION_ERRORS).equals("Producer is null or empty"));
    }

    @Test
    public void testUnknownSchema(){
        InputStream content = new ByteArrayInputStream(UNKNOWN_XML.getBytes());

        testRunner.enqueue(content);
        testRunner.run();

        testRunner.assertQueueEmpty();
        assertTrue("Did not have 0 SUCCESS", testRunner.getFlowFilesForRelationship(ConvertXmlToJsonProcessor.REL_SUCCESS).size() == 0);
        assertTrue("Did not have 1 FAILURE", testRunner.getFlowFilesForRelationship(ConvertXmlToJsonProcessor.REL_FAILURE).size() == 1);

        MockFlowFile flowFile = testRunner.getFlowFilesForRelationship(ConvertXmlToJsonProcessor.REL_FAILURE).get(0);
        assertTrue("Did not have correct 'ValidationErrors' attribute", flowFile.getAttribute(ATTRIBUTE_VALIDATION_ERRORS).equals("Unknown schema version."));
    }
}