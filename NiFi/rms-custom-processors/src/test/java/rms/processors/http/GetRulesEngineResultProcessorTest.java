package rms.processors.http;

import org.apache.nifi.util.TestRunner;
import org.apache.nifi.util.TestRunners;
import org.junit.Before;
import org.junit.Test;

import static junit.framework.TestCase.assertTrue;

public class GetRulesEngineResultProcessorTest {
    private TestRunner testRunner;

    @Before
    public void init() {
        testRunner = TestRunners.newTestRunner(new GetRulesEngineResultProcessor());
    }

    @Test
    public void testDeveloper() {
        assertTrue("Placeholder", true == true);
    }
}