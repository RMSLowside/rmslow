package rms.processors;

import org.apache.nifi.components.PropertyDescriptor;
import org.apache.nifi.processor.AbstractProcessor;
import org.apache.nifi.processor.ProcessorInitializationContext;
import org.apache.nifi.processor.Relationship;

import java.util.*;

public abstract class AbstractRmsProcessor extends AbstractProcessor {

    protected static final Relationship REL_SUCCESS = new Relationship.Builder().name("success").build();
    protected static final Relationship REL_RETRY = new Relationship.Builder().name("retry").build();
    protected static final Relationship REL_FAILURE = new Relationship.Builder().name("failure").build();

    private List<PropertyDescriptor> descriptors;
    private Set<Relationship> relationships;

    @Override
    protected final void init(final ProcessorInitializationContext context) {
        final List<PropertyDescriptor> descriptors = new ArrayList<>();
        addSupportedProperties(descriptors);
        this.descriptors = Collections.unmodifiableList(descriptors);

        final Set<Relationship> relationships = new HashSet<>();
        addSupportedRelationships(relationships);
        this.relationships = Collections.unmodifiableSet(relationships);
    }

    /**
     * Add processor specific properties.
     *
     * @param descriptors add properties to this list
     */
    protected void addSupportedProperties(List<PropertyDescriptor> descriptors) {
        return;
    }

    /**
     * Add processor specific relationships.
     *
     * @param relationships add relationships to this list
     */
    protected void addSupportedRelationships(Set<Relationship> relationships) {
        return;
    }

    @Override
    public final Set<Relationship> getRelationships() {
        return this.relationships;
    }

    @Override
    public final List<PropertyDescriptor> getSupportedPropertyDescriptors() {
        return this.descriptors;
    }
}
