package com.tco.misc;
public class FindPlaces {

    private float latitude;
    private float longitude;
    private String id;
    private int altitude;
    private String municipality;
    private String type;
    private String region;
    private String country;
    private String url;

    private String name;

    /*
    Constructor used for testing purposes; Shouldn't be called during execution
    */
    public FindPlaces(){
        this.latitude = 0;
        this.longitude = 0;
        this.id = "";
        this.altitude = 0;
        this.municipality = "";
        this.type = "";
        this.region = "";
        this.country = "";
        this.url = "";
        this.name="";
    }

    public String getname() {
        return this.name;
    }

    public void setname(String name) {
        this.name = name;
    }

    public float getlatitude() {
        return this.latitude;
    }

    public void setlatitude(float latitude) {
        this.latitude = latitude;
    }

    public float getlongitude() {
        return this.longitude;
    }

    public void setlongitude(float longitude) {
        this.longitude = longitude;
    }

    public String getid() {
        return this.id;
    }

    public void setid(String id) {
        this.id = id;
    }

    public int getaltitude() {
        return this.altitude;
    }

    public void setaltitude(int altitude) {
        this.altitude = altitude;
    }

    public String getmunicipality() {
        return this.municipality;
    }

    public void setmunicipality(String municipality) {
        this.municipality = municipality;
    }

    public String gettype() {
        return this.type;
    }

    public void settype(String type) {
        this.type = type;
    }

    public String getregion() {
        return this.region;
    }

    public void setregion(String region) {
        this.region = region;
    }

    public String getcountry() {
        return this.country;
    }

    public void setcountry(String country) {
        this.country = country;
    }

    public String geturl() {
        return this.url;
    }

    public void seturl(String url) {
        this.url = url;
    }


    
}
