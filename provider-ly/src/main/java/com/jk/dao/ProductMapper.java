package com.jk.dao;

import com.jk.model.Product;
import com.jk.util.ParameUtil;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface ProductMapper {
    int deleteByPrimaryKey(Integer productid);

    int insert(Product record);

    int insertSelective(Product record);

    Product selectByPrimaryKey(String productid);

    int updateByPrimaryKeySelective(Product record);

    int updateByPrimaryKey(Product record);

    List<Product> querylyProduct(ParameUtil parame);

    void updateproductzt(@Param("productid") int productid, @Param("zt") int zt);

    void addProduct(Product product);

    void delProduct(@Param("dids") String dids);

    Product queryProductPage(@Param("productid") String productid);

    Product queryMiaosha(@Param("productid") Integer productid);

    @Select("select * from ly_product")
    List<Product> querymiaosha();
}