package com.jk.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.jk.model.Remarkysq;
import com.jk.model.User_xu;
import com.jk.model.YsqJiaoYi;
import com.jk.service.YsqService;
import com.jk.util.DataGridResult;
import com.jk.util.PageUtil;
import com.jk.util.ParameUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
@RequestMapping("ysqone")
public class YsqController1 {
    @Reference
    private YsqService jiaoYiService;
    @RequestMapping("cha")
    @ResponseBody
    public DataGridResult cha(@RequestBody ParameUtil parameUtil){
        PageUtil pageUtil = jiaoYiService.cha(parameUtil);
        DataGridResult result = new DataGridResult();
        result.setTotal(pageUtil.getSumSize());
        result.setRows(pageUtil.getList());

        return result;
    }
    @RequestMapping("tiao")
    public String tiao(){
        return "cha";
    }
    @RequestMapping("tiao2")
    public String tiao2(){
        return "cha3";
    }
    @RequestMapping("cha2")
    @ResponseBody
    public DataGridResult cha2(@RequestBody ParameUtil parameUtil){
        PageUtil pageUtil = jiaoYiService.cha2(parameUtil);
        DataGridResult result = new DataGridResult();
        result.setRows(pageUtil.getList());
        result.setTotal(pageUtil.getSumSize());
        return result;
    }
    @RequestMapping("beizhu")
    @ResponseBody
    public void beizhu(YsqJiaoYi ysqModel){
        jiaoYiService.beizhu(ysqModel);
    }
    @RequestMapping("queryxiangqingbyid")
    public ModelAndView queryXiangQingById(Integer id){
        ModelAndView modelAndView = new ModelAndView();
        YsqJiaoYi jy = jiaoYiService.queryJiaoYiById2(id);
        modelAndView.addObject("jy",jy);
        modelAndView.setViewName("particulars");
        return modelAndView;
    }
    @RequestMapping("queryUser")
    @ResponseBody
    public  DataGridResult queryUser(Integer id){
        List<User_xu> user = jiaoYiService.queryXiangQingById(id);
        DataGridResult result = new DataGridResult();
        result.setRows((List) user);
        return result;
    }
    @RequestMapping("queryProduct")
    @ResponseBody
    public DataGridResult queryProduct(Integer id){
        List<YsqJiaoYi> jiaoYi = jiaoYiService.queryJiaoYiById(id);
        DataGridResult result = new DataGridResult();
        result.setRows(jiaoYi);
        return result;
    }
    @RequestMapping("beizhu2")
    @ResponseBody
    public void beizhu(Remarkysq remarkysq){

        jiaoYiService.addBeiZhu2(remarkysq);
    }
}
