package com.jk.util;

import java.io.Serializable;

public class BootStrapUtil implements Serializable {
    private Integer pageNumber;  //当前页
    private Integer pageSize;     //每页几条
    private String sortName;      //排序字段
    private String sortOrder;    //正序或倒序
    private String name;       //名称或手机查询
    private Integer hiuyuan;       //是否会员
    private  Integer stajifen;      //积分
    private  Integer endjifen;   //积分 区查
    private  Integer zuselect1;   //分组

    public Integer getZuselect1() {
        return zuselect1;
    }

    public void setZuselect1(Integer zuselect1) {
        this.zuselect1 = zuselect1;
    }

    public Integer getPageNumber() {
        return pageNumber;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public String getSortName() {
        return sortName;
    }

    public String getSortOrder() {
        return sortOrder;
    }

    public String getName() {
        return name;
    }

    public Integer getHiuyuan() {
        return hiuyuan;
    }

    public Integer getStajifen() {
        return stajifen;
    }

    public Integer getEndjifen() {
        return endjifen;
    }

    public void setPageNumber(Integer pageNumber) {
        this.pageNumber = pageNumber;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public void setSortName(String sortName) {
        this.sortName = sortName;
    }

    public void setSortOrder(String sortOrder) {
        this.sortOrder = sortOrder;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setHiuyuan(Integer hiuyuan) {
        this.hiuyuan = hiuyuan;
    }

    public void setStajifen(Integer stajifen) {
        this.stajifen = stajifen;
    }

    public void setEndjifen(Integer endjifen) {
        this.endjifen = endjifen;
    }
}
