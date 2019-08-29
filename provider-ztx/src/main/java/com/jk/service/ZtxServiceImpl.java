package com.jk.service;

import com.alibaba.dubbo.config.annotation.Service;
import com.alibaba.fastjson.JSONObject;
import com.jk.dao.*;
import com.jk.model.*;
import com.jk.util.ParameUtil;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ZtxServiceImpl implements ZtxService{

    @Autowired
    private ZtxTreeMapper tm;
    @Autowired
    private ZtxRoleMapper rm;
    @Autowired
    private ZtxRoleTreeMapper rtm;
    @Autowired
    private ZtxUserRoleMapper urm;
    @Autowired
    private ZtxBrandMapper bm;
    @Autowired
    private ZtxShengMapper shengm;
    @Autowired
    private ZtxShiMapper shim;

    @Override
    public List<ZtxTree> querytree(Integer id) {
        return tm.querytree(id);
    }

    @Override
    public List queryrole(ParameUtil param) {
        int papa=(param.getPageNumber()-1)*param.getPageSize();
        return rm.queryrole(param,papa,param.getPageSize());
    }

    @Override
    public Long queryrolecount(ParameUtil param) {
        return rm.queryrolecount(param);
    }

    @Override
    public List<ZtxTree> edittree(Integer roleid) {
        //查出  角色 id  所对应的 菜单 的id
        List<String> list =  rtm.querytreebyid(roleid);
        // 查询所有 的菜单
        List<ZtxTree>  listTwo = tm.querytreeall();
        for (int i = 0; i < list.size(); i++) {
            for (int j = 0; j < listTwo.size(); j++) {
                // 用  原来 选中的 菜单id  和所有的  菜单id  对比 ，对比成功 就选中
                if(list.get(i).equals(listTwo.get(j).getId().toString())){
                    listTwo.get(j).setChecked(true);
                }
            }
        }
        return listTwo;
    }

    @Override
    public void updatetree(Integer[] ids, Integer roleid) {
        //先 删除 原有的 关联
        int i  = rtm.deletetree(roleid);
        //再建立  新的 关联
        if(i >=0){
            for (int j = 0; j < ids.length; j++) {
                ZtxRoleTree rpm = new ZtxRoleTree();
                rpm.setTreeid(ids[j]);
                rpm.setRoleid(roleid);
                i = rtm.addrtm(rpm);
            }
        }
    }

    @Override
    public void addrole(ZtxRole role) {
        rm.addrole(role);
    }

    @Override
    public void deleterole(String  ids) {
        rm.deleterole(ids);
    }

    @Override
    public List queryuser(ParameUtil param) {
        int papa=(param.getPageNumber()-1)*param.getPageSize();
        return rm.queryuser(param,papa,param.getPageSize());
    }

    @Override
    public Long queryusercount(ParameUtil param) {
        return rm.queryusercount(param);
    }

    @Override
    public List<ZtxRole> editrole(Integer id) {
        //查出  角色 id  所对应的 菜单 的id
        List<String> list =  urm.queryrolebyid(id);
        // 查询所有 的菜单
        List<ZtxRole>  listTwo = rm.queryroleall();
        for (int i = 0; i < list.size(); i++) {
            for (int j = 0; j < listTwo.size(); j++) {
                // 用  原来 选中的 菜单id  和所有的  菜单id  对比 ，对比成功 就选中
                if(list.get(i).equals(listTwo.get(j).getRoleid().toString())){
                    listTwo.get(j).setChecked("true");
                }
            }
        }
        return listTwo;
    }

    @Override
    public void updaterole(Integer[] ids, Integer id) {
        //先 删除 原有的 关联
        int i  = urm.deleterole(id);
        //再建立  新的 关联
        if(i >=0){
            for (int j = 0; j < ids.length; j++) {
                ZtxUserRole rpm = new ZtxUserRole();
                rpm.setRoleid(ids[j]);
                rpm.setUserid(id);
                i = urm.addurm(rpm);
            }
        }
    }

    @Override
    public void deleteuser(String ids) {
        rm.deleteuser(ids);
    }

    @Override
    public void updatestatus(Integer id, Integer status) {
        urm.updatestatus(id,status);
    }

    @Override
    public void updatero(Integer ids, Integer id) {
        urm.updatero(ids,id);
    }

    @Override
    public List<ZtxTree> querytreebyrid(Integer id, int pid) {
        JSONObject json =new JSONObject();
        List <ZtxTree> list =queryOrgAll3(pid);
        List <ZtxTree> list2= queryOrgAll2(id,pid);
        Map map=new HashMap();
        for (int i = 0; i < list.size(); i++) {
            for (int j = 0; j < list2.size(); j++) {
                if(list.get(i).getId()==list2.get(j).getId()){
                    list.get(i).getId();
                    json.put("checked", true);
                    list.get(i).setState(json);
                }
            }
            if(list.size()>0){
                for (int s = 0; s < list.size(); s++) {
                    List<ZtxTree>list3=querytreebyrid(id,list.get(s).getId());
                    list.get(s).setNodes(list3);
                }
            }
        }
        return list;
    }

    @Override
    public List<String> queryrolebyid(Integer id) {
        List<String> list =  urm.queryrolebyid(id);
        return list;
    }

    @Override
    public void updaterolecount(int i, Integer ids) {
        rm.updaterolecount1(i);
        rm.updaterolecount2(ids);

    }

    @Override
    public List<ZtxRole> querytype() {
        return rm.queryroleall();
    }

    @Override
    public User upduser(Integer id) {
        return rm.upduser(id);
    }

    @Override
    public void updateuser(User user) {
        rm.updateuser(user);
    }

    @Override
    public void adduser(User user) {
        rm.adduser(user);
        int a=urm.queryidbyname(user.getUsername());
        urm.adduserrole(a,user.getRoleid());
    }

    @Override
    public void updateproduct(Integer id,Integer state) {
        rm.updateproduct(id,state);
    }

    @Override
    public List querydsh(ParameUtil param) {
        int papa=(param.getPageNumber()-1)*param.getPageSize();
        return tm.querydsh(param,papa,param.getPageSize());
    }
    @Override
    public Long querydshcount(ParameUtil param) {
        return tm.querydshcount(param);
    }

    @Override
    public List queryytg(ParameUtil param) {
        int papa=(param.getPageNumber()-1)*param.getPageSize();
        return tm.queryytg(param,papa,param.getPageSize());
    }

    @Override
    public Long queryytgcount(ParameUtil param) {
        return tm.queryytgcount(param);
    }

    @Override
    public List<ZtxBrand> querybrand(Integer typeid) {
        return bm.querybrand(typeid);
    }

    @Override
    public List<ZtxShi> queryshi(Integer orignshengid) {
        return shim.queryshi(orignshengid);
    }

    @Override
    public List<ZtxBrand> querybrandall() {
        return bm.querybrandall();
    }

    @Override
    public List<Lunbo> queryimg() {
        return rtm.queryimg();
    }

    @Override
    public List<Product> queryfkqg() {
        return bm.queryfkqg();
    }

    @Override
    public List<Product> queryxsms() {
        return bm.queryxsms();
    }

    @Override
    public List<ZtxShi> queryfrom() {
        return shim.queryfrom();
    }

    @Override
    public List<Product> querytiaojian(Product pro) {
        return rtm.querytiaojian(pro);
    }

    @Override
    public Product queryone(Integer productid) {
        return rtm.queryone(productid);
    }

    @Override
    public List<Classify> queryClassify() {
        return rtm.queryClassify();
    }

    @Override
    public List<Product> querybaijiu(Integer productpid) {
        return rtm.querybaijiu(productpid);
    }


    public List<ZtxTree> queryOrgAll2(int id, int pid) {
        // 根据pid查询子节点
        List<ZtxTree> orgs = tm.queryOrgAll2(id,pid);
        // 如果查询到子节点集合
        if(orgs != null && orgs.size()>0){
            // 循环集合，将每个机构对象的id作为pid 继续查询子节点集合
            for (int i = 0; i < orgs.size(); i++) {
                List<ZtxTree> orgs2 = queryOrgAll2(id,orgs.get(i).getId());
                // 将查询的子节点集合放到该结构对象的children属性中
                orgs.get(i).setNodes(orgs2);
            }
        }
        return orgs;
    }

    public List<ZtxTree> queryOrgAll3(int pid) {
        // 根据pid查询子节点
        List<ZtxTree> orgs = tm.queryOrgAll3(pid);
        // 如果查询到子节点集合
        if(orgs != null && orgs.size()>0){
            // 循环集合，将每个机构对象的id作为pid 继续查询子节点集合
            for (int i = 0; i < orgs.size(); i++) {
                List<ZtxTree> orgs2 = queryOrgAll3(orgs.get(i).getId());
                // 将查询的子节点集合放到该结构对象的children属性中
                orgs.get(i).setNodes(orgs2);
            }
        }
        return orgs;
    }


}
