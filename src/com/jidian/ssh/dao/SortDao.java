package com.jidian.ssh.dao;

import java.util.List;

import com.jidian.ssh.entity.Sort;


public interface SortDao {
	//查询部门数量
	int findtotalRecordsNum(int is);

	//分页查看部门
	List FindSort(int pageNum, int pageSize,int is);
	
	//添加类别
	void AddSort(Sort sort);
	
	//根据名字查找有无
	int FindSortName(String name);
	
	//类别恢复和下架
	void DelSort(int id,int sis);
	
	Sort FindSortById(int sid);
	
	
}
