package com.tco.database;
import java.util.*;

public class SQLDistinctTypes {
    static String matchType(ArrayList<String> type){
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

        for(int i = 0; i < type.size(); i++){
            int index = defaultExcludeOther.indexOf(type.get(i));
            if(index >= 0)
                defaultExcludeOther.remove(index);
        }
    
        for(int i = 0; i < defaultExcludeOther.size();i++)
            result += "AND !(world.type LIKE '%" + defaultExcludeOther.get(i) + "%') ";
        
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
