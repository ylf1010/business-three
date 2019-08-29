package com.jk.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

public class Refundysq implements Serializable {
    private Integer id;

    private Integer jiaoyiid;

    private String jiaoyiname;

    private Integer unitprice;

    private Integer refund;

    private Integer state;

    private String refundway;

    private String cause;
    @DateTimeFormat(pattern = "yyyy-MM-dd ")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date applytime;

    private Integer status;


    private Integer tongyi;

    public Integer getTongyi() {
        return tongyi;
    }

    public void setTongyi(Integer tongyi) {
        this.tongyi = tongyi;
    }

    public String getJiaoyiname() {
        return jiaoyiname;
    }

    public void setJiaoyiname(String jiaoyiname) {
        this.jiaoyiname = jiaoyiname;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getJiaoyiid() {
        return jiaoyiid;
    }

    public void setJiaoyiid(Integer jiaoyiid) {
        this.jiaoyiid = jiaoyiid;
    }

    public Integer getUnitprice() {
        return unitprice;
    }

    public void setUnitprice(Integer unitprice) {
        this.unitprice = unitprice;
    }

    public Integer getRefund() {
        return refund;
    }

    public void setRefund(Integer refund) {
        this.refund = refund;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public String getRefundway() {
        return refundway;
    }

    public void setRefundway(String refundway) {
        this.refundway = refundway == null ? null : refundway.trim();
    }

    public String getCause() {
        return cause;
    }

    public void setCause(String cause) {
        this.cause = cause == null ? null : cause.trim();
    }

    public Date getApplytime() {
        return applytime;
    }

    public void setApplytime(Date applytime) {
        this.applytime = applytime;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}