package app;

import java.util.ArrayList;

public class Term {
    String type;                  // operator, term, proximity
    String operator;              // what the operator is, if type = operator
    String term;                  // what the data is, if type = term
    int depth;                    // how deep inside the paretheses we have gone (starts at 0, every set +1)
    //Proximity-specific variables:
    String proximityType;         // WITHIN, ORDERED, BETWEEN
    ArrayList<Term> predicate;    // contains the list of arguments preceding the prox. type (could be normal terms, could be more proximities)
    int limit;                    // for WITHIN / ORDERED: the integer limit provided as a suffix
    String constraints;           // for BETWEEN: the term constraints provided as a suffix

    public void addTerm(String type, String operator, String term, int depth, String proximityType, ArrayList<Term> predicate, int limit, String constraints){
        this.setType(type);
        this.setOperator(operator);
        this.setTerm(term);
        this.setDepth(depth);
        this.setProximityType(proximityType);
        this.setPredicate(predicate);
        this.setLimit(limit);
        this.setConstraints(constraints);
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }

    public String getTerm() {
        return term;
    }

    public void setTerm(String term) {
        this.term = term;
    }

    public int getDepth() {
        return depth;
    }

    public void setDepth(int depth) {
        this.depth = depth;
    }

    public String getProximityType() {
        return proximityType;
    }

    public void setProximityType(String proximityType) {
        this.proximityType = proximityType;
    }

    public ArrayList<Term> getPredicate() {
        return predicate;
    }

    public void setPredicate(ArrayList<Term> predicate) {
        this.predicate = predicate;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public String getConstraints() {
        return constraints;
    }

    public void setConstraints(String constraints) {
        this.constraints = constraints;
    }
}
