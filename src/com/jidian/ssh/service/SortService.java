package com.jidian.ssh.service;

import java.util.List;

import com.jidian.ssh.entity.Sort;


public interface SortService {
	//查看类别
	List FindSortService(String current, String pis,int is);
	
	//添加类别
	void AddSort(Sort sort);
	
	//根据名字查找有无
	int FindSortName(String name);
	
	//类别恢复和下架
	void DelSort(int id,int sis);
}
