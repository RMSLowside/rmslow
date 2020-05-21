package app;

import java.io.Console;
import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Search {

    public static String termify(final String input){
        String resultString = "";
        String restrictedChars = "&|!()=, ";
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
                //Quote escape: check if character is an reserved operator/keyword, replace with placeholder if inside quotes
                if(quoteTermOpen && (i == inputString.length() - 1 || inputString.charAt(i+1) != ':') && (i == 0 || inputString.charAt(i-1) != ':')){
                    //Single char ops not used in double char ops
                    if("&|!,".indexOf(inputString.charAt(i)) != -1){
                        if(inputString.charAt(i) == '&') inputString = inputString.substring(0, i) + "<:amp:>" + inputString.substring(i+1);
                        if(inputString.charAt(i) == '|') inputString = inputString.substring(0, i) + "<:pipe:>" + inputString.substring(i+1);
                        if(inputString.charAt(i) == '!') inputString = inputString.substring(0, i) + "<:excl:>" + inputString.substring(i+1);
                        if(inputString.charAt(i) == ',') inputString = inputString.substring(0, i) + "<:comma:>" + inputString.substring(i+1);
                    }
                    else if(inputString.substring(i).startsWith("<>")) inputString = inputString.substring(0,i) + "<:lg:>" + inputString.substring(i+2);
                    else if(inputString.substring(i).startsWith("<=")) inputString = inputString.substring(0,i) + "<:le:>" + inputString.substring(i+2);
                    else if(inputString.substring(i).startsWith(">=")) inputString = inputString.substring(0,i) + "<:ge:>" + inputString.substring(i+2);
                    else if(inputString.substring(i).startsWith("<")) inputString = inputString.substring(0,i) + "<:lt:>" + inputString.substring(i+1);
                    else if(inputString.substring(i).startsWith(">")) inputString = inputString.substring(0,i) + "<:gt:>" + inputString.substring(i+1);
                    else if(inputString.substring(i).startsWith("=")) inputString = inputString.substring(0,i) + "<:eq:>" + inputString.substring(i+1);
                }
            }
        }

        //using a regex to extract and deal with ANY/ALL expressions
        String patternAll = " ALL\\s?(\\([^\\)]*\\))";
        String patternAny = " ANY\\s?(\\([^\\)]*\\))";
        Pattern all = Pattern.compile(patternAll);
        Pattern any = Pattern.compile(patternAny);
        Matcher matchAll = all.matcher(inputString);
        Matcher matchAny = any.matcher(inputString);
        while(matchAll.find()){
            String commaTerms = matchAll.group(1).replaceAll(",", " AND ");
            String replacement = " = " + commaTerms;
            int index = inputString.indexOf(matchAll.group(0));
            inputString = inputString.substring(0, index) + replacement + inputString.substring(index + matchAll.group(0).length());
            matchAll = all.matcher(inputString);
        }
        while(matchAny.find()){
            String commaTerms = matchAny.group(1).replaceAll(",", " OR ");
            String replacement = " = " + commaTerms;
            int index = inputString.indexOf(matchAny.group(0));
            inputString = inputString.substring(0, index) + replacement + inputString.substring(index + matchAny.group(0).length());
            matchAny = any.matcher(inputString);
        }
        //replace double equal with single equal (they are equivalent, but I map = to an operator)
        inputString = inputString.replaceAll("==", "=");
        //text-wildcard replacement
        inputString = inputString.replaceAll("\\\\\\*", "<:star:>")
                   .replaceAll("\\\\\\?", "<:ques:>")
                   .replaceAll("\\\\_", "<:under:>")
                   .replaceAll("\\\\@", "<:at:>")
                   .replaceAll("\\\\#", "<:hash:>");
        //replace all caps-only variants of operators
        inputString = inputString.replaceAll(" AND NOT ", " ! ").replaceAll(" NOT ", " ! ").replaceAll(" AND ", " & ").replaceAll(" OR ", " | ");
        //replace instances of &! with just !
        inputString = inputString.replaceAll("&!", "!").replaceAll("& !", "!").replaceAll("AND!", "!").replaceAll("&NOT", "!")
            .replaceAll("AND !", "!").replaceAll("& NOT", "!");
        //Finally, check if there are no operators - if that's true, the whole text is one term.
        if(!inputString.contains("&") && !inputString.contains("|") && !inputString.contains("!") && !inputString.contains("\"")){
            return "<term>" + inputString + "</term>";
        }

        //2nd Pass: identifies individual terms
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

        //-----------Validation------------
        // Check for the following validation error flags:
        // - neighboring terms
        // - neighboring operators
        // - unclosed / missing quotes (not escaped ones)
        // - unclosed / missing parens
        // - query ambiguity
        System.out.println("DEBUG: " + resultString);
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
            if("&|!=,".indexOf(resultString.charAt(i)) != -1){
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
                    if("&!=,".indexOf(operatorLevels.get(parensLevel)) != -1 && "&!=,".indexOf(String.valueOf(resultString.charAt(i))) != -1){
                        // Do nothing, because & and ! are both AND-type ops, and neither = nor , are real operator shifts in this way
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

        ArrayList<String> examples2 = new ArrayList<String>();
        examples2.add("wild*?_@#");
        examples2.add("wild\\*\\?\\_\\@\\#");
        examples2.add("\"more key-op tests <> <= >= == > < =\"");
        examples2.add("\"close-knit key-op tests =<><=>===><\"");
        examples2.add("field ANY (1,2,3)");
        examples2.add("field ALL (a,b,c)");
        examples2.add("test ALL (a,b) AND test2 ANY (c,d)");
        //proximity checks:
        examples2.add("(dog, cat) WITHIN 5");
        examples2.add("(dog, cat) ORDERED 5");
        examples2.add("s BETWEEN (u, a)");
        examples2.add("(cat OR Kitten) BETWEEN (tuna, fish)");
        examples2.add("((dog, cat) WITHIN 5, mouse) ORDERED 10");

        while(keepGoing){
            input = console.readLine("Enter the string you want to termify (type 'examples' or 'e2' for presets, 'quit' to quit): ");
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
            else if(input.equalsIgnoreCase("e2")){
                System.out.println("===========Presets:============");
                for(int i=0; i < examples2.size(); i++){
                    System.out.println("String: " + examples2.get(i));
                    System.out.println("Result: " + termify(examples2.get(i)));
                    if(i+1 != examples2.size()) System.out.println("-------------------------------");
                }
                System.out.println("===============================");
            }
            else console.printf("Result: " + termify(input) + "\n");
        }
    }
}
