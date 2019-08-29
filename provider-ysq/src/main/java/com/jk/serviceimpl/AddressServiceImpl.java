package com.jk.serviceimpl;

import com.alibaba.dubbo.config.annotation.Service;
import com.jk.dao.AddressDao;
import com.jk.model.*;
import com.jk.service.AddressService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.redis.core.RedisTemplate;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class AddressServiceImpl implements AddressService {
    public static final Query QUERY = new Query();
    @Autowired
    private AddressDao addressDao;
    @Resource
    private MongoTemplate mongoTemplate;
    @Resource
    private RedisTemplate<String,YsqJiaoYi> redisTemplate;
    @Autowired
    private HttpServletRequest request;

    @Override
    public List<Product> addJiaoYi(Integer productid) {

        return addressDao.addJiaoYi(productid);
    }

    @Override
    public List<Addressysq> chaAddress(Integer id) {
        return addressDao.chaAddress(id);
    }

    @Override
    public void updateJiaoYiState(Integer ordernumber) {

        addressDao.updateJiaoYiState(ordernumber);
    }

    @Override
    public List<Product> chaJiaoYi(Integer productid) {

        return addressDao.chaJiaoYi(productid);
    }

    @Override
    public void addressDiZhi(Addressysq addressysq) {
        StringBuffer stringBuffer = new StringBuffer();
        stringBuffer.append(" "+addressysq.getCmbProvince()).append(" "+addressysq.getCmbCity()).append(" "+addressysq.getCmbArea());
        addressysq.setAddress(stringBuffer.toString());
        if(addressysq.getId()!=null && !"".equals(addressysq.getId())){
            addressDao.addressDiZhiXiuGai(addressysq);
            return;
        }
        addressDao.addressDiZhi(addressysq);
    }

    @Override
    public void deleteAddress(String id) {

        addressDao.deleteAddress(id);
    }

    @Override
    public String addDingDan(Shopping_xu shopping,Integer id,Integer addressid) {
        Product p = addressDao.queryProductById(shopping.getProductid().toString());
        YsqJiaoYi jiaoYi = new YsqJiaoYi();
        Date date = new Date();
        jiaoYi.setId(shopping.getProductid());
        StringBuffer buffer = new StringBuffer();
        buffer.append(date.getTime()).append(id);
        jiaoYi.setOrdernumber(buffer.toString());
        jiaoYi.setAmount(shopping.getProductcount());
        jiaoYi.setMoney(Integer.toString((int) (p.getProductprice()*shopping.getProductcount())));
        jiaoYi.setState(1);
        jiaoYi.setAddressid(addressid.toString());
        jiaoYi.setUnitprice(p.getProductprice().intValue());
        jiaoYi.setProductname(p.getProductname());
        jiaoYi.setXu_userid(id);
        redisTemplate.opsForList().rightPush("shopping"+id,jiaoYi);
        redisTemplate.expire("shopping"+id,5,TimeUnit.MINUTES);
        //addressDao.addDingDan(jiaoYi);
        return buffer.toString();
    }
    @Override
    public String addDingDan2(Product product,Integer id,Integer addressid) {
        //Product p = addressDao.queryProductById(product.getProductid().toString());
        YsqJiaoYi jiaoYi = new YsqJiaoYi();
        Date date = new Date();
        jiaoYi.setId(product.getProductid());
        StringBuffer buffer = new StringBuffer();
        buffer.append(date.getTime()).append(id);
        jiaoYi.setOrdernumber(buffer.toString());
        jiaoYi.setAmount(1);
        jiaoYi.setAddressid(addressid.toString());
        jiaoYi.setMoney(Integer.toString((int) (product.getProductprice()*1)));
        jiaoYi.setState(1);
        jiaoYi.setUnitprice(product.getProductprice().intValue());
        jiaoYi.setProductname(product.getProductname());
        jiaoYi.setXu_userid(id);
        redisTemplate.opsForList().rightPush("shopping"+id,jiaoYi);
        redisTemplate.expire("shopping"+id,5,TimeUnit.MINUTES);
        //addressDao.addDingDan(jiaoYi);
        return buffer.toString();
    }

    @Override
    public List<Shopping_xu> chaShopping(int[] productid,Integer userid) {
        /*Criteria c = new Criteria();
        c.and("productid").in(productid);
        Query query = new Query();
        query.addCriteria(c);
        List<Product> list = mongoTemplate.find(query,Product.class,"shopping");
        return list;*/
        List<Shopping_xu> list = new ArrayList<>();
        for(int i=0;i<productid.length;i++){
            Criteria c = new Criteria();
            c.and("productid").is(productid[i]);
            Query query = new Query();
            query.addCriteria(c);
            Shopping_xu p = mongoTemplate.findOne(query,Shopping_xu.class,"shopping"+1);
            if(p!=null){


                list.add(p);
            }
        }
        return list;
        //return addressDao.chaShopping(productid);
    }

    @Override
    public String addDingDanAll(int[] id,Integer userid,Integer adduserid) {
        /*List<Product> list = addressDao.queryProductByIdAll(id);
        YsqJiaoYi jiaoYi = new YsqJiaoYi();
        Date date = new Date();*/
       // List<Product> list = new ArrayList<>();
        StringBuffer buffer = new StringBuffer();
        Date date = new Date();
        buffer.append(date.getTime()).append(userid);
        for(int i=0;i<id.length;i++){
            Criteria c = new Criteria();
            c.and("productid").is(id[i]);
            Query query = new Query();
            query.addCriteria(c);
            Shopping_xu shopping = mongoTemplate.findOne(query,Shopping_xu.class,"shopping"+userid);
            if(shopping!=null){
                //list.add(shopping);
                YsqJiaoYi jiaoYi = new YsqJiaoYi();
                jiaoYi.setId(shopping.getProductid());
                jiaoYi.setOrdernumber(buffer.toString());
                jiaoYi.setAmount(shopping.getProductcount());
                jiaoYi.setMoney(Integer.toString((int) (shopping.getProductprice()*shopping.getProductcount())));
                jiaoYi.setState(1);
                jiaoYi.setAddressid(adduserid.toString());
                jiaoYi.setOrdertime(new Date());
                jiaoYi.setUnitprice(shopping.getProductprice().intValue());
                jiaoYi.setProductname(shopping.getProductname());
                jiaoYi.setXu_userid(userid);
                jiaoYi.setImg(shopping.getProductphoto());
               // mongoTemplate.insert(jiaoYi,"shopping"+userid);
                redisTemplate.opsForList().rightPush("shopping"+userid,jiaoYi);
                redisTemplate.expire("shopping"+userid,3, TimeUnit.MINUTES);
                mongoTemplate.remove(query,"shopping"+userid);
               // addressDao.addDingDan(jiaoYi);
            }
        }
        return buffer.toString();

    }

    @Override
    public void addDingDan1(Integer id) {
       // User_xu user = (User_xu) request.getSession().getAttribute("user_xu");
        List<YsqJiaoYi> range = redisTemplate.opsForList().range("shopping" + id, 0, -1);
        addressDao.addDingDan1(range);
        for (int i=0;i<range.size();i++){

            addressDao.updateProduct(range.get(i).getId().toString(),range.get(i).getAmount());
        }
        redisTemplate.opsForList().remove("shopping"+id,0,-1);
    }

    @RabbitListener(queues = "test")
    public void hello(String a){
        System.err.println(new Date());
        System.err.println(a);
    }
}
