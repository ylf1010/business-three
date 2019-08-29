/**
 * Copyright (C), 2015-2019, 西安金科教育
 * FileName: LyLunboController
 * Author:   Ly
 * Date:     2019/8/22 16:30
 * Description: LyLunboController
 * History:
 * <author>          <time>          <version>          <desc>
 * 作者姓名           修改时间           版本号              描述
 * <p>
 * 〈一句话功能简述〉<br>
 * 〈LyLunboController〉
 *
 * @author Ly
 * @create 2019/8/22
 * @since 1.0.0
 */

/**
 * 〈一句话功能简述〉<br> 
 * 〈LyLunboController〉
 *
 * @author Ly
 * @create 2019/8/22
 * @since 1.0.0
 */
package com.jk.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.jk.model.Classify;
import com.jk.model.Lunbo;
import com.jk.service.LyLunboService;
import com.jk.util.DataGridResult;
import com.jk.util.PageUtil;
import com.jk.util.ParameUtil;
import com.jk.utils.OSSClientUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Controller
@RequestMapping("lylunbo")
public class LyLunboController {
    @Reference
    private LyLunboService lyLunboService;

    @RequestMapping("toshowlunbo")
    public String toshowlunbo() {
        return "ly/lunbotu";
    }

    @RequestMapping("toaddlunbo")
    public String toaddlunbo() {
        return "ly/addlunbotu";
    }

    /**
     * OSS阿里云上传图片
     */
    @RequestMapping("updaloadImg")
    @ResponseBody
    public String uploadImg(MultipartFile imgg) throws IOException {
        if (imgg == null || imgg.getSize() <= 0) {
            throw new IOException("file不能为空");
        }
        OSSClientUtil ossClient = new OSSClientUtil();
        String name = ossClient.uploadImg2Oss(imgg);
        String imgUrl = ossClient.getImgUrl(name);
        String[] split = imgUrl.split("\\?");
        //System.out.println(split[0]);
        return split[0];
    }

    @RequestMapping("querylylunbo")
    @ResponseBody
    public DataGridResult querylylunbo(@RequestBody ParameUtil parame) {
        DataGridResult lb = new DataGridResult();
        PageUtil pageUtil = lyLunboService.querylylunbo(parame);
        /*System.out.println(parame.getFlid());*/
        lb.setRows(pageUtil.getList());
        lb.setTotal(pageUtil.getSumSize());
        return lb;
    }

    @RequestMapping("addLunbo")
    @ResponseBody
    public String addLunbo(Lunbo lunbo) {
        lyLunboService.addLunbo(lunbo);
        return "123";
    }

    @RequestMapping("queryClassify")
    @ResponseBody
    public List<Classify> queryClassify() {
        List<Classify> clist = lyLunboService.queryClassify();
        return clist;
    }

    @RequestMapping("dellunbo")
    @ResponseBody
    public String dellunbo(int carouselid) {
        //System.out.println(carouselid);
        lyLunboService.dellunbo(carouselid);
        return "ly/lunbotu";
    }
}
