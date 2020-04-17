package rms.processors.dao;

import org.apache.nifi.processor.ProcessContext;
import org.apache.nifi.util.TestRunner;
import org.apache.nifi.util.TestRunners;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import static junit.framework.TestCase.assertTrue;
import static org.mockito.Mockito.doNothing;

public class AddToRmmProcessorTest {

    private TestRunner testRunner;

    @Mock
    private Connection mockConnection;
    @Mock
    private PreparedStatement mockStatement;

    private String VALID_JSON = "{\"rulesInputMessage\":{\"guide\":\"f3fbd963-5156-46e7-9cf8-5af34d376c80\",\"producer\":\"Amazon\",\"createDate\":\"1966-10-08\"},\"actions\":[{\"action\":\"AddToRmm\",\"values\":{\"RCS_NAME\":\"FRCS-Q2a\",\"RCS_ID\":\"54\",\"RULE_MATCHED_ID\":\"13\"}}]}";

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
        testRunner = TestRunners.newTestRunner(new AddToRmmProcessor(){
            public Connection getConnection(ProcessContext context){
                return mockConnection;
            }
        });
    }

    @Test
    public void testValidJson() throws SQLException {
        Mockito.when(mockConnection.prepareStatement(Mockito.anyString())).thenReturn(mockStatement);
        doNothing().when(mockStatement).setString(Mockito.anyInt(), Mockito.anyString());

        InputStream content = new ByteArrayInputStream(VALID_JSON.getBytes());

        testRunner.enqueue(content);
        testRunner.run();

        testRunner.assertQueueEmpty();
        assertTrue("Did not have 1 SUCCESS", testRunner.getFlowFilesForRelationship(AddToRmmProcessor.REL_SUCCESS).size() == 1);
        assertTrue("Did not have 0 FAILURE", testRunner.getFlowFilesForRelationship(AddToRmmProcessor.REL_FAILURE).size() == 0);
    }
}
