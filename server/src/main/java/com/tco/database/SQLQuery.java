package com.tco.database;
import java.util.*;

public class SQLQuery {

    static String find(String searchStr, int limit, String columns, ArrayList<String> type) {
        return "SELECT world.name AS name, world.id AS id, world.iso_country AS iso_country,"
            +  " country.name AS country, region.name AS region," 
            +  columns
            +  " FROM world INNER JOIN country ON country.id = world.iso_country "
            +  "INNER JOIN region ON region.id = world.iso_region "
            +  matchClause(searchStr,type)
            +  (searchStr.isEmpty() ? "ORDER BY rand() " : "")
            +  (limit == 0 ? "LIMIT 100" : "LIMIT " + Integer.toString(limit))
            +  ";";
    }

    static String count(String searchStr,ArrayList<String> type) {
        return "SELECT COUNT(*) AS count " 
                +  "FROM world INNER JOIN country ON country.id = world.iso_country "
                +  "INNER JOIN region ON region.id = world.iso_region "
                +  matchClause(searchStr,type) 
                +  ";";
    }

    static String matchClause(String searchStr,ArrayList<String> type) {
        searchStr = searchStr.replaceAll("('|;)", "\\\\$1");
        return "WHERE (world.name LIKE '%" + searchStr + "%' "
            + "OR region.name LIKE '%" + searchStr + "%' "
            + "OR country.name LIKE '%" + searchStr + "%' "
            + "OR world.municipality LIKE '%" + searchStr + "%' "
            + "OR world.id LIKE '%" + searchStr + "%' )"
            + SQLDistinctTypes.matchType(type)
            ;
    }



}