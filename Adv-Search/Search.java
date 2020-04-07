public class Search {

    public static String termify(final String inputString){
        String resultString = "";
        boolean termOpen = false;
        boolean quoteTermOpen = false;

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
            else if(!quoteTermOpen && !termOpen && "&|!( ".indexOf(inputString.charAt(i)) == -1){
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

        //Strat 1: if there are no unescaped quotes and no logical operators used at this point, add <term>...</term>

        return resultString;
    }

    public static void main(final String[] args){
        final String test1 = "sample search";
        final String test2 = "\"Hall & Oates\"";   // Here's one of the problem children, searching on a string with a logical operator in it. Enforcing quotes.
        final String test3 = "object & (\"verbs & stuff\" | things)";
        final String test4 = "stuff | things | \"stuff \\\"&\\\" things\"";
        System.out.println("=============================");
        System.out.println("test1:  " + test1);
        System.out.println("result: " + termify(test1));
        System.out.println();
        System.out.println("test2:  " + test2);
        System.out.println("result: " + termify(test2));
        System.out.println();
        System.out.println("test3:  " + test3);
        System.out.println("result: " + termify(test3));
        System.out.println();
        System.out.println("test4:  " + test4);
        System.out.println("result: " + termify(test4));
        System.out.println("=============================");
    }
}