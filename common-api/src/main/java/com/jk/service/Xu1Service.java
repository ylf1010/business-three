package com.jk.service;

import com.jk.model.History;
import com.jk.model.Product;
import com.jk.model.Shopping_xu;
import com.jk.model.Youhiu_xu;

import java.util.List;
import java.util.Map;

public interface Xu1Service {
    void addshopping(Shopping_xu sho, Integer id);

    List<Shopping_xu> listshopping(Integer id);

    void deleteshopping(Integer id, Integer uid);

    void addshoucang(Shopping_xu sho, Integer uid);

    List<Shopping_xu> listshoucang(Integer id);

    void updatecount(Integer[] productid, Integer[] count, double[] productprice, Integer uid);

    List<Youhiu_xu> listyouhiujuan();

    List<Youhiu_xu> listyouhiujuan2();

    List<Product> history(Integer keid);

    Integer LingQuYouHiuJuan(Integer hyid, Integer keid);

    List<Youhiu_xu> YouHiuJuanCha(Integer keid);
}
