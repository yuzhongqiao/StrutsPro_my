package com.jidian.ssh.action;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import net.sf.json.JSONArray;

import com.jidian.ssh.entity.Inproduct;
import com.jidian.ssh.entity.Product;
import com.jidian.ssh.entity.Stock;
import com.jidian.ssh.service.InproductService;
import com.opensymphony.xwork2.ActionSupport;

public class InProductAction extends ActionSupport{

	private Inproduct inproduct=new Inproduct();
	private Product product=new Product();
	private InproductService inproductService;
	private int mydata;
	private int pid;
	private int current;
	private String result;
	private List list;
	
	public List getList() {
		return list;
	}

	public void setList(List list) {
		this.list = list;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public int getPid() {
		return pid;
	}

	public void setPid(int pid) {
		this.pid = pid;
	}

	public int getCurrent() {
		return current;
	}

	public void setCurrent(int current) {
		this.current = current;
	}

	public int getMydata() {
		return mydata;
	}

	public void setMydata(int mydata) {
		this.mydata = mydata;
	}

	public Inproduct getInproduct() {
		return inproduct;
	}

	public void setInproduct(Inproduct inproduct) {
		this.inproduct = inproduct;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public InproductService getInproductService() {
		return inproductService;
	}

	public void setInproductService(InproductService inproductService) {
		this.inproductService = inproductService;
	}

			//添加入库信息
	public String addInproduct(){
		System.out.println("添加入库信息");
		Stock stock=inproductService.findSum(inproduct.getProduct().getP_id());
		stock.setK_sum(inproduct.getD_number()+stock.getK_sum());
		inproductService.uppStock(stock);
		
		String dtime=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
		inproduct.setD_time(dtime);
		System.out.println(inproduct);
		inproductService.addInproduct(inproduct);
		mydata=1;
		return SUCCESS;
	}
	
			//查看入库的详细信息
	public String showInproduct(){
		System.out.println("查看入库的详细信息");
		System.out.println("current:"+current);
		this.list=inproductService.showInproduct(pid, current, "5");
		System.out.println(list);
		return SUCCESS;
	}
	
			//得到库存数量
	public String findStockNum(){
		System.out.println("得到库存数量");
		Stock stock=inproductService.findSum(pid);
		mydata=stock.getK_sum();
		return SUCCESS;
	}
	
			//查看出库的详细信息
	public String showOutproduct(){
		System.out.println("查看出库的详细信息");
		System.out.println("current:"+current);
		this.list=inproductService.showOutproduct(pid, current, "5");
		System.out.println(list);
		return SUCCESS;
	}
}
