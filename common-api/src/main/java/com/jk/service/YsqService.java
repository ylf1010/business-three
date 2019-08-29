package com.jk.service;

import com.jk.model.Remarkysq;
import com.jk.model.User_xu;
import com.jk.model.YsqJiaoYi;
import com.jk.util.PageUtil;
import com.jk.util.ParameUtil;

import java.util.List;

public interface YsqService {
    PageUtil cha(ParameUtil parame);

    PageUtil cha2(ParameUtil parameUtil);

    void beizhu(YsqJiaoYi ysqModel);

    List<User_xu> queryXiangQingById(Integer id);

    List<YsqJiaoYi> queryJiaoYiById(Integer id);

    YsqJiaoYi queryJiaoYiById2(Integer id);

    void addBeiZhu2(Remarkysq remarkysq);
}
