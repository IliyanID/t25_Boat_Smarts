package com.tco.requests;

import java.util.ArrayList;
import java.util.HashMap;
import com.tco.database.SQLDatabase;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestDistancesRequest {

    private DistancesRequest conf;

    @BeforeEach
    public void createConfigurationForTestCases() {
        conf = new DistancesRequest();
        conf.buildResponse();
    }

    @Test
    @DisplayName("Request type is \"distances\"")
    public void testType() {
        String type = conf.getRequestType();
        assertEquals("distances", type);
    }

    @Test
    @DisplayName("sets places")
    public void testSetPlaces() {
        SQLDatabase.Places places = new SQLDatabase.Places();
        SQLDatabase.Place place1 = new SQLDatabase.Place();
        place1.put("test", "testing");
        SQLDatabase.Place place2 = new SQLDatabase.Place();
        place2.put("test2", "testing2");
        places.add(place1);
        places.add(place2);
        conf.setPlaces(places);
        assertEquals(places, conf.getPlaces());
    }

    @Test
    @DisplayName("sets earthRadius")
    public void testSetEarthRadius() {
        int earthRadius = 10;
        conf.setEarthRadius(10);
        assertEquals(10, conf.getEarthRadius());
    }
}