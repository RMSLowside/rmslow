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
                if((quoteTermOpen) && "&|!".indexOf(inputString.charAt(i)) != -1){
                    if(inputString.charAt(i) == '&') inputString = inputString.substring(0, i) + "<:amp:>" + inputString.substring(i+1);
                    if(inputString.charAt(i) == '|') inputString = inputString.substring(0, i) + "<:pipe:>" + inputString.substring(i+1);
                    if(inputString.charAt(i) == '!') inputString = inputString.substring(0, i) + "<:excl:>" + inputString.substring(i+1);
                }
            }
        }

        //first check if there are no operators - if that's true, the whole text is one term.
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
                // termOpen = !termOpen;
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

        return resultString;
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
