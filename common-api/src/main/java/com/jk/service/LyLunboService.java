package com.jk.service;

import com.jk.model.Classify;
import com.jk.model.Lunbo;
import com.jk.util.PageUtil;
import com.jk.util.ParameUtil;

import java.util.List;

public interface LyLunboService {
    PageUtil querylylunbo(ParameUtil parame);

    void addLunbo(Lunbo lunbo);

    List<Classify> queryClassify();

    void dellunbo(int carouselid);
}
