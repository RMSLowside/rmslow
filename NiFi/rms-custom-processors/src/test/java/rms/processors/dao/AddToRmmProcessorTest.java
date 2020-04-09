package rms.processors.dao;

import org.apache.nifi.util.TestRunner;
import org.apache.nifi.util.TestRunners;
import org.junit.Before;
import org.junit.Test;

import static junit.framework.TestCase.assertTrue;

public class AddToRmmProcessorTest {
    private TestRunner testRunner;

    @Before
    public void init() {
        testRunner = TestRunners.newTestRunner(new AddToRmmProcessor());
    }

    @Test
    public void testDeveloper() {
        assertTrue("Placeholder", true == true);
    }
}
