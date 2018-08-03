package com.jidian.ssh.entity;

import java.io.Serializable;

import util.Page;

public class Stock extends Page implements Serializable{
	  private int k_id;//库存编号 
	  private Product product;//产品编号(外键)
	  private int k_sum;//目前总库存量
	  
	public Stock() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Stock(int k_id, Product product, int k_sum) {
		super();
		this.k_id = k_id;
		this.product = product;
		this.k_sum = k_sum;
	}

	public int getK_id() {
		return k_id;
	}

	public void setK_id(int k_id) {
		this.k_id = k_id;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public int getK_sum() {
		return k_sum;
	}

	public void setK_sum(int k_sum) {
		this.k_sum = k_sum;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + k_id;
		result = prime * result + k_sum;
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
		Stock other = (Stock) obj;
		if (k_id != other.k_id)
			return false;
		if (k_sum != other.k_sum)
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
		return "Stock [k_id=" + k_id + ", product=" + product + ", k_sum="
				+ k_sum + "]";
	}
	  
}
