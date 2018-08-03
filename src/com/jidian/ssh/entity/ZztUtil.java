package com.jidian.ssh.entity;

import java.io.Serializable;
import java.util.List;

public class ZztUtil implements Serializable {
	private String name;
	private List data;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List getdata() {
		return data;
	}

	public void setdata(List data) {
		this.data = data;
	}

	public ZztUtil() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ZztUtil(String name, List data) {
		super();
		this.name = name;
		this.data = data;
	}

}
