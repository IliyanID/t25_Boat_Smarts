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
        match = "";
        type = new ArrayList<>();
        where = new ArrayList<>();
        limit = 0;
        type.add("");
        where.add("");
        log.trace("buildResponse -> {}", this);
    }

  /* The following methods exist only for testing purposes and are not used
  during normal execution, including the constructor. */

    public FindRequest() {
        this.requestType = "find";
    }

}