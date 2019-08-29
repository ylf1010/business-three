package com.jk.dao;

import com.jk.model.Classify;
import com.jk.model.Lunbo;
import com.jk.model.Product;
import com.jk.model.ZtxRoleTree;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface ZtxRoleTreeMapper {

    List<String> querytreebyid(Integer roleid);

    @Delete("delete from y_role_tree where roleid=#{roleid}")
    int deletetree(Integer roleid);
    @Insert("insert into y_role_tree(roleid,treeid) values (#{roleid},#{treeid})")
    int addrtm(ZtxRoleTree rpm);

    @Select("select * from ly_lunbotu")
    List<Lunbo> queryimg();

    List<Product> querytiaojian(@Param("p") Product pro);

    @Select("select * from ly_product where productid=#{productid}")
    Product queryone(@Param("productid") Integer productid);
    @Select("select * from ly_classify ")
    List<Classify> queryClassify();
    @Select("select * from ly_product where productpid=#{productpid}")
    List<Product> querybaijiu(@Param("productpid")Integer productpid);
}