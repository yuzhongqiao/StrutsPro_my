package com.jidian.ssh.entity;

import java.io.Serializable;

import util.Page;

public class Orders extends Page implements Serializable{
	
	    private int r_id;//订单编号 
		private Emp emp;//下单(员工)(外键)
		private Client client;//客户编号(外键)
		private String r_time;//下单时间
		private int r_is;//1代表订单已下单但没有确定。2代表已确定。0代表订单已废弃
		public Orders() {
			super();
			// TODO Auto-generated constructor stub
		}
		public Orders(int r_id, Emp emp, Client client, String r_time, int r_is) {
			super();
			this.r_id = r_id;
			this.emp = emp;
			this.client = client;
			this.r_time = r_time;
			this.r_is = r_is;
		}
		public int getR_id() {
			return r_id;
		}
		public void setR_id(int r_id) {
			this.r_id = r_id;
		}
		public Emp getEmp() {
			return emp;
		}
		public void setEmp(Emp emp) {
			this.emp = emp;
		}
		public Client getClient() {
			return client;
		}
		public void setClient(Client client) {
			this.client = client;
		}
		public String getR_time() {
			return r_time;
		}
		public void setR_time(String r_time) {
			this.r_time = r_time;
		}
		public int getR_is() {
			return r_is;
		}
		public void setR_is(int r_is) {
			this.r_is = r_is;
		}
		@Override
		public String toString() {
			return "Orders [r_id=" + r_id + ", emp=" + emp + ", client="
					+ client + ", r_time=" + r_time + ", r_is=" + r_is + "]";
		}
		
		
}
