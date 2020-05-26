This is a small Maven project to work out how termifying strings without requiring quotes or the ::: prefix would work.

Using the JAR file for testing:
====================================
Inside this folder, there is a copy of the generated jar, for use with testing out different strings. This program will take a string as input, and return where it thinks the term boundaries are by encasing each term in tags (<term>...</term>).

To use this jar:
(This assumes you have Java installed.)
- navigate to this folder in a cmd prompt / terminal (.../rmslow/Adv-Search/search)
- run the following command: "java -cp search-1.0-SNAPSHOT.jar app.Search"

The program will prompt you for an input string. Type a sample input, and press Enter; the program will return the termified version of the input. 
This process repeats until you submit "quit" as the input (or force-quit, e.g. Ctrl+C). You can also type "examples" to show a list of hard-coded test strings.

Key concepts:
- & | ! are single-character versions of AND, OR, NOT (ignored if inside a term)
- You can also use AND / OR / NOT; they are converted to & | ! respectively
- support for ANY / ALL operators (field ANY (a,b,c) --> field = (a OR b OR c); field ALL (d,e,f) --> field = (d AND e AND f))
- There are validator checks against the following:
    - neighboring terms, and neighboring operators
    - unclosed quotes, and unclosed parentheses
    - ambiguous queries

Notes on proximity searches:
====================================
I know that for the original cut of adv. search, I looked into full-text searching in MySQL (which is one of the ways to deal with proximity). At the time, I hit some snags with implementing it that I don't presently remember; those notes are in OneNote back at the office, but if push comes to shove here I think I can do a more simplistic version of some of the proximity operators:
(a, b) WITHIN # --> (a%b OR b%a)
(a, b) ORDERED # --> a%b
a BETWEEN (b,c) --> b%a%c

Notes on SOLR: 
====================================
In talking with people and browsing Apache’s public github for SOLR, I found a few pieces of SOLR's source code dealing with Query Parsers to analyze.

Their methods are a bit different than the direction I went initially but it accomplishes the processing just as well; this parser seems to have several variables to keep track of current and next tokens, as well as the type of token it is (here, a token is a particular piece of the query string), and then “consumes” the tokens to advance where the parser is in the string; whereas, I move through the string on a character-by-character basis and modify the string itself with markups to show my processor’s interpretation of the string. If I wanted to formalize the process of tokenizing the query strings into object form, or if I had a need to keep track of multiple things about a token at once, this is certainly one way to do it.

These parsers handle a lot! There are many formats / operators I don’t support, though some of them are pretty cool. There’s a slew of different types of tokens it attempts to break down, from simple logic operators and quotes to wildcards (specifically * and ?, though not the other 3), local parameters and filters, prefixes, and more. You can see giant switch statements everywhere to try and catch each of the types in each scenario - again highlighting a slightly different (but essentially equivalent) method of looking at where to break out the logic for different types of keywords and operators.

Overall opinion: while there is some neat structural stuff in this code, the syntax of the query language we’re supporting only covers so much, most of which is fairly straightforward, and even a few operators that I don’t see in the SOLR code verbatim. (e.g.: ANY, ALL, and <>, though all of these have analogs in the form of AND/OR prefixes and likely a looser NOT implementation, plus specific keywords for proximity versus SOLR’s prefix syntax for ordered/unordered proximity). Making a true tokenizer in the aforementioned fashion might be something to look at if parsing begins to be more complicated - or, if more information needs to be extracted about a single token. I haven’t seen anything too revelatory otherwise that jumped out at me - however, knowing where these things are is a good thing for future reference. There are some cool ideas, though I’m not sure they’re necessary to implement at this point in time - especially considering, I do not have to convert this string into a series of objects, nor a JSON object, for the backend. I’m simply converting one string (the search query) into another string (the MySQL query).

Building and running this project:
====================================
(This assumes you have Maven installed.)
Navigate to rmslow/Adv-Search/search and run 'mvn package'.
Once this has completed, you should have the target/ folder - inside you'll find the generated jar file, which should be the same as what is used above.
