package com.jk.model;


import java.io.Serializable;

public class Lunbo implements Serializable {


    private Integer carouselid;

    private String carouselurl;

    private Integer lxid;

    public Integer getCarouselid() {
        return carouselid;
    }

    public void setCarouselid(Integer carouselid) {
        this.carouselid = carouselid;
    }

    public String getCarouselurl() {
        return carouselurl;
    }

    public void setCarouselurl(String carouselurl) {
        this.carouselurl = carouselurl;
    }

    public Integer getLxid() {
        return lxid;
    }

    public void setLxid(Integer lxid) {
        this.lxid = lxid;
    }
}