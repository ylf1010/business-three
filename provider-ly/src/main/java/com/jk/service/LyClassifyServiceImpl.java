/**
 * Copyright (C), 2015-2019, 西安金科教育
 * FileName: LyClassifyServiceImpl
 * Author:   Ly
 * Date:     2019/8/18 22:24
 * Description: LyClassifyServiceImpl
 * History:
 * <author>          <time>          <version>          <desc>
 * 作者姓名           修改时间           版本号              描述
 * <p>
 * 〈一句话功能简述〉<br>
 * 〈LyClassifyServiceImpl〉
 *
 * @author Ly
 * @create 2019/8/18
 * @since 1.0.0
 */

/**
 * 〈一句话功能简述〉<br> 
 * 〈LyClassifyServiceImpl〉
 *
 * @author Ly
 * @create 2019/8/18
 * @since 1.0.0
 */
package com.jk.service;

import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jk.dao.ClassifyMapper;
import com.jk.model.Classify;
import com.jk.util.PageUtil;
import com.jk.util.ParameUtil;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class LyClassifyServiceImpl implements LyClassifyService{
    @Autowired
    private ClassifyMapper classifyMapper;
    @Override
    public PageUtil showClassify(ParameUtil parame) {
         PageHelper.startPage(parame.getPageNumber(), parame.getPageSize());
         Map<String,Object> map = new HashMap<>();
        if(parame != null && parame.getFlname() != null && parame.getFlname().length()>0){

            map.put("flname", parame.getFlname());
        }
        List<Classify> list=classifyMapper.showClassify(parame);
        PageInfo<Classify> pageInfo=new PageInfo<Classify>(list);
        PageUtil pageUtil=new PageUtil((int) pageInfo.getTotal(),parame.getPageNumber(),pageInfo.getPageSize());
        pageUtil.setList(list);
        return pageUtil;

    }

    @Override
    public void addClassify(Classify classify) {
        classifyMapper.addClassify(classify);
    }

    @Override
    public void delClassify(String flids) {
        classifyMapper.delClassify(flids);
    }

    @Override
    public Classify xgClassifypage(Integer flid) {

        return classifyMapper.selectByPrimaryKey(flid);
    }

    @Override
    public void updClassify(Classify classify) {
        classifyMapper.updateByPrimaryKey(classify);
    }

    @Override
    public void delclassifyid(int flid) {
        classifyMapper.delclassifyid(flid);
    }
}
