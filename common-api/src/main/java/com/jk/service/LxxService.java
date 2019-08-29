package com.jk.service;

import com.jk.model.*;
import com.jk.util.PageUtil;
import com.jk.util.ParameUtil;


import java.util.List;

public interface LxxService {

    int addShop(RenZhengBean renZhengBean);

    List<AreaBeanLxx> findArea(Integer id);

    PageUtil queryDp(ParameUtil parame);

    RenZhengBean findById(Integer id);

    void addEnterprise(RenZhengBean renZhengBean);

    void addIndividual(RenZhengBean renZhengBean);

    PageUtil Audit(ParameUtil parame);

    void Pass(RenZhengBean renZhengBean);

    void Not(RenZhengBean renZhengBean);

    User_xu loginUser(User_xu user);

    void addregisUser(User_xu user);


    List<YsqJiaoYi> queryPaymentOnBehalfOfOthers(Integer keid);

    List<YsqJiaoYi> queryDropShipping(Integer keid);

    List<YsqJiaoYi> queryShippedOrder(Integer keid);

    List<YsqJiaoYi> queryOffTheStocks(Integer keid);

    List<YsqJiaoYi> queryClose(Integer keid);


    List<YsqJiaoYi> queryRefund(Integer keid);

    List<User_xu> queryIntegral(Integer keid);
}
