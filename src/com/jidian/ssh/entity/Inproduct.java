package com.jidian.ssh.entity;

import java.io.Serializable;

import util.Page;

public class Inproduct extends Page implements Serializable{

	private int d_id;//入库编号
	private Product product;//产品编号(外键)
	private Emp emp;//入库操作员(外键)
	private String d_remark;//入库备注 
	private int d_number;//入库量
	private String d_time;//入库时间
	
	public Inproduct() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Inproduct(int d_id, Product product, Emp emp, String d_remark,
			int d_number, String d_time) {
		super();
		this.d_id = d_id;
		this.product = product;
		this.emp = emp;
		this.d_remark = d_remark;
		this.d_number = d_number;
		this.d_time = d_time;
	}

	public int getD_id() {
		return d_id;
	}

	public void setD_id(int d_id) {
		this.d_id = d_id;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public Emp getEmp() {
		return emp;
	}

	public void setEmp(Emp emp) {
		this.emp = emp;
	}

	public String getD_remark() {
		return d_remark;
	}

	public void setD_remark(String d_remark) {
		this.d_remark = d_remark;
	}

	public int getD_number() {
		return d_number;
	}

	public void setD_number(int d_number) {
		this.d_number = d_number;
	}

	public String getD_time() {
		return d_time;
	}

	public void setD_time(String d_time) {
		this.d_time = d_time;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + d_id;
		result = prime * result + d_number;
		result = prime * result
				+ ((d_remark == null) ? 0 : d_remark.hashCode());
		result = prime * result + ((d_time == null) ? 0 : d_time.hashCode());
		result = prime * result + ((emp == null) ? 0 : emp.hashCode());
		result = prime * result + ((product == null) ? 0 : product.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Inproduct other = (Inproduct) obj;
		if (d_id != other.d_id)
			return false;
		if (d_number != other.d_number)
			return false;
		if (d_remark == null) {
			if (other.d_remark != null)
				return false;
		} else if (!d_remark.equals(other.d_remark))
			return false;
		if (d_time == null) {
			if (other.d_time != null)
				return false;
		} else if (!d_time.equals(other.d_time))
			return false;
		if (emp == null) {
			if (other.emp != null)
				return false;
		} else if (!emp.equals(other.emp))
			return false;
		if (product == null) {
			if (other.product != null)
				return false;
		} else if (!product.equals(other.product))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Inproduct [d_id=" + d_id + ", product=" + product + ", emp="
				+ emp + ", d_remark=" + d_remark + ", d_number=" + d_number
				+ ", d_time=" + d_time + "]";
	}
	
	
	
}
