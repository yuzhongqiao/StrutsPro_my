package com.jidian.ssh.dao;

import java.util.List;

import com.jidian.ssh.entity.Orders;
import com.jidian.ssh.entity.Ordersmx;
import com.jidian.ssh.entity.Outproduct;
import com.jidian.ssh.entity.Stock;

public interface OrdersDao {

	List showOrders(int current, int pis,int pid,int eid,int cid,int oid,int ris);
	
	void addOrders(Orders orders);
	
	List showOrdersmx(int current, int pis,int oid);
	
	void addOrdersmx(Ordersmx ordersmx);
	
	Stock findStock(int pid);
	
	List showOrdersmxGroup(int oid);
	
	List showOrdersmx(int oid);
	
	void uppStock(Stock stock);
	
	Orders getOrder(int oid);
	
	void addOutproduct(Outproduct outproduct);
	
	void uppOrders(Orders orders);
	
	void delOrdersmx(int oid);
	
	void uppOrdersmx(int oid, int count);
	
	 List OneEmpOrder(int eid);
	 
	 List OneOrdersmxCount(int xid);
	 
	 List OneProductOrderMx(int pid);
	 
	 List OneEmpTimeOrder(Integer eid,int time);
	
}
