package com.jidian.ssh.service.impl;

import java.util.List;

import com.jidian.ssh.dao.InproductDao;
import com.jidian.ssh.entity.Inproduct;
import com.jidian.ssh.entity.Stock;
import com.jidian.ssh.service.InproductService;

public class InproductServiceImpl implements InproductService{

	private InproductDao inproductDao;

	public InproductDao getInproductDao() {
		return inproductDao;
	}

	public void setInproductDao(InproductDao inproductDao) {
		this.inproductDao = inproductDao;
	}

	@Override
	public Stock findSum(int pid) {
		// TODO Auto-generated method stub
		return inproductDao.findSum(pid);
	}

	@Override
	public void uppStock(Stock stock) {
		// TODO Auto-generated method stub
		inproductDao.uppStock(stock);
	}

	@Override
	public void addInproduct(Inproduct inproduct) {
		// TODO Auto-generated method stub
		inproductDao.addInproduct(inproduct);
	}

	@Override
	public List showInproduct(int pid, int num, String size) {
		int pageNum=0;
		if(num==0){
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
		return inproductDao.showInproduct(pid, pageNum, pageSize);
	}

	@Override
	public List showOutproduct(int pid, int num, String size) {
		int pageNum=0;
		if(num==0){
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
		return inproductDao.showOutproduct(pid, pageNum, pageSize);
	}
}
