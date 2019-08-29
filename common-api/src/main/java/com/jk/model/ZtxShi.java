package com.jk.model;

import java.io.Serializable;

public class ZtxShi implements Serializable {
    private Integer orignshiid;

    private String orignshiname;

    private Integer orignshengid;

    public Integer getOrignshiid() {
        return orignshiid;
    }

    public void setOrignshiid(Integer orignshiid) {
        this.orignshiid = orignshiid;
    }

    public String getOrignshiname() {
        return orignshiname;
    }

    public void setOrignshiname(String orignshiname) {
        this.orignshiname = orignshiname == null ? null : orignshiname.trim();
    }

    public Integer getOrignshengid() {
        return orignshengid;
    }

    public void setOrignshengid(Integer orignshengid) {
        this.orignshengid = orignshengid;
    }
}