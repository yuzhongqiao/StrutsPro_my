package com.jidian.ssh.entity;

import java.io.Serializable;

import util.Page;

public class Part extends Page implements Serializable{
	private int p_id;
	private String p_name;
	private String p_remark;
	private int p_is;
	
	public Part() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Part(int pId, String pName, String pRemark, int pIs) {
		super();
		p_id = pId;
		p_name = pName;
		p_remark = pRemark;
		p_is = pIs;
	}
	public int getP_id() {
		return p_id;
	}
	public void setP_id(int pId) {
		p_id = pId;
	}
	public String getP_name() {
		return p_name;
	}
	public void setP_name(String pName) {
		p_name = pName;
	}
	public String getP_remark() {
		return p_remark;
	}
	public void setP_remark(String pRemark) {
		p_remark = pRemark;
	}
	public int getP_is() {
		return p_is;
	}
	public void setP_is(int pIs) {
		p_is = pIs;
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + p_id;
		result = prime * result + p_is;
		result = prime * result + ((p_name == null) ? 0 : p_name.hashCode());
		result = prime * result
				+ ((p_remark == null) ? 0 : p_remark.hashCode());
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
		Part other = (Part) obj;
		if (p_id != other.p_id)
			return false;
		if (p_is != other.p_is)
			return false;
		if (p_name == null) {
			if (other.p_name != null)
				return false;
		} else if (!p_name.equals(other.p_name))
			return false;
		if (p_remark == null) {
			if (other.p_remark != null)
				return false;
		} else if (!p_remark.equals(other.p_remark))
			return false;
		return true;
	}
	@Override
	public String toString() {
		return "Part [p_id=" + p_id + ", p_is=" + p_is + ", p_name=" + p_name
				+ ", p_remark=" + p_remark + "]";
	}
	
}
