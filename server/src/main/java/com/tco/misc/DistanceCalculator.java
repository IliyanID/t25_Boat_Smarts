package com.tco.misc;

import java.lang.Math;

import java.util.Arrays;
import java.util.ArrayList;
import com.tco.database.SQLDatabase;

public class DistanceCalculator {
    public static ArrayList<Long> calculate(SQLDatabase.Places places, double earthRadius) {
        ArrayList<Long> temp = new ArrayList<>();
        if(places != null)
            for(int i = 0; i < places.size(); i++){
                temp.add(singleDistance(places.get(i), places.get((i+1)%places.size()), earthRadius));
            }


        return temp;
    }

    public static long singleDistance(SQLDatabase.Place place1, SQLDatabase.Place place2, double earthRadius) {
        double lat1 = Double.parseDouble(place1.get("latitude"))/180 * Math.PI;
        double lat2 = Double.parseDouble(place2.get("latitude"))/180 * Math.PI;
        double lon1 = Double.parseDouble(place1.get("longitude"))/180 * Math.PI;
        double lon2 = Double.parseDouble(place2.get("longitude"))/180 * Math.PI;

        return Math.round(earthRadius * centralAngle(lat1, lon1, lat2, lon2));
    }

    private static double centralAngle(double lat1, double lon1, double lat2, double lon2){
        double deltaLon = Math.abs(lon1-lon2);

        double numeratorHalf1 = Math.pow(Math.cos(lat2)*Math.sin(deltaLon), 2);
        double numeratorHalf2 = Math.pow(Math.cos(lat1)*Math.sin(lat2) - Math.sin(lat1)*Math.cos(lat2)*Math.cos(deltaLon), 2);
        double numerator = Math.sqrt(numeratorHalf1+numeratorHalf2);

        double denominator = Math.sin(lat1)*Math.sin(lat2) + Math.cos(lat1)*Math.cos(lat2)*Math.cos(deltaLon);

        return Math.atan2(numerator, denominator);

    }
}
