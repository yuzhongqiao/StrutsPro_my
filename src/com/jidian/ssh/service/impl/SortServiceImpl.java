package com.jidian.ssh.service.impl;

import java.util.List;

import com.jidian.ssh.dao.SortDao;
import com.jidian.ssh.dao.impl.SortDaoImpl;
import com.jidian.ssh.entity.Sort;
import com.jidian.ssh.service.SortService;


public class SortServiceImpl implements SortService{
	private SortDao sortDao;
	
	public SortDao getSortDao() {
		return sortDao;
	}
	public void setSortDao(SortDao sortDao) {
		this.sortDao = sortDao;
	}
	
	@Override
	public List FindSortService(String num, String size, int is) {
		int pageNum=0;
		if(num==null||num==""){
			pageNum=1;
		}else{
			pageNum=new Integer(num);
		}
		int pageSize=0;
		if(size==null||size==""){
			pageSize=5;
		}else{
			pageSize=new Integer(size);
		}
		List S=sortDao.FindSort(pageNum, pageSize, is);
		return S;
	}
	@Override
	public void AddSort(Sort sort) {
		// TODO Auto-generated method stub
		sortDao.AddSort(sort);
	}
	@Override
	public int FindSortName(String name) {
		// TODO Auto-generated method stub
		return sortDao.FindSortName(name);
	}
	@Override
	public void DelSort(int id,int sis) {
		// TODO Auto-generated method stub
		sortDao.DelSort(id,sis);
	}

}
