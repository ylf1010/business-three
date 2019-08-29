package com.jk.service;

import com.jk.model.Classify;
import com.jk.util.PageUtil;
import com.jk.util.ParameUtil;

public interface LyClassifyService {

    PageUtil showClassify(ParameUtil parame);

    void addClassify(Classify classify);

    void delClassify(String flids);

    Classify xgClassifypage(Integer flid);

    void updClassify(Classify classify);

    void delclassifyid(int flid);
}
