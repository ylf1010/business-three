package com.jk.service;


import com.alibaba.dubbo.config.annotation.Service;
import com.jk.dao.XuDao;
import com.jk.model.*;
import com.jk.util.BootStrapUtil;
import com.jk.util.RowsTotal;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class XuServiceImpl  implements  XuService{
            //客户管理
        @Autowired
    private XuDao xu;


        //客户列表查询
    @Override
    public RowsTotal xkehulist(BootStrapUtil bt) {

        Map map=new HashMap();
        //条件
        map.put("name",bt.getName());
        map.put("hiuyuan",bt.getHiuyuan());
        map.put("stajifen",bt.getStajifen());
        map.put("endjifen",bt.getEndjifen());
        map.put("zuselect1",bt.getZuselect1());

        //分页
        Integer total=xu.xkehulistcount(map);  //总条数
        map.put("sta", (bt.getPageNumber()-1)*bt.getPageSize());
        map.put("end", bt.getPageSize());
        List<User_xu>  list=xu.xkehulist(map);
        RowsTotal  r=new RowsTotal();
        r.setTotal(total);
        r.setRows(list);
        return r;
    }

    //批删
    @Override
    public void xdelete1(String[] ids) {
        Integer a=xu.xdelete1(ids); //删除客户信息
        if (a > 0){
            xu.xdelete1jifen(ids);  //删除客户同时删除对应积分信息
        }
    }

    //下拉 分组
    @Override
    public List<Zu_xu> xxiala1() {
        return xu.xxiala1();
    }

    //标签下拉查
    @Override
    public List<BiaoQian_xu> xXiaLaBiaoQian() {
        return xu.xXiaLaBiaoQian();
    }

    //客户改标签
    @Override
    public void xupdateBiaoQian(User_xu userke) {
        xu.xupdateBiaoQian(userke);
    }

    //移动移出分组
    @Override
    public void xupdate1(Integer[] ids, Integer a) {
        for (int i=0; i<ids.length;i++){
            xu.xupdate1(ids[i],a);
        }

    }

    //新建分组
    @Override
    public void xaddfenzu(Zu_xu zu) {
        xu.xaddfenzu(zu);
    }

    //客户详情查询
    @Override
    public List<User_xu> xkehuxiangqing(Integer keid) {
        return xu.xkehuxiangqing(keid);
    }

    //详情页  修改客户信息
    @Override
    public void xupdatekehu(User_xu userx) {
        xu.xupdatekehu(userx);
    }

    //详情页  加积分
    @Override
    public void xupdatejifen(Jifen_xu jifen) {
        jifen.setJftype(2);
        jifen.setCzdate(new Date());
        jifen.setGlname("管理员");  //默认管理 可根据登录的管理员获取
        xu.xupdatejifen(jifen);
    }


    //会员
    //会员列表查询
    @Override
    public RowsTotal uhiuyuancha(BootStrapUtil bt) {
        Map map = new HashMap();
        //条件
        map.put("name", "%" + bt.getName() + "%");
        //分页
        Integer total = xu.uhiuyuancount(map);  //总条数
        map.put("sta", (bt.getPageNumber() - 1) * bt.getPageSize());
        map.put("end", bt.getPageSize());
        List<Um_xu> list = xu.uhiuyuancha(map);
        RowsTotal r = new RowsTotal();
        r.setTotal(total);
        r.setRows(list);
        return r;
    }

    //批量   取消会员
    @Override
    public void quxiaohiuyuan(String[] ids) {
        Integer a = xu.quxiaohiuyuan(ids);
        if (a > 0) {
            xu.deleteum_xu(ids);  //更改客户同时删除对应会员中间表信息
        }
    }

    //赠送会员  下拉查
    @Override
    public List<Member_xu> uXiaLaHiuYuan() {

        return xu.uXiaLaHiuYuan();
    }

    //赠送会员 修改
    @Override
    public void uZengHiuYuan(Um_xu um) {
       Integer a= xu.uZengHiuYuan(um);
        if (a > 0) {
            xu.uupdateKeHu(um);  //更改客户同时删除对应会员中间表信息
        }
    }

    //会员设置 查询
    @Override
    public List<Member_xu> uHiuYuanShezhi() {
        return xu.uHiuYuanShezhi();
    }

    //会员新增 修改
    @Override
    public void uaddHiuYuan(Member_xu mem) {
        if (mem.getHyid() != null) {
            xu.uupdateHiuYuan(mem);  //有id修改
        } else {
            xu.uaddHiuYuan(mem);   //新增
        }
    }

    //会员开启 关闭
    @Override
    public void udeleteHiuYuan(Integer hyid,Integer a) {
        xu.udeleteHiuYuan(hyid,a);
    }


    //积分
    //积分消耗发放查询
    @Override
    public RowsTotal uJiFenCha(BootStrapUtil bt) {
        Map map = new HashMap();
        //条件
        map.put("stajifen", bt.getStajifen());
        //分页
        Integer total = xu.uJiFencount(map);  //总条数
        map.put("sta", (bt.getPageNumber() - 1) * bt.getPageSize());
        map.put("end", bt.getPageSize());
        List<Jifen_xu> list = xu.uJiFenCha(map);
        RowsTotal r = new RowsTotal();
        r.setTotal(total);
        r.setRows(list);
        return r;
    }


    //标签管理 查询
    @Override
    public RowsTotal uBiaoQianCha() {
        List<BiaoQian_xu> list = xu.uBiaoQianCha();
        RowsTotal r = new RowsTotal();
        r.setRows(list);
        return r;
    }

    //标签 增 改
    @Override
    public void uaddBiaoQian(BiaoQian_xu bq) {
        if (bq.getBqid() != null) {
            xu.uupdateBiaoQian(bq);  //有id修改
        } else {
            bq.setBqdate(new Date());
            xu.uaddBiaoQian(bq);   //新增
        }
    }

    //标签删
    @Override
    public void udeleteBiaoQian(Integer bqid) {
        Integer a=xu.udeleteBiaoQian(bqid);
        if(a > 0){
            //删除标签后 所有使用此标签的客户 改为默认1空
            xu.uupdateKeHuBiaoQian(bqid);
        }
    }


               //优惠劵
    //优惠劵查
    @Override
    public List<Youhiu_xu> ulistyouhiu(BootStrapUtil bt) {

        List<Youhiu_xu> list = xu.ulistyouhiu(bt);
        return list;
    }
    //优惠劵增 改
    @Override
    public void uaddyouhiu(Youhiu_xu youhiu) {
        if (youhiu.getYhid() != null) {
            xu.uupdateyouhiu(youhiu);  //有id修改
        } else {

            xu.uaddyouhiu(youhiu);   //新增
        }
    }

    //优惠劵删
    @Override
    public void udeleteyouhiu(String[] ids) {
            xu.udeleteyouhiu(ids);
    }

}
