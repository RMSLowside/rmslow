package rms.models;

import java.util.HashMap;

public class Actions {
    private String action;
    private HashMap<String, String> values;

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public HashMap<String, String> getValues() {
        return values;
    }

    public void setValues(HashMap<String, String> values) {
        this.values = values;
    }
}
