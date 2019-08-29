package com.jk.model;


import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

public class Product implements Serializable {


    private static final long serialVersionUID = -7597108645487154778L;
    private Integer productid;       //酒品(编号ID)

    private String productphoto;      //酒品(展示图片)

    private String productname;      //酒品(名称)

    private Integer productpid;      //酒品(分类id)

    private Double productprice;   //酒品(价格)

    private Integer productkucun;   //酒品(库存)

    private Integer productzxl;    //酒品(总销量)
    @DateTimeFormat(pattern="yyyy-MM-dd")
    @JsonFormat(pattern="yyyy-MM-dd",timezone="GMT+8")// 处理从	后端到前端的时间
    private Date productdate;     //酒品(发布时间)

    private String productdescribe;   //酒品(描述/详情)

    private  Integer productsxj;           //酒品(审核/状态)

    private   Integer winejhl;            //酒品(净含量/毫升)
    private   Integer wineyieldlyid;      //酒品(生产地)
    private   Integer winebrandid;        //酒品(品牌id)
    private   String  winexjsj;          //酒品(建议醒酒时间)
    private   String  winemouthfeel;     //酒品(口感)
    private   String  winefragrant;      //酒品(香味)
    private   String  winedpms;          //酒品(搭配美食)
    private   String  wineseze;          //酒品(色泽)
    private   Integer  winedushu;        //酒品(度数)
    private   Double    winegrade;        //酒品(评分)
    private   Integer   winepromotion;    //酒品(优惠/秒杀/促销)
    private   Integer   winehotsale;      //酒品(热卖/火爆)
    private   String    winestore;        // 酒品(储藏条件)

    private  String daoqidate;  //设置到期时间

    private Integer mindushu;
    private Integer maxdushu;
    private Integer minjhl;
    private Integer maxjhl;
    private Integer minprice;
    private Integer maxprice;

    public Integer getProductid() {
        return productid;
    }

    public void setProductid(Integer productid) {
        this.productid = productid;
    }

    public String getProductphoto() {
        return productphoto;
    }

    public void setProductphoto(String productphoto) {
        this.productphoto = productphoto;
    }

    public String getProductname() {
        return productname;
    }

    public void setProductname(String productname) {
        this.productname = productname;
    }

    public Integer getProductpid() {
        return productpid;
    }

    public void setProductpid(Integer productpid) {
        this.productpid = productpid;
    }

    public Double getProductprice() {
        return productprice;
    }

    public void setProductprice(Double productprice) {
        this.productprice = productprice;
    }

    public Integer getProductkucun() {
        return productkucun;
    }

    public void setProductkucun(Integer productkucun) {
        this.productkucun = productkucun;
    }

    public Integer getProductzxl() {
        return productzxl;
    }

    public void setProductzxl(Integer productzxl) {
        this.productzxl = productzxl;
    }

    public Date getProductdate() {
        return productdate;
    }

    public void setProductdate(Date productdate) {
        this.productdate = productdate;
    }

    public String getProductdescribe() {
        return productdescribe;
    }

    public void setProductdescribe(String productdescribe) {
        this.productdescribe = productdescribe;
    }

    public Integer getProductsxj() {
        return productsxj;
    }

    public void setProductsxj(Integer productsxj) {
        this.productsxj = productsxj;
    }

    public Integer getWinejhl() {
        return winejhl;
    }

    public void setWinejhl(Integer winejhl) {
        this.winejhl = winejhl;
    }

    public Integer getWineyieldlyid() {
        return wineyieldlyid;
    }

    public void setWineyieldlyid(Integer wineyieldlyid) {
        this.wineyieldlyid = wineyieldlyid;
    }

    public Integer getWinebrandid() {
        return winebrandid;
    }

    public void setWinebrandid(Integer winebrandid) {
        this.winebrandid = winebrandid;
    }

    public String getWinexjsj() {
        return winexjsj;
    }

    public void setWinexjsj(String winexjsj) {
        this.winexjsj = winexjsj;
    }

    public String getWinemouthfeel() {
        return winemouthfeel;
    }

    public void setWinemouthfeel(String winemouthfeel) {
        this.winemouthfeel = winemouthfeel;
    }

    public String getWinefragrant() {
        return winefragrant;
    }

    public void setWinefragrant(String winefragrant) {
        this.winefragrant = winefragrant;
    }

    public String getWinedpms() {
        return winedpms;
    }

    public void setWinedpms(String winedpms) {
        this.winedpms = winedpms;
    }

    public String getWineseze() {
        return wineseze;
    }

    public void setWineseze(String wineseze) {
        this.wineseze = wineseze;
    }

    public Integer getWinedushu() {
        return winedushu;
    }

    public void setWinedushu(Integer winedushu) {
        this.winedushu = winedushu;
    }

    public Double getWinegrade() {
        return winegrade;
    }

    public void setWinegrade(Double winegrade) {
        this.winegrade = winegrade;
    }

    public Integer getWinepromotion() {
        return winepromotion;
    }

    public void setWinepromotion(Integer winepromotion) {
        this.winepromotion = winepromotion;
    }

    public Integer getWinehotsale() {
        return winehotsale;
    }

    public void setWinehotsale(Integer winehotsale) {
        this.winehotsale = winehotsale;
    }

    public String getWinestore() {
        return winestore;
    }

    public void setWinestore(String winestore) {
        this.winestore = winestore;
    }

    public String getDaoqidate() {
        return daoqidate;
    }

    public void setDaoqidate(String daoqidate) {
        this.daoqidate = daoqidate;
    }

    public Integer getMindushu() {
        return mindushu;
    }

    public void setMindushu(Integer mindushu) {
        this.mindushu = mindushu;
    }

    public Integer getMaxdushu() {
        return maxdushu;
    }

    public void setMaxdushu(Integer maxdushu) {
        this.maxdushu = maxdushu;
    }

    public Integer getMinjhl() {
        return minjhl;
    }

    public void setMinjhl(Integer minjhl) {
        this.minjhl = minjhl;
    }

    public Integer getMaxjhl() {
        return maxjhl;
    }

    public void setMaxjhl(Integer maxjhl) {
        this.maxjhl = maxjhl;
    }

    public Integer getMinprice() {
        return minprice;
    }

    public void setMinprice(Integer minprice) {
        this.minprice = minprice;
    }

    public Integer getMaxprice() {
        return maxprice;
    }

    public void setMaxprice(Integer maxprice) {
        this.maxprice = maxprice;
    }
}