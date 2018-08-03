package com.jidian.ssh.action;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import com.jidian.ssh.entity.Orders;
import com.jidian.ssh.entity.Ordersmx;
import com.jidian.ssh.entity.Outproduct;
import com.jidian.ssh.entity.Stock;
import com.jidian.ssh.service.InproductService;
import com.jidian.ssh.service.OrdersService;
import com.opensymphony.xwork2.ActionSupport;

public class OrdersAction extends ActionSupport{

	private OrdersService ordersService;
	private int current;
	private int pid;
	private int eid;
	private int cid;
	private int oid;
	private int ris;
	private List list;
	private int count;
	private Orders orders=new Orders();
	private Ordersmx ordersmx=new Ordersmx();

	public Ordersmx getOrdersmx() {
		return ordersmx;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public void setOrdersmx(Ordersmx ordersmx) {
		this.ordersmx = ordersmx;
	}

	private int mydata;
	
	public int getMydata() {
		return mydata;
	}

	public void setMydata(int mydata) {
		this.mydata = mydata;
	}

	public Orders getOrders() {
		return orders;
	}

	public void setOrders(Orders orders) {
		this.orders = orders;
	}

	public List getList() {
		return list;
	}

	public void setList(List list) {
		this.list = list;
	}

	public OrdersService getOrdersService() {
		return ordersService;
	}

	public void setOrdersService(OrdersService ordersService) {
		this.ordersService = ordersService;
	}

	public int getCurrent() {
		return current;
	}

	public void setCurrent(int current) {
		this.current = current;
	}

	public int getPid() {
		return pid;
	}

	public void setPid(int pid) {
		this.pid = pid;
	}

	public int getEid() {
		return eid;
	}

	public void setEid(int eid) {
		this.eid = eid;
	}

	public int getCid() {
		return cid;
	}

	public void setCid(int cid) {
		this.cid = cid;
	}

	public int getOid() {
		return oid;
	}

	public void setOid(int oid) {
		this.oid = oid;
	}

	public int getRis() {
		return ris;
	}

	public void setRis(int ris) {
		this.ris = ris;
	}

	public String showOrders(){
		System.out.println("查看订单");
		this.list=ordersService.showOrders(current, "5", pid, eid, cid, oid, ris);
		return SUCCESS;
	}
	
	public String addOrders(){
		System.out.println("添加订单");
		orders.setR_is(1);
		orders.setR_time(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
		ordersService.addOrders(orders);
		mydata=1;
		return SUCCESS;
	}
	
	public String showOrdersmx(){
		System.out.println("查看订单详细");
		this.list=ordersService.showOrdersmx(current, "5", oid);
		System.out.println("1");
		if(list.size()!=0){
			Ordersmx mx=(Ordersmx) this.list.get(0);
			Stock stock=ordersService.findStock(mx.getProduct().getP_id());
			int stocknum=stock.getK_sum();
			if(mx.getX_count()>stocknum){
				mx.setScockError(1);
			}else{
				mx.setScockError(0);
			}
		}
		
		return SUCCESS;
	}
	
	public String addOrdersmx(){
		System.out.println("添加订单详细");
		ordersService.addOrdersmx(ordersmx);
		mydata=1;
		return SUCCESS;
	}
	
	public String saveOrder(){
		System.out.println("提交订单");
		mydata=1;
		orders=ordersService.getOrder(oid);
		List<Ordersmx> m=ordersService.showOrdersmx(oid);
		List<Ordersmx> mx=ordersService.showOrdersmxGroup(oid);
//		for (Ordersmx ordersmx : mx) {
//			System.out.println("1");
//			Stock stock=ordersService.findStock(ordersmx.getProduct().getP_id());
//			if(ordersmx.getX_count()>stock.getK_sum()){
//				mydata=0;
//				break;
//			}
//		}
		
			if(mydata==1){
				for (Ordersmx ordersmx : m) {
					System.out.println("1");
					//更新库存
					Stock stock=ordersService.findStock(ordersmx.getProduct().getP_id());
					stock.setK_sum(stock.getK_sum()-ordersmx.getX_count());
					//添加出库记录
					Outproduct outproduct=new Outproduct();
					outproduct.setProduct(ordersmx.getProduct());
					outproduct.setO_number(ordersmx.getX_count());
					outproduct.setO_time(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
					outproduct.setEmpbyeid(orders.getEmp());
					outproduct.setEmpbyoid(orders.getEmp());
					outproduct.setO_remark("暂无备注");
					ordersService.addOutproduct(outproduct);
				}
				//更新订单
				orders.setR_is(2);
				ordersService.uppOrders(orders);
			}
		return SUCCESS;
	}
	
			//删除订单详细
	public String delOrdersmx(){
		System.out.println("删除订单详细");
		ordersService.delOrdersmx(oid);
		mydata=1;
		return SUCCESS;
	}
	
			//放弃订单
	public String delOrder(){
		System.out.println("放弃订单");
		Orders orders=ordersService.getOrder(oid);
		orders.setR_is(0);
		ordersService.uppOrders(orders);
		mydata=1;
		return SUCCESS;
	}
	
			//修改订单详细
	public String uppOrdersmx(){
		System.out.println("修改订单详细");
		ordersService.uppOrdersmx(oid, count);
		mydata=1;
		return SUCCESS;
	}
	
}
