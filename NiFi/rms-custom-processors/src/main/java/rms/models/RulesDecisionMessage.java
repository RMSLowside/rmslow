package rms.models;

import java.util.ArrayList;

public class RulesDecisionMessage {
    private RulesInputMessage rulesInputMessage;
    private ArrayList<Actions> actions;

    public RulesInputMessage getRulesInputMessage() {
        return rulesInputMessage;
    }

    public void setRulesInputMessage(RulesInputMessage rulesInputMessage) {
        this.rulesInputMessage = rulesInputMessage;
    }

    public ArrayList<Actions> getActions() {
        return actions;
    }

    public void setActions(ArrayList<Actions> actions) {
        this.actions = actions;
    }
}
