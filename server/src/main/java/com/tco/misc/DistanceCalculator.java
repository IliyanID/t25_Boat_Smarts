package com.tco.misc;

import java.util.Arrays;
import java.util.ArrayList;
import com.tco.database.SQLDatabase;

public class DistanceCalculator {
    public static ArrayList<Double> calculate(SQLDatabase.Places places, int earthRadius) {
        ArrayList<Double> temp = new ArrayList<>();
        if(places != null)
            for(int i = 0; i < places.size(); i++){
                temp.add(1.0);
            }


        return temp;
    }
}
