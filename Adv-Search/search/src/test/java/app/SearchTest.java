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
        String expected = "<term>Hall <:amp:> Oates</term>";
        assertEquals(expected, Search.termify(input));
    }

    @Test
    public void testComplexQuery(){
        String input = "object & (\"verbs & stuff\" | things)";
        String expected = "<term>object</term> & (<term>verbs <:amp:> stuff</term> | <term>things</term>)";
        assertEquals(expected, Search.termify(input));
    }

    @Test
    public void testComplexQueryWithEscapedQuotes(){
        String input = "stuff | things | \"stuff \\\"&\\\" things\"";
        String expected = "<term>stuff</term> | <term>things</term> | <term>stuff \\\"<:amp:>\\\" things</term>";
        assertEquals(expected, Search.termify(input));
    }
}
