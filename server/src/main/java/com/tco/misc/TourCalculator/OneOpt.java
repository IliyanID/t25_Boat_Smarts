package com.tco.misc.TourCalculator;
import com.tco.database.SQLDatabase;

public class OneOpt extends TourCalculator{
    private boolean[] visited;
    protected double cumalitiveDistance;
    public OneOpt(SQLDatabase.Places places,double maxNanoSeconds,double earthRadius){
        super(places,maxNanoSeconds,earthRadius);
        calculateDistances(places);

        this.cumalitiveDistance = Double.POSITIVE_INFINITY;


        /*for(int i = 0; i < super.distances.length; i++){
            for(int j = 0; j < super.distances[i].length; j++){
                System.out.print(super.distances[i][j] + " ");
            }
            System.out.println();
        }*/
    }

    @Override
    public int[] runRaw(){        
        for (int i = 0; i < super.distances.length; i++) {
            if(super.hitMaxTime)
                break;
            
                //System.out.println("\n\nStarting Location: " + i);
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
                    currentPlace = nextClosestPlace;
                }
            }
            //System.out.println("Temp Running Total:" + newMinDistance);
            newMinDistance += super.distances[testShortTrip[0]][testShortTrip[testShortTrip.length - 1]];

            if(!super.hitMaxTime && newMinDistance < this.cumalitiveDistance){
                this.cumalitiveDistance = newMinDistance;
                super.shorterTrip = testShortTrip;
            }
        }
        return super.shorterTrip;
    }

    private int findClosestPlace(int currPlace) {
        long shortestDistance = super.distances[currPlace][currPlace];
        int closestPlace = -1;

        for (int i = 0; i < super.distances[currPlace].length; i++) {
            double elapsedNanoSeconds =  System.nanoTime() - super.beginTime;
            if(elapsedNanoSeconds >= super.maxNanoSeconds - 1000){
                log.info("Hit Tour Max time | max time : " + super.maxNanoSeconds/1000000000 + " | elapsedTime " + elapsedNanoSeconds/1000000000);
                super.hitMaxTime = true;
                break;
            }

            //System.out.println(super.distances[currPlace][i] + " < " + shortestDistance this.Visited: " + this.visited[i] );
            if (super.distances[currPlace][i] < shortestDistance && !this.visited[i]) {
                shortestDistance = super.distances[currPlace][i];
                closestPlace = i;
            }
        }
        //System.out.println("closest to" + currPlace + " is " + closestPlace + "\n");
        return closestPlace;
    }
}
