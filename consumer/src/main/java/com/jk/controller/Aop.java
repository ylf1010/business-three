package com.jk.controller;


import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.UnknownHostException;
import java.util.Date;
import java.util.Enumeration;
import java.util.concurrent.TimeUnit;

import javax.servlet.http.HttpServletRequest;

import com.jk.model.History;
import com.jk.model.User_xu;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;



//加入注解
@Aspect    //声明Aop
@Component
public class Aop {  //mongo 自增 log日志信息
    //注入mongodb
//    @Autowired
    // private  MongoTemplate mongoTemplate;
    @Autowired
    private RedisTemplate  redisTemplate;

    //设置要拦截的层（这里只拦UserContrller请求，可以每一层都拦，也可精确到拦一个方法）
    @Pointcut("execution(* com.jk.controller.ZtxController.queryone(..))")
    public  void  logPointCut() { }  //定义一个方(根据注解获取请求地址供下面使用)

    //本方法用了 aop切点中的：  后置通知
    //JoinPoint包导进来的  value=“和上面的方法名一致” ,returning="returningValue返回值 和下面参数一致"
    @AfterReturning(value="logPointCut()",returning="returningValue")
    public  void  logadd(JoinPoint jp,Object returningValue) throws UnknownHostException { //set获取ip抛出的异常  //returningValue是返回值，但需要告诉spring
       // System.out.println("《注解形式-后置通知》：目标对象请求地址："+jp.getTarget()+",方法名："+jp.getSignature().getName() +",参数列表："+  jp.getArgs().length+",返回值："+returningValue );

        //new 实体Log  来装对应的内容  （这里7个属性）
        History  h=new History();

        h.setHip(getIp());
        h.setHdate(new Date());


        //获取请求参数  jp.getArgs();
        Object[] args=jp.getArgs();
        if(args != null) {

            h.setParame(args[0].toString());  //请求参数
        }

        // 获取  request 对象  来获取  session ，通过session获取用户信息
        HttpServletRequest request =((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        User_xu user = (User_xu) request.getSession().getAttribute("user_xu");
        if(user !=null && h !=null) {
            String  key="h"+user.getKeid();
            h.setUid(user.getKeid());
            redisTemplate.opsForList().rightPush(key,h);
            redisTemplate.expire(key, 300,TimeUnit.MINUTES);
        }


    }




    /**
     *     获取  ip 地址
     * @return
     * @throws UnknownHostException
     */
    private String getIp() throws UnknownHostException{
        try {
            InetAddress candidateAddress = null;
            // 遍历所有的网络接口
            for (Enumeration ifaces = NetworkInterface.getNetworkInterfaces(); ifaces.hasMoreElements(); ) {
                NetworkInterface iface = (NetworkInterface) ifaces.nextElement();
                // 在所有的接口下再遍历IP
                for (Enumeration inetAddrs = iface.getInetAddresses(); inetAddrs.hasMoreElements(); ) {
                    InetAddress inetAddr = (InetAddress) inetAddrs.nextElement();
                    if (!inetAddr.isLoopbackAddress()) {// 排除loopback类型地址
                        if (inetAddr.isSiteLocalAddress()) {
                            // 如果是site-local地址，就是它了
                            return inetAddr.getHostAddress();
                        } else if (candidateAddress == null) {
                            // site-local类型的地址未被发现，先记录候选地址
                            candidateAddress = inetAddr;
                        }
                    }
                }
            }
            if (candidateAddress != null) {
                return candidateAddress.getHostAddress();
            }
            // 如果没有发现 non-loopback地址.只能用最次选的方案
            InetAddress jdkSuppliedAddress = InetAddress.getLocalHost();
            if (jdkSuppliedAddress == null) {
                throw new UnknownHostException("The JDK InetAddress.getLocalHost() method unexpectedly returned null.");
            }
            return jdkSuppliedAddress.getHostAddress();
        } catch (Exception e) {
            UnknownHostException unknownHostException = new UnknownHostException(
                    "Failed to determine LAN address: " + e);
            unknownHostException.initCause(e);
            throw unknownHostException;
        }
    }


}




