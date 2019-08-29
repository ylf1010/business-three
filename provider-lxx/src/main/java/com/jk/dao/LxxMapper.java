package com.jk.dao;

import com.jk.model.*;
import com.jk.util.ParameUtil;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

public interface LxxMapper {


    //新增店铺
    int addShop(RenZhengBean renZhengBean);

    //地区三级联动
    @Select("select * from area_lxx where pid = #{value}")
    List<AreaBeanLxx> findArea(Integer id);

    //查询店铺列表
    @Select(" select * from dianpu_lxx ")
    List<RenZhengBean> queryDp(ParameUtil parame);

    //根据id查询
    @Select(" select * from dianpu_lxx where id = #{value} ")
    RenZhengBean findById(Integer id);

    //个人进行认证
    void addEnterprise(RenZhengBean renZhengBean);

    //企业进行认证
    void addIndividual(RenZhengBean renZhengBean);

    //审核店铺列表查询
    @Select(" select * from dianpu_lxx where shzt = 1 ")
    List<RenZhengBean> Audit(ParameUtil parame);

    //审核通过
    @Update(" update dianpu_lxx set shzt = 2 where id = #{id} ")
    void Pass(RenZhengBean renZhengBean);

    //审核不通过
    @Update(" update dianpu_lxx set shzt = 3 where id = #{id} ")
    void Not(RenZhengBean renZhengBean);

    //登录
    @Select(" select * from xu_user where username = #{username} ")
    User_xu loginUser(User_xu user);

    //注册
    void addregisUser(User_xu user);

    //用户表获取id
    @Select(" select max(keid) from xu_user  ")
    int findId(User_xu user);

    //新增积分表uid
    void addJf(Integer uid);

    //积分表获取id
    @Select(" select max(jfid) from xu_jifen  ")
    int findJfId(Jifen_xu jifenXu);

    //更改用户表积分id
    void updateJfid(Integer jfids, Integer uid);

    //查询代付款订单
    List<YsqJiaoYi> queryPaymentOnBehalfOfOthers(Integer keid);

    //查询代发货订单
    List<YsqJiaoYi> queryDropShipping(Integer keid);

    //查询已发货订单
    List<YsqJiaoYi> queryShippedOrder(Integer keid);

    //查询已完成订单
    List<YsqJiaoYi> queryOffTheStocks(Integer keid);

    //查询已关闭订单
    List<YsqJiaoYi> queryClose(Integer keid);

    //查询已退款订单
    List<YsqJiaoYi> queryRefund(Integer keid);

    //查询个人中心
    List<User_xu> queryIntegral(Integer keid);


}
