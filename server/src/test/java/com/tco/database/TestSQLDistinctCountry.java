import com.tco.database.SQLDistinctCountry;

import java.util.ArrayList;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestSQLDistinctCountry {
    @Test
    @DisplayName("returns an empty string on empty Where")
    public void testEmptyWhere(){
        ArrayList<String> where = new ArrayList<>();
        String result = SQLDistinctCountry.matchWhere(where);
        assertTrue(result.equals(""));
    }

    @Test
    @DisplayName("returns correct clauses on where")
    public void testWhere(){
        ArrayList<String> where = new ArrayList<>();
        where.add("Canada");
        where.add("Mexico");
        String result = SQLDistinctCountry.matchWhere(where);
        assertEquals("AND (country.name LIKE '%Canada%' OR country.name LIKE '%Mexico%' )", result);
    }
}
