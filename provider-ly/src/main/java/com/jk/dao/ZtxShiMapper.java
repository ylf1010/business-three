package com.jk.dao;

import com.jk.model.ZtxShi;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface ZtxShiMapper {
    int deleteByPrimaryKey(Integer orignshiid);

    int insert(ZtxShi record);

    int insertSelective(ZtxShi record);

    ZtxShi selectByPrimaryKey(Integer orignshiid);

    int updateByPrimaryKeySelective(ZtxShi record);

    int updateByPrimaryKey(ZtxShi record);

    @Select("select * from ly_orignshi where orignshengid=#{orignshengid}")
    List<ZtxShi> queryshi(Integer orignshengid);
  // @Select("select * from ly_orignshi")
    List<ZtxShi> queryShi();
}