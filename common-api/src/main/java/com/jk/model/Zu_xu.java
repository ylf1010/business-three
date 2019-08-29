package com.jk.model;

import java.io.Serializable;

public class Zu_xu implements Serializable {
    private  Integer zuid;
    private  String zuname;

    public Integer getZuid() {
        return zuid;
    }

    public String getZuname() {
        return zuname;
    }

    public void setZuid(Integer zuid) {
        this.zuid = zuid;
    }

    public void setZuname(String zuname) {
        this.zuname = zuname;
    }
}
