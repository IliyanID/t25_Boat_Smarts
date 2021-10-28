package com.tco.misc;
import com.tco.database.SQLDatabase;

public class ShorterTrip {

    private int[] shorterTrip;
    private boolean[] unvisited;
    private long[][] distances;

    public ShorterTrip(SQLDatabase.Places places, double earthRadius) {
        this.shorterTrip = new int[places.size()];
        this.unvisited = new boolean[places.size()];
        this.distances = new long[places.size()][places.size()];
        initializeShorterTrip(places, earthRadius);
    }

    private void initializeShorterTrip(SQLDatabase.Places places, double earthRadius) {
        for (int i = 0; i < this.shorterTrip.length; i++) {
            this.shorterTrip[i] = i;
            this.unvisited[i] = false;
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
        return null;

    }
}
