package com.jk.rabbit;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration //把当前类当做一个spring的配置文件
public class QueueManager {
    @Bean//把当前队列注入到spring环境中
    public Queue createTestQueue(){
        return new Queue("test");
    }
}
