package com.tco.database;

public class SQLCredential {
    final static String USER = "cs314-db";
        final static String PASSWORD = "eiK5liet1uej";
        
        static String url() {
            String useTunnel = System.getenv("CS314_USE_DATABASE_TUNNEL");
            String URL;
            if (useTunnel != null && useTunnel.equals("true")){
                URL = "jdbc:mariadb://127.0.0.1:56247/cs314";
            } else {
                URL = "jdbc:mariadb://faure.cs.colostate.edu/cs314";
            }
            return URL;
        }
}
