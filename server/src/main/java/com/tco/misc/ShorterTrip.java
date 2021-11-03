package com.tco.misc;
import com.tco.database.SQLDatabase;

public class ShorterTrip {

    private int[] shorterTrip;
    private boolean[] visited;
    private long[][] distances;
    private SQLDatabase.Places places;

    public ShorterTrip(SQLDatabase.Places places, double earthRadius) {


        this.shorterTrip = new int[places.size()];
        this.visited = new boolean[places.size()];
        this.distances = new long[places.size()][places.size()];
        this.places = places;
        initializeShorterTrip(places, earthRadius);
    }

    private void initializeShorterTrip(SQLDatabase.Places places, double earthRadius) {
        for (int i = 0; i < this.shorterTrip.length; i++) {
            this.shorterTrip[i] = i;
            this.visited[i] = false;
        }
        calculateDistances(places, earthRadius);
    }

    private void calculateDistances(SQLDatabase.Places places, double earthRadius) {
        for (int i = 0; i < this.distances.length; i++) {
            for (int j = 0; j < this.distances[i].length; j++) {
                this.distances[i][j] = DistanceCalculator.singleDistance(places.get(i), places.get(j), earthRadius);
                //System.out.print(this.distances[i][j] + " ");
                if(this.distances[i][j] == 0){
                    this.distances[i][j] = Integer.MAX_VALUE;
                }
            }
            //System.out.println();
        }
    }

    public SQLDatabase.Places oneOpt() {
        double minDistance = Double.POSITIVE_INFINITY;


        for (int i = 0; i < this.distances.length; i++) {
            //System.out.println("\n\nStarting Location: " + i);
            int[] testShortTrip = new int[this.shorterTrip.length];
            this.visited = new boolean[this.shorterTrip.length];
            double newMinDistance = 0;
        

            int currentPlace = i;
            testShortTrip[0] = currentPlace;
            this.visited[currentPlace] = true;
            for(int j = 1; j < this.distances.length;j++){
                int nextClosestPlace = findClosestPlace(currentPlace);
                if(nextClosestPlace >= 0){
                    this.visited[nextClosestPlace] = true;
                    testShortTrip[j] = nextClosestPlace;
                    newMinDistance += this.distances[currentPlace][nextClosestPlace];
                    currentPlace = nextClosestPlace;

                }
                
            }
            //System.out.println("Temp Running Total:" + newMinDistance);
            if(newMinDistance < minDistance){
                minDistance = newMinDistance;
                this.shorterTrip = testShortTrip;
            }
            

            
        }

        SQLDatabase.Places result = new SQLDatabase.Places();
        for(int index : this.shorterTrip){
            result.add(this.places.get(index));
        }
        return result;
           
    }

    private int findClosestPlace(int currPlace) {
        long shortestDistance = this.distances[currPlace][currPlace];
        int closestPlace = -1;



        for (int i = 0; i < this.distances[currPlace].length; i++) {
            //System.out.println(this.distances[currPlace][i] + " < " + shortestDistance + " | Visited: " + this.visited[i] );
            if (this.distances[currPlace][i] < shortestDistance && !this.visited[i]) {
                shortestDistance = this.distances[currPlace][i];
                closestPlace = i;
            }
        }
        //System.out.println("closest to" + currPlace + " is " + closestPlace + "\n");
        return closestPlace;
    }

    private void resetVisited() {
        for (int i = 0; i < this.visited.length; i++) {
            this.visited[i] = false;
        }
    }
}
