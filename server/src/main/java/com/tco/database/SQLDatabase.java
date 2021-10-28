package com.tco.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;

import com.tco.database.SQLCredential;
import com.tco.database.SQLQuery;

public class SQLDatabase {
  
    //Additional columns; place name, id, iso_country, and country name are always included
    private final static String FIND_COLUMNS = "type,latitude,longitude,altitude,municipality,iso_region";

    public static class Place extends HashMap<String, String> {}
    public static class Places extends ArrayList<Place> {}

    public static Places findQuery(String searchStr, int limit, ArrayList<String> type) {
        SQLCredential db = new SQLCredential();

     	try (
            Connection conn = DriverManager.getConnection(db.url(), db.USER, db.PASSWORD);
            Statement query = conn.createStatement();
        
            ResultSet results = query.executeQuery(SQLQuery.find(searchStr, limit, FIND_COLUMNS,type));
          ) {
        return convertQueryResultsToPlaces(results);
      	} catch (SQLException e) {
       		e.printStackTrace();
       	}
        	
       	return null;
        	     
    }

    public static int countQuery(String searchStr,ArrayList<String> type) {
        SQLCredential db = new SQLCredential();
     	try {
            Connection conn = DriverManager.getConnection(db.url(), db.USER, db.PASSWORD);
            Statement query = conn.createStatement();
            ResultSet results = query.executeQuery(SQLQuery.count(searchStr,type));
            results.next();
            return results.getInt("count");
      	} catch (SQLException e) {
       		e.printStackTrace();
       	}
        	
       	return 0;
    }

    static Places convertQueryResultsToPlaces(ResultSet results) throws SQLException {
        Places places = new Places();
        
        // Add back in columns with conflicting names across tables
        String[] columns = ("name,id,country,region,iso_country,"+FIND_COLUMNS).split(",");

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