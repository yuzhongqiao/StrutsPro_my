package com.jidian.ssh.entity;

import java.io.Serializable;

import util.Page;

public class Ordersmx extends Page implements Serializable{
	   
	    private int x_id;//订单详细编号
		private Orders orders;//订单编号(外键)
		private Product product;//产品编号(外键)
		private ProductYear productyear;//产品年份(外键)
		private int x_count;//数量
		private int x_price;//现价
		private int scockError;
		
		public int getScockError() {
			return scockError;
		}
		public void setScockError(int scockError) {
			this.scockError = scockError;
		}
		public Ordersmx() {
			super();
			// TODO Auto-generated constructor stub
		}
		public Ordersmx(int x_id, Orders orders, Product product,
				ProductYear productyear, int x_count, int x_price) {
			super();
			this.x_id = x_id;
			this.orders = orders;
			this.product = product;
			this.productyear = productyear;
			this.x_count = x_count;
			this.x_price = x_price;
		}
		public int getX_id() {
			return x_id;
		}
		public void setX_id(int x_id) {
			this.x_id = x_id;
		}
		public Orders getOrders() {
			return orders;
		}
		public void setOrders(Orders orders) {
			this.orders = orders;
		}
		public Product getProduct() {
			return product;
		}
		public void setProduct(Product product) {
			this.product = product;
		}
		public ProductYear getProductyear() {
			return productyear;
		}
		public void setProductyear(ProductYear productyear) {
			this.productyear = productyear;
		}
		public int getX_count() {
			return x_count;
		}
		public void setX_count(int x_count) {
			this.x_count = x_count;
		}
		public int getX_price() {
			return x_price;
		}
		public void setX_price(int x_price) {
			this.x_price = x_price;
		}
		@Override
		public String toString() {
			return "Ordersmx [x_id=" + x_id + ", orders=" + orders
					+ ", product=" + product + ", productyear=" + productyear
					+ ", x_count=" + x_count + ", x_price=" + x_price + "]";
		}
		
}
