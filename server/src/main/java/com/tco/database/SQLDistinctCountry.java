package com.tco.database;
import java.util.*;

public class SQLDistinctCountry {
    public static String matchWhere(ArrayList<String> where){
        if (where == null || where.isEmpty()) return "";
        String result = "";
        result += "AND (";
        for (int i = 0; i < where.size(); ++i) {
            result += "country.name LIKE '%" + where.get(i) + "%' ";
            if(i != where.size() - 1) {
                result += "OR ";
            }
        }
        result += ")";
        return result;
    }
}
