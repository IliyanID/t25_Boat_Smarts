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
            }
        }
    }

    public SQLDatabase.Places oneOpt() {
        int[] shortestTrip = this.shorterTrip;
        double minDistance = Double.POSITIVE_INFINITY;
        for (int i = 0; i < this.distances.length; i++) {
            int tripPosition = 0;
            long tripDistance = 0;
            int currPlace = i;
            while(tripPosition < this.shorterTrip.length) {
                this.shorterTrip[tripPosition++] = currPlace;
                int nextPlace = findClosestPlace(currPlace);
                tripDistance += this.distances[currPlace][nextPlace];
                currPlace = nextPlace;
            }
            if (tripDistance < minDistance) {
                minDistance = tripDistance;
                shortestTrip = this.shorterTrip;
            }
            resetVisited();
        }
        SQLDatabase.Places shortTrip = new SQLDatabase.Places();
        for (int j = 0; j < shortestTrip.length; j++) {
            shortTrip.add(this.places.get(shortestTrip[j]));
        }
        return shortTrip;
    }

    private int findClosestPlace(int currPlace) {
        long shortestDistance = this.distances[currPlace][0];
        int closestPlace = -1;
        for (int i = 0; i < this.distances[currPlace].length; i++) {
            if (this.distances[currPlace][i] < shortestDistance && !this.visited[i]) {
                shortestDistance = this.distances[currPlace][i];
                closestPlace = i;
            }
        }
        return closestPlace;
    }

    private void resetVisited() {
        for (int i = 0; i < this.visited.length; i++) {
            this.visited[i] = false;
        }
    }
}
