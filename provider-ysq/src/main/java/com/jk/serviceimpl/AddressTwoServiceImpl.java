package com.jk.serviceimpl;

import com.alibaba.dubbo.config.annotation.Service;
import com.jk.dao.AddressDao;
import com.jk.model.Product;
import com.jk.service.AddressTwoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;

import javax.annotation.Resource;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.TimeUnit;

@Service
public class AddressTwoServiceImpl implements AddressTwoService {
    @Autowired
    private AddressDao addressDao;
    @Resource
    private RedisTemplate<String, Product> redisTemplate;

    @Override
    public void addDingDan2(Product product, Integer keid) {
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
}
