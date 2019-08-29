package com.jk.dao;

import com.jk.model.Product;
import com.jk.model.ZtxBrand;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface ZtxBrandMapper {
    int deleteByPrimaryKey(Integer brandid);

    int insert(ZtxBrand record);

    int insertSelective(ZtxBrand record);

    ZtxBrand selectByPrimaryKey(Integer brandid);

    int updateByPrimaryKeySelective(ZtxBrand record);

    int updateByPrimaryKey(ZtxBrand record);

    @Select("select * from ly_brand where typeid=#{typeid}")
    List<ZtxBrand> querybrand(Integer typeid);
    @Select("select * from ly_brand ")
    List<ZtxBrand> querybrandall();



    @Select("select * from ly_product where productsxj=5 order by productkucun ")
    List<Product> queryfkqg();

    @Select("select * from ly_product where productsxj=5 order by productzxl desc")
    List<Product> queryxsms();
}