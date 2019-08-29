package com.jk.model;

import java.io.Serializable;

public class Remarkysq implements Serializable {
    private Integer id;

    private String content;

    private Integer keid;

    private Integer jiaoyiid;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }

    public Integer getKeid() {
        return keid;
    }

    public void setKeid(Integer keid) {
        this.keid = keid;
    }

    public Integer getJiaoyiid() {
        return jiaoyiid;
    }

    public void setJiaoyiid(Integer jiaoyiid) {
        this.jiaoyiid = jiaoyiid;
    }
}