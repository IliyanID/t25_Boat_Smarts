package com.tco.database;
import java.util.*;

public class SQLDistinctTypes {
    static String matchType(ArrayList<String> type){
        if(type == null)
            return "";
        if(type.size() == 0)
            return "";

        String result = "";

        if(type.indexOf("other") >= 0)
            result += otherUsed(type);
        else
            result += otherNotUsed(type);
        
        return result;

    }

    static String otherUsed(ArrayList<String> type){
        String result = "";

        int otherIndex = type.indexOf("other");
        type.remove(otherIndex);

        ArrayList<String> defaultExcludeOther = new ArrayList<String>();
        defaultExcludeOther.add("airport");
        defaultExcludeOther.add("balloonport");
        defaultExcludeOther.add("heliport");

        for(int i = 0; i < type.size(); i++){
            String indivType = type.get(i);
            int index = defaultExcludeOther.indexOf(indivType);
            if(index >= 0)
                defaultExcludeOther.remove(index);
        }
    

        for(int i = 0; i < defaultExcludeOther.size();i++){
            result += "AND !(world.type LIKE '%" + defaultExcludeOther.get(i) + "%') ";
        }
        type.add(otherIndex,"other");
        return result;
    }
    static String otherNotUsed(ArrayList<String> type){
        String result = "AND ( ";
        for(int i = 0; i < type.size(); i++){
            String indivType = type.get(i);
            if(indivType.equals("other"))
                continue;
            result += "world.type LIKE '%" + indivType +"%'";
            if(i != type.size() - 1)
                result += " OR ";

        }
        return result += ")";
    }
}
