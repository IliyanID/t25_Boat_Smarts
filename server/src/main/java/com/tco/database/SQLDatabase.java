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
  
    private final static String FIND_COLUMNS = "id,name,latitude,longitude,altitude,municipality,iso_country";

    public static class Place extends HashMap<String, String> {}
    public static class Places extends ArrayList<Place> {}

    public static Places findQuery(String searchStr, int limit) {
        SQLCredential db = new SQLCredential();

        limit = (limit == 0)?20000:limit;
     	try (
        Connection conn = DriverManager.getConnection(db.url(), db.USER, db.PASSWORD);
        Statement query = conn.createStatement();
        
        ResultSet results = query.executeQuery(SQLQuery.find(searchStr, limit, FIND_COLUMNS));
          ) {
        return convertQueryResultsToPlaces(results);
      	} catch (SQLException e) {
       		e.printStackTrace();
       	}
        	
       	return null;
        	     
    }

    public static int countQuery(String searchStr) {
        SQLCredential db = new SQLCredential();
     	try {
            Connection conn = DriverManager.getConnection(db.url(), db.USER, db.PASSWORD);
            Statement query = conn.createStatement();
            ResultSet results = query.executeQuery(SQLQuery.count(searchStr));
            results.next();
            return results.getInt("count");
      	} catch (SQLException e) {
       		e.printStackTrace();
       	}
        	
       	return 0;
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