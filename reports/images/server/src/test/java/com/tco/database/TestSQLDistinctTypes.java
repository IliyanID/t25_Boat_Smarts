import com.tco.database.SQLDistinctTypes;

import java.util.ArrayList;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestSQLDistinctTypes {
    @Test
    @DisplayName("Test Empty Type")
    public void testEmptyType(){
        ArrayList<String> type = new ArrayList<>();
        String result = SQLDistinctTypes.matchType(type);
        assertTrue(result.equals(""));
    }

    @Test
    @DisplayName("Test All Types")
    public void testAllTypes(){
        ArrayList<String> type = new ArrayList<>();
        type.add("other");
        type.add("airport");
        type.add("heliport");
        type.add("balloonport");
        String result = SQLDistinctTypes.matchType(type);
        assertTrue(result.equals(""));
    }

    @Test
    @DisplayName("Test Other Type")
    public void testOtherType(){
        ArrayList<String> type = new ArrayList<>();
        type.add("other");
        String result = SQLDistinctTypes.matchType(type);
        String expected = "AND !(world.type LIKE '%airport%') AND !(world.type LIKE '%balloonport%') AND !(world.type LIKE '%heliport%') ";
        assertTrue(result.equals(expected));
    }

    @Test
    @DisplayName("Test airport Type")
    public void testAirportType(){
        ArrayList<String> type = new ArrayList<>();
        type.add("airport");
        String result = SQLDistinctTypes.matchType(type);
        String expected = "AND ( world.type LIKE '%airport%')";
        assertTrue(result.equals(expected));
    }
}
