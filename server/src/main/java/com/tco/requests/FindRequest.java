package com.tco.requests;

import java.util.ArrayList;
import com.tco.database.SQLDatabase;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.Gson;

public class FindRequest extends Request {

    private String match;
    private int limit;
    private int found;
    private ArrayList<String> type;
    private ArrayList<String> where;
    private SQLDatabase.Places places;
    private final transient Logger log = LoggerFactory.getLogger(FindRequest.class);


    @Override
    public void buildResponse() {
        places = SQLDatabase.findQuery(match, limit, type, where);
        found = SQLDatabase.countQuery(match, type, where);
        log.trace("buildResponse -> {}", this);
    }

  /* The following methods exist only for testing purposes and are not used
  during normal execution, including the constructor. */

    public FindRequest() {
        this.requestType = "find";
    }

    //Called automatically via GSON data deserialized
    public String getmatch(){
        return match;
    }
    public void setmatch(String match){
        this.match = match;
    }

    public ArrayList<String> gettype(){
        return this.type;
    }
    public void settype(ArrayList<String> type){
        this.type = type;
    }

    public ArrayList<String> getwhere(){
        return this.where;
    }
    public void setwhere(ArrayList<String> where){
        this.where = where;
    }

    public int getlimit(){
        return limit;
    }
    public void setlimit(int limit){
        this.limit = limit;
    }

}