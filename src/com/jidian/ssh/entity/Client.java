package com.jidian.ssh.entity;

import java.io.Serializable;

import util.Page;

public class Client extends Page implements Serializable{
	
	   	private int c_id;//客户编号
		private Emp emp;//员工编号(外键)
		private String c_name;//客户姓名
		private String c_tel;//客户联系电话
		private String c_address;//联系地址
		private int c_is;//0删除,1没删除 
		
		public Client() {
			super();
			// TODO Auto-generated constructor stub
		}
		public Client(int c_id, Emp emp, String c_name, String c_tel,
				String c_address, int c_is) {
			super();
			this.c_id = c_id;
			this.emp = emp;
			this.c_name = c_name;
			this.c_tel = c_tel;
			this.c_address = c_address;
			this.c_is = c_is;
		}
		public int getC_id() {
			return c_id;
		}
		public void setC_id(int c_id) {
			this.c_id = c_id;
		}
		public Emp getEmp() {
			return emp;
		}
		public void setEmp(Emp emp) {
			this.emp = emp;
		}
		public String getC_name() {
			return c_name;
		}
		public void setC_name(String c_name) {
			this.c_name = c_name;
		}
		public String getC_tel() {
			return c_tel;
		}
		public void setC_tel(String c_tel) {
			this.c_tel = c_tel;
		}
		public String getC_address() {
			return c_address;
		}
		public void setC_address(String c_address) {
			this.c_address = c_address;
		}
		public int getC_is() {
			return c_is;
		}
		public void setC_is(int c_is) {
			this.c_is = c_is;
		}
		@Override
		public int hashCode() {
			final int prime = 31;
			int result = 1;
			result = prime * result
					+ ((c_address == null) ? 0 : c_address.hashCode());
			result = prime * result + c_id;
			result = prime * result + c_is;
			result = prime * result
					+ ((c_name == null) ? 0 : c_name.hashCode());
			result = prime * result + ((c_tel == null) ? 0 : c_tel.hashCode());
			result = prime * result + ((emp == null) ? 0 : emp.hashCode());
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
			Client other = (Client) obj;
			if (c_address == null) {
				if (other.c_address != null)
					return false;
			} else if (!c_address.equals(other.c_address))
				return false;
			if (c_id != other.c_id)
				return false;
			if (c_is != other.c_is)
				return false;
			if (c_name == null) {
				if (other.c_name != null)
					return false;
			} else if (!c_name.equals(other.c_name))
				return false;
			if (c_tel == null) {
				if (other.c_tel != null)
					return false;
			} else if (!c_tel.equals(other.c_tel))
				return false;
			if (emp == null) {
				if (other.emp != null)
					return false;
			} else if (!emp.equals(other.emp))
				return false;
			return true;
		}
		@Override
		public String toString() {
			return "Client [c_id=" + c_id + ", emp=" + emp + ", c_name="
					+ c_name + ", c_tel=" + c_tel + ", c_address=" + c_address
					+ ", c_is=" + c_is + "]";
		}
		
}
