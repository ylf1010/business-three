package com.jk.service;


import com.jk.model.YsqEvaluate;
import com.jk.util.PageUtil;
import com.jk.util.ParameUtil;

import java.util.List;


public interface RefundService {
    PageUtil cha(ParameUtil parameUtil);

    void xiu(Integer id, Integer num);

    void xiuAll(String[] id, Integer num);

    List<YsqEvaluate> queryTree(Integer id);

    void addHuiFu(YsqEvaluate ysqEvaluate);
}
