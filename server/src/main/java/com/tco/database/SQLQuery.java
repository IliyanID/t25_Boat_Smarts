package com.tco.database;

public class SQLQuery {

    static String find(String searchStr, int limit, String columns) {
        return "SELECT world.name AS name, world.id AS id, world.iso_country AS iso_country,"
            +  " country.name AS country, region.name AS region," 
            +  columns
            +  " FROM world INNER JOIN country ON country.id = world.iso_country "
            +  "INNER JOIN region ON region.id = world.iso_region "
            +  "WHERE world.name LIKE '%" + searchStr + "%' "
            +  (searchStr.isEmpty() ? "ORDER BY rand() " : "")
            +  (limit == 0 ? "LIMIT 100" : "LIMIT " + Integer.toString(limit))
            +  ";";
    }

    static String count(String searchStr) {
        return "SELECT COUNT(*) AS count " +
               "FROM world " +
               "WHERE name LIKE '%" + searchStr + "%';";
    }
}
