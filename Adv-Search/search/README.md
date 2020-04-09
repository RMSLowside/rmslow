This is a small Maven project to work out how termifying strings without requiring quotes or the ::: prefix would work.

Using the JAR file for testing:
====================================
Inside this folder, there is a copy of the generated jar, for use with testing out different strings. This program will take a string as input, and return where it thinks the term boundaries are by encasing each term in tags (<term>...</term>).

To use this jar:
(This assumes you have Java installed.)
- navigate to this folder in a cmd prompt / terminal (.../rmslow/Adv-Search/search)
- run the following command: "java -cp search-1.0-SNAPSHOT.jar app.Search"
- the program will prompt you for an input string. Type a sample input, and press Enter; the program will return the termified version of the input. 
This process repeats until you submit "quit" as the input (or force-quit, e.g. Ctrl+C).

Building and running this project:
====================================
(This assumes you have Maven installed.)
Navigate to rmslow/Adv-Search/search and run 'mvn package'.
Once this has completed, you should have the target/ folder - inside you'll find the generated jar file, which should be the same as what is used above.
