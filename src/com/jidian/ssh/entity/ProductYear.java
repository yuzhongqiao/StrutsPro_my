package com.jidian.ssh.entity;

import java.io.Serializable;

import util.Page;

public class ProductYear extends Page implements Serializable{ 
	 private int y_id;
	 private Product product;
	 private String y_name;
	 private int y_price;
	public ProductYear() {
		super();
		// TODO Auto-generated constructor stub
	}
	public ProductYear(int y_id, Product product, String y_name, int y_price) {
		super();
		this.y_id = y_id;
		this.product = product;
		this.y_name = y_name;
		this.y_price = y_price;
	}
	public int getY_id() {
		return y_id;
	}
	public void setY_id(int y_id) {
		this.y_id = y_id;
	}
	public Product getProduct() {
		return product;
	}
	public void setProduct(Product product) {
		this.product = product;
	}
	public String getY_name() {
		return y_name;
	}
	public void setY_name(String y_name) {
		this.y_name = y_name;
	}
	public int getY_price() {
		return y_price;
	}
	public void setY_price(int y_price) {
		this.y_price = y_price;
	}
	@Override
	public String toString() {
		return "ProductYear [y_id=" + y_id + ", product=" + product
				+ ", y_name=" + y_name + ", y_price=" + y_price + "]";
	}
	 
}
