package com.jk.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.jk.model.Addressysq;
import com.jk.model.Product;
import com.jk.model.Shopping_xu;
import com.jk.model.User_xu;
import com.jk.service.AddressService;
import com.jk.service.AddressTwoService;
import com.jk.util.DataGridResult;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("ysqthree")
public class YsqController3 {
    @Reference
    private AddressService addressService;
    @Autowired
    private AmqpTemplate amqpTemplate;
    @Reference
    private AddressTwoService addressTwoService;

    @RequestMapping("panduanuser")
    @ResponseBody
    public Shopping_xu PanDuanUser(HttpServletRequest request,Shopping_xu shopping_xu){
        User_xu xu = (User_xu) request.getSession().getAttribute("user_xu");
        if(xu==null){
            shopping_xu.setProductid(null);
            return shopping_xu;
        }

        return shopping_xu;
    }
    @RequestMapping("tiao")
    public ModelAndView tiao(Shopping_xu shopping){
        System.out.println(shopping.getProductcount());
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("cha4");
        modelAndView.addObject("ordernumber",shopping);
        return modelAndView;
    }
    /*@RequestMapping("tiao2")
    public ModelAndView tiao2(Product product){

       // List<Product> products = addressService.addJiaoYi(product.getProductid());
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("ordernumber",product);
        modelAndView.setViewName("cha4");
        return modelAndView;
    }*/
    @RequestMapping("addjiaoyi")
    @ResponseBody
    public DataGridResult addJiaoYi(Integer productid){
        List<Product> list = addressService.addJiaoYi(productid);
        DataGridResult result = new DataGridResult();
        result.setRows(list);
        return result;
    }
@RequestMapping("chaaddress")
    @ResponseBody
    public DataGridResult chaAddress(HttpServletRequest request){
    //User_xu user = (User_xu) request.getSession().getAttribute("user_xu");
    List<Addressysq> row = addressService.chaAddress(1);
    DataGridResult result = new DataGridResult();
    result.setRows(row);
    return result;
}
@RequestMapping("updatejiaoyistate")
    @ResponseBody
    public void updateJiaoYiState(Integer ordernumber){

        addressService.updateJiaoYiState(ordernumber);
}
@RequestMapping("chajiaoyi")
    @ResponseBody
    public List<Product> chaJiaoYi(Integer productid){
        List<Product> row = addressService.chaJiaoYi(productid);
    return row;
}
    /*@RequestMapping("chajiaoyi2")
    @ResponseBody
    public List<Product> chaJiaoYi2(Integer productid){
        List<Product> row = addressService.chaJiaoYi2(productid);
        return row;
    }*/
@RequestMapping("addressdizhi")
    @ResponseBody
    public void addressDiZhi(Addressysq addressysq){

        addressService.addressDiZhi(addressysq);
}
@RequestMapping("deleteaddress")
    @ResponseBody
    public void deleteAddress(String id){

        addressService.deleteAddress(id);
}
@RequestMapping("adddingdan")
    @ResponseBody
    public String addDingDan(Shopping_xu shopping,Integer addressid,HttpServletRequest request){
    User_xu user = (User_xu)request.getSession().getAttribute("user_xu");
    String s = addressService.addDingDan(shopping, user.getKeid(),addressid);
    return s;
}
    @RequestMapping("adddingdan2")
    @ResponseBody
    public String addDingDan2(Product product,Integer addressid,HttpServletRequest request){
        User_xu user = (User_xu)request.getSession().getAttribute("user_xu");
        String s = addressService.addDingDan2(product, user.getKeid(),addressid);
        addressTwoService.addDingDan2(product,user.getKeid());
        return s;
    }
@RequestMapping("chashopping")
    @ResponseBody
    public DataGridResult chaShopping(int[] productid,HttpServletRequest request){
        User_xu user = (User_xu) request.getSession().getAttribute("user_xu");
        List<Shopping_xu> list = addressService.chaShopping(productid,user.getKeid());
        /*for (int i=0;i<list.size();i++){
            list.get(i).setProductkucun(3);
        }*/
    DataGridResult result = new DataGridResult();
    result.setRows(list);
    return result;
}
@RequestMapping("tiao3")
    public ModelAndView tiao3(String ids){
    System.out.println(new Date());
    ModelAndView modelAndView = new ModelAndView();
    modelAndView.addObject("ids",ids);
    modelAndView.setViewName("cha5");
    return modelAndView;
}
@RequestMapping("adddingdanall")
    @ResponseBody
    public String addDingDanAll(int[] id, HttpServletRequest request,Integer userid){
        User_xu user = (User_xu) request.getSession().getAttribute("user_xu");
    String s = addressService.addDingDanAll(id, user.getKeid(),userid);
    return s;
}
@RequestMapping("tiao4")
    public String tiao4(){
        amqpTemplate.convertAndSend("test","第一次");
        amqpTemplate.convertAndSend("test","第二次");
    return "redirect:tiao5";
}
@RequestMapping("adddingdan1")
    public String addDingDan1(HttpServletRequest request){
    User_xu user = (User_xu)request.getSession().getAttribute("user_xu");
    addressService.addDingDan1(user.getKeid());
    return "ztx/ztxjiuxian";
}
@RequestMapping("tiao5")
    public String tiao5(){
        return "cha6";
}
    @RequestMapping("chashoppingceshi")
    @ResponseBody
    public List<Shopping_xu> chaShoppingceshi(int[] productid, HttpServletRequest request){
        User_xu user = (User_xu) request.getSession().getAttribute("user_xu");
        List<Shopping_xu> list = addressService.chaShopping(productid,user.getKeid());
        return list;
    }
    @RequestMapping("tiao6")
        public ModelAndView tiao6(Product shopping){
            ModelAndView modelAndView = new ModelAndView();
            modelAndView.setViewName("cha7");
            modelAndView.addObject("ordernumber",shopping);
            return modelAndView;

    }
}
