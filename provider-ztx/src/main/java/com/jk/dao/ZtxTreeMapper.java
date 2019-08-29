package com.jk.dao;

import com.jk.model.ZtxTree;
import com.jk.util.ParameUtil;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ZtxTreeMapper {

    List<ZtxTree> querytree(@Param("id") Integer id);

    List<ZtxTree> querytreeall();

    List<ZtxTree> queryOrgAll2(@Param("id") int id, @Param("pid") int pid);

    List<ZtxTree> queryOrgAll3(@Param("pid") int pid);

    List querydsh(@Param("p") ParameUtil param, @Param("papa") int papa, @Param("pageSize") Integer pageSize);
    Long querydshcount(@Param("p") ParameUtil param);

    List queryytg(@Param("p") ParameUtil param, @Param("papa") int papa, @Param("pageSize") Integer pageSize);

    Long queryytgcount(@Param("p") ParameUtil param);
}