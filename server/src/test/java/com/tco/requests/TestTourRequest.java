package com.tco.requests;

import java.util.ArrayList;
import java.util.HashMap;
import com.tco.database.SQLDatabase;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestTourRequest {

    private TourRequest conf;

    @BeforeEach
    public void createConfigurationForTestCases() {
        conf = new TourRequest();
        SQLDatabase.Places places = new SQLDatabase.Places();
        conf.setPlaces(places);
        conf.setEarthRadius(0);
        conf.buildResponse();
    }

    @Test
    @DisplayName("Request type is \"tour\"")
    public void testType() {
        String type = conf.getRequestType();
        assertEquals("tour", type);
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

    @Test
    @DisplayName("sets response")
    public void testSetResponse() {
        double response = 1.0;
        conf.setResponse(response);
        assertEquals(1.0, conf.getResponse());
    }
}
