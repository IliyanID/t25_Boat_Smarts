package com.tco.misc.TourCalculator;
import com.tco.misc.Pointer.FourPointers;
import com.tco.database.SQLDatabase;

public class TwoOpt extends TourCalculator{
    private int[] shorterTrip;  
    private double currentCumalitiveDistance;
    private long[][] distances;
    public TwoOpt(SQLDatabase.Places places,double maxNanoSeconds,double earthRadius){
        super(places,maxNanoSeconds,earthRadius);
        
        //Intentially set this way so they can modify parent variables indirectly
        this.shorterTrip = super.shorterTrip;
        this.currentCumalitiveDistance = super.currentCumalitiveDistance;
        this.distances = super.distances;
    }

    @Override
    public int[] runRaw(){
        //Base Case if the trip has less than three locations it's already at optimal
        if(this.shorterTrip.length < 4)
            return this.shorterTrip;

        double lastCumalitiveDistance =  this.currentCumalitiveDistance;


        while(true){
            System.out.println("lastCumalitiveDistance : " + lastCumalitiveDistance);

            //The best round trip so far
            long runningBestContribution = Long.MAX_VALUE;

            //Locations of Best Place to Swap
            int[] bestPointers = new int[4];
            FourPointers p = new FourPointers(this.shorterTrip,lastCumalitiveDistance,this.distances);

            //Max number of combinations with two pointers
            int n = this.shorterTrip.length;
            n = n*(n-3)/2;
            for(int i = 0; i < n; i++,p.moveRight()){  
                //Resulting round trip after swap
                long tempCumalitive = p.swap();
                if(runningBestContribution > tempCumalitive){
                    runningBestContribution = tempCumalitive;
                    //Save best round trip locations to bestPointers
                    p.copyTo(bestPointers);
                }
            }
            //System.out.println("    lastCumalitiveDistance:" + lastCumalitiveDistance + " | runningBestContribution" + runningBestContribution );


            //If a shorter trip was found
            if(runningBestContribution < lastCumalitiveDistance){
                lastCumalitiveDistance = runningBestContribution;

                //Convert this.shorterTrip to new improved trip
                p.applyPointers(bestPointers);
                //System.out.println("CurrentCumalitiveDistance:" + this.currentCumalitiveDistance );

            }
            else    
                break;            
        }
        
        return this.shorterTrip;
    }
}
