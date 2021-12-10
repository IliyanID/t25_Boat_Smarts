package com.tco.misc.TourCalculator;


import com.tco.database.SQLDatabase;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.tco.misc.DistanceCalculator;

public abstract class TourCalculator {
    protected final transient Logger log = LoggerFactory.getLogger(TourCalculator.class);

    protected int[] shorterTrip;
    public long[][] distances;
    public long currentCumalitiveDistance = 0;

    protected SQLDatabase.Places places;
    protected double maxNanoSeconds;
    protected double beginTime;
    protected boolean hitMaxTime;
    protected double earthRadius;

    protected TourCalculator(SQLDatabase.Places places,double maxNanoSeconds,double earthRadius){
        this.distances = new long[places.size()][places.size()];
        this.shorterTrip = new int[places.size()];

        this.earthRadius = earthRadius;
        this.places = places;
        this.maxNanoSeconds = maxNanoSeconds;
        this.beginTime = System.nanoTime();
        calculateDistances(places);
        initializeShorterTrip();
    }

    public abstract int[] runRaw();

    public SQLDatabase.Places run(){
        this.shorterTrip = runRaw();
        return buildResponse();
    }

    public void calculateDistances(SQLDatabase.Places places) {
        for (int i = 0; i < this.distances.length; i++) {
            for (int j = 0; j < this.distances[i].length; j++) {
                setDistanceValue(i, j);
            }
        }
    }

    private void setDistanceValue(int i, int j) {
        if(i==j) this.distances[i][j] = Integer.MAX_VALUE;
        else this.distances[i][j] = DistanceCalculator.singleDistance(places.get(i), places.get(j), this.earthRadius);
    }

    private void initializeShorterTrip(){
        for (int i = 0; i < this.shorterTrip.length; i++){
            this.shorterTrip[i] = i;

            if(i == this.shorterTrip.length - 1)
                this.currentCumalitiveDistance += this.distances[i][0];
            else
                this.currentCumalitiveDistance += this.distances[i][i+1];
        }
        //Add distance from end to start
        this.currentCumalitiveDistance += this.distances[0][this.shorterTrip.length -1 ];
    }

    private SQLDatabase.Places  buildResponse(){
        int homeLocation = 0;
        for(int i = 0; i < this.shorterTrip.length;i++){
            if(this.shorterTrip[i] == 0){
                homeLocation = i;
                break;
            }
        }
        leftRotate(homeLocation);

        SQLDatabase.Places result = new SQLDatabase.Places();
        for(int index : this.shorterTrip)
            result.add(this.places.get(index));
        
        return result;
    }

    private void leftRotate(int d)
    {
        int n = this.shorterTrip.length;
        // Creating temp array of size d
        int temp[] = new int[d];
 
        // Copying first d element in array temp
        for (int i = 0; i < d; i++)
            temp[i] = this.shorterTrip[i];
 
        // Moving the rest element to index
        // zero to N-d
        for (int i = d; i < n; i++) {
            this.shorterTrip[i - d] = this.shorterTrip[i];
        }
 
        // Copying the temp array element
        // in origninal array
        for (int i = 0; i < d; i++) {
            this.shorterTrip[i + n - d] = temp[i];
        }
    }

    protected boolean checkHitMaxTime(){
        double elapsedNanoSeconds =  System.nanoTime() - this.beginTime;
        if(elapsedNanoSeconds >= (this.maxNanoSeconds)){
            log.info("Hit Tour Max time | max time : " + this.maxNanoSeconds/1000000000 + " | elapsedTime " + elapsedNanoSeconds/1000000000);
            this.hitMaxTime = true;
        }
        return this.hitMaxTime;
    }

}
