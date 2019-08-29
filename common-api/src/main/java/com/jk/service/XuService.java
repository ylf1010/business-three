package com.jk.service;

import com.jk.model.*;
import com.jk.util.BootStrapUtil;
import com.jk.util.RowsTotal;


import java.util.List;

public interface XuService {

       //客户
    RowsTotal xkehulist(BootStrapUtil bt);

    void xdelete1(String[] ids);

    List<Zu_xu> xxiala1();

    List<BiaoQian_xu> xXiaLaBiaoQian();

    void xupdateBiaoQian(User_xu userke);

    void xupdate1(Integer[] ids, Integer a);

    void xaddfenzu(Zu_xu zu);

    List<User_xu> xkehuxiangqing(Integer keid);

    void xupdatekehu(User_xu userx);

    void xupdatejifen(Jifen_xu jifen);


       //会员

    RowsTotal uhiuyuancha(BootStrapUtil bt);

    void quxiaohiuyuan(String[] ids);

    List<Member_xu> uHiuYuanShezhi();

    void uaddHiuYuan(Member_xu mem);

    void udeleteHiuYuan(Integer hyid, Integer a);

    RowsTotal uJiFenCha(BootStrapUtil bt);

    List<Member_xu> uXiaLaHiuYuan();

    void uZengHiuYuan(Um_xu um);

    RowsTotal uBiaoQianCha();

    void uaddBiaoQian(BiaoQian_xu bq);

    void udeleteBiaoQian(Integer bqid);


    List<Youhiu_xu> ulistyouhiu(BootStrapUtil bt);

    void uaddyouhiu(Youhiu_xu youhiu);

    void udeleteyouhiu(String[] ids);
}
