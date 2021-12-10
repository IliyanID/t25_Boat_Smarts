package com.tco.requests;
import com.tco.misc.TourCalculator.TwoOpt;

import java.util.ArrayList;
import com.tco.database.SQLDatabase;
import com.tco.misc.DistanceCalculator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.Gson;

public class TourRequest extends Request {

    private SQLDatabase.Places places = new SQLDatabase.Places();
    private double earthRadius;
    private double response;
    private final transient Logger log = LoggerFactory.getLogger(DistancesRequest.class);

    @Override
    public void buildResponse() {
        double maxNanoSeconds =  (this.response - (this.places.size() * .0005))*1000000000;

        if(this.places != null && this.places.size() > 0) {
            places = new TwoOpt(this.places, maxNanoSeconds,this.earthRadius).run();
        }
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

