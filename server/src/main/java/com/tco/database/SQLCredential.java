package com.tco.database;

public class SQLCredential {
    final static String USER = "user";
        final static String PASSWORD = "password";
        
        static String url() {
            String URL = "jdbc:mariadb://lindibracelets.com/cs314";
  

            //mysql://b574990a72e725:181319bb@us-cdbr-east-05.cleardb.net/heroku_001ba428b240e57?reconnect=true
            return URL;
        }
}
