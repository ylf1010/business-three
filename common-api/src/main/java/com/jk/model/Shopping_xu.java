package com.jk.model;

import java.io.Serializable;

public class Shopping_xu implements Serializable {
    private   String id;
    private   Integer productid;  //商品id
    private   Integer productcount;  //数量
    private   Integer productkucun;  //库存
    private   String productphoto;  //图片
    private   String productname;   //商品名
    private   Double productprice;  //价格
    private   Integer winejhl;      //毫升
    private   Integer winedushu;   //度数


    public Integer getProductkucun() {
        return productkucun;
    }

    public void setProductkucun(Integer productkucun) {
        this.productkucun = productkucun;
    }

    public Integer getProductcount() {
        return productcount;
    }

    public void setProductcount(Integer productcount) {
        this.productcount = productcount;
    }

    public Integer getProductid() {
        return productid;
    }

    public String getProductphoto() {
        return productphoto;
    }

    public String getProductname() {
        return productname;
    }

    public Double getProductprice() {
        return productprice;
    }

    public Integer getWinejhl() {
        return winejhl;
    }

    public Integer getWinedushu() {
        return winedushu;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setProductid(Integer productid) {
        this.productid = productid;
    }

    public void setProductphoto(String productphoto) {
        this.productphoto = productphoto;
    }

    public void setProductname(String productname) {
        this.productname = productname;
    }

    public void setProductprice(Double productprice) {
        this.productprice = productprice;
    }

    public void setWinejhl(Integer winejhl) {
        this.winejhl = winejhl;
    }

    public void setWinedushu(Integer winedushu) {
        this.winedushu = winedushu;
    }



}
