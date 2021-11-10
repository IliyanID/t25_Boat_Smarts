package com.tco.misc.Pointer;

public class FourPointers{
    public static int[] pointer = new int[]{0,1,2,3};
    /*
    a1 = pointer[0]
    a2 = pointer[1]
        a1 and a2 represent going from place a1 to a2

    b1 = pointer[2]
    b2 = pointer[3]
        b1 and b2 represent going from place b1 to b2

    before swap representation of trip
        a1 -- a2
        
        b1 -- b2

    after swap representation of trip
        a1   a2
          \/
          /\
        b1  b2
    */

    public static int iterations = 0;
    public static double currentBest = 0;
    
    private int[] shorterTrip;  
    private double currentCumalitiveDistance;
    private long[][] distances;


    public FourPointers(int[] shorterTrip,double currentCumalitiveDistance,long[][]distances){
        iterations = 0;
        currentBest=0;
        pointer = new int[]{0,1,2,3};

        //Intentially set this way so they can modify outside variables
        this.shorterTrip = shorterTrip;
        this.currentCumalitiveDistance = currentCumalitiveDistance;
        this.distances = distances;
    }
    public long swap(){
        //System.out.println("    In Swap: (" + pointer[0] + "," + pointer[1] + ") and (" + pointer[2] + "," + pointer[3] + ")");

        long originalDistanceA = this.distances[this.shorterTrip[pointer[0]]] [this.shorterTrip[pointer[1]]];
        long originalDistanceB = this.distances[this.shorterTrip[pointer[2]]] [this.shorterTrip[pointer[3]]];

        long newDistanceA = this.distances[this.shorterTrip[pointer[0]]] [this.shorterTrip[pointer[2]]];
        long newDistanceB = this.distances[this.shorterTrip[pointer[1]]] [this.shorterTrip[pointer[3]]];

        //Improvment made on trip
        long delta = (originalDistanceA + originalDistanceB) - (newDistanceA + newDistanceB);

        
        long newCumil =  (long)this.currentCumalitiveDistance - delta;
        return newCumil;
    }

    public void moveRight(){
        int n = this.shorterTrip.length;

        //if we've looped around the cycle once
        //Only move 2nd pair of pointers right once
        if(iterations == n-1){
            //only shift last two pointers right
            for(int i = 2; i < 4; i++){
                if(pointer[i] + 1 == n){
                    pointer[i] = 0;
                }
                else{
                    pointer[i]++;
                }
            }
            iterations = 0;
        }
        else{
            //Else continue around cycle trying all combinations
            for(int i = 0; i < 4; i++){
                //if you hit end of array loop around to begininning
                if(pointer[i] + 1 == n){
                    pointer[i] = 0;
                }
                //else continue incrementing right
                else{
                    pointer[i]++;
                }
            }
            iterations++;   
        }  
        //System.out.println("        MoveRight:(" + pointer[0] + "," + pointer[1] + ") and (" + pointer[2] + "," + pointer[3] + ") | iterations:" + iterations + "\n");   
    }
    public void copyTo(int[] oldPointers){
        for(int i = 0; i < 4; i++){
            oldPointers[i] = pointer[i];
        }
    }

    public void applyPointers(int[] bestPointer){
        //Sort Pointers if starting pointer (a1,a2) is bigger than ending (b1,b2) pointer
        if(bestPointer[0] > bestPointer[2]){
            int temp1 = bestPointer[0];
            int temp2 = bestPointer[1];
            bestPointer[0] = bestPointer[2];
            bestPointer[1] = bestPointer[3];
            bestPointer[2] = temp1;
            bestPointer[3] = temp2;
        }

        //System.out.println("        applyPointers:(" + bestPointer[0] + "," + bestPointer[1] + ") and (" + bestPointer[2] + "," + bestPointer[3] + ")");
        
        int newShortTripIndex = 0;
        int[] newShortestPath = new int[shorterTrip.length];

        //Add starting location
        newShortestPath[newShortTripIndex++] = this.shorterTrip[bestPointer[0]];
        
        for(int i = bestPointer[2]; i >= bestPointer[1]; i--)
            //Go back around in crossed location
            newShortestPath[newShortTripIndex++] =this.shorterTrip[i];
        

        //edge case of pointer pair being (100,0)
        if(bestPointer[2] < bestPointer[3])
            for(int i = bestPointer[3]; i < this.shorterTrip.length; i++)
                newShortestPath[newShortTripIndex++] = this.shorterTrip[i];
            
        //Go from second cross to beginning of trip
        for(int i = 0; i < bestPointer[0]; i++)
            newShortestPath[newShortTripIndex++] = this.shorterTrip[i];
        
        //Apply best Trip to Shorter Trip
        for(int i = 0; i < newShortTripIndex; i++){
            this.shorterTrip[i] = newShortestPath[i];
        }
        
    }
}