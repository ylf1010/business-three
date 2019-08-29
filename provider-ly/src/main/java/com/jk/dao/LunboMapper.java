package com.jk.dao;

import com.jk.model.Lunbo;
import com.jk.util.ParameUtil;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface LunboMapper {
    int deleteByPrimaryKey(Integer carouselid);

    int insert(Lunbo record);

    int insertSelective(Lunbo record);

    Lunbo selectByPrimaryKey(Integer carouselid);

    int updateByPrimaryKeySelective(Lunbo record);

    int updateByPrimaryKey(Lunbo record);

    List<Lunbo> querylylunbo(@Param("p") ParameUtil parame);

    void addLunbo(Lunbo lunbo);
    @Delete("delete from ly_lunbotu where carouselid =#{carouselid} ")
    void dellunbo(@Param("carouselid") int carouselid);
}