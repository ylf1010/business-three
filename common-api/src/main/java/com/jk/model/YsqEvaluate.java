package com.jk.model;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class YsqEvaluate implements Serializable {
    private Integer id;



    private String evaluate;

    private String text;

    private Date time;

    private Integer pid;
    private String name;
    private Map<String, Object> attributes = new HashMap<String, Object>(); // 添加到节点的自定义属性

    private List<YsqEvaluate> nodes;

    private Integer jiaoyiid;

    public Integer getPid() {
        return pid;
    }

    public void setPid(Integer pid) {
        this.pid = pid;
    }

    public Map<String, Object> getAttributes() {
        return attributes;
    }

    public void setAttributes(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public List<YsqEvaluate> getNodes() {
        return nodes;
    }

    public void setNodes(List<YsqEvaluate> nodes) {
        this.nodes = nodes;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEvaluate() {
        return evaluate;
    }

    public void setEvaluate(String evaluate) {
        this.evaluate = evaluate == null ? null : evaluate.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Integer getJiaoyiid() {
        return jiaoyiid;
    }

    public void setJiaoyiid(Integer jiaoyiid) {
        this.jiaoyiid = jiaoyiid;
    }
}