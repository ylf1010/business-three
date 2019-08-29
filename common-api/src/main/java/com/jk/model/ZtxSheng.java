package com.jk.model;

import java.io.Serializable;

public class ZtxSheng implements Serializable {
    private Integer orignid;

    private String orignname;

    public Integer getOrignid() {
        return orignid;
    }

    public void setOrignid(Integer orignid) {
        this.orignid = orignid;
    }

    public String getOrignname() {
        return orignname;
    }

    public void setOrignname(String orignname) {
        this.orignname = orignname == null ? null : orignname.trim();
    }
}