package com.jk.service;


import com.alibaba.dubbo.config.annotation.Service;
import com.jk.dao.UserMapper;
import com.jk.model.User;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class LoginServiceImpl implements LoginService{
    @Autowired
    private UserMapper userMapper;
    @Override
    public User loginUser(User user) {
        return userMapper.loginUser(user);
    }

    @Override
    public void addregisUser(User user) {
        userMapper.addregisUser(user);
    }




}
