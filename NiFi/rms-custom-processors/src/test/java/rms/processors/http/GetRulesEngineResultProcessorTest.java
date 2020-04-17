package rms.processors.http;

import org.apache.nifi.util.MockFlowFile;
import org.apache.nifi.util.TestRunner;
import org.apache.nifi.util.TestRunners;
import org.junit.Before;
import org.junit.Test;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

import static junit.framework.TestCase.assertTrue;
import static rms.utilities.RmsEnums.ATTRIBUTE_VALIDATION_ERRORS;

public class GetRulesEngineResultProcessorTest {
    private TestRunner testRunner;

    private String VALID_JSON = "{\"guide\": \"1\",\"producer\": \"kimmela\",\"createDate\": \"2020-04-09\"}";
    private String INVALID_JSON = "{\"aBlob\": \"1\"}";

    @Before
    public void init() {
        testRunner = TestRunners.newTestRunner(new GetRulesEngineResultProcessor());
    }

    @Test
    public void testValidJson() {
        InputStream content = new ByteArrayInputStream(VALID_JSON.getBytes());

        testRunner.enqueue(content);
        testRunner.run();

        testRunner.assertQueueEmpty();
        assertTrue("Did not have 1 SUCCESS", testRunner.getFlowFilesForRelationship(GetRulesEngineResultProcessor.REL_SUCCESS).size() == 1);
        assertTrue("Did not have 0 FAILURE", testRunner.getFlowFilesForRelationship(GetRulesEngineResultProcessor.REL_FAILURE).size() == 0);

        MockFlowFile flowFile = testRunner.getFlowFilesForRelationship(GetRulesEngineResultProcessor.REL_SUCCESS).get(0);
        String mockContent = new String(testRunner.getContentAsByteArray(flowFile));
        assertTrue("Message does not have the original rules input message", mockContent.contains("\"rulesInputMessage\""));
        assertTrue("Message does not have a action", mockContent.contains("\"action\":\"AddToRmm\""));
        assertTrue("Message does not have values", mockContent.contains("\"values\""));
    }

    @Test
    public void testInvalidJson() {
        InputStream content = new ByteArrayInputStream(INVALID_JSON.getBytes());

        testRunner.enqueue(content);
        testRunner.run();

        testRunner.assertQueueEmpty();
        assertTrue("Did not have 0 SUCCESS", testRunner.getFlowFilesForRelationship(GetRulesEngineResultProcessor.REL_SUCCESS).size() == 0);
        assertTrue("Did not have 1 FAILURE", testRunner.getFlowFilesForRelationship(GetRulesEngineResultProcessor.REL_FAILURE).size() == 1);

        MockFlowFile flowFile = testRunner.getFlowFilesForRelationship(GetRulesEngineResultProcessor.REL_FAILURE).get(0);
        assertTrue("Did not have correct 'ValidationErrors' attribute", flowFile.getAttribute(ATTRIBUTE_VALIDATION_ERRORS).contains("Unrecognized field \"aBlob\""));
    }
}