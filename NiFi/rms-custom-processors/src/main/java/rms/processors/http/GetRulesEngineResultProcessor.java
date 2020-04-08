package rms.processors.http;

import org.apache.nifi.annotation.documentation.Tags;
import org.apache.nifi.flowfile.FlowFile;
import org.apache.nifi.processor.ProcessContext;
import org.apache.nifi.processor.ProcessSession;
import org.apache.nifi.processor.Relationship;
import org.apache.nifi.processor.exception.ProcessException;
import rms.processors.AbstractRmsProcessor;

import java.util.Set;

@Tags({"rms"})
public class GetRulesEngineResultProcessor extends AbstractRmsProcessor {

    @Override
    protected void addSupportedRelationships(Set<Relationship> relationships) {
        relationships.add(new Relationship.Builder().name(REL_SUCCESS.getName()).description("Placeholder").build());
    }

    @Override
    public void onTrigger(ProcessContext processContext, ProcessSession processSession) throws ProcessException {
        FlowFile flowFile = processSession.get();
        if (flowFile == null) {
            return;
        }

        processSession.transfer(flowFile, REL_SUCCESS);
    }
}