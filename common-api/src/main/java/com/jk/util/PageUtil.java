package com.jk.util;

import java.io.Serializable;
import java.util.List;

/**
 * 接受分页参数
 *
 * @author yaoli
 */

public class PageUtil implements Serializable {


    private Integer pageCount = 2;

    private Integer currentPage = 1;


    private List list;


    private Integer sumSize;


    // 总页数
    private Integer sumPage;


    public Integer getSumSize() {
        return sumSize;
    }

    public void setSumSize(Integer sumSize) {
        this.sumSize = sumSize;
    }

    public Integer getSumPage() {
        return sumPage;
    }

    public void setSumPage(Integer sumPage) {
        this.sumPage = sumPage;
    }

    public List getList() {
        return list;
    }

    public void setList(List list) {
        this.list = list;
    }

    public Integer getPageCount() {
        return pageCount;
    }

    public void setPageCount(Integer pageCount) {
        this.pageCount = pageCount;
    }

    public Integer getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(Integer currentPage) {
        this.currentPage = currentPage;
    }


    /**
     * 总条数，当前页数，每页多少条
     *
     * @param sumSize
     * @param currentPage
     * @param pageCount
     */
    public PageUtil(Integer sumSize, Integer currentPage, Integer pageCount) {
        super();

        this.currentPage = currentPage == null ? 1 : currentPage;
        this.pageCount = pageCount == null ? 2 : pageCount;
        this.sumSize = sumSize <= 0 ? 1 : sumSize;

        if (this.sumSize % this.pageCount == 0) {
            this.sumPage = this.sumSize / this.pageCount;
        } else {
            this.sumPage = this.sumSize / this.pageCount + 1;

        }


        if (this.currentPage > this.sumPage) {
            this.currentPage = this.sumPage;
        }

        if (this.currentPage < 1) {
            this.currentPage = 1;
        }

    }


    //分页方法：设置起始条数
    public Integer getFirstResultCount() {

        Integer firstResultCount = (getCurrentPage() - 1) * getPageCount();

        return firstResultCount;
    }

    public PageUtil() {
        super();

    }


}
