package com.jk.dao;

import com.jk.model.*;
import com.jk.util.BootStrapUtil;

import java.util.List;
import java.util.Map;

public interface XuDao {

         //客户
    Integer xkehulistcount(Map map);

    List<User_xu> xkehulist(Map map);

    Integer xdelete1(String[] ids);

    List<Zu_xu> xxiala1();

    List<BiaoQian_xu> xXiaLaBiaoQian();

    void xupdateBiaoQian(User_xu userke);

    void xdelete1jifen(String[] ids);

    void xaddfenzu(Zu_xu zu);

    void xupdate1(Integer id, Integer a);

    List<User_xu> xkehuxiangqing(Integer keid);

    void xupdatekehu(User_xu userx);

    void xupdatejifen(Jifen_xu jifen);




            // 会员
    Integer uhiuyuancount(Map map);

    List<Um_xu> uhiuyuancha(Map map);


    Integer quxiaohiuyuan(String[] ids);

    void deleteum_xu(String[] ids);



    List<Member_xu> uHiuYuanShezhi();

    void uupdateHiuYuan(Member_xu mem);

    void uaddHiuYuan(Member_xu mem);

    void udeleteHiuYuan(Integer hyid, Integer a);

    Integer uJiFencount(Map map);


    List<Jifen_xu> uJiFenCha(Map map);

    List<Member_xu> uXiaLaHiuYuan();

    Integer uZengHiuYuan(Um_xu um);

    void uupdateKeHu(Um_xu um);


    List<BiaoQian_xu> uBiaoQianCha();

    Integer udeleteBiaoQian(Integer bqid);

    void uupdateBiaoQian(BiaoQian_xu bq);

    void uaddBiaoQian(BiaoQian_xu bq);

    void uupdateKeHuBiaoQian(Integer bqid);


    List<Youhiu_xu> ulistyouhiu(BootStrapUtil bt);

    void uupdateyouhiu(Youhiu_xu youhiu);

    void uaddyouhiu(Youhiu_xu youhiu);

    void udeleteyouhiu(String[] ids);
}
