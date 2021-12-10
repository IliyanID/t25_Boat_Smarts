package com.tco.requests;

import java.util.ArrayList;
import com.tco.database.SQLDatabase;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ConfigRequest extends Request {

    private String serverName;
    private final transient Logger log = LoggerFactory.getLogger(ConfigRequest.class);
    private ArrayList<String> features;
    private ArrayList<String> type;
    private ArrayList<String> where;

    @Override
    public void buildResponse() {
        serverName = "t25 Boat Smarts";
        features = new ArrayList<>();
        type = new ArrayList<>();
        features.add("config");
        features.add("find");
        features.add("distances");
        features.add("tour");
        features.add("type");
        features.add("where");

        type.add("airport");
        type.add("heliport");
        type.add("balloonport");
        type.add("other");

        where = SQLDatabase.countryQuery();
        log.trace("buildResponse -> {}", this);
    }

  /* The following methods exist only for testing purposes and are not used
  during normal execution, including the constructor. */

    public ConfigRequest() {
        this.requestType = "config";
    }

    public String getServerName() {
        return serverName;
    }

    public boolean validFeature(String feature){
        return features.contains(feature);
    }
}