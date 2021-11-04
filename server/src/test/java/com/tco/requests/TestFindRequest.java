package com.tco.requests;

import java.util.ArrayList;
import java.util.HashMap;
import com.tco.database.SQLDatabase;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestFindRequest {

    private FindRequest conf;

    @BeforeEach
    public void createConfigurationForTestCases() {
        conf = new FindRequest();
        ArrayList<String> type = new ArrayList<>();
        conf.setlimit(1);
        conf.setmatch("");
        conf.settype(type);
        conf.buildResponse();
    }

    @Test
    @DisplayName("Request type is \"distances\"")
    public void testType() {
        String type = conf.getRequestType();
        assertEquals("find", type);
        conf.gettype();
        conf.getmatch();
        conf.getlimit();
    }


 
}