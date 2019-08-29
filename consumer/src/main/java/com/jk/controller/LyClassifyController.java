/**
 * Copyright (C), 2015-2019, 西安金科教育
 * FileName: LyClassifyController
 * Author:   Ly
 * Date:     2019/8/18 22:22
 * Description: LyClassifyController
 * History:
 * <author>          <time>          <version>          <desc>
 * 作者姓名           修改时间           版本号              描述
 * <p>
 * 〈一句话功能简述〉<br>
 * 〈LyClassifyController〉
 *
 * @author Ly
 * @create 2019/8/18
 * @since 1.0.0
 */

/**
 * 〈一句话功能简述〉<br> 
 * 〈LyClassifyController〉
 *
 * @author Ly
 * @create 2019/8/18
 * @since 1.0.0
 */
package com.jk.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.jk.model.Classify;
import com.jk.service.LyClassifyService;
import com.jk.util.DataGridResult;
import com.jk.util.PageUtil;
import com.jk.util.ParameUtil;
import com.jk.utils.OSSClientUtil;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Controller
@RequestMapping("lyclassify")
public class LyClassifyController {
    @Reference
    private LyClassifyService classifyService;
    @RequestMapping("toshowclassify")
    public String toshowclassify() {
        return "ly/classify";
    }
    @RequestMapping("toaddfenlei")
    public String toaddclass() {
        return "ly/addclassify";
    }

    @RequestMapping("showClassify")
    @ResponseBody
    public DataGridResult showClassify(@RequestBody ParameUtil parame){
        DataGridResult flr = new DataGridResult();
        PageUtil pageUtil = classifyService.showClassify(parame);
        flr.setRows(pageUtil.getList());
        flr.setTotal(pageUtil.getSumSize());
        return flr;
    }
    @RequestMapping("addClassify")
    @ResponseBody
    public String addClassify(Classify classify){
        classifyService.addClassify(classify);
        return "123";
    }

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

    //上传图片
   /* @RequestMapping("uploadPhotoFile")
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
    @RequestMapping("delClassify")
    @ResponseBody
    public  String delClassify(String flids){
        classifyService.delClassify(flids);
        return "ly/classify";
    }
    //修改 回显
    @RequestMapping("xgClassifypage")
    public String xgMusicpage(Integer flid, Model model){
        Classify classify=classifyService.xgClassifypage(flid);
        model.addAttribute("classify", classify);
        return "ly/updclassify";
    }
    //修改
    @RequestMapping("updClassify")
    @ResponseBody
    public String updClassify(Classify classify){
        classifyService.updClassify(classify);
        return "ly/classify";
    }
    @RequestMapping("delclassifyid")
    @ResponseBody
    public  String  delclassifyid(int flid){
        //System.out.println(productid);
        classifyService.delclassifyid(flid);
        return  "ly/product";

    }

}
