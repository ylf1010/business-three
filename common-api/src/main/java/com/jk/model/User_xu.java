package com.jk.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

public class User_xu implements Serializable {
      //客户user表
    private  Integer keid;
    private  String img;
    private  String nickname;
    private  String phone;
    private  String sex;
    private  String source;
    private  String weixin;
    @DateTimeFormat(pattern="yyyy-MM-dd")   // 处理从 前端到后端的时间
    @JsonFormat(pattern="yyyy-MM-dd",timezone="GMT+8")   // 处理从	后端到前端的时间
    private  Date statime;
    @DateTimeFormat(pattern="yyyy-MM-dd")   // 处理从 前端到后端的时间
    @JsonFormat(pattern="yyyy-MM-dd",timezone="GMT+8")   // 处理从	后端到前端的时间
    private Date endtime;
    private  Integer jfid;
    private  Integer member;
    private  String remark;
    private  Integer bqid;

    //用户账号
    private String  username;

    //用户密码
    private String  userpass;

    //分组的字段
    private  Integer zuid;
    private  String zuname;
    //会员级别
    private  String rank;
    private  Integer hystatus;
   //积分
   private  Integer jfsum;
   //标签
    private  String  bqname;
    //备注
    private String content;

    public String getUserpass() {
        return userpass;
    }

    public void setUserpass(String userpass) {
        this.userpass = userpass;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getHystatus() {
        return hystatus;
    }

    public void setHystatus(Integer hystatus) {
        this.hystatus = hystatus;
    }

    public String getBqname() {
        return bqname;
    }

    public void setBqname(String bqname) {
        this.bqname = bqname;
    }

    public Integer getJfsum() {
        return jfsum;
    }

    public void setJfsum(Integer jfsum) {
        this.jfsum = jfsum;
    }

    public void setRank(String rank) {
        this.rank = rank;
    }

    public String getRank() {
        return rank;
    }

    public Integer getZuid() {
        return zuid;
    }

    public void setZuid(Integer zuid) {
        this.zuid = zuid;
    }

    public void setZuname(String zuname) {
        this.zuname = zuname;
    }

    public String getZuname() {
        return zuname;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public void setKeid(Integer keid) {
        this.keid = keid;
    }

    public String getNickname() {
        return nickname;
    }

    public String getPhone() {
        return phone;
    }

    public String getSex() {
        return sex;
    }

    public String getSource() {
        return source;
    }

    public String getWeixin() {
        return weixin;
    }

    public Date getStatime() {
        return statime;
    }

    public Date getEndtime() {
        return endtime;
    }

    public Integer getJfid() {
        return jfid;
    }

    public Integer getMember() {
        return member;
    }

    public String getRemark() {
        return remark;
    }

    public Integer getBqid() {
        return bqid;
    }

    public Integer getKeid() {
        return keid;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public void setWeixin(String weixin) {
        this.weixin = weixin;
    }

    public void setStatime(Date statime) {
        this.statime = statime;
    }

    public void setEndtime(Date endtime) {
        this.endtime = endtime;
    }

    public void setJfid(Integer jfid) {
        this.jfid = jfid;
    }

    public void setMember(Integer member) {
        this.member = member;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public void setBqid(Integer bqid) {
        this.bqid = bqid;
    }
}
