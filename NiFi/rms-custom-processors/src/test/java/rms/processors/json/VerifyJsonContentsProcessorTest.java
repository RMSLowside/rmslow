package rms.processors.json;

import org.apache.nifi.util.MockFlowFile;
import org.apache.nifi.util.TestRunner;
import org.apache.nifi.util.TestRunners;
import org.junit.Before;
import org.junit.Test;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

import static junit.framework.TestCase.assertTrue;
import static rms.processors.utilities.RmsEnums.ATTRIBUTE_IS_VALID;
import static rms.processors.utilities.RmsEnums.ATTRIBUTE_VALIDATION_ERRORS;

public class VerifyJsonContentsProcessorTest {
    private TestRunner testRunner;

    private String VALID_JSON = "{\"guide\": \"1\",\"producer\": \"kimmela\",\"createDate\": \"2020-04-09\"}";
    private String INVALID_JSON = "{\"aThing\": \"1\"}";
    private String MISSING_GUIDE_JSON = "{\"producer\": \"kimmela\",\"createDate\": \"2020-04-09\"}";
    private String BAD_DATE_JSON = "{\"guide\": \"1\",\"producer\": \"kimmela\",\"createDate\": \"01-01-2020\"}";

    @Before
    public void init() {
        testRunner = TestRunners.newTestRunner(new VerifyJsonContentsProcessor());
    }

    @Test
    public void testValidJson() {
        InputStream content = new ByteArrayInputStream(VALID_JSON.getBytes());

        testRunner.enqueue(content);
        testRunner.run();

        testRunner.assertQueueEmpty();
        assertTrue("Did not have 1 SUCCESS", testRunner.getFlowFilesForRelationship(VerifyJsonContentsProcessor.REL_SUCCESS).size() == 1);
        assertTrue("Did not have 0 FAILURE", testRunner.getFlowFilesForRelationship(VerifyJsonContentsProcessor.REL_FAILURE).size() == 0);
    }

    @Test
    public void testInvalidJson() {
        InputStream content = new ByteArrayInputStream(INVALID_JSON.getBytes());

        testRunner.enqueue(content);
        testRunner.run();

        testRunner.assertQueueEmpty();
        assertTrue("Did not have 0 SUCCESS", testRunner.getFlowFilesForRelationship(VerifyJsonContentsProcessor.REL_SUCCESS).size() == 0);
        assertTrue("Did not have 1 FAILURE", testRunner.getFlowFilesForRelationship(VerifyJsonContentsProcessor.REL_FAILURE).size() == 1);

        MockFlowFile flowFile = testRunner.getFlowFilesForRelationship(VerifyJsonContentsProcessor.REL_FAILURE).get(0);
        assertTrue("Did not have correct 'Valid' attribute", flowFile.getAttribute(ATTRIBUTE_IS_VALID).equals("false"));
        assertTrue("Did not have correct 'ValidationErrors' attribute", flowFile.getAttribute(ATTRIBUTE_VALIDATION_ERRORS).contains("Unrecognized field \"aThing\""));
    }

    @Test
    public void testMissingGuide() {
        InputStream content = new ByteArrayInputStream(MISSING_GUIDE_JSON.getBytes());

        testRunner.enqueue(content);
        testRunner.run();

        testRunner.assertQueueEmpty();
        assertTrue("Did not have 0 SUCCESS", testRunner.getFlowFilesForRelationship(VerifyJsonContentsProcessor.REL_SUCCESS).size() == 0);
        assertTrue("Did not have 1 FAILURE", testRunner.getFlowFilesForRelationship(VerifyJsonContentsProcessor.REL_FAILURE).size() == 1);

        MockFlowFile flowFile = testRunner.getFlowFilesForRelationship(VerifyJsonContentsProcessor.REL_FAILURE).get(0);
        assertTrue("Did not have correct 'Valid' attribute", flowFile.getAttribute(ATTRIBUTE_IS_VALID).equals("false"));
        assertTrue("Did not have correct 'ValidationErrors' attribute", flowFile.getAttribute(ATTRIBUTE_VALIDATION_ERRORS).equals("GUIDE is null or empty"));
    }

    @Test
    public void testInvalidDate() {
        InputStream content = new ByteArrayInputStream(BAD_DATE_JSON.getBytes());

        testRunner.enqueue(content);
        testRunner.run();

        testRunner.assertQueueEmpty();
        assertTrue("Did not have 0 SUCCESS", testRunner.getFlowFilesForRelationship(VerifyJsonContentsProcessor.REL_SUCCESS).size() == 0);
        assertTrue("Did not have 1 FAILURE", testRunner.getFlowFilesForRelationship(VerifyJsonContentsProcessor.REL_FAILURE).size() == 1);

        MockFlowFile flowFile = testRunner.getFlowFilesForRelationship(VerifyJsonContentsProcessor.REL_FAILURE).get(0);
        assertTrue("Did not have correct 'Valid' attribute", flowFile.getAttribute(ATTRIBUTE_IS_VALID).equals("false"));
        assertTrue("Did not have correct 'ValidationErrors' attribute", flowFile.getAttribute(ATTRIBUTE_VALIDATION_ERRORS).equals("CreateDate does not match expected format of yyyy-MM-dd"));
    }
}