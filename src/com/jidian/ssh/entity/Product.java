package com.jidian.ssh.entity;

import java.io.Serializable;

import util.Page;

public class Product extends Page implements Serializable{
	private int p_id;//产品编号
	private Sort sort;//类别编号
	private String p_name;//-产品名称
	private String p_area;//产地
	private String p_ml;//产品规格
	private int p_is;//0已删除,1未删除 
	public Product() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Product(int pId, Sort sort, String pName, String pArea, String pMl,
			int pIs) {
		super();
		p_id = pId;
		this.sort = sort;
		p_name = pName;
		p_area = pArea;
		p_ml = pMl;
		p_is = pIs;
	}
	public int getP_id() {
		return p_id;
	}
	public void setP_id(int pId) {
		p_id = pId;
	}
	public Sort getSort() {
		return sort;
	}
	public void setSort(Sort sort) {
		this.sort = sort;
	}
	public String getP_name() {
		return p_name;
	}
	public void setP_name(String pName) {
		p_name = pName;
	}
	public String getP_area() {
		return p_area;
	}
	public void setP_area(String pArea) {
		p_area = pArea;
	}
	public String getP_ml() {
		return p_ml;
	}
	public void setP_ml(String pMl) {
		p_ml = pMl;
	}
	public int getP_is() {
		return p_is;
	}
	public void setP_is(int pIs) {
		p_is = pIs;
	}
	@Override
	public String toString() {
		return "Product [p_id=" + p_id + ", sort=" + sort + ", p_name="
				+ p_name + ", p_area=" + p_area + ", p_ml=" + p_ml + ", p_is="
				+ p_is + "]";
	}
	
}
