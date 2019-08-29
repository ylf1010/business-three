package com.jk.service;

import com.alibaba.dubbo.config.annotation.Service;
import com.jk.dao.Xu1Dao;
import com.jk.model.History;
import com.jk.model.Product;
import com.jk.model.Shopping_xu;
import com.jk.model.Youhiu_xu;
import com.mongodb.client.result.UpdateResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Service


public class Xu1ServiceInpl implements Xu1Service{
              //客户端
    @Autowired
    private Xu1Dao xu1;
    @Autowired
    private MongoTemplate  mongoTemplate;
    @Autowired
    private RedisTemplate   redisTemplate;

    //加入购物车
    @Override
    public void addshopping(Shopping_xu sho,Integer id) {
       Criteria c=new  Criteria();    //设置条件
        c.and("productid").is(sho.getProductid());
        Query query =new  Query();   //使条件生效
        query.addCriteria( c );
           //查询  商品是否已加入购物车
        Shopping_xu one = mongoTemplate.findOne(query, Shopping_xu.class, "shopping" + id);
        if(one != null){
            //如果购物车有这个商品则  修改数量加一
            Update up=new Update();  //赋值要修改的字段
            up.set("productcount",one.getProductcount()+sho.getProductcount());
            mongoTemplate.updateFirst(query,up,"shopping"+id);
        }else{
            //如果购物车没有这个商品则 新增
            mongoTemplate.insert(sho,"shopping"+id);
        }


    }


    //查询个人购物车
    @Override
    public List<Shopping_xu> listshopping(Integer id) {
        List<Shopping_xu> list1 = mongoTemplate.findAll(Shopping_xu.class, "shopping" + id);
        List<Shopping_xu>   list=new ArrayList<Shopping_xu>();
        for (int i=0;i<list1.size();i++){
            System.out.println(list1.get(i).getProductid());
            Shopping_xu s=  xu1.listshopping(list1.get(i).getProductid());
              s.setProductcount(list1.get(i).getProductcount());
              list.add(s);
        }
        return list;
    }

    //删除购物车
    @Override
    public void deleteshopping(Integer id,Integer uid) {
        Criteria c=new Criteria();   //设置条件
        c.and("productid").is(id);  //删除数组里in包含的所有( is 等于)
        Query query=new Query();     //条件生效
        query.addCriteria(c);  //放入条件
        mongoTemplate.remove(query,"shopping"+uid);
    }

    //结算改数量
    @Override
    public void updatecount(Integer[] productid, Integer[] count,double[] productprice, Integer uid) {
        for (int i=0;i < productid.length;i++){
            Criteria c=new  Criteria();    //设置条件
            c.and("productid").is(productid[i]);
            Query query =new  Query();   //使条件生效
            query.addCriteria( c );
            Update up=new Update();  //赋值要修改的字段
            up.set("productcount",count[i]);
           up.set("productprice",productprice[i]);
             mongoTemplate.updateFirst(query, up, "shopping"+uid);
        }
    }



    //加收藏夹   删除购物车
    @Override
    public void addshoucang(Shopping_xu sho,Integer uid) {
         //存redis
          String  key="shopping"+uid;
        redisTemplate.opsForList().rightPush(key,sho);
        redisTemplate.expire(key,600, TimeUnit.MINUTES);
         //删mogo
        Criteria c=new Criteria();   //设置条件
        c.and("productid").is(sho.getProductid());  //删除数组里in包含的所有( is 等于)
        Query query=new Query();     //条件生效
        query.addCriteria(c);  //放入条件
        mongoTemplate.remove(query,key);

    }

    //查收藏夹
    @Override
    public List<Shopping_xu> listshoucang(Integer id) {
        String  key="shopping"+id;
        List<Shopping_xu> list = redisTemplate.opsForList().range(key, 0, -1);
        return list;
    }




    //优惠劵查询1
    @Override
    public List<Youhiu_xu> listyouhiujuan() {
        return xu1.listyouhiujuan();
    }

    //优惠劵查询2
    @Override
    public List<Youhiu_xu> listyouhiujuan2() {
        return xu1.listyouhiujuan2();
    }

    //优惠劵领取
    @Override
    public Integer LingQuYouHiuJuan(Integer yhid,Integer keid) {
        Criteria c=new  Criteria();    //设置条件
        c.and("yhid").is(yhid);
        Query query =new  Query();   //使条件生效
        query.addCriteria( c );
        //查询  是否领取过劵
        Youhiu_xu one = mongoTemplate.findOne(query, Youhiu_xu.class, "juan" + keid);
        if(one != null){
            return 2;
        }else{
            //没领过
            Youhiu_xu  y=new Youhiu_xu();
            y.setYhid(yhid);
            mongoTemplate.insert(y,"juan"+keid);
            //领取劵 减数量
            xu1.LingQuYouHiuJuan(yhid);
        }

        return 3;
    }

    //个人优惠劵查
    @Override
    public List<Youhiu_xu> YouHiuJuanCha(Integer keid) {
        List<Youhiu_xu> list1 = mongoTemplate.findAll(Youhiu_xu.class, "juan" + keid);
       String   id="";
        for (int i=0;i < list1.size();i++){
            id +=list1.get(i).getYhid()+",";
        }
        String[]  ids=id.split(",");
        List<Youhiu_xu> list = xu1.YouHiuJuanCha(ids);
        return list;
    }


    //历史记录
    @Override
    public  List<Product> history(Integer keid) {
        String  key="h"+keid;
        List<History> list1 = redisTemplate.opsForList().range(key, 0, -1);
        String  ids="";
        for (int i=0;i < list1.size();i++){
             ids += list1.get(i).getParame()+",";
        }
       String[]  ids1= ids.split(",");
       List<Product>  list= xu1.history(ids1);
        return list;
    }




}
