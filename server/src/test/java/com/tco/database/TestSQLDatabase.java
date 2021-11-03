import com.tco.database.SQLDatabase;

import java.util.ArrayList;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestSQLDatabase {
    @Test
    @DisplayName("findQuery")
    public void testfindQuery(){
        ArrayList<String> type = new ArrayList<>();
        SQLDatabase.findQuery("",1,type);
        assertTrue(SQLDatabase.findQuery("",1,type).size() == 1);
    }

    @Test
    @DisplayName("countQuery")
    public void countQuery(){
        ArrayList<String> type = new ArrayList<>();
        assertTrue(SQLDatabase.countQuery("",type) >= 1);
    }


}
