package com.jk.dao;

import com.jk.model.Product;
import com.jk.model.Shopping_xu;
import com.jk.model.Youhiu_xu;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

public interface Xu1Dao {
    @Select("select a.*,b.productphoto from xu_youhiu a,ly_product b where a.shangpinid=b.productid and enddate >= now() and a.member=1 ")
    List<Youhiu_xu> listyouhiujuan();

    @Select("select a.*,b.productphoto from xu_youhiu a,ly_product b where a.shangpinid=b.productid and enddate >= now() and a.member!=1 ")
    List<Youhiu_xu> listyouhiujuan2();

    @Select(" select productid,productkucun,productphoto,productname,productprice,winejhl,winedushu  from ly_product  where productid=#{productid} ")
    Shopping_xu listshopping(Integer productid);

    List<Product> history(String[] ids1);

    List<Youhiu_xu> YouHiuJuanCha(String[] ids);

    @Update("update  xu_youhiu set shuliang=shuliang-1 where yhid=#{yhid}")
    void LingQuYouHiuJuan(Integer yhid);
}
