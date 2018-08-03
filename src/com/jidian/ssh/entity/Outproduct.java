package com.jidian.ssh.entity;

import java.io.Serializable;

import util.Page;

public class Outproduct extends Page implements Serializable{
	 
	private int o_id;//出库编号
	private Product product;//产品编号
	private int o_number;//数量
	private String o_time;//记录产品的出库时间
	private Emp empbyeid;//出库申请人
	private Emp empbyoid;//经办人
	private String o_remark;//出库备注说明
	
	public Outproduct() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Outproduct(int o_id, Product product, int o_number, String o_time,
			Emp empbyeid, Emp empbyoid, String o_remark) {
		super();
		this.o_id = o_id;
		this.product = product;
		this.o_number = o_number;
		this.o_time = o_time;
		this.empbyeid = empbyeid;
		this.empbyoid = empbyoid;
		this.o_remark = o_remark;
	}

	public int getO_id() {
		return o_id;
	}

	public void setO_id(int o_id) {
		this.o_id = o_id;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public int getO_number() {
		return o_number;
	}

	public void setO_number(int o_number) {
		this.o_number = o_number;
	}

	public String getO_time() {
		return o_time;
	}

	public void setO_time(String o_time) {
		this.o_time = o_time;
	}

	public Emp getEmpbyeid() {
		return empbyeid;
	}

	public void setEmpbyeid(Emp empbyeid) {
		this.empbyeid = empbyeid;
	}

	public Emp getEmpbyoid() {
		return empbyoid;
	}

	public void setEmpbyoid(Emp empbyoid) {
		this.empbyoid = empbyoid;
	}

	public String getO_remark() {
		return o_remark;
	}

	public void setO_remark(String o_remark) {
		this.o_remark = o_remark;
	}

	@Override
	public String toString() {
		return "Outproduct [o_id=" + o_id + ", product=" + product
				+ ", o_number=" + o_number + ", o_time=" + o_time
				+ ", empbyeid=" + empbyeid + ", empbyoid=" + empbyoid
				+ ", o_remark=" + o_remark + "]";
	}
	
	
}
