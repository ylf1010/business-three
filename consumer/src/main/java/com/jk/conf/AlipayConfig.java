package com.jk.conf;

import java.io.FileWriter;
import java.io.IOException;

public class AlipayConfig {
    // 应用ID,您的APPID，收款账号既是您的APPID对应支付宝账号
    public static String app_id = "2016101000651518";

    // 商户私钥，您的PKCS8格式RSA2私钥
    public static String merchant_private_key = "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCFiDY4UpfG9M4ro2jTwNtAMVI4L2afUOQjmAYZHYnBNkcBbgCcBdFFidNO8CNAuwAJK42Utk9kCE3Wb4LiMExU2qWMLCtU8S/nH2hVR9tXIunHfVJUxHXXKB/iDoF5HTrtco6ICqH5n0+GIYlTLNOrJeXiLTKxRBLT+BsfcTlXn5fyX0xG6lV0xBnJ+cu3B8j4tU1F9QRDBwR1MqWDYATIGsQFFSw/+TM1pXrP9yh7JHNLZ4MViJiyY/QCjZ0YUnx/u9BjHWtbqIEdsYWai2qrSu3k0ckGCJb/gdiuyuWThiNzda7eXZ7or265JSrbdX/KDkPisYWodi6EUhAAtV2HAgMBAAECggEARk9unUGAAZataHTmoXkO+UH/FO6Ajqq9NbC6pUbUXhQCV1Jgp8a4ZnEn/oybQ14zqqBwMDm+m+FzetHEjOz5hESMnr4zIsrMelojSaRIbh1IE259h3zav6u0/ga9TdSCTrzfJ+rRVur3qJzH/i/AVIHkBa/e3VAGye39+hRYKTZuIqC+3vuhDB5iV1q6ZHRpgW1SB0ZG2Jnsp9HkvSvC1D/7TaP3Ln3DQ9tI9jZgMW3/JAvuTqwyKAnUb2QSs/0kfOmoXpQVxcrgopZhZyAC/ueb0Tyev4OvKtuqI76SnySQepbELPhY2ADQz24Bey+NGBTrIlQuH4GgODPS33o/gQKBgQDaDNysyTdmwy4JyTIp7dLYUF2TovdulpqMI0nRk94YdIwLMDZ8dQK/AEJC354//Ha37pgTS39Qi09UdVZhm2LK42NLbhhrcDDP9OZGb5z7TTJleH0McylpoekrpPaxPWVq/m+ftE6ThFQLIqUtD7cjC5HiCd1+sM7m73D93SdE9wKBgQCcxa2UixBB/cOnVDdIiCPVSMVBxyGuuhkL2PfHkX7leLfxYPAZcdgGV6R3V3hniCh9efysKDQvSKwElV9WIpRLIVR5YeQeNAvHQX2ADd6piYUIE11A1LsLMRBf48Bk5odlduYUW/ePBkb3klq2t5ZMyDQ/9uxMI/WAx65k4D7X8QKBgQCtUSPmw1mh+OoTJTUWVs8M2XRH8XUzFcpqMXJvf1U9owXdrsjgTDGOmCoS9aPXwFitAp0mWRAteU3pGAs9MkFoey1lu3D1lQt3gHW47uacaVPxi7/5sV/tcqDf7BOZ9e8zCGK5UpxSbRBQeY1JMAClfoDKZoUEOo16yj/JyYt5KQKBgCFOzoZU1Wtv4vXWKri6VAKop2BGUp2w5ElkG6DHBNL0RwB9vAVr7p3KWSMR7n7wqsmd9VUOZaf2JLYElnDSf/dGaZAwgCr6m9YF0Ag46inTEfSZSKLRj7vc/MGivemyIOopzNBeicZVaxaGfcd8Ue6WSqOcbq/uo+ZshlzgV/nBAoGAYATnV9nIFza/zcy9uQjfAtd8qvkIGM0nzXq5nfFsqo+NnTxiqoz9oeGLhpQ6K0ao/x/alo8s4Ql0HzAH5bp6c+GoCTy1ClI6jmISXvU+Wbl7ydvgibEOFv1orl25jb2pSKJnplGWR/XZufSuGuzyjS+91uVBelfvKiN59soJYDY=";

    // 支付宝公钥,查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥。
    public static String alipay_public_key = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhYg2OFKXxvTOK6No08DbQDFSOC9mn1DkI5gGGR2JwTZHAW4AnAXRRYnTTvAjQLsACSuNlLZPZAhN1m+C4jBMVNqljCwrVPEv5x9oVUfbVyLpx31SVMR11ygf4g6BeR067XKOiAqh+Z9PhiGJUyzTqyXl4i0ysUQS0/gbH3E5V5+X8l9MRupVdMQZyfnLtwfI+LVNRfUEQwcEdTKlg2AEyBrEBRUsP/kzNaV6z/coeyRzS2eDFYiYsmP0Ao2dGFJ8f7vQYx1rW6iBHbGFmotqq0rt5NHJBgiW/4HYrsrlk4Yjc3Wu3l2e6K9uuSUq23V/yg5D4rGFqHYuhFIQALVdhwIDAQAB";

    // 服务器异步通知页面路径  需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
    public static String notify_url = "http://localhost:8004/ysqthree/tiao3";
    //public static String notify_url = "http://kyd.free.idcfengye.com/notify";
    // 页面跳转同步通知页面路径 需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
    //public static String return_url = "http://kyd.free.idcfengye.com/returnUrl";
    public static String return_url = "http://127.0.0.1:8004/ysqthree/adddingdan1";
    // 签名方式
    public static String sign_type = "RSA2";

    // 字符编码格式
    public static String charset = "utf-8";

    // 支付宝网关
    public static String gatewayUrl = "https://openapi.alipaydev.com/gateway.do";

    // 支付宝网关
    public static String log_path = "F:\\";


//↑↑↑↑↑↑↑↑↑↑请在这里配置您的基本信息↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

    /**
     * 写日志，方便测试（看网站需求，也可以改成把记录存入数据库）
     * @param sWord 要写入日志里的文本内容
     */
    public static void logResult(String sWord) {
        FileWriter writer = null;
        try {
            writer = new FileWriter(log_path + "alipay_log_" + System.currentTimeMillis()+".txt");
            writer.write(sWord);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (writer != null) {
                try {
                    writer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
