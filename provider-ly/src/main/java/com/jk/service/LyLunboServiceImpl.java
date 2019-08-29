/**
 * Copyright (C), 2015-2019, 西安金科教育
 * FileName: LyLunboServiceImpl
 * Author:   Ly
 * Date:     2019/8/22 16:31
 * Description: LyLunboServiceImpl
 * History:
 * <author>          <time>          <version>          <desc>
 * 作者姓名           修改时间           版本号              描述
 * <p>
 * 〈一句话功能简述〉<br>
 * 〈LyLunboServiceImpl〉
 *
 * @author Ly
 * @create 2019/8/22
 * @since 1.0.0
 */

/**
 * 〈一句话功能简述〉<br> 
 * 〈LyLunboServiceImpl〉
 *
 * @author Ly
 * @create 2019/8/22
 * @since 1.0.0
 */
package com.jk.service;

import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jk.dao.ClassifyMapper;
import com.jk.dao.LunboMapper;
import com.jk.model.Classify;
import com.jk.model.Lunbo;
import com.jk.util.PageUtil;
import com.jk.util.ParameUtil;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Service
public class LyLunboServiceImpl implements LyLunboService {
   @Autowired
    private LunboMapper lunboMapper;
   @Autowired
   private ClassifyMapper classifyMapper;

    @Override
    public PageUtil querylylunbo(ParameUtil parame) {
        PageHelper.startPage(parame.getPageNumber(), parame.getPageSize());
       /* Map<String,Object> map = new HashMap<>();
        if(parame != null && parame.getProductname() != null && parame.getProductname().length()>0){
            map.put("productname", parame.getProductname());
        }
        if(parame !=null && parame.getFlid() !=null && parame.getFlid()!=-1){
            map.put("flid", parame.getFlid());
        }*/

        List<Lunbo> list=lunboMapper.querylylunbo(parame);
        PageInfo<Lunbo> pageInfo=new PageInfo<Lunbo>(list);
        PageUtil pageUtil= new PageUtil((int) pageInfo.getTotal(),parame.getPageNumber(),parame.getPageSize());
        pageUtil.setList(list);
        return pageUtil;
    }

    @Override
    public void addLunbo(Lunbo lunbo) {
        lunboMapper.addLunbo(lunbo);
    }

    @Override
    public List<Classify> queryClassify() {
        return classifyMapper.queryClassify();
    }

    @Override
    public void dellunbo(int carouselid) {
        lunboMapper.dellunbo(carouselid);
    }
}
