package com.tco.database;

public class SQLQuery {

    static String find(String searchStr, int limit, String columns) {
        return "SELECT " + columns
            +  " FROM world "
            +  "WHERE name LIKE '%" + searchStr + "%' "
            +  (searchStr.isEmpty() ? "ORDER BY rand() " : "")
            +  "LIMIT " + Integer.toString(limit)
            +  ";";
    }

    static String find(String searchStr, String columns) {
        return "SELECT " + columns
            +  " FROM world "
            +  "WHERE name LIKE '%" + searchStr + "%' "
            +  (searchStr.isEmpty() ? "ORDER BY rand() " : "")
            +  ";";
    }

    static String count(String searchStr) {
        return "SELECT COUNT(*) AS count " +
               "FROM world " +
               "WHERE name LIKE '%" + searchStr + "%';";
    }
}
