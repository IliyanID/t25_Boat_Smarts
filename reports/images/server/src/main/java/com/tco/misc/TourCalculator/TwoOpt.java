package com.tco.misc.TourCalculator;
import com.tco.misc.Pointer.FourPointers;
import com.tco.database.SQLDatabase;

public class TwoOpt extends TourCalculator{
    private int[] shorterTrip;  
    private double currentCumalitiveDistance;
    private long[][] distances;
    private OneOpt NN;

    public TwoOpt(SQLDatabase.Places places,double maxNanoSeconds,double earthRadius){
        super(places,maxNanoSeconds,earthRadius);
        this.NN = new OneOpt(places,maxNanoSeconds,earthRadius);
        this.NN.runRaw();
        //Intentially set this way so they can modify parent variables indirectly
        this.shorterTrip = NN.shorterTrip;
        super.shorterTrip = NN.shorterTrip;

        super.beginTime = NN.getbeginTime();
        
        this.currentCumalitiveDistance = NN.currentCumalitiveDistance;
        this.distances = super.distances;

    }

    @Override
    public int[] runRaw(){
        //Base Case if the trip has less than three locations it's already at optimal
        if(this.shorterTrip.length < 4)
            return this.shorterTrip;
        double lastCumalitiveDistance =  this.currentCumalitiveDistance;
        while(true){
            //The best round trip so far
            long runningBestContribution = Long.MAX_VALUE;
            FourPointers p = new FourPointers(this.shorterTrip,lastCumalitiveDistance,this.distances);
            //Locations of Best Place to Swap
            int[] bestPointers = new int[4];
            //Max number of combinations with two pointers
            int n = this.shorterTrip.length;
            n = n*(n-3)/2;
            for(int i = 0; i < n; i++,p.moveRight()){  
                //Check if max response time has been elapsed
                if(super.checkHitMaxTime())
                    break; 
                //Resulting round trip after swap
                long tempCumalitive = p.swap();
                if(runningBestContribution > tempCumalitive){
                    runningBestContribution = tempCumalitive;
                    //Save best round trip locations to bestPointers
                    p.copyTo(bestPointers);
                }
            }
            //If a shorter trip was found
            if(runningBestContribution < lastCumalitiveDistance){
                lastCumalitiveDistance = runningBestContribution;
                //Convert this.shorterTrip to new improved trip
                p.applyPointers(bestPointers);
                //System.out.println("CurrentCumalitiveDistance:" + this.currentCumalitiveDistance );
            }
            else{
                break; 
            }           
        }
        return this.shorterTrip;
    }
}
