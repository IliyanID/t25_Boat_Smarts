package com.tco.requests;

import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FindRequest extends Request {

    private String match;
    private final transient Logger log = LoggerFactory.getLogger(FindRequest.class);
    private ArrayList<String> type;
    private ArrayList<String> where;
    private int limit;

    @Override
    public void buildResponse() {
        match = getmatch();
        type = new ArrayList<>();
        where = new ArrayList<>();
        limit = getlimit();

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

    public int getlimit(){
        return limit;
    }
    public void setlimit(int limit){
        this.limit = limit;
    }

}