package com.jk.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

public class Um_xu implements Serializable {
         //会员列表（客户与会员中间表）
    private   Integer umid;
    private   Integer uid;
    private   Integer mid;
    @DateTimeFormat(pattern="yyyy-MM-dd")   // 处理从 前端到后端的时间
    @JsonFormat(pattern="yyyy-MM-dd",timezone="GMT+8")   // 处
    private Date addate;
    @DateTimeFormat(pattern="yyyy-MM-dd")   // 处理从 前端到后端的时间
    @JsonFormat(pattern="yyyy-MM-dd",timezone="GMT+8")   // 处
    private   Date bddate;

      //客户表
      private   Integer  keid;
      private   String  img;
     private   String  nickname;
     private   String  phone;
     //会员表
     private   String  rank;
    private   Integer  price;



    public Integer getKeid() {

        return keid;
    }

    public void setKeid(Integer keid) {
        this.keid = keid;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setRank(String rank) {
        this.rank = rank;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public String getImg() {
        return img;
    }

    public String getNickname() {
        return nickname;
    }

    public String getPhone() {
        return phone;
    }

    public String getRank() {
        return rank;
    }

    public Integer getPrice() {
        return price;
    }

    public Integer getUmid() {
        return umid;
    }

    public Integer getUid() {
        return uid;
    }

    public Integer getMid() {
        return mid;
    }

    public Date getAddate() {
        return addate;
    }

    public Date getBddate() {
        return bddate;
    }

    public void setUmid(Integer umid) {
        this.umid = umid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public void setMid(Integer mid) {
        this.mid = mid;
    }

    public void setAddate(Date addate) {
        this.addate = addate;
    }

    public void setBddate(Date bddate) {
        this.bddate = bddate;
    }
}
