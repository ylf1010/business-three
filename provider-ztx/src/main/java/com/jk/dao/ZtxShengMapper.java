package com.jk.dao;

import com.jk.model.ZtxSheng;

public interface ZtxShengMapper {
    int deleteByPrimaryKey(Integer orignid);

    int insert(ZtxSheng record);

    int insertSelective(ZtxSheng record);

    ZtxSheng selectByPrimaryKey(Integer orignid);

    int updateByPrimaryKeySelective(ZtxSheng record);

    int updateByPrimaryKey(ZtxSheng record);

}