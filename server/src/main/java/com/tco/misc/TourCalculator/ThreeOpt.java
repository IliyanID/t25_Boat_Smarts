package com.tco.misc.TourCalculator;
import com.tco.database.SQLDatabase;
import com.tco.misc.Pointer.SixPointers;

public class ThreeOpt extends TourCalculator{
    public ThreeOpt(SQLDatabase.Places places,double maxNanoSeconds,double earthRadius){
        super(places,maxNanoSeconds,earthRadius);
    }
    public int[] runRaw(){
        return null;
    }
}
