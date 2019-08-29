package com.jk.util;

import com.jk.model.ZtxTree;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class TreeNoteUtil implements Serializable {


    /**
     * 获取父节点菜单
     * @param treesList 所有树菜单集合
     * @return
     */
    public final static List<ZtxTree> getFatherNode(List<ZtxTree> treesList){
        List<ZtxTree> newTrees = new ArrayList<ZtxTree>();
        for (ZtxTree mt : treesList) {
            if (mt.getPid() ==null || "".equals(mt.getPid()) || mt.getPid().equals("0")) {//如果pId为空，则该节点为父节点
                //递归获取父节点下的子节点
                mt.setNodes(getChildrenNode(mt.getId().toString(), treesList));
                newTrees.add(mt);
            }
        }
        return newTrees;
    }
    
    /**
     * 递归获取子节点下的子节点
     * @param pId 父节点的ID
     * @param treesList 所有菜单树集合
     * @return
     */
    private final static List<ZtxTree> getChildrenNode(String pId, List<ZtxTree> treesList){
        List<ZtxTree> newTrees = new ArrayList<ZtxTree>();
        for (ZtxTree mt : treesList) {
            if (mt.getPid()==null || mt.getPid().equals("0")) continue;
            if(mt.getPid().equals(pId) ){
                //递归获取子节点下的子节点，即设置树控件中的children
                mt.setNodes(getChildrenNode(mt.getId().toString(), treesList));
                //设置树控件attributes属性的数据
                Map<String, Object> map = new HashMap<String, Object>();
                map.put("url", mt.getUrl());
                mt.setAttributes(map);
                newTrees.add(mt);
            }
        }
        return newTrees;
    }
}
