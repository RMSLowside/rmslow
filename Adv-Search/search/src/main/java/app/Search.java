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
        if(!inputString.contains("&") && !inputString.contains("|") && !inputString.contains("!") && !inputString.contains("\"") &&
           !inputString.contains("BETWEEN") && !inputString.contains("ORDERED") && !inputString.contains("WITHIN")){
            return "<term>" + inputString + "</term>";
        }

        //2nd Pass: identifies individual terms
        for(int i = 0; i < inputString.length(); i++){
            //skip over proximity operators since they aren't terms
            if(inputString.substring(i).startsWith("BETWEEN")){
                resultString += "BETWEEN";
                i+=6;
            }
            else if(inputString.substring(i).startsWith("ORDERED")){
                resultString += "ORDERED";
                i+=6;
            }
            else if(inputString.substring(i).startsWith("WITHIN")){
                resultString += "WITHIN";
                i+=5;
            }
            //iterate through characters, check for quotes that aren't escaped
            else if(!quoteTermOpen && inputString.charAt(i) == '"' && (i == 0 || inputString.charAt(i-1) != '\\')){
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

        //Check for field equals
        Pattern fieldPattern = Pattern.compile("<term>([^<]*)</term> =");
        Matcher fieldMatcher = fieldPattern.matcher(resultString);

        while(fieldMatcher.find()){
            int index = resultString.indexOf(fieldMatcher.group(0));
            String field = "<field>" + fieldMatcher.group(1) + "</field> =";
            resultString = resultString.substring(0, index) + field + resultString.substring(index + fieldMatcher.group(0).length());
            fieldMatcher = fieldPattern.matcher(resultString);
        }

        //Convert string into object notation
        // ArrayList<Term> objectifiedInputList = new ArrayList<Term>();
        // int parensDepth = 0;


        resultString = Search.resolveProximity(resultString);

        //-----------Validation------------
        // Check for the following validation error flags:
        // - neighboring terms
        // - neighboring operators
        // - unclosed / missing quotes (not escaped ones)
        // - unclosed / missing parens
        // - query ambiguity
        return Search.validate(resultString);
    }

    public static String resolveProximity(String input){
        String resultString = input;

        while(resultString.contains(" BETWEEN (") || resultString.contains(") WITHIN ") || resultString.contains(") ORDERED ")){
            if(resultString.contains(" BETWEEN (")) resultString = Search.convertBetween2(resultString);
            if(resultString.contains(") WITHIN ")) resultString = Search.convertWithin2(resultString);
            if(resultString.contains(") ORDERED ")) resultString = Search.convertOrdered2(resultString);
        }

        return resultString;
    }

    public static String convertWithin2(String input){
        int startPrefix = 0;
        int endPrefix = input.indexOf(") WITHIN ");
        int backtrackParensCount = 1;
        String truncated = input.substring(endPrefix + ") WITHIN <term>".length());
        String limit = truncated.substring(0, truncated.indexOf("</term>"));
        if(limit.equals("SENTENCE")) limit = "S";
        else if(limit.equals("PARAGRAPH")) limit = "P";
        int endIndex = endPrefix + ") WITHIN <term>".length() + (limit + "</term>").length();

        for(int currentIndex = endPrefix; backtrackParensCount > 0 && currentIndex >= 0; currentIndex--){
            if(input.charAt(currentIndex) == '(') {
                backtrackParensCount--;
                if(backtrackParensCount == 0) startPrefix = currentIndex;
            }
            else if(input.charAt(currentIndex) == ')') backtrackParensCount++;
            // else if(currentIndex == 0 && backtrackParensCount > 0){
            //     return "Error: WITHIN clause parens are not closed correctly";
            // }
        }
        if(limit.equals("S")) endIndex += 7;
        if(limit.equals("P")) endIndex += 8;
        String resultString = input.substring(0, startPrefix) + "[" + limit + "W" + input.substring(startPrefix, endPrefix) + ")]" + input.substring(endIndex);
        return resultString;
    }

    public static String convertOrdered2(String input){
        int startPrefix = 0;
        int endPrefix = input.indexOf(") ORDERED ");
        int backtrackParensCount = 1;
        String truncated = input.substring(endPrefix + ") ORDERED <term>".length());
        String limit = truncated.substring(0, truncated.indexOf("</term>"));
        if(limit.equals("SENTENCE")) limit = "S";
        else if(limit.equals("PARAGRAPH")) limit = "P";
        int endIndex = endPrefix + ") ORDERED <term>".length() + (limit + "</term>").length();

        for(int currentIndex = endPrefix; backtrackParensCount > 0 && currentIndex >= 0; currentIndex--){
            if(input.charAt(currentIndex) == '(') {
                backtrackParensCount--;
                if(backtrackParensCount == 0) startPrefix = currentIndex;
            }
            else if(input.charAt(currentIndex) == ')') backtrackParensCount++;
            // else if(currentIndex == 0 && backtrackParensCount > 0){
            //     return "Error: ORDERED clause parens are not closed correctly";
            // }
        }

        String resultString = input.substring(0, startPrefix) + "[" + limit + "O" + input.substring(startPrefix, endPrefix) + ")]" + input.substring(endIndex);
        return resultString;
    }

    public static String convertBetween2(String input){
        int startPrefix = 0;
        int endPrefix = input.indexOf(" BETWEEN ");
        boolean isSimple = false;

        if(input.charAt(endPrefix-1) == ')'){
            int backtrackParensCount = 1;

            for(int currentIndex = endPrefix; backtrackParensCount > 0 && currentIndex >= 0; currentIndex--){
                if(input.charAt(currentIndex) == '(') {
                    backtrackParensCount--;
                    if(backtrackParensCount == 0) startPrefix = currentIndex;
                }
                else if(input.charAt(currentIndex) == ')') backtrackParensCount++;
                // else if(currentIndex == 0 && backtrackParensCount > 0){
                //     return "Error: BETWEEN prefix parens are not closed correctly";
                // }
            }
        }
        else if(input.charAt(endPrefix-1) == '>') {
            boolean isTerm = true;
            isSimple = true;
            startPrefix = endPrefix-1;
            while(isTerm){
                if(input.substring(startPrefix, startPrefix + "<term>".length()).equals("<term>")) isTerm = false;
                else startPrefix--;
            }
        }

        int startSuffix = endPrefix + " BETWEEN (".length();
        int endSuffix = input.length() - 1;
        int forwardParensCount = 1;

        for(int currentIndex = startSuffix; forwardParensCount > 0 && currentIndex < input.length(); currentIndex++){
            if(input.charAt(currentIndex) == '(') forwardParensCount++;
            else if(input.charAt(currentIndex) == ')'){
                forwardParensCount--;
                if(forwardParensCount == 0) endSuffix = currentIndex-1;
            }
            // else if(currentIndex == 0 && forwardParensCount > 0){
            //     return "Error: BETWEEN suffix parens are not closed correctly";
            // }
        }
        if(isSimple) {
            String resultString = input.substring(0, startPrefix) + "[" +
                                input.substring(startPrefix, endPrefix) + "]B[" +
                                input.substring(startSuffix, endSuffix+1) + "]" +
                                input.substring(endSuffix+2);
            return resultString;
        }
        else {
            String resultString = input.substring(0, startPrefix) + "[" +
                                input.substring(startPrefix+1, endPrefix-1) + "]B[" +
                                input.substring(startSuffix, endSuffix+1) + "]" +
                                input.substring(endSuffix+2);
            return resultString;
        }
    }

    public static String validate(String resultString){
        System.out.println("DEBUG: " + resultString);
        boolean termSwitch = false;
        int parensLevel = 0;
        boolean termActive = false;
        boolean opActive = false;
        ArrayList<String> operatorLevels = new ArrayList<String>();
        operatorLevels.add("");

        //For clarity:
        // termSwitch = we are either inside a term or we're not
        // opActive = was the last substring an operator?
        // termActive = was the last substring a term?

        for(int i=0; i < resultString.length(); i++){
            if(resultString.charAt(i) == '<' && resultString.charAt(i+1) != '>'){
                opActive = false;
                if(termSwitch == false && resultString.charAt(i+1) == '/'){
                    return "Error: There are unclosed quotes in this string; make sure all non-escaped quotes are closed.";
                }
                else if(resultString.charAt(i+1) == 't' || resultString.charAt(i+1) == 'f'){
                    termSwitch = true;
                    if(termSwitch && termActive){
                        System.out.println("Error on this char: " + resultString.substring(0, i-1) + "[[" + resultString.charAt(i) + "]]" + resultString.substring(i+1));
                        return "Error: There are neighboring terms in this string; an operator should be between every term.";
                    }
                }
                else if(resultString.charAt(i+1) == '/'){
                    termSwitch = false;
                    opActive = false;
                    termActive = true;
                }
            }
            else if(i != resultString.length()-1 && (
                    resultString.substring(i, i+1) == "<>" ||
                    resultString.substring(i, i+1) == "<=" ||
                    resultString.substring(i, i+1) == ">=")){
                if(opActive){
                    return "Error: There are neighboring operators in this string; make sure no two operators are next to each other.";
                }
                opActive = true;
                i++;
            }
            //check for Between operator
            else if(resultString.charAt(i) == 'B' && resultString.charAt(i+1) == '['){
                opActive = true;
                termActive = false;
            }
            else if(resultString.charAt(i) == ','){
                // do nothing
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
                    if("&!=".indexOf(operatorLevels.get(parensLevel)) != -1 && "&!=".indexOf(String.valueOf(resultString.charAt(i))) != -1){
                        // Do nothing, because & and ! are both AND-type ops, and neither = nor , are real operator shifts in this way
                    }
                    else if(operatorLevels.get(parensLevel) == "," || resultString.charAt(i) == ',') {
                        //Again, do nothing (commas)
                    }
                    else {
                        System.out.println("op1: " + operatorLevels.get(parensLevel) + ", op2: " + resultString.charAt(i));
                        return "Error: This query is ambiguous; each level of term grouping should have one type of operator.";
                    }
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
        //proximity checks
        examples2.add("(some, example) WITHIN 5");
        examples2.add("(some, example) ORDERED 10");
        examples2.add("thing BETWEEN (a, b)");
        examples2.add("(thing1, thing2) BETWEEN (a, b)");
        examples2.add("(cat OR Kitten) BETWEEN (tuna, fish)");
        examples2.add("((dog, cat) WITHIN 5, mouse) ORDERED 10");
        examples2.add("(a, b) WITHIN SENTENCE");
        examples2.add("(c, d) WITHIN PARAGRAPH");
        examples2.add("(((Dublin, Kilkenny, Cork, Kerry) WITHIN 10), ((tour, tourism, tourist) WITHIN 5) WITHIN PARAGRAPH)");

        while(keepGoing){
            input = console.readLine("Enter the string you want to termify (type 'examples' or 'e2' for presets, 'quit' to quit): ");
            if(input.equalsIgnoreCase("quit")) keepGoing = false;
            else if(input.equalsIgnoreCase("examples")){
                System.out.println("===========Presets:============");
                for(int i=0; i < examples.size(); i++){
                    System.out.println("String: " + examples.get(i).replaceAll("%", "%%"));
                    System.out.println("Result: " + termify(examples.get(i)).replaceAll("%", "%%"));
                    if(i+1 != examples.size()) System.out.println("-------------------------------");
                }
                System.out.println("===============================");
            }
            else if(input.equalsIgnoreCase("e2")){
                System.out.println("===========Presets:============");
                for(int i=0; i < examples2.size(); i++){
                    System.out.println("String: " + examples2.get(i).replaceAll("%", "%%"));
                    System.out.println("Result: " + termify(examples2.get(i)).replaceAll("%", "%%"));
                    if(i+1 != examples2.size()) System.out.println("-------------------------------");
                }
                System.out.println("===============================");
            }
            else console.printf("Result: " + termify(input).replaceAll("%", "%%") + "\n");
        }
    }
}
