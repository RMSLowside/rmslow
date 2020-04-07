package app;

import java.io.Console;

public class Search {

    public static String termify(final String inputString){
        String resultString = "";
        boolean termOpen = false;
        boolean quoteTermOpen = false;

        //first check if there are no operators - if that's true, the whole text is one term.
        if(!inputString.contains(" & ") && !inputString.contains(" | ") && !inputString.contains(" ! ")){
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
            else if(!quoteTermOpen && !termOpen && "&|!() ".indexOf(inputString.charAt(i)) == -1){
                termOpen = !termOpen;
                resultString += "<term>" + inputString.charAt(i);
            }
            else if(!quoteTermOpen && termOpen && (i+1 == inputString.length() || ") ".indexOf(inputString.charAt(i+1)) != -1)){
                termOpen = !termOpen;
                resultString += inputString.charAt(i) + "</term>";
            }
            else {
                //check if character is an operator, replace with placeholder if inside a term
                if((quoteTermOpen || termOpen) && "&|!".indexOf(inputString.charAt(i)) != -1){
                    if(inputString.charAt(i) == '&') resultString += "<:amp:>";   //I believe this part already happens in the real thing, mid-processing
                    if(inputString.charAt(i) == '|') resultString += "<:pipe:>";
                    if(inputString.charAt(i) == '!') resultString += "<:excl:>";
                }
                else {
                    resultString += inputString.charAt(i);
                }
            }
        }

        return resultString;
    }

    public static void main(final String[] args){
        Console console = System.console();
        String input;
        boolean keepGoing = true;
        while(keepGoing){
            input = console.readLine("Enter the string you want to termify (type 'quit' to quit): ");
            if(input.equalsIgnoreCase("quit")) keepGoing = false;
            else console.printf("Result: " + termify(input) + "\n");
        }
    }
}
