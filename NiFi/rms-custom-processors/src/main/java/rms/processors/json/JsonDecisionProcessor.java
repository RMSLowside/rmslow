package rms.processors.json;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.nifi.annotation.behavior.*;
import org.apache.nifi.annotation.documentation.CapabilityDescription;
import org.apache.nifi.annotation.documentation.SeeAlso;
import org.apache.nifi.annotation.documentation.Tags;
import org.apache.nifi.annotation.lifecycle.OnScheduled;
import org.apache.nifi.flowfile.FlowFile;
import org.apache.nifi.logging.ComponentLog;
import org.apache.nifi.processor.ProcessContext;
import org.apache.nifi.processor.ProcessSession;
import org.apache.nifi.processor.Relationship;
import org.apache.nifi.processor.exception.ProcessException;
import rms.models.BasicJsonMessage;
import rms.processors.AbstractRmsProcessor;

import java.util.Set;

// Lets you find this processor through the UI
@Tags({"rms", "json"})
// Other similar processors
@SeeAlso({})
// General description of what this processor does
@CapabilityDescription("Provide a description")
// Does this processor require input?
@InputRequirement(InputRequirement.Requirement.INPUT_ALLOWED)
// Attributes this processor will read
@ReadsAttributes({@ReadsAttribute(attribute = "testerPassThrough", description = "Is the user a tester and should be passed through")})
// Attributes this processor will set
@WritesAttributes({@WritesAttribute(attribute = "testerPassThrough", description = "Is the user a tester and should be passed through")})
public class JsonDecisionProcessor extends AbstractRmsProcessor {

    private static final ObjectMapper mapper = new ObjectMapper();
    private static final String TESTER_PASS_THROUGH = "testerPassThrough";

    @Override
    protected void addSupportedRelationships(Set<Relationship> relationships) {
        relationships.add(new Relationship.Builder().name(REL_SUCCESS.getName()).description("All FlowFiles that are developers are routed to this relationship.").build());
        relationships.add(new Relationship.Builder().name(REL_RETRY.getName()).description("All FlowFiles that are testers are routed to this relationship.").build());
        relationships.add(new Relationship.Builder().name(REL_FAILURE.getName()).description("All FlowFiles failed are routed to this relationship.").build());
    }

    // Things you want to instantiate once can go here...such as connection pools
    @OnScheduled
    public void onScheduled(final ProcessContext context) {
        // Left blank
    }

    @Override
    public void onTrigger(final ProcessContext context, final ProcessSession session) throws ProcessException {
        FlowFile flowFile = session.get();
        if (flowFile == null) {
            return;
        }

        final ComponentLog log = getLogger();

        String fullText = flowFile.getAttribute("fullText.0");
        BasicJsonMessage message;
        try {
            message = mapper.readValue(fullText, BasicJsonMessage.class);
        } catch (JsonProcessingException e) {
            log.error("Failed to map text to expected POJO due to " + e.getMessage());
            session.transfer(flowFile, REL_FAILURE);
            return;
        }

        String position = message.getPosition();
        String username = message.getUserName();

        if (position.equalsIgnoreCase("DEVELOPER")) {
            log.info(username + " is a developer, they pass this made up test....wooo");
            session.transfer(flowFile, REL_SUCCESS);
        } else if (position.equalsIgnoreCase("TESTER")) {
            String isTesterPassThrough = flowFile.getAttribute(TESTER_PASS_THROUGH);
            if (isTesterPassThrough != null && isTesterPassThrough.equalsIgnoreCase("TRUE")) {
                log.info(username + " is a tester and has the required flow attribute....wooo");
                session.transfer(flowFile, REL_SUCCESS);
            } else {
                log.info(username + " is a tester but does not have the required attribute, adding it now.");
                session.putAttribute(flowFile, TESTER_PASS_THROUGH, "TRUE");
                session.transfer(flowFile, REL_RETRY);
            }
        } else {
            log.error("Unknown position: " + position);
            session.transfer(flowFile, REL_FAILURE);
        }
    }
}
