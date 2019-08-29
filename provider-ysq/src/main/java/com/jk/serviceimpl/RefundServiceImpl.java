package com.jk.serviceimpl;

import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jk.dao.RefundysqMapper;
import com.jk.model.Refundysq;
import com.jk.model.YsqEvaluate;
import com.jk.service.RefundService;
import com.jk.util.PageUtil;
import com.jk.util.ParameUtil;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
@Service
public class RefundServiceImpl implements RefundService {
    @Autowired
    private RefundysqMapper refundysqMapper;

    @Override
    public PageUtil cha(ParameUtil parameUtil) {
        PageHelper.startPage(parameUtil.getPageNumber(),parameUtil.getPageSize());
        List<Refundysq> list = refundysqMapper.cha(parameUtil);
        PageInfo<Refundysq> info = new PageInfo<>(list);
        PageUtil pageUtil = new PageUtil((int)info.getTotal(),parameUtil.getPageNumber(),parameUtil.getPageSize());
        pageUtil.setList(list);
        return pageUtil;
    }

    @Override
    public void xiu(Integer id, Integer num) {

        refundysqMapper.xiu(id,num);
    }

    @Override
    public void xiuAll(String[] id,Integer num) {
        if(num==0){

            refundysqMapper.xiuAll(id);
            return;
        }
        refundysqMapper.xiuAll2(id);
    }

    @Override
    public List<YsqEvaluate> queryTree(Integer id) {
        return refundysqMapper.queryTree(id);
    }

    @Override
    public void addHuiFu(YsqEvaluate ysqEvaluate) {

        refundysqMapper.addHuiFu(ysqEvaluate);
    }
}
