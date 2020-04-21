package rms.processors.dao;

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
import rms.exceptions.RmsGeneralException;
import rms.models.Actions;
import rms.models.RulesDecisionMessage;
import rms.models.RulesInputMessage;
import rms.processors.AbstractRmsProcessor;
import rms.validators.RmsValidators;

import java.nio.charset.Charset;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import static rms.utilities.RmsEnums.*;

@Tags({"rms", "mysql", "dao"})
@SeeAlso({})
@CapabilityDescription("Handles a rules decision message and determines if there is any RMM related work to be completed on it.")
@InputRequirement(InputRequirement.Requirement.INPUT_REQUIRED)
@ReadsAttributes({})
@WritesAttributes({})
public class AddToRmmProcessor extends AbstractRmsProcessor {

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

    public static final PropertyDescriptor DB_CONN = new PropertyDescriptor.Builder()
            .name("Database connection string")
            .description("The connection string to the RMM database")
            .required(true)
            .addValidator(StandardValidators.NON_BLANK_VALIDATOR)
            .defaultValue("jdbc:mysql://localhost:3306/rmm")
            .build();

    public static final PropertyDescriptor DB_USER = new PropertyDescriptor.Builder()
            .name("Database user name")
            .description("The database user to use")
            .required(true)
            .addValidator(StandardValidators.NON_BLANK_VALIDATOR)
            .defaultValue("root")
            .build();

    public static final PropertyDescriptor DB_PASSWORD = new PropertyDescriptor.Builder()
            .name("Database password")
            .description("The password for the user to the database")
            .defaultValue("")
            .addValidator(RmsValidators.EMPTY_VALUE_ALLOWED_VALIDATOR)
            .build();

    private static final ObjectMapper mapper = new ObjectMapper();

    @Override
    protected void addSupportedRelationships(Set<Relationship> relationships) {
        relationships.add(new Relationship.Builder().name(REL_SUCCESS.getName()).description("All FlowFiles that have been handled successfully are routed to this relationship. This could mean" +
                " inserting into RMM, ignoring the message, or something else.").build());
        relationships.add(new Relationship.Builder().name(REL_FAILURE.getName()).description("All FlowFiles that have failed to be handled are routed to this relationship.").build());
    }

    @Override
    protected void addSupportedProperties(List<PropertyDescriptor> descriptors) {
        descriptors.add(MAX_BUFFER_SIZE);
        descriptors.add(CHARACTER_SET);
        descriptors.add(DB_CONN);
        descriptors.add(DB_USER);
        descriptors.add(DB_PASSWORD);
    }

    @Override
    public void onTrigger(ProcessContext context, ProcessSession session) throws ProcessException {
        final ComponentLog log = getLogger();

        FlowFile flowFile = session.get();
        if (flowFile == null) {
            return;
        }

        String content = getFlowFileContent(flowFile, context, session);
        RulesDecisionMessage rdm;
        try {
            rdm = mapper.readValue(content, RulesDecisionMessage.class);

            ArrayList<Actions> allActions = rdm.getActions();
            for (Actions action : allActions) {
                if (action.getAction().equals(ACTION_ADD_TO_RMM)) {
                    log.info("Found RMM action: " + action.getAction() + ". Adding the record to RMM.");
                    addToRmm(rdm.getRulesInputMessage(), action, context);
                } else {
                    log.info("Skipping action: " + action.getAction());
                }
            }
        } catch (Exception e) {
            log.error("Failed process record due to: " + e.getMessage());

            session.putAttribute(flowFile, ATTRIBUTE_VALIDATION_ERRORS, "Failed process record due to: " + e.getMessage());
            session.transfer(flowFile, REL_FAILURE);

            return;
        }

        session.transfer(flowFile, REL_SUCCESS);
    }

    private void addToRmm(RulesInputMessage rulesInputMessage, Actions action, ProcessContext context) throws ParseException, SQLException, ClassNotFoundException, RmsGeneralException {
        String guide = rulesInputMessage.getGuide();
        String createDate = rulesInputMessage.getCreateDate();
        String producer = rulesInputMessage.getProducer(); // This is recordSystemId for now
        String rcsId = action.getValues().get(VALUE_RCS_ID);
        String ruleMatchedId = action.getValues().get(VALUE_RULE_MATCHED_ID);

        // TODO call RCS with the rcsID to get the disposition YEARS and MONTHS. For now we fake this.
        int dispositionYears = 50;
        int dispositionMonths = 0;

        // Calculate the disposition date
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date createDateActual = sdf.parse(createDate);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(createDateActual);
        calendar.add(Calendar.YEAR, dispositionYears);
        calendar.add(Calendar.MONTH, dispositionMonths);

        String dispositionDate = sdf.format(calendar.getTime());

        // Insert into records table
        Connection connection = getConnection(context);
        PreparedStatement insertStatement = connection.prepareStatement(
                "INSERT INTO records (guide, recordSystemGuide, ruleId, rcsId, decisionDate, documentCreateDate, dispositionDate) " +
                        "VALUES (?,?,?,?,now(),?,?)");

        insertStatement.setString(1, guide);
        insertStatement.setString(2, producer);
        insertStatement.setString(3, ruleMatchedId);
        insertStatement.setString(4, rcsId);
        insertStatement.setString(5, createDate);
        insertStatement.setString(6, dispositionDate);

        if(insertStatement.executeUpdate() < 1){
            throw new RmsGeneralException("Failed to insert the row into MySQL.");
        }

        insertStatement.close();
        connection.close();
    }

    public Connection getConnection(ProcessContext context) throws ClassNotFoundException, SQLException {
        String url = context.getProperty(DB_CONN).getValue();
        String user = context.getProperty(DB_USER).getValue();
        String password = context.getProperty(DB_PASSWORD).getValue();

        Class.forName("com.mysql.jdbc.Driver");
        return DriverManager.getConnection(url, user, password);
    }

    private String getFlowFileContent(FlowFile flowFile, ProcessContext context, ProcessSession session) {
        Charset charset = Charset.forName(context.getProperty(CHARACTER_SET).getValue());
        final int maxBufferSize = context.getProperty(MAX_BUFFER_SIZE).asDataSize(DataUnit.B).intValue();

        byte[] buffer = new byte[maxBufferSize];
        session.read(flowFile, inputStream -> StreamUtils.fillBuffer(inputStream, buffer, false));
        final long len = Math.min(buffer.length, flowFile.getSize());

        return new String(buffer, 0, (int) len, charset);
    }
}