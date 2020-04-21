package app;

import java.io.Console;
import java.util.ArrayList;

public class Search {

    public static String termify(final String input){
        String resultString = "";
        String restrictedChars = "&|!() ";
        boolean termOpen = false;
        boolean quoteTermOpen = false;

        //------------Preprocessing--------------
        // Trim extra spaces on the ends
        String inputString = input.trim();
        //pre-emptively replace the quoted operators
        for(int i = 0; i < inputString.length(); i++){
            if(!quoteTermOpen && inputString.charAt(i) == '"' && (i == 0 || inputString.charAt(i-1) != '\\')){
                quoteTermOpen = !quoteTermOpen;
            }
            else if(quoteTermOpen && inputString.charAt(i) == '"' && (i == 0 || inputString.charAt(i-1) != '\\')) {
                quoteTermOpen = !quoteTermOpen;
            }
            else {
                //check if character is an operator, replace with placeholder if inside a term
                if(quoteTermOpen){
                    if("&|!".indexOf(inputString.charAt(i)) != -1){
                        if(inputString.charAt(i) == '&') inputString = inputString.substring(0, i) + "<:amp:>" + inputString.substring(i+1);
                        if(inputString.charAt(i) == '|') inputString = inputString.substring(0, i) + "<:pipe:>" + inputString.substring(i+1);
                        if(inputString.charAt(i) == '!') inputString = inputString.substring(0, i) + "<:excl:>" + inputString.substring(i+1);
                    }
                    //check for whole word all-caps AND
                    else if(inputString.substring(i).startsWith("AND")){
                        i += 2;
                    }
                    //check for whole word all-caps OR
                    else if(inputString.substring(i).startsWith("OR")){
                        i += 1;
                    }
                    //check for whole word all-caps NOT
                    else if(inputString.substring(i).startsWith("NOT")){
                        i += 2;
                    }
                }
            }
        }
        //replace all caps-only variants of operators
        inputString = inputString.replaceAll(" AND NOT ", " ! ").replaceAll(" NOT ", " ! ").replaceAll(" AND ", " & ").replaceAll(" OR ", " | ");
        //replace instances of &! with just !
        inputString = inputString.replaceAll("&!", "!").replaceAll("& !", "!");
        //check if there are no operators - if that's true, the whole text is one term.
        if(!inputString.contains("&") && !inputString.contains("|") && !inputString.contains("!") && !inputString.contains("\"")){
            return "<term>" + inputString + "</term>";
        }

        for(int i = 0; i < inputString.length(); i++){
            //iterate through characters, check for quotes that aren't escaped
            if(!quoteTermOpen && inputString.charAt(i) == '"' && (i == 0 || inputString.charAt(i-1) != '\\')){
                quoteTermOpen = !quoteTermOpen;
                resultString += "<term>";
            }
            else if(quoteTermOpen && inputString.charAt(i) == '"' && (i == 0 || inputString.charAt(i-1) != '\\')) {
                quoteTermOpen = !quoteTermOpen;
                resultString += "</term>";
            }
            else if(!quoteTermOpen && !termOpen && restrictedChars.indexOf(inputString.charAt(i)) == -1){
                resultString += "<term>" + inputString.charAt(i);
                if(i+1 == inputString.length() || restrictedChars.indexOf(inputString.charAt(i+1)) != -1){
                    resultString += "</term>";
                }
                else termOpen = !termOpen;
            }
            else if(!quoteTermOpen && termOpen && 
                    (i+1 == inputString.length() || restrictedChars.indexOf(inputString.charAt(i+1)) != -1)){
                termOpen = !termOpen;
                resultString += inputString.charAt(i) + "</term>";
            }
            else {
                resultString += inputString.charAt(i);
            }
        }

        //-----------Post-processing------------
        // Check for the following validation error flags:
        // - neighboring terms
        // - neighboring operators
        // - unclosed / missing quotes (not escaped ones)
        // - unclosed / missing parens
        // - query ambiguity

        return Search.validate(resultString);
    }

    public static String validate(String resultString){
        boolean termSwitch = false;
        int parensLevel = 0;
        boolean termActive = false;
        boolean opActive = false;
        ArrayList<String> operatorLevels = new ArrayList<String>();
        operatorLevels.add("");

        for(int i=0; i < resultString.length(); i++){
            if(resultString.charAt(i) == '<'){
                opActive = false;
                if(termSwitch == false && resultString.charAt(i+1) == '/'){
                    return "Error: There are unclosed quotes in this string; make sure all non-escaped quotes are closed.";
                }
                else if(resultString.charAt(i+1) == 't'){
                    termSwitch = true;
                    if(termSwitch && termActive){
                        return "Error: There are neighboring terms in this string; an operator should be between every term.";
                    }
                } 
                else if(resultString.charAt(i+1) == '/'){
                    termSwitch = false;
                    opActive = false;
                    termActive = true;
                }
            }
            else if(resultString.charAt(i) == '('){
                parensLevel++;
                if(operatorLevels.size() == parensLevel){
                    operatorLevels.add("");
                }
            }
            else if(resultString.charAt(i) == ')'){
                parensLevel--;
                //Unless we're in the negative...
                if(parensLevel < 0){
                    return "Error: There are unclosed parentheses in this string; make sure all parentheses are correctly closed.";
                }
                else {
                    //...then finding a ')' means we've closed the group, and we can clear the operator directly above this one
                    operatorLevels.set(parensLevel + 1, "");
                }
            }
            if("&|!".indexOf(resultString.charAt(i)) != -1){
                termActive = false;
                //If an operator is found next to another operator, this fails
                if(opActive){
                    return "Error: There are neighboring operators in this string; make sure no two operators are next to each other.";
                }
                //Ambiguous check: if an operator found on a given group level (aka, parentheses level) is a mix of AND and OR together, this fails
                //Note: ! counts as an AND-type operator (AND NOT)
                //- first, set the operator level if it hasn't been set yet
                if(operatorLevels.get(parensLevel).equals("")){
                    operatorLevels.set(parensLevel, String.valueOf(resultString.charAt(i)));
                }
                //- otherwise, if the operator found is NOT equal to the one we've already found at this level, the query is ambiguous
                else if(!operatorLevels.get(parensLevel).equals(String.valueOf(resultString.charAt(i)))) {
                    if("&!".indexOf(operatorLevels.get(parensLevel)) != -1 && "&!".indexOf(String.valueOf(resultString.charAt(i))) != -1){
                        // Do nothing, because & and ! are both AND-type ops
                    }
                    else return "Error: This query is ambiguous; each level of term grouping should have one type of operator.";
                }
                opActive = true;
            }
            if(i == resultString.length() - 1 && parensLevel > 0){
                return "Error: There are unclosed parentheses in this string; make sure all parentheses are correctly closed.";
            }
        }

        return resultString.replaceAll("<:amp:>", "&").replaceAll("<:pipe:>", "|").replaceAll("<:excl:>", "!");
    }

    public static void main(final String[] args){
        Console console = System.console();
        String input;
        boolean keepGoing = true;

        ArrayList<String> examples = new ArrayList<String>();
        examples.add("\"Research & Development\"");
        examples.add("R&D");
        examples.add("R & D");
        examples.add("O'Malley & O'Leary");
        examples.add("\"O'Malley & O'Leary's Pub\"");
        examples.add("(chocolate & peanut butter) | jelly beans");
        examples.add("(chocolate & \"peanut butter\") | \"jelly beans\"");
        examples.add("red & white & blue | patriot");
        examples.add("red white and blue | patriot");
        examples.add("https://www.url.com");
        examples.add("\"Cherry tree\" & \"Apple tree\"");
        examples.add("! cow");
        examples.add("happy & joy ! glee");
        examples.add("(truth & justice) !(lies | crime | violence) &! politics");
        examples.add("&");
        examples.add("|");
        examples.add("!");
        examples.add("a1 &a2 &a3");
        examples.add("1 AND 2 AND (3 OR 4) AND NOT 5");
        examples.add("123 NOT 456");
        examples.add("STANDARD & \"OR\" AND \"AND\"");

        while(keepGoing){
            input = console.readLine("Enter the string you want to termify (type 'examples' to show preset tests, 'quit' to quit): ");
            if(input.equalsIgnoreCase("quit")) keepGoing = false;
            else if(input.equalsIgnoreCase("examples")){
                System.out.println("===========Presets:============");
                for(int i=0; i < examples.size(); i++){
                    System.out.println("String: " + examples.get(i));
                    System.out.println("Result: " + termify(examples.get(i)));
                    if(i+1 != examples.size()) System.out.println("-------------------------------");
                }
                System.out.println("===============================");
            }
            else console.printf("Result: " + termify(input) + "\n");
        }
    }
}
