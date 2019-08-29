package com.jk.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

public class Youhiu_xu implements Serializable {
    private  Integer  yhid;
    private  String  yhname;
    private  Integer   shangpinid;
    private  String  yhtype;
    private  Integer   man;
    private  Integer   jian;
    private  Integer   shuliang;
    private  Integer   xianling;
    @DateTimeFormat(pattern="yyyy-MM-dd")   // 处理从 前端到后端的时间
    @JsonFormat(pattern="yyyy-MM-dd",timezone="GMT+8")   // 处理从	后端到前端的时间
    private  Date   stadate;
    @DateTimeFormat(pattern="yyyy-MM-dd")   // 处理从 前端到后端的时间
    @JsonFormat(pattern="yyyy-MM-dd",timezone="GMT+8")   // 处理从	后端到前端的时间
    private Date enddate;
    @DateTimeFormat(pattern="yyyy-MM-dd")   // 处理从 前端到后端的时间
    @JsonFormat(pattern="yyyy-MM-dd",timezone="GMT+8")   // 处理从	后端到前端的时间
    private  Date   cuangdate;
    private  String   shuoming;
    private  String   lianjie;
    private  String productphoto;
    private Integer  member;

    public Integer getMember() {
        return member;
    }

    public void setMember(Integer member) {
        this.member = member;
    }

    public String getProductphoto() {
        return productphoto;
    }

    public void setProductphoto(String productphoto) {
        this.productphoto = productphoto;
    }

    public void setYhid(Integer yhid) {
        this.yhid = yhid;
    }

    public void setYhname(String yhname) {
        this.yhname = yhname;
    }

    public void setShangpinid(Integer shangpinid) {
        this.shangpinid = shangpinid;
    }

    public void setYhtype(String yhtype) {
        this.yhtype = yhtype;
    }

    public void setMan(Integer man) {
        this.man = man;
    }

    public void setJian(Integer jian) {
        this.jian = jian;
    }

    public void setShuliang(Integer shuliang) {
        this.shuliang = shuliang;
    }

    public void setXianling(Integer xianling) {
        this.xianling = xianling;
    }


    public void setShuoming(String shuoming) {
        this.shuoming = shuoming;
    }

    public void setLianjie(String lianjie) {
        this.lianjie = lianjie;
    }

    public Integer getYhid() {
        return yhid;
    }

    public String getYhname() {
        return yhname;
    }

    public Integer getShangpinid() {
        return shangpinid;
    }

    public String getYhtype() {
        return yhtype;
    }

    public Integer getMan() {
        return man;
    }

    public Integer getJian() {
        return jian;
    }

    public Integer getShuliang() {
        return shuliang;
    }

    public Integer getXianling() {
        return xianling;
    }



    public String getShuoming() {
        return shuoming;
    }

    public String getLianjie() {
        return lianjie;
    }

    public void setStadate(Date stadate) {
        this.stadate = stadate;
    }

    public void setEnddate(Date enddate) {
        this.enddate = enddate;
    }

    public void setCuangdate(Date cuangdate) {
        this.cuangdate = cuangdate;
    }

    public Date getStadate() {
        return stadate;
    }

    public Date getEnddate() {
        return enddate;
    }

    public Date getCuangdate() {
        return cuangdate;
    }
}
