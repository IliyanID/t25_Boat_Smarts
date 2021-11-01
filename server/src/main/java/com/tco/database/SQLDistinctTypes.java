package com.tco.database;
import java.util.*;

public class SQLDistinctTypes {
    public static String matchType(ArrayList<String> type){
        if(type == null)
            return "";
        if(type.size() == 0)
            return "";

        if(type.indexOf("other") >= 0)
            return otherUsed(type);
        else
            return otherNotUsed(type);
    }

    static String otherUsed(ArrayList<String> type){
        String result = "";

        ArrayList<String> defaultExcludeOther = new ArrayList<String>(3);
        defaultExcludeOther.add("airport");
        defaultExcludeOther.add("balloonport");
        defaultExcludeOther.add("heliport");

        for(String individualType : type){
            int index = defaultExcludeOther.indexOf(individualType);
            if(index >= 0)
                defaultExcludeOther.remove(index);
        }
    
        for(String excludeType : defaultExcludeOther)
            result += "AND !(world.type LIKE '%" + excludeType + "%') ";
        
        return result;
    }
    static String otherNotUsed(ArrayList<String> type){
        String result = "AND ( ";
        for(int i = 0; i < type.size(); i++){
            result += "world.type LIKE '%" + type.get(i) +"%'";
            if(i != type.size() - 1)
                result += " OR ";
        }

        return result += ")";
    }
}
