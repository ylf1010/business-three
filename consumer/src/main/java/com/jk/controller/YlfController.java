package com.jk.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.jk.model.User;
import com.jk.service.LoginService;
import com.jk.util.CheckImgUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

@Controller
@RequestMapping("ylf")
public class YlfController {

    @Reference
    private LoginService loginService;

    @RequestMapping("tologinUser")
    public String tologinUser(){
        return "loginUser";
    }
    @RequestMapping("toregister")
    public String toregister(){
        return "register";
    }
    //获取图片验证码
    @RequestMapping("getCode")
    public void getCode(HttpServletRequest request, HttpServletResponse response){

        CheckImgUtil.buildCheckImg(request, response);

    }
   @RequestMapping("loginUser")
    @ResponseBody
    public String loginUser(User user, HttpServletRequest request,String code){
         User loginUser = loginService.loginUser(user);

         String readCode = request.getSession().getAttribute("checkcode").toString();

               if(!readCode.toLowerCase().equals(code.toLowerCase())){
                   return "codeError";
               }
               if(loginUser==null){
                   return "usererror";
               }
               if(!user.getPassword().equals(loginUser.getPassword())){
                   return "passerror";
               }
         request.getSession().setAttribute("user",loginUser);
         return "success";
   }
   @RequestMapping("register")
    @ResponseBody
    public String reisterUser(User user){
       User regigUser = loginService.loginUser(user);
       if(regigUser!=null&&!"".equals(regigUser)){
           return "usernull";
       }
       user.setUsercraetetime(new Date());
       loginService.addregisUser(user);

        return "regissuccess";
   }


}
