package rms.validators;

import org.apache.nifi.components.ValidationResult;
import org.apache.nifi.components.Validator;

public class RmsValidators {

    public static final Validator EMPTY_VALUE_ALLOWED_VALIDATOR = (subject, value, context)
            -> (new ValidationResult.Builder()).subject(subject).input(value).valid(true).explanation(subject + " is valid always.").build();

}
