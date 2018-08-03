package com.jidian.ssh.dao;

import java.util.List;

import com.jidian.ssh.entity.Inproduct;
import com.jidian.ssh.entity.Stock;

public interface InproductDao {

	//根据产品pid得到库存
	Stock findSum(int pid);
		
	//更新库存数量
	void uppStock(Stock stock);
	
	//添加入库信息
	void addInproduct(Inproduct inproduct);
	
	//查看入库的详细信息
	List showInproduct(int pid,int current,int pis);
	
	//查看出库的详细信息
	List showOutproduct(int pid,int current,int pis);
}
