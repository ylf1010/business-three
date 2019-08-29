package com.jk.dao;

import com.jk.model.Classify;
import com.jk.util.ParameUtil;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface ClassifyMapper {
    int deleteByPrimaryKey(Integer flid);

    int insert(Classify record);

    int insertSelective(Classify record);

    Classify selectByPrimaryKey(Integer flid);

    int updateByPrimaryKeySelective(Classify record);

    int updateByPrimaryKey(Classify record);

    List<Classify> showClassify(ParameUtil parame);

    void addClassify(Classify classify);

    void delClassify(@Param("flids") String flids);

    //Classify xgClassifypage(@Param("flid") Integer flid);
   @Select("select * from ly_classify")
    List<Classify> queryClassify();
    @Delete("delete from  ly_classify where  flid=#{flid}")
    void delclassifyid(@Param("flid") int flid);
}