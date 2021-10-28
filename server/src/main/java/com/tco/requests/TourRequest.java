package com.tco.requests;

import com.tco.database.SQLDatabase;
import com.tco.misc.ShorterTrip;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.Gson;

public class TourRequest extends Request {

    private double earthRadius;
    private SQLDatabase.Places places;
    private final transient Logger log = LoggerFactory.getLogger(TourRequest.class);


    @Override
    public void buildResponse() {
        places = createShorterTrip(this.earthRadius);
        log.trace("buildResponse -> {}", this);
    }

    private SQLDatabase.Places createShorterTrip(double earthRadius) {
        ShorterTrip shortTrip = new ShorterTrip(this.places, earthRadius);
        return shortTrip.oneOpt();
    }

  /* The following methods exist only for testing purposes and are not used
  during normal execution, including the constructor. */

    public TourRequest() {
        this.requestType = "tour";
    }

    //Called automatically via GSON data deserialized
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