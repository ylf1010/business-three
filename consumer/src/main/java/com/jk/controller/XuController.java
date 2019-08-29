package com.jk.controller;


import com.alibaba.dubbo.config.annotation.Reference;
import com.jk.model.*;
import com.jk.service.XuService;
import com.jk.util.BootStrapUtil;
import com.jk.util.RowsTotal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("xu")
public class XuController {
        //客户管理模块
    @Reference
    private XuService xu;

                 //客户列表  客户详情
    //跳转到客户列表页
    @RequestMapping("xkehu1")
    public  String   xkehu1(){
        return  "xu/Xkehu1";
    }


    //客户列表查询
    @RequestMapping("xkehulist")
    @ResponseBody
    public RowsTotal xkehulist(@RequestBody BootStrapUtil bt){
        RowsTotal  list=xu.xkehulist(bt);
        return  list;
    }

    //批量删除
    @RequestMapping("xdelete1")
    @ResponseBody
    public void xdelete1(String[] ids){
        xu.xdelete1(ids);
    }

    //下拉 分组
    @RequestMapping("xxiala1")
    @ResponseBody
    public List<Zu_xu> xxiala1(){
        List<Zu_xu>  list= xu.xxiala1();
        return list;
    }

    //移动移出分组
    @RequestMapping("xupdate1")
    @ResponseBody
    public void xupdate1(Integer[] ids,Integer a){
        xu.xupdate1(ids,a);
    }

    //新建分组
    @RequestMapping("xaddfenzu")
    @ResponseBody
    public void xaddfenzu(Zu_xu zu){
        xu.xaddfenzu(zu);
    }

    //标签下拉查
    @RequestMapping("xXiaLaBiaoQian")
    @ResponseBody
    public List<BiaoQian_xu> xXiaLaBiaoQian()
    {
        List<BiaoQian_xu> list=  xu.xXiaLaBiaoQian();
        return  list;
    }

    //客户改标签
    @RequestMapping("xupdateBiaoQian")
    @ResponseBody
    public void xupdateBiaoQian(User_xu userke) {
          xu.xupdateBiaoQian(userke);
    }

    //跳客户详情页 把id带去
    @RequestMapping("xkehuxiangqing1")
    public String xkehuxiangqing1(Integer  keid, Model m){
        m.addAttribute("a",keid);
        return  "xu/kexiangqing";
    }
    //客户详情查询
    @RequestMapping("xkehuxiangqing")
    @ResponseBody
    public RowsTotal xkehuxiangqing(Integer  keid){
        List<User_xu>  rows= xu.xkehuxiangqing(keid);
         RowsTotal  r=new RowsTotal();
         r.setRows(rows);
        return  r;
    }

    //详情页  加积分
    @RequestMapping("xupdatejifen")
    @ResponseBody
    public void xupdatejifen(Jifen_xu jifen){
       xu.xupdatejifen(jifen);
    }

    //详情页  修改客户信息
    @RequestMapping("xupdatekehu")
    @ResponseBody
    public void xupdatekehu(User_xu userx)
    {
        xu.xupdatekehu(userx);
    }




                //会员列表   会员设置
       //跳转会员列表页
    @RequestMapping("uhiuyuan1")
    public  String  uhiuyuan1(){
        return  "xu/uhiuyuan1";
    }

    //会员列表查询
    @RequestMapping("uhiuyuancha")
    @ResponseBody
    public  RowsTotal  uhiuyuancha(@RequestBody BootStrapUtil bt){
        RowsTotal  list=xu.uhiuyuancha(bt);
        return  list;
    }

    //批量   取消会员
    @RequestMapping("quxiaohiuyuan")
    @ResponseBody
    public  void  quxiaohiuyuan(String[] ids){
        xu.quxiaohiuyuan(ids);
    }

    //赠送会员  下拉查
    @RequestMapping("uXiaLaHiuYuan")
    @ResponseBody
    public List<Member_xu> uXiaLaHiuYuan(){
        List<Member_xu> list=xu.uXiaLaHiuYuan();
        return  list;
    }

    //赠送会员 修改
    @RequestMapping("uZengHiuYuan")
    @ResponseBody
    public void uZengHiuYuan(Um_xu um){
        xu.uZengHiuYuan(um);
    }

    //跳转会员设置页面
    @RequestMapping("uhiuyuan2")
    public  String  uhiuyuan2(){
        return  "xu/uhiuyuan2";
    }

    //会员设置 查询
    @RequestMapping("uHiuYuanShezhi")
    @ResponseBody
    public RowsTotal uHiuYuanShezhi(){
        List<Member_xu>  rows= xu.uHiuYuanShezhi();
        RowsTotal  r=new RowsTotal();
        r.setRows(rows);
        return  r;
    }

    //会员新增 修改
    @RequestMapping("uaddHiuYuan")
    @ResponseBody
    public void uaddHiuYuan(Member_xu mem){
        xu.uaddHiuYuan(mem);
    }

    //会员开启  关闭
    @RequestMapping("udeleteHiuYuan")
    @ResponseBody
    public  void udeleteHiuYuan(Integer hyid,Integer a){
        xu.udeleteHiuYuan(hyid,a);
    }




             //积分
    //跳转积分明细页
    @RequestMapping("ujifen1")
    public  String  ujifen1(){
        return  "xu/ujifen1";
    }

    //积分消耗发放查询
    @RequestMapping("uJiFenCha")
    @ResponseBody
    public RowsTotal uJiFenCha(@RequestBody BootStrapUtil bt){
        RowsTotal  r= xu.uJiFenCha(bt);
        return  r;
    }




            //标签管理
    //跳转标签页面
      @RequestMapping("uBiaoQian1")
      public  String  uBiaoQian1(){
                return  "xu/uBiaoQian1";
       }

       //标签管理查询
    @RequestMapping("uBiaoQianCha")
    @ResponseBody
    public RowsTotal uBiaoQianCha(){
        RowsTotal r= xu.uBiaoQianCha();
        return  r;
    }

    //标签 增 改
    @RequestMapping("uaddBiaoQian")
    @ResponseBody
    public void  uaddBiaoQian(BiaoQian_xu bq){
        xu.uaddBiaoQian(bq);
    }

    //标签删
    @RequestMapping("udeleteBiaoQian")
    @ResponseBody
    public void  udeleteBiaoQian(Integer bqid){
        xu.udeleteBiaoQian(bqid);
    }






            //优惠卷
    //跳转优惠卷页面
     @RequestMapping("uDuiHuanMa1")
     public  String  uDuiHuanMa1(){
                return  "xu/uDuiHuanMa1";
            }


      //优惠劵查
    @RequestMapping("ulistyouhiu")
    @ResponseBody
    public Map ulistyouhiu(@RequestBody BootStrapUtil bt){
        List<Youhiu_xu> list=xu.ulistyouhiu(bt);
        Map map=new HashMap();
        map.put("rows",list);
        return map;
    }

    //新增  修改
    @RequestMapping("uaddyouhiu")
    @ResponseBody
    public void uaddyouhiu(Youhiu_xu youhiu){

        xu.uaddyouhiu(youhiu);
    }

    //删除
    @RequestMapping("udeleteyouhiu")
    @ResponseBody
    public void udeleteyouhiu(String[] ids){
        xu.udeleteyouhiu(ids);
    }
}
