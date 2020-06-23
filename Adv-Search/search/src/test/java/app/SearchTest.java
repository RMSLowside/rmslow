package app;

import org.junit.Test;
import static org.junit.Assert.*;

/**
 * Unit test for simple App.
 */
public class SearchTest {

    @Test
    public void testBasicTermify(){
        String input = "test string";
        String expected = "<term>test string</term>";
        assertEquals(expected, Search.termify(input));
    }

    @Test
    public void testSimpleOperator(){
        String input = "Hall & Oates";
        String expected = "<term>Hall</term> & <term>Oates</term>";
        assertEquals(expected, Search.termify(input));
    }

    @Test
    public void testQuotedString(){
        String input = "\"Hall & Oates\"";
        String expected = "<term>Hall & Oates</term>";
        assertEquals(expected, Search.termify(input));
    }

    @Test
    public void testComplexQuery(){
        String input = "object & (\"verbs & stuff\" | things)";
        String expected = "<term>object</term> & (<term>verbs & stuff</term> | <term>things</term>)";
        assertEquals(expected, Search.termify(input));
    }

    @Test
    public void testComplexQueryWithEscapedQuotes(){
        String input = "stuff | things | \"stuff \\\"&\\\" things\"";
        String expected = "<term>stuff</term> | <term>things</term> | <term>stuff \\\"&\\\" things</term>";
        assertEquals(expected, Search.termify(input));
    }

    @Test
    public void testSingleCharacterWords(){
        String input = "R & D";
        String expected = "<term>R</term> & <term>D</term>";
        assertEquals(expected, Search.termify(input));
    }

    @Test
    public void testCloseOps(){
        String input = "R&D";
        String expected = "<term>R</term>&<term>D</term>";
        assertEquals(expected, Search.termify(input));
    }

    @Test
    public void testMultiquote(){
        String input = "\"Cherry Tree\" & \"Apple tree\"";
        String expected = "<term>Cherry Tree</term> & <term>Apple tree</term>";
        assertEquals(expected, Search.termify(input));
    }

    @Test
    public void testJustAnOperator(){
        String input = "&";
        String expected = "&";
        assertEquals(expected, Search.termify(input));
    }

    @Test
    public void testOperatorAndText(){
        String input = "! cow";
        String expected = "! <term>cow</term>";
        assertEquals(expected, Search.termify(input));
    }

    @Test
    public void testNeighboringTerms(){
        String input = "peanut butter & jelly";
        String expected = "Error: There are neighboring terms in this string; an operator should be between every term.";
        assertEquals(expected, Search.termify(input));
    }

    @Test
    public void testNeighboringOperators(){
        String input = "peanut & butter & | jelly";
        String expected = "Error: There are neighboring operators in this string; make sure no two operators are next to each other.";
        assertEquals(expected, Search.termify(input));
    }

    @Test
    public void testUnclosedQuotes(){
        String input = "toast\"";
        String expected = "Error: There are unclosed quotes in this string; make sure all non-escaped quotes are closed.";
        assertEquals(expected, Search.termify(input));
    }

    @Test
    public void testUnclosedParentheses1(){
        String input = "(peanut | butter | jelly";
        String expected = "Error: There are unclosed parentheses in this string; make sure all parentheses are correctly closed.";
        assertEquals(expected, Search.termify(input));
    }

    @Test
    public void testUnclosedParentheses2(){
        String input = "(peanut & butter)) | jelly";
        String expected = "Error: There are unclosed parentheses in this string; make sure all parentheses are correctly closed.";
        assertEquals(expected, Search.termify(input));
    }

    @Test
    public void testAmbiguousQuery(){
        String input = "peanut | butter & jelly";
        String expected = "Error: This query is ambiguous; each level of term grouping should have one type of operator.";
        assertEquals(expected, Search.termify(input));
    }

    @Test
    public void testQueryWithTwoOperatorsAtSameLevelButInDifferentPlaces(){
        String input = "((a & b) | (c | d))";
        String expected = "((<term>a</term> & <term>b</term>) | (<term>c</term> | <term>d</term>))";
        assertEquals(expected, Search.termify(input));
    }

    @Test
    public void testOperatorVariants(){
        String input = "term1 AND term2";
        String expected = "<term>term1</term> & <term>term2</term>";
        assertEquals(expected, Search.termify(input));
    }

    @Test
    public void testMixAndMatch(){
        String input = "a & b AND c&(d | e OR f) AND NOT g";
        String expected = "<term>a</term> & <term>b</term> & <term>c</term>&(<term>d</term> | <term>e</term> | <term>f</term>) ! <term>g</term>";
        assertEquals(expected, Search.termify(input));
    }

    @Test
    public void testEmbeddedOperatorsInStrings(){
        String input = "STANDARD & \"What if I wanna type AND, OR, and NOT, huh!?\"";
        String expected = "<term>STANDARD</term> & <term>What if I wanna type AND<:comma:> OR<:comma:> and NOT<:comma:> huh!?</term>";
        assertEquals(expected, Search.termify(input));
    }

    @Test
    public void testQuotedFullTextOps() {
        String input = "STANDARD & \"OR\" AND \"AND\"";
        String expected = "<term>STANDARD</term> & <term>OR</term> & <term>AND</term>";
        assertEquals(expected, Search.termify(input));
    }

    @Test
    public void testWithin() {
        String input = "(some, example) WITHIN 5";
        String expected = "[5W(<term>some</term>, <term>example</term>)]";
        assertEquals(expected, Search.termify(input));
    }

    @Test
    public void testOrdered() {
        String input = "(some, example) ORDERED 10";
        String expected = "[10O(<term>some</term>, <term>example</term>)]";
        assertEquals(expected, Search.termify(input));
    }

    @Test
    public void testBetween() {
        String input = "thing BETWEEN (a, b)";
        String expected = "[<term>thing</term>]B[<term>a</term>, <term>b</term>]";
        assertEquals(expected, Search.termify(input));
    }

    @Test
    public void testMultiBetween() {
        String input = "(thing1, thing2) BETWEEN (a, b)";
        String expected = "[<term>thing1</term>, <term>thing2</term>]B[<term>a</term>, <term>b</term>]";
        assertEquals(expected, Search.termify(input));
    }

    @Test
    public void testMultiOrBetween() {
        String input = "(cat OR Kitten) BETWEEN (tuna, fish)";
        String expected = "[<term>cat</term> | <term>Kitten</term>]B[<term>tuna</term>, <term>fish</term>]";
        assertEquals(expected, Search.termify(input));
    }

    @Test
    public void testNestedProx() {
        String input = "((dog, cat) WITHIN 5, mouse) ORDERED 10";
        String expected = "[10O[5W((<term>dog</term>, <term>cat</term>)], <term>mouse</term>)]";
        assertEquals(expected, Search.termify(input));
    }

    @Test
    public void testSentenceKeyword() {
        String input = "(a, b) WITHIN SENTENCE";
        String expected = "[SW(<term>a</term>, <term>b</term>)]";
        assertEquals(expected, Search.termify(input));
    }

    @Test
    public void testParagraphKeyword() {
        String input = "(c, d) WITHIN PARAGRAPH";
        String expected = "[PW(<term>c</term>, <term>d</term>)]";
        assertEquals(expected, Search.termify(input));
    }

    @Test
    public void testLargerNestedProx() {
        String input = "(((Dublin, Kilkenny, Cork, Kerry) WITHIN 10), ((tour, tourism, tourist) WITHIN 5) WITHIN PARAGRAPH)";
        String expected = "[PW([10W((<term>Dublin</term>, <term>Kilkenny</term>, <term>Cork</term>, <term>Kerry</term>)]), [5W((<term>tour</term>, <term>tourism</term>, <term>tourist</term>)])])";
        assertEquals(expected, Search.termify(input));
    }

}
