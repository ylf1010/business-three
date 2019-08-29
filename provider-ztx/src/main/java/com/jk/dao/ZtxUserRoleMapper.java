package com.jk.dao;

import com.jk.model.ZtxUserRole;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface ZtxUserRoleMapper {

    @Select("select roleid from y_user_role where userid=#{id}")
    List<String> queryrolebyid(Integer id);

    @Delete("delete from y_user_role where userid=#{id}")
    int deleterole(Integer id);

    @Insert("insert into y_user_role(userid,roleid) values(#{userid},#{roleid})")
    int addurm(ZtxUserRole rpm);

    @Update("update user set status=#{status} where id=#{id}")
    void updatestatus(@Param("id") Integer id, @Param("status") Integer status);

    @Update("update y_user_role set roleid=#{ids} where userid=#{id}")
    void updatero(@Param("ids") Integer ids, @Param("id") Integer id);

    @Select("select id from user where username=#{username}")
    int queryidbyname(@Param("username") String username);
    @Insert("insert into y_user_role(userid,roleid) values(#{a},#{roleid})")
    void adduserrole(@Param("a") int a, @Param("roleid") Integer roleid);
}