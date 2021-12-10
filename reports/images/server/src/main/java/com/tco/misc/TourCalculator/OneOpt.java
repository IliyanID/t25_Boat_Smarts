package com.tco.misc.TourCalculator;
import com.tco.database.SQLDatabase;

public class OneOpt extends TourCalculator{
    private boolean[] visited;
    protected double currentCumalitiveDistance;
    public OneOpt(SQLDatabase.Places places,double maxNanoSeconds,double earthRadius){
        super(places,maxNanoSeconds,earthRadius);
        calculateDistances(places);

        this.currentCumalitiveDistance =  super.currentCumalitiveDistance;

        //Allow NN to run for 70% of the time and Two-OPT to run 30% of the response time
        super.maxNanoSeconds = super.maxNanoSeconds * .7;
    }

    @Override
    public int[] runRaw(){        
        for (int i = 0; i < super.distances.length; i++) {
            if(super.hitMaxTime)
                break;
            int[] testShortTrip = new int[super.shorterTrip.length];
            this.visited = new boolean[super.shorterTrip.length];
            double newMinDistance = 0;
            int currentPlace = i;
            testShortTrip[0] = currentPlace;
            this.visited[currentPlace] = true;
            for(int j = 1; j < super.distances[i].length;j++){
                if(super.hitMaxTime)
                    break;
                int nextClosestPlace = findClosestPlace(currentPlace);
                if(nextClosestPlace >= 0){
                    this.visited[nextClosestPlace] = true;
                    testShortTrip[j] = nextClosestPlace;
                    newMinDistance += super.distances[currentPlace][nextClosestPlace];
                    currentPlace = nextClosestPlace;}
            }
            double endToStartDistance = super.distances[testShortTrip[0]][testShortTrip[testShortTrip.length - 1]];
            newMinDistance += endToStartDistance;
            if(!super.hitMaxTime && newMinDistance != endToStartDistance && newMinDistance < this.currentCumalitiveDistance){
                this.currentCumalitiveDistance = newMinDistance;
                super.shorterTrip = testShortTrip;}
        }return super.shorterTrip;
    }

    private int findClosestPlace(int currPlace) {
        long shortestDistance = super.distances[currPlace][currPlace];
        int closestPlace = -1;

        for (int i = 0; i < super.distances[currPlace].length; i++) {
            if(super.checkHitMaxTime())
                break;
            

            //System.out.println(super.distances[currPlace][i] + " < " + shortestDistance this.Visited: " + this.visited[i] );
            if (super.distances[currPlace][i] <= shortestDistance && !this.visited[i]) {
                shortestDistance = super.distances[currPlace][i];
                closestPlace = i;
            }
        }
        //System.out.println("closest to" + currPlace + " is " + closestPlace + "\n");
        return closestPlace;
    }

    protected double getbeginTime(){
        return super.beginTime;
    }
}
