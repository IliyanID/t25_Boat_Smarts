package com.tco.requests;

import java.util.ArrayList;

import com.tco.database.SQLDatabase;
import com.tco.misc.ShorterTrip;
import com.tco.misc.DistanceCalculator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.Gson;

public class TourRequest extends Request {

    private SQLDatabase.Places places = new SQLDatabase.Places();
    private double earthRadius = 0;
    private double response = 0;
    private final transient Logger log = LoggerFactory.getLogger(DistancesRequest.class);

    @Override
    public void buildResponse() {
        double maxNanoSeconds = ((this.places.size() > 500)? this.response - (this.places.size() * .00125) : this.response)*1000000000;

        places = new ShorterTrip(this.places, this.earthRadius, maxNanoSeconds).oneOpt();
        log.trace("buildResponse -> {}", this);
    }

    // Testing methods

    public TourRequest() {
        this.requestType = "tour";
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

    public void setEarthRadius(double earthRadius) {
        this.earthRadius = earthRadius;
    }

    public double getResponse() {
        return response;
    }
    public void setResponse(double response){
        this.response = response;
    }
}

