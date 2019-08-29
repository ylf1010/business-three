package com.jk.service;

import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jk.dao.LxxMapper;
import com.jk.model.*;
import com.jk.util.PageUtil;
import com.jk.util.ParameUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class LxxServiceImpl implements  LxxService {
    @Autowired
    private LxxMapper lxxMapper;

    //新增店铺
    public int addShop(RenZhengBean renZhengBean) {

        int i = lxxMapper.addShop(renZhengBean);
        return i;

    }

    //三级联动
    public List<AreaBeanLxx> findArea(Integer id) {
        return lxxMapper.findArea(id);
    }

    //查询店铺
    public PageUtil queryDp(ParameUtil parame) {

        PageHelper.startPage(parame.getPageNumber(), parame.getPageSize());

        List<RenZhengBean> list = lxxMapper.queryDp(parame);

        PageInfo<RenZhengBean> pageInfo = new PageInfo<RenZhengBean>(list);

        PageUtil pageUtil = new PageUtil((int) pageInfo.getTotal(), parame.getPageNumber(), parame.getPageSize());

        pageUtil.setList(list);

        return pageUtil;
    }

    @Override
    public RenZhengBean findById(Integer id) {
        return lxxMapper.findById(id);
    }

    //新增企业认证
    @Override
    public void addEnterprise(RenZhengBean renZhengBean) {
        lxxMapper.addEnterprise(renZhengBean);
    }

    //新增个人认证
    @Override
    public void addIndividual(RenZhengBean renZhengBean) {
        lxxMapper.addIndividual(renZhengBean);
    }

    //店铺审核列表
    @Override
    public PageUtil Audit(ParameUtil parame) {

        PageHelper.startPage(parame.getPageNumber(), parame.getPageSize());

        List<RenZhengBean> list = lxxMapper.Audit(parame);

        PageInfo<RenZhengBean> pageInfo = new PageInfo<RenZhengBean>(list);

        PageUtil pageUtil = new PageUtil((int) pageInfo.getTotal(), parame.getPageNumber(), parame.getPageSize());

        pageUtil.setList(list);

        return pageUtil;
    }

    //审核通过
    @Override
    public void Pass(RenZhengBean renZhengBean) {
        lxxMapper.Pass(renZhengBean);
    }

    //审核不通过
    @Override
    public void Not(RenZhengBean renZhengBean) {
        lxxMapper.Not(renZhengBean);
    }

//登录
    @Override
    public User_xu loginUser(User_xu user) {
        return lxxMapper.loginUser(user);
    }


//注册
    @Override
    public void addregisUser(User_xu user) {
        //新增用户
        lxxMapper.addregisUser(user);
        //获取新增用户id
        int id = lxxMapper.findId(user);
        Jifen_xu jifenXu = new Jifen_xu();
        jifenXu.setUid(id);
        Integer uid = jifenXu.getUid();
        System.out.println(uid);
        //将得到的id与积分表id对应
        lxxMapper.addJf(uid);
        //获取积分表新增数据id
        int ids = lxxMapper.findJfId(jifenXu);
        User_xu userXu = new User_xu();
        userXu.setJfid(ids);
        Integer jfids = userXu.getJfid();
        System.out.println(jfids);
        lxxMapper.updateJfid(jfids,uid);
    }




    //待付款
    @Override
    public List<YsqJiaoYi> queryPaymentOnBehalfOfOthers(Integer keid) {
        return lxxMapper.queryPaymentOnBehalfOfOthers(keid);
    }
//待发货
    @Override
    public List<YsqJiaoYi> queryDropShipping(Integer keid) {
        return lxxMapper.queryDropShipping(keid);
    }
//已发货
    @Override
    public List<YsqJiaoYi> queryShippedOrder(Integer keid) {
        return lxxMapper.queryShippedOrder(keid);
    }
//已完成
    @Override
    public List<YsqJiaoYi> queryOffTheStocks(Integer keid) {
        return lxxMapper.queryOffTheStocks(keid);
    }
//已关闭
    @Override
    public List<YsqJiaoYi> queryClose(Integer keid) {
        return lxxMapper.queryClose(keid);
    }
//退款中
    @Override
    public List<YsqJiaoYi> queryRefund(Integer keid) {
        return lxxMapper.queryRefund(keid);
    }

    //查询个人中心
    @Override
    public List<User_xu> queryIntegral(Integer keid) {
        return lxxMapper.queryIntegral(keid);
    }




}
