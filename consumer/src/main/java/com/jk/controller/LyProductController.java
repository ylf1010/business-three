/**
 * Copyright (C), 2015-2019, XXX有限公司
 * FileName: LyProductController
 * Author:   ly
 * Date:     2019/8/16 20:53
 * Description: LyProductController
 * History:
 * <author>          <time>          <version>          <desc>
 * 作者姓名           修改时间           版本号              描述
 */
package com.jk.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.jk.model.*;
import com.jk.service.LyProductService;
import com.jk.util.DataGridResult;
import com.jk.util.PageUtil;
import com.jk.util.ParameUtil;
import com.jk.utils.OSSClientUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * 〈一句话功能简述〉<br> 
 * 〈LyProductController〉
 *
 * @author ly
 * @create 2019/8/16
 * @since 1.0.0
 */
@Controller
@RequestMapping("lyproduct")
public class LyProductController {
    @Reference
    private LyProductService productService;
    @Autowired
    private RedisTemplate redisTemplate;

    @RequestMapping("toaddpro")
    public String toaddpro() {
        return "ly/addproduct";
    }
    @RequestMapping("toshow")
    public String toshow() {
        return "ly/product";
    }
    @RequestMapping("toadd")
    public String toadd(Model model) {
        List<Classify> clist=productService.queryClassify();
        model.addAttribute("clist","clist");
        List<ZtxSheng> cdlist=productService.queryOrigns();
        model.addAttribute("cdlist","cdlist");
        List<ZtxBrand> pplist=productService.queryBrand();
        model.addAttribute("pplist","pplist");
        return "ly/addpro";
    }
    //@RequestMapping("queryProduct")

    /**
     * OSS阿里云上传图片
     */
    @RequestMapping("updaloadImg")
    @ResponseBody
    public String uploadImg(MultipartFile imgg)throws IOException {
        if (imgg == null || imgg.getSize() <= 0) {
            throw new IOException("file不能为空");
        }
        OSSClientUtil ossClient=new OSSClientUtil();
        String name = ossClient.uploadImg2Oss(imgg);
        String imgUrl = ossClient.getImgUrl(name);
        String[] split = imgUrl.split("\\?");
        //System.out.println(split[0]);
        return split[0];
    }



    @RequestMapping("querylyProduct")
    @ResponseBody
    public DataGridResult querylyProduct(@RequestBody ParameUtil parame){
        DataGridResult spr = new DataGridResult();
        PageUtil pageUtil = productService.querylyProduct(parame);
        /*System.out.println(parame.getFlid());*/
        spr.setRows(pageUtil.getList());
        spr.setTotal(pageUtil.getSumSize());
        return spr;
    }
    //分类
    @RequestMapping("queryClassify")
    @ResponseBody
    public List<Classify> queryClassify(){
        List<Classify> clist=productService.queryClassify();
        return clist;
    }
    //产地
    @RequestMapping("queryOrigns")
    @ResponseBody
    public List<ZtxSheng> queryOrigns(){
        List<ZtxSheng> cdlist=productService.queryOrigns();
        return cdlist;
    }
    @RequestMapping("queryShi")
    @ResponseBody
    public List<ZtxShi> queryShi(){
        List<ZtxShi> shilist=productService.queryShi();
        return shilist;
    }
    //品牌
    @RequestMapping("queryBrand")
    @ResponseBody
    public List<ZtxBrand> queryBrand(){
        List<ZtxBrand> pplist=productService.queryBrand();
        return pplist;
    }
  //下架/上架
  @RequestMapping("updateproductzt")
  @ResponseBody
  public  String  updateproductzt(int productid,int zt){
      //System.out.println(productid);
      productService.updateproductzt(productid,zt);
      return  "ly/product";

  }
    @RequestMapping("addProduct")
    @ResponseBody
    public String addProduct(Product product){
        productService.addProduct(product);
        return "123";
    }
   /* //上传图片
    @RequestMapping("uploadPhotoFile")
    @ResponseBody
    public String upImg(MultipartFile artImg, HttpServletRequest req) throws
            Exception{
//获取原文件名称
        String fileName = artImg.getOriginalFilename();
        String folderPath =
                req.getSession().getServletContext().getRealPath("/")+
                        "upload/";
                File file = new File(folderPath);
// 该目录是否已经存在
        if(!file.exists()){
// 创建文件夹
            file.mkdir();
        }
        String onlyFileName = UUID.randomUUID().toString()+fileName.substring(fileName.lastIndexOf('.'));
        FileOutputStream fos = new FileOutputStream(folderPath+onlyFileName);
        fos.write(artImg.getBytes());
        fos.flush();
        fos.close();
        return "/upload/"+onlyFileName;
    }*/

    //批量删除
    @RequestMapping("delProduct")
    @ResponseBody
    public  String delProduct(String dids){
        productService.delProduct(dids);
        return "ly/product";
    }
    //修改
    @RequestMapping("queryProductPage")
    public String queryProductPage(String productid, Model model){
        Product product=productService.queryProductPage(productid);
        model.addAttribute("product",product);
        List<Classify> clist=productService.queryClassify();
        model.addAttribute("clist","clist");
        return "ly/updpro";
    }
    //updateUser
    @RequestMapping("updateProduct")
    @ResponseBody
    public void updateProduct(Product product){
        productService.updateProduct(product);
    }

    @RequestMapping("queryMiaosha")
    public String queryMiaosha(Integer productid,Model model){
     Product product=productService.queryMiaosha(productid);
        model.addAttribute("product",product);
          return "ly/lymiaosha";
    }
    @RequestMapping("Msredis")
    @ResponseBody
    public void   Msredis(Product product){
        String key="miaosha"+product.getProductid();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'hh:mm");
        long time1 = new Date().getTime();
        long time2 = 0;
        try {
            time2 = sdf.parse(product.getDaoqidate()).getTime();
        } catch (ParseException e) {
            e.printStackTrace();
        }
        long time3=(time2-time1)/1000;
        redisTemplate.opsForValue().set(key,product);
        redisTemplate.expire(key,time3, TimeUnit.SECONDS);
    }

    @RequestMapping("querymiaosha")
    @ResponseBody
    public List<Product>   querymiaosha(){
        List<Product> list=productService.querymiaosha();
        List<Product> list1 = new ArrayList<>();
        for(int i=0;i<list.size();i++){
            String key="miaosha"+list.get(i).getProductid();
            if(redisTemplate.hasKey(key)){
               list1.add((Product) redisTemplate.opsForValue().get(key));
            }
        }
        return list1;
    }



}
