package com.tco.misc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;

public class SQL {

    private final static String FIND_COLUMNS = "name,latitude,longitude";

    public static class Place extends HashMap<String, String> {}
    public static class Places extends ArrayList<Place> {}

    public static void main(String[] args){
        Report.printPlaces(Database.findQuery("den", 10));
    }

    static class Credential {
        final static String USER = "cs314-db";
        final static String PASSWORD = "eiK5liet1uej";
        
        static String url() {
            String useTunnel = System.getenv("CS314_USE_DATABASE_TUNNEL");
            String URL;
            if (useTunnel != null && useTunnel.equals("true")){
                URL = "jdbc:mariadb://127.0.0.1:56247/cs314";
            } else {
                URL = "jdbc:mariadb://faure.cs.colostate.edu/cs314";
            }
            return URL;
        }
    }

    static class Select {
        static String find(String searchStr, int limit) {
            return "SELECT " + FIND_COLUMNS
                +  " FROM world "
                +  "WHERE name LIKE '%" + searchStr + "%' "
                +  "ORDER BY rand() "
                +  "LIMIT " + Integer.toString(limit)
                +  ";";
        }
    }

    public static class Database {
        public static Places findQuery(String searchStr, int limit) {
        	try {
            Credential db = new Credential();
            Connection conn = DriverManager.getConnection(db.url(), db.USER, db.PASSWORD);
            Statement query = conn.createStatement();
            ResultSet results = query.executeQuery(Select.find(searchStr, limit));
            return convertQueryResultsToPlaces(results);
        	} catch (SQLException e) {
        		System.err.println("Problem with sql:");
        		e.printStackTrace();
        	}
        	
        	return null;
        	     
        }

        static Places convertQueryResultsToPlaces(ResultSet results) throws SQLException {
            Places places = new Places();
            String[] columns = FIND_COLUMNS.split(",");
            while (results.next()) {
                Place place = new Place();
                for (String column : columns){
                    place.put(column, results.getString(column));
                }
                places.add(place);
            }
            return places;
        }
    }

    public static class Report {
        public static void printPlaces(Places places){
            for (Place place : places) {
                System.out.println(place);
            }
        }
    }  

}