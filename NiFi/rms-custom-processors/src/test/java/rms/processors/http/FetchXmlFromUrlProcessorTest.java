package rms.processors.http;

import org.apache.nifi.util.MockFlowFile;
import org.apache.nifi.util.TestRunner;
import org.apache.nifi.util.TestRunners;
import org.junit.Before;
import org.junit.Test;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

import static junit.framework.TestCase.assertTrue;

public class FetchXmlFromUrlProcessorTest {
    private TestRunner testRunner;

    private String VALID_JSON = "{\"documentId\":\"abcd1234\",\"docUrl\":\"www.fakexmldocuments.com\"}";
    private String INVALID_JSON = "{\"guide\":\"1234-5678-9101\",\"docUrl2\":\"www.fakexmldocuments.com\"}";

    @Before
    public void init() {
        testRunner = TestRunners.newTestRunner(new FetchXmlFromUrlProcessor());
    }

    @Test
    public void testValidIncomingJson() {
        InputStream content = new ByteArrayInputStream(VALID_JSON.getBytes());

        testRunner.enqueue(content);
        testRunner.run();

        testRunner.assertQueueEmpty();
        assertTrue("Did not have 1 SUCCESS", testRunner.getFlowFilesForRelationship(FetchXmlFromUrlProcessor.REL_SUCCESS).size() == 1);
        assertTrue("Did not have 0 FAILURE", testRunner.getFlowFilesForRelationship(FetchXmlFromUrlProcessor.REL_FAILURE).size() == 0);

        MockFlowFile flowFile = testRunner.getFlowFilesForRelationship(FetchXmlFromUrlProcessor.REL_SUCCESS).get(0);
        String mockContent = new String(testRunner.getContentAsByteArray(flowFile));
        assertTrue("Message does not have a guide", mockContent.contains("<guide>"));
        assertTrue("Message does not have a producer", mockContent.contains("<producer>"));
        assertTrue("Message does not have a create date", mockContent.contains("<createDate>"));
    }

    @Test
    public void testInvalidIncomingJson() {
        InputStream content = new ByteArrayInputStream(INVALID_JSON.getBytes());

        testRunner.enqueue(content);
        testRunner.run();

        testRunner.assertQueueEmpty();
        assertTrue("Did not have 0 SUCCESS", testRunner.getFlowFilesForRelationship(FetchXmlFromUrlProcessor.REL_SUCCESS).size() == 0);
        assertTrue("Did not have 1 FAILURE", testRunner.getFlowFilesForRelationship(FetchXmlFromUrlProcessor.REL_FAILURE).size() == 1);
    }
}