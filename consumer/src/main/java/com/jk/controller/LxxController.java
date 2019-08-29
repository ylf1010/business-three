package com.jk.controller;


import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSONObject;
import com.jk.model.AreaBeanLxx;
import com.jk.model.RenZhengBean;
import com.jk.model.User_xu;
import com.jk.model.YsqJiaoYi;
import com.jk.service.LxxService;
import com.jk.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileOutputStream;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.TimeUnit;


@Controller
@RequestMapping("lxx")
public class LxxController {


    @Reference
    private LxxService lxxService;

    @Autowired
    private RedisTemplate<String, String> redisTemplate;


    //登录信息
    @RequestMapping("LoginUser")
    public String LoginUser() {
        return "lxx/LoginLxx";
    }
    //注销
    @RequestMapping("zhuxiao")
    public String loginUser(HttpServletRequest request) {
        request.getSession().removeAttribute("user_xu");
        request.getSession().removeAttribute("a");

        return "ztx/ztxjiuxian";
    }

    @RequestMapping("user1")
    @ResponseBody
    public String aa( HttpServletRequest request) {
        String user1= (String) request.getSession().getAttribute("a");
        return user1;

    }

    //前往注册页面
    @RequestMapping("Register")
    public String Register() {
        return "lxx/RegisterLxx";
    }

    //前往注册页面
    @RequestMapping("Enrollment")
    public String Enrollment() {
        return "lxx/EnrollmentLxx";
    }

    //个人
    @RequestMapping("geren")
    public String bb() {
        return "lxx/Personage";
    }

    //店铺信息
    @RequestMapping("DianPu")
    public String DianPu() {
        return "lxx/DianPu";
    }

    //审核列表
    @RequestMapping("Audit")
    public String Audit() {
        return "lxx/AuditStore";
    }

    //新增店铺
    @RequestMapping("ShopMessage")
    public String dprz() {
        return "lxx/ShopMessageLxx";
    }

    //认证中转
    @RequestMapping("AuthenticationTransfer")
    public String rzzg() {
        return "lxx/AuthenticationTransferLxx";
    }

    //企业认证
    @RequestMapping("Enterprise")
    public String qyrz() {
        return "lxx/EnterpriseLxx";
    }

    //个人认证
    @RequestMapping("Individual")
    public String grrz() {
        return "lxx/IndividualLxx";
    }



    //登录信息
    @RequestMapping("Order")
    public String Order() {
        return "PaymentOnBehalfOfOthers";
    }

    //新增//修改
    @RequestMapping("addShop")
    @ResponseBody
    public String addShop(RenZhengBean renZhengBean) {
        int i = lxxService.addShop(renZhengBean);

        return null;

    }

    //新增企业认证
    @RequestMapping("addEnterprise")
    @ResponseBody
    public void addEnterprise(RenZhengBean renZhengBean) {

        lxxService.addEnterprise(renZhengBean);

    }

    //新增个人认证
    @RequestMapping("addIndividual")
    @ResponseBody
    public void addIndividual(RenZhengBean renZhengBean) {

        lxxService.addIndividual(renZhengBean);

    }

    //三级联动
    @RequestMapping("findArea")
    @ResponseBody
    public List<AreaBeanLxx> findArea(Integer id) {
        List<AreaBeanLxx> findArea = lxxService.findArea(id);
        return findArea;
    }

    //查询店铺
    @RequestMapping("queryDp")
    @ResponseBody
    public DataGridResult queryDp(@RequestBody ParameUtil parame) {
        DataGridResult dgr = new DataGridResult();
        PageUtil pageUtil = lxxService.queryDp(parame);
        dgr.setRows(pageUtil.getList());
        dgr.setTotal(pageUtil.getSumSize());
        return dgr;
    }

    //企业回显
    @RequestMapping("findById")
    @ResponseBody
    public RenZhengBean findById(Integer id) {
        return lxxService.findById(id);
    }

    //上传图片
    @RequestMapping("uploadPhotoFile")
    @ResponseBody
    public String upImg(MultipartFile artImg, HttpServletRequest req) throws
            Exception {
        //获取原文件名称
        String fileName = artImg.getOriginalFilename();
        String folderPath =
                req.getSession().getServletContext().getRealPath("/") +
                        "upload/";
        File file = new File(folderPath);
        // 该目录是否已经存在
        if (!file.exists()) {
            // 创建文件夹
            file.mkdir();
        }
        String onlyFileName = UUID.randomUUID().toString() + fileName.substring(fileName.lastIndexOf('.'));
        FileOutputStream fos = new FileOutputStream(folderPath + onlyFileName);
        fos.write(artImg.getBytes());
        fos.flush();
        fos.close();
        return "/upload/" + onlyFileName;
    }

    //店铺审核列表
    @RequestMapping("QueryAudit")
    @ResponseBody
    public DataGridResult Audit(@RequestBody ParameUtil parame) {
        DataGridResult dgr = new DataGridResult();
        PageUtil pageUtil = lxxService.Audit(parame);
        dgr.setRows(pageUtil.getList());
        dgr.setTotal(pageUtil.getSumSize());
        return dgr;
    }

    //审核通过
    @RequestMapping("Pass")
    @ResponseBody
    public void Pass(RenZhengBean renZhengBean) {

        lxxService.Pass(renZhengBean);

    }

    //审核不通过
    @RequestMapping("Not")
    @ResponseBody
    public void Not(RenZhengBean renZhengBean) {

        lxxService.Not(renZhengBean);

    }



    //获取图片验证码
    @RequestMapping("getCode")

    public void getCode(HttpServletRequest request, HttpServletResponse response) {

        CheckImgUtil.buildCheckImg(request, response);

    }

    //注册
    @RequestMapping("register")
    @ResponseBody
    public String reisterUser(User_xu user) {
        User_xu regigUser = lxxService.loginUser(user);
        if (regigUser != null && !"".equals(regigUser)) {
            return "usernull";
        }

        lxxService.addregisUser(user);

        return "regissuccess";
    }

    @RequestMapping("check")
    @ResponseBody
    public void  checkCode(String mobile,HttpServletRequest request) {
        String url="https://api.netease.im/sms/sendcode.action";
        String appKey="678a2a34886dcef91ddf58a7ed05ca29";
        String nonce=UUID.randomUUID().toString().replace("-", "");
        String curTime=String.valueOf(Calendar.getInstance().getTimeInMillis()/1000);
        String checkSum=CheckSumBuilder.getCheckSum("726b41ce6b73", nonce, curTime);
        HashMap<String, Object> headers = new HashMap<>();
        headers.put("AppKey", appKey);
        headers.put("Nonce", nonce);
        headers.put("CurTime", curTime);
        headers.put("CheckSum", checkSum);
        HashMap<String, Object> params = new HashMap<>();
        params.put("mobile", mobile);
        System.err.println(mobile);
        params.put("templateid", "14799496");

        try {
            String str = HttpClientUtil.post(url, params, headers);
            JSONObject jsonObject = JSONObject.parseObject(str);

            String code = jsonObject.getString("code");
            String key = mobile;
            if (code.equals("200")) {
                String objcode = jsonObject.getString("obj");
                //request.getSession().setAttribute("obj", objcode);
                if (redisTemplate.hasKey(key)) {
                    objcode = redisTemplate.opsForValue().get(key);
                }
                if (!redisTemplate.hasKey(key)) {
                    redisTemplate.opsForValue().set(key, objcode);
                    redisTemplate.expire(key, 24, TimeUnit.HOURS);
                }
            }
            System.out.println(str);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

    }
   /* //短信登录
    @RequestMapping("loginUserTwo")
    @ResponseBody
    public  Boolean loginUserTwo(String code,String mobile) {

        try{

        }catch(Exception e)

            e.

    }*/

   /* @Autowired
    private RedisTemplate redisTemplate;*/

    //查询代付款订单
        @RequestMapping("queryPaymentOnBehalfOfOthers")
        @ResponseBody
        public ModelAndView queryPaymentOnBehalfOfOthers(YsqJiaoYi ysqJiaoYi,User_xu user,HttpServletRequest request) {
            User_xu user_xu = (User_xu) request.getSession().getAttribute("user_xu");
            List<YsqJiaoYi> list =lxxService.queryPaymentOnBehalfOfOthers(user_xu.getKeid());
            ModelAndView mv = new ModelAndView();
            mv.setViewName("/lxx/daifukuan");
            mv.addObject("jy", list);

            return mv;
        }
    //查询代发货订单
    @RequestMapping("queryDropShipping")
    @ResponseBody
    public ModelAndView queryDropShipping(HttpServletRequest request) {
        User_xu user_xu = (User_xu) request.getSession().getAttribute("user_xu");
        List<YsqJiaoYi> list =lxxService.queryDropShipping(user_xu.getKeid());
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/lxx/daifahuo");
        mv.addObject("jy", list);

        return mv;
    }
    //查询已发货订单
    @RequestMapping("queryShippedOrder")
    @ResponseBody
    public ModelAndView queryShippedOrder(HttpServletRequest request) {
        User_xu user_xu = (User_xu) request.getSession().getAttribute("user_xu");
        List<YsqJiaoYi> list =lxxService.queryShippedOrder(user_xu.getKeid());
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/lxx/yifahuo");
        mv.addObject("jy", list);

        return mv;
    }
    //查询已完成订单
    @RequestMapping("queryOffTheStocks")
   // @ResponseBody
    public ModelAndView queryOffTheStocks(HttpServletRequest request) {
        User_xu user_xu = (User_xu) request.getSession().getAttribute("user_xu");
        List<YsqJiaoYi> list =lxxService.queryOffTheStocks(user_xu.getKeid());
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/lxx/yiwancheng");
        mv.addObject("jy", list);
        return mv;
    }
    //查询已关闭订单
    @RequestMapping("queryClose")
    @ResponseBody
    public ModelAndView queryClose(HttpServletRequest request) {
        User_xu user_xu = (User_xu) request.getSession().getAttribute("user_xu");
        List<YsqJiaoYi> list =lxxService.queryClose(user_xu.getKeid());
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/lxx/yiguanbi");
        mv.addObject("jy", list);
        return mv;
    }




    //查询退款中订单
    @RequestMapping("queryRefund")
    @ResponseBody
    public ModelAndView queryRefund(HttpServletRequest request) {
        User_xu user_xu = (User_xu) request.getSession().getAttribute("user_xu");
        List<YsqJiaoYi> list =lxxService.queryRefund(user_xu.getKeid());
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/lxx/tuikuanzhong");
        mv.addObject("jy", list);
        return mv;
    }

    //查询个人中心
    @RequestMapping("queryIntegral")
    @ResponseBody
    public ModelAndView queryIntegral(HttpServletRequest request) {
        User_xu user_xu = (User_xu) request.getSession().getAttribute("user_xu");
        List<User_xu> list =lxxService.queryIntegral(user_xu.getKeid());
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/lxx/Personage");
        mv.addObject("jy", list);

        return mv;
    }

    //登录
    @RequestMapping("loginUser")
    @ResponseBody
    public String loginUser(User_xu user, HttpServletRequest request, String code) {
        User_xu loginUser = lxxService.loginUser(user);
        String readCode = request.getSession().getAttribute("checkcode").toString();

        if (!readCode.toLowerCase().equals(code.toLowerCase())) {
            return "codeError";
        }
        if (loginUser == null) {
            return "usererror";
        }
        if (!user.getUserpass().equals(loginUser.getUserpass())) {
            return "passerror";
        }
        request.getSession().setAttribute("user_xu", loginUser);
        request.getSession().setAttribute("a", loginUser.getNickname());



        return "success";
    }
}
