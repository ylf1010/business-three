package com.jk.util;

import java.io.Serializable;

public class RowsTotal implements Serializable {
    //bootstrap 查询返回list数据,总条数 使用
    private Integer total; //总条数
    private Object rows;// list 数据

    public Integer getTotal() {
        return total;
    }

    public Object getRows() {
        return rows;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public void setRows(Object rows) {
        this.rows = rows;
    }
}
