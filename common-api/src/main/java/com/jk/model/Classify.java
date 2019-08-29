package com.jk.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

public class Classify implements Serializable {
    private Integer flid;

    private String flphoto;

    private String flname;

    private Integer productnumber;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    @JsonFormat(pattern="yyyy-MM-dd",timezone="GMT+8")// 处理从	后端到前端的时间
    private Date fltime;

    public Integer getFlid() {
        return flid;
    }

    public void setFlid(Integer flid) {
        this.flid = flid;
    }

    public String getFlphoto() {
        return flphoto;
    }

    public void setFlphoto(String flphoto) {
        this.flphoto = flphoto == null ? null : flphoto.trim();
    }

    public String getFlname() {
        return flname;
    }

    public void setFlname(String flname) {
        this.flname = flname == null ? null : flname.trim();
    }

    public Integer getProductnumber() {
        return productnumber;
    }

    public void setProductnumber(Integer productnumber) {
        this.productnumber = productnumber;
    }

    public Date getFltime() {
        return fltime;
    }

    public void setFltime(Date fltime) {
        this.fltime = fltime;
    }
}