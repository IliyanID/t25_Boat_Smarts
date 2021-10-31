package com.tco.requests;

import java.util.ArrayList;

import com.tco.database.SQLDatabase;
import com.tco.misc.ShorterTrip;
import com.tco.misc.DistanceCalculator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.Gson;

public class TourRequest extends Request {

    private SQLDatabase.Places places;
    private double earthRadius;
    private double response;
    private final transient Logger log = LoggerFactory.getLogger(DistancesRequest.class);

    @Override
    public void buildResponse() {
        places = createShorterTrip(this.earthRadius);
        log.trace("buildResponse -> {}", this);
    }
  
    private SQLDatabase.Places createShorterTrip(double earthRadius) {
          ShorterTrip shortTrip = new ShorterTrip(this.places, earthRadius);
          return shortTrip.oneOpt();
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

