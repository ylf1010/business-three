package com.jk.dao;

import com.jk.model.User;
import org.apache.ibatis.annotations.Select;

public interface UserMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);
@Select("select * from user where username = #{username}")
    User loginUser(User user);

    void addregisUser(User user);
}