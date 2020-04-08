package rms.processors.json;

import org.apache.nifi.util.MockFlowFile;
import org.apache.nifi.util.TestRunner;
import org.apache.nifi.util.TestRunners;
import org.junit.Before;
import org.junit.Test;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.HashMap;

import static junit.framework.TestCase.assertTrue;

public class JsonDecisionProcessorTest {

    private TestRunner testRunner;

    @Before
    public void init() {
        testRunner = TestRunners.newTestRunner(new JsonDecisionProcessor());
    }

    @Test
    public void testDeveloper() {
        InputStream content = new ByteArrayInputStream("some content".getBytes());
        HashMap<String, String> attributes = new HashMap<>();
        attributes.put("fullText.0", "{\n" +
                "\t\"userName\": \"kimmela\",\n" +
                "\t\"position\": \"developer\"\n" +
                "}");

        testRunner.enqueue(content, attributes);
        testRunner.run();

        testRunner.assertQueueEmpty();
        assertTrue("Did not have 1 SUCCESS", testRunner.getFlowFilesForRelationship(JsonDecisionProcessor.REL_SUCCESS).size() == 1);
        assertTrue("Did not have 0 FAILURE", testRunner.getFlowFilesForRelationship(JsonDecisionProcessor.REL_FAILURE).size() == 0);
        assertTrue("Did not have 0 RETRY", testRunner.getFlowFilesForRelationship(JsonDecisionProcessor.REL_RETRY).size() == 0);
    }

    @Test
    public void testTester() {
        InputStream content = new ByteArrayInputStream("some content".getBytes());
        HashMap<String, String> attributes = new HashMap<>();
        attributes.put("fullText.0", "{\n" +
                "\t\"userName\": \"kimmela\",\n" +
                "\t\"position\": \"tester\"\n" +
                "}");

        testRunner.enqueue(content, attributes);
        testRunner.run();

        testRunner.assertQueueEmpty();
        assertTrue("Did not have 0 SUCCESS", testRunner.getFlowFilesForRelationship(JsonDecisionProcessor.REL_SUCCESS).size() == 0);
        assertTrue("Did not have 0 FAILURE", testRunner.getFlowFilesForRelationship(JsonDecisionProcessor.REL_FAILURE).size() == 0);
        assertTrue("Did not have 1 RETRY", testRunner.getFlowFilesForRelationship(JsonDecisionProcessor.REL_RETRY).size() == 1);

        MockFlowFile flowFile = testRunner.getFlowFilesForRelationship(JsonDecisionProcessor.REL_RETRY).get(0);
        testRunner.enqueue(flowFile);
        testRunner.clearTransferState();
        testRunner.run();

        testRunner.assertQueueEmpty();
        assertTrue("Did not have 1 SUCCESS", testRunner.getFlowFilesForRelationship(JsonDecisionProcessor.REL_SUCCESS).size() == 1);
        assertTrue("Did not have 0 FAILURE", testRunner.getFlowFilesForRelationship(JsonDecisionProcessor.REL_FAILURE).size() == 0);
        assertTrue("Did not have 0 RETRY", testRunner.getFlowFilesForRelationship(JsonDecisionProcessor.REL_RETRY).size() == 0);
    }

    @Test
    public void testUnknown() {
        InputStream content = new ByteArrayInputStream("some content".getBytes());
        HashMap<String, String> attributes = new HashMap<>();
        attributes.put("fullText.0", "{\n" +
                "\t\"userName\": \"kimmela\",\n" +
                "\t\"position\": \"painter\"\n" +
                "}");

        testRunner.enqueue(content, attributes);
        testRunner.run();

        testRunner.assertQueueEmpty();
        assertTrue("Did not have 0 SUCCESS", testRunner.getFlowFilesForRelationship(JsonDecisionProcessor.REL_SUCCESS).size() == 0);
        assertTrue("Did not have 1 FAILURE", testRunner.getFlowFilesForRelationship(JsonDecisionProcessor.REL_FAILURE).size() == 1);
        assertTrue("Did not have 0 RETRY", testRunner.getFlowFilesForRelationship(JsonDecisionProcessor.REL_RETRY).size() == 0);
    }
}
