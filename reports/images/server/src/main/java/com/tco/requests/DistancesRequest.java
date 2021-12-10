package com.tco.requests;

import java.util.ArrayList;

import com.tco.database.SQLDatabase;
import com.tco.misc.DistanceCalculator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.Gson;

public class DistancesRequest extends Request {
    private SQLDatabase.Places places;
    private double earthRadius;
    private ArrayList<Long> distances;
    private final transient Logger log = LoggerFactory.getLogger(DistancesRequest.class);

    @Override
    public void buildResponse() {
        distances = DistanceCalculator.calculate(places, earthRadius);
        log.trace("buildResponse -> {}", this);
    }

    // Testing methods

    public DistancesRequest() {
        this.requestType = "distances";
    }

    public SQLDatabase.Places getPlaces() {
        return places;
    }
    public void setPlaces(SQLDatabase.Places places) {
        this.places = places;
    }

    public double getEarthRadius() {
        return earthRadius;
    }
    public void setEarthRadius(int earthRadius) {
        this.earthRadius = earthRadius;
    }
}