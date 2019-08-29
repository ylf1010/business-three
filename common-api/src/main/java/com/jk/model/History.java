package com.jk.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

public class History implements Serializable {
    private  Integer uid;  //用户
    private  String hip;   //ip
    @DateTimeFormat(pattern="yyyy-MM-dd")   // 处理从 前端到后端的时间
    @JsonFormat(pattern="yyyy-MM-dd",timezone="GMT+8")
    private Date hdate;
    private  String parame;   //参数  商品id

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public void setHip(String hip) {
        this.hip = hip;
    }

    public void setHdate(Date hdate) {
        this.hdate = hdate;
    }



    public Integer getUid() {
        return uid;
    }

    public String getHip() {
        return hip;
    }

    public Date getHdate() {
        return hdate;
    }

    public String getParame() {
        return parame;
    }

    public void setParame(String parame) {
        this.parame = parame;
    }
}
