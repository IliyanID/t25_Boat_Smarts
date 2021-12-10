package com.tco.database;

public class SQLCredential {
    final static String USER = "b574990a72e725";
        final static String PASSWORD = "181319bb";
        
        static String url() {
            String URL = "jdbc:mariadb://us-cdbr-east-05.cleardb.net/heroku_001ba428b240e57";
  

            //mysql://b574990a72e725:181319bb@us-cdbr-east-05.cleardb.net/heroku_001ba428b240e57?reconnect=true
            return URL;
        }
}
