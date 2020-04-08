package rms.processors.enhance;

import org.apache.nifi.util.TestRunner;
import org.apache.nifi.util.TestRunners;
import org.junit.Before;
import org.junit.Test;
import rms.processors.dao.AddToRmmProcessor;

import static junit.framework.TestCase.assertTrue;

public class AddAttributesToFlowFileProcessorTest {
    private TestRunner testRunner;

    @Before
    public void init() {
        testRunner = TestRunners.newTestRunner(new AddAttributesToFlowFileProcessor());
    }

    @Test
    public void testDeveloper() {
        assertTrue("Placeholder", true == true);
    }
}