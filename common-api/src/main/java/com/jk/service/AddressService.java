package com.jk.service;

import com.jk.model.Addressysq;
import com.jk.model.Product;
import com.jk.model.Shopping_xu;

import java.util.List;

public interface AddressService {
    List<Product> addJiaoYi(Integer productid);

    List<Addressysq> chaAddress(Integer id);

    void updateJiaoYiState(Integer ordernumber);

    List<Product> chaJiaoYi(Integer productid);

    void addressDiZhi(Addressysq addressysq);

    void deleteAddress(String id);

    String addDingDan(Shopping_xu shopping, Integer id,Integer addressid);

    String addDingDan2(Product product, Integer id,Integer addressid);

    List<Shopping_xu> chaShopping(int[] productid, Integer userid);

    String addDingDanAll(int[] id, Integer userid, Integer adduserid);

    void addDingDan1(Integer id);
}
