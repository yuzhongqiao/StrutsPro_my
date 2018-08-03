package com.jidian.ssh.service.impl;

import java.util.List;

import com.jidian.ssh.dao.OrdersDao;
import com.jidian.ssh.entity.Orders;
import com.jidian.ssh.entity.Ordersmx;
import com.jidian.ssh.entity.Outproduct;
import com.jidian.ssh.entity.Stock;
import com.jidian.ssh.service.OrdersService;

public class OrdersServiceImpl implements OrdersService{

	private OrdersDao ordersDao;
	
	public OrdersDao getOrdersDao() {
		return ordersDao;
	}

	public void setOrdersDao(OrdersDao ordersDao) {
		this.ordersDao = ordersDao;
	}

	@Override
	public List showOrders(int num, String size, int pid, int eid,
			int cid, int oid, int ris) {
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
		return ordersDao.showOrders(pageNum, pageSize, pid, eid, cid, oid, ris);
	}

	@Override
	public void addOrders(Orders orders) {
		ordersDao.addOrders(orders);
	}

	@Override
	public List showOrdersmx(int num, String size, int oid) {
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
		return ordersDao.showOrdersmx(pageNum, pageSize, oid);
	}

	@Override
	public void addOrdersmx(Ordersmx ordersmx) {
		ordersDao.addOrdersmx(ordersmx);
	}

	@Override
	public Stock findStock(int pid) {
		return ordersDao.findStock(pid);
	}

	@Override
	public List showOrdersmxGroup(int oid) {
		return ordersDao.showOrdersmxGroup(oid);
	}

	@Override
	public List showOrdersmx(int oid) {
		return ordersDao.showOrdersmx(oid);
	}

	@Override
	public void uppStock(Stock stock) {
		ordersDao.uppStock(stock);
	}

	@Override
	public Orders getOrder(int oid) {
		return ordersDao.getOrder(oid);
	}

	@Override
	public void addOutproduct(Outproduct outproduct) {
		ordersDao.addOutproduct(outproduct);
	}

	@Override
	public void uppOrders(Orders orders) {
		ordersDao.uppOrders(orders);
	}

	@Override
	public void delOrdersmx(int oid) {
		ordersDao.delOrdersmx(oid);
	}

	@Override
	public void uppOrdersmx(int oid, int count) {
		ordersDao.uppOrdersmx(oid, count);
	}

}
