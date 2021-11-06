package com.tco.misc;
import com.tco.database.SQLDatabase;

public class ShorterTrip {

    private int[] shorterTrip;
    private boolean[] visited;
    private long[][] distances;
    private SQLDatabase.Places places;
    double maxNanoSeconds;
    private double beginTime;
    private boolean hitMaxTime;



    public ShorterTrip(SQLDatabase.Places places, double earthRadius,double maxNanoSeconds) {
        this.beginTime = System.nanoTime();
        this.hitMaxTime = false;
        this.maxNanoSeconds = maxNanoSeconds;
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
                if(i==j){
                    this.distances[i][j] = Integer.MAX_VALUE;
                }
                else
                    this.distances[i][j] = DistanceCalculator.singleDistance(places.get(i), places.get(j), earthRadius);
                //System.out.print(this.distances[i][j] + " ");

            }
            //System.out.println();
        }
    }

    public SQLDatabase.Places oneOpt() {
        double minDistance = Double.POSITIVE_INFINITY;
        
        for (int i = 0; i < this.distances.length; i++) {
            if(this.hitMaxTime)
                break;
            
                //System.out.println("\n\nStarting Location: " + i);
            int[] testShortTrip = new int[this.shorterTrip.length];

            this.visited = new boolean[this.shorterTrip.length];
            double newMinDistance = 0;

            int currentPlace = i;
            testShortTrip[0] = currentPlace;
            this.visited[currentPlace] = true;

            for(int j = 1; j < this.distances[i].length;j++){
                if(this.hitMaxTime)
                    break;

                int nextClosestPlace = findClosestPlace(currentPlace);
                if(nextClosestPlace >= 0){
                    this.visited[nextClosestPlace] = true;
                    testShortTrip[j] = nextClosestPlace;
                    newMinDistance += this.distances[currentPlace][nextClosestPlace];
                    currentPlace = nextClosestPlace;
                }
            }
            //System.out.println("Temp Running Total:" + newMinDistance);
            newMinDistance += this.distances[testShortTrip[0]][testShortTrip[testShortTrip.length - 1]];

            if(!this.hitMaxTime && newMinDistance < minDistance){
                minDistance = newMinDistance;
                this.shorterTrip = testShortTrip;
            }
        }
        return buildResponse();
    }

    private int findClosestPlace(int currPlace) {
        long shortestDistance = this.distances[currPlace][currPlace];
        int closestPlace = -1;

        for (int i = 0; i < this.distances[currPlace].length; i++) {
            double elapsedNanoSeconds =  System.nanoTime() - this.beginTime;
            if(elapsedNanoSeconds >= this.maxNanoSeconds - 1000){
                System.out.println("Hit Max time | max time : " + this.maxNanoSeconds/1000000000 + " | elapsedTime " + elapsedNanoSeconds/1000000000);
                this.hitMaxTime = true;
                break;
            }

            //System.out.println(this.distances[currPlace][i] + " < " + shortestDistance + " | Visited: " + this.visited[i] );
            if (this.distances[currPlace][i] < shortestDistance && !this.visited[i]) {
                shortestDistance = this.distances[currPlace][i];
                closestPlace = i;
            }
        }
        //System.out.println("closest to" + currPlace + " is " + closestPlace + "\n");
        return closestPlace;
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
}
