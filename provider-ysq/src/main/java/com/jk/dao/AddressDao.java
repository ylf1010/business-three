package com.jk.dao;

import com.jk.model.Addressysq;
import com.jk.model.Product;
import com.jk.model.YsqJiaoYi;

import java.util.List;

public interface AddressDao {
    List<Product> addJiaoYi(Integer productid);

    List<Addressysq> chaAddress(Integer id);

    void updateJiaoYiState(Integer ordernumber);

    List<Product> chaJiaoYi(Integer productid);

    void addressDiZhi(Addressysq addressysq);

    void deleteAddress(String id);

    void addressDiZhiXiuGai(Addressysq addressysq);

    Product queryProductById(String id);

    void addDingDan(YsqJiaoYi jiaoYi);

    List<Product> chaShopping(int[] productid);

    List<Product> queryProductByIdAll(int[] id);

    void addDingDan1(List<YsqJiaoYi> range);

    void updateProduct(String productid, Integer amount);
}
