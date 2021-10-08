import com.tco.misc.DistanceCalculator;
import com.tco.database.SQLDatabase;

import java.util.HashMap;
import java.util.ArrayList;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestDistanceCalculator {

    private static final int EARTH_RADIUS = 3959;

    private SQLDatabase.Place makePlace(String latitude, String longitude){
        SQLDatabase.Place place = new SQLDatabase.Place();
    	place.put("latitude", latitude);
    	place.put("longitude", longitude);
        return place;
    }

    @Test
    @DisplayName("calculate on an null places array should return an empty list")
    public void testDistanceNull(){
        SQLDatabase.Places p1 = null;
        ArrayList<Long> distances = DistanceCalculator.calculate(p1, EARTH_RADIUS);
        assertTrue(distances.isEmpty());
    }

    @Test
    @DisplayName("calculate on an empty places array should return an empty list")
    public void testDistanceEmpty(){
        SQLDatabase.Places p1 = new SQLDatabase.Places();
        ArrayList<Long> distances = DistanceCalculator.calculate(p1, EARTH_RADIUS);
        assertTrue(distances.isEmpty());
    }
    
    @Test
    @DisplayName("Distance from a point to itself should be zero")
    public void testDistanceZero(){
        SQLDatabase.Places p1 = new SQLDatabase.Places();
    	p1.add(makePlace("40.579", "-105.087"));
        p1.add(makePlace("40.579", "-105.087"));
        ArrayList<Long> distances = DistanceCalculator.calculate(p1, EARTH_RADIUS);
        assertEquals(distances.get(0), 0);
    }

    @Test
    @DisplayName("Distance from equator to pole should be 6219")
    public void testDistanceToPole(){
        SQLDatabase.Places p1 = new SQLDatabase.Places();
    	p1.add(makePlace("0", "0"));
        p1.add(makePlace("90", "0"));
        ArrayList<Long> distances = DistanceCalculator.calculate(p1, EARTH_RADIUS);
        assertEquals(distances.get(0), 6219);
    }

    @Test
    @DisplayName("Distance from A to B should equal distance from B to A")
    public void testDistanceTwoWays(){
        SQLDatabase.Places p1 = new SQLDatabase.Places();
    	p1.add(makePlace("40", "-105"));
        p1.add(makePlace("-30", "69"));
        ArrayList<Long> distances = DistanceCalculator.calculate(p1, EARTH_RADIUS);
        assertEquals(distances.get(0), distances.get(1));
    }

    @Test
    @DisplayName("Distance from Fort Collins to Los Angeles should be 847")
    public void testDistanceFoCoToLA(){
        SQLDatabase.Places p1 = new SQLDatabase.Places();
    	p1.add(makePlace("40.579", "-105.087"));
        p1.add(makePlace("34.038", "-118.154"));
        ArrayList<Long> distances = DistanceCalculator.calculate(p1, EARTH_RADIUS);
        assertEquals(distances.get(0), 847);
    }
}
