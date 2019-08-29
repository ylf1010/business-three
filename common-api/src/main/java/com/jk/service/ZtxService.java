package com.jk.service;

import com.jk.model.*;
import com.jk.util.ParameUtil;

import java.util.List;

public interface ZtxService {
    List<ZtxTree> querytree(Integer id);

    List queryrole(ParameUtil param);

    Long queryrolecount(ParameUtil param);

    List<ZtxTree> edittree(Integer roleid);

    void updatetree(Integer[] ids, Integer roleid);

    void addrole(ZtxRole role);

    void deleterole(String ids);

    List queryuser(ParameUtil param);

    Long queryusercount(ParameUtil param);

    List<ZtxRole> editrole(Integer id);

    void updaterole(Integer[] ids, Integer id);

    void deleteuser(String ids);

    void updatestatus(Integer id, Integer status);

    void updatero(Integer ids, Integer id);

    List<ZtxTree> querytreebyrid(Integer id, int pid);

    List<String> queryrolebyid(Integer id);

    void updaterolecount(int i, Integer ids);

    List<ZtxRole> querytype();

    User upduser(Integer id);

    void updateuser(User user);

    void adduser(User user);

    void updateproduct(Integer id, Integer state);

    List querydsh(ParameUtil param);

    Long querydshcount(ParameUtil param);

    List queryytg(ParameUtil param);

    Long queryytgcount(ParameUtil param);

    List<ZtxBrand> querybrand(Integer typeid);

    List<ZtxShi> queryshi(Integer orignshengid);

    List<ZtxBrand> querybrandall();

    List<Lunbo> queryimg();

    List<Product> queryfkqg();

    List<Product> queryxsms();

    List<ZtxShi> queryfrom();

    List<Product> querytiaojian(Product pro);

    Product queryone(Integer productid);

    List<Classify> queryClassify();

    List<Product> querybaijiu(Integer productpid);
}
