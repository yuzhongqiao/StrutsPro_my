package com.jidian.ssh.entity;

import java.io.Serializable;

import util.Page;

public class Sort extends Page implements Serializable{
	private int s_id;
	private String s_name;
	private String s_remark;
	private int s_is;
	public Sort() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Sort(int s_id, String s_name, String s_remark, int s_is) {
		super();
		this.s_id = s_id;
		this.s_name = s_name;
		this.s_remark = s_remark;
		this.s_is = s_is;
	}
	public int getS_id() {
		return s_id;
	}
	public void setS_id(int s_id) {
		this.s_id = s_id;
	}
	public String getS_name() {
		return s_name;
	}
	public void setS_name(String s_name) {
		this.s_name = s_name;
	}
	public String getS_remark() {
		return s_remark;
	}
	public void setS_remark(String s_remark) {
		this.s_remark = s_remark;
	}
	public int getS_is() {
		return s_is;
	}
	public void setS_is(int s_is) {
		this.s_is = s_is;
	}
	@Override
	public String toString() {
		return "Sort [s_id=" + s_id + ", s_name=" + s_name + ", s_remark="
				+ s_remark + ", s_is=" + s_is + "]";
	}
	
}
