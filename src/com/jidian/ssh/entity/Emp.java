package com.jidian.ssh.entity;

import java.io.Serializable;

import util.Page;

public class Emp extends Page implements Serializable{
	private int e_id;
	private Part part;
	private String e_loginname;
	private String e_psw;
	private String e_img;
	private String e_sex ;
	private int e_flag;
	private int e_admin;
	private String e_remark;
	private String e_truename;
	private int e_is;
	public Emp() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Emp(int e_id, Part part, String e_loginname, String e_psw,
			String e_img, String e_sex, int e_flag, int e_admin,
			String e_remark, String e_truename, int e_is) {
		super();
		this.e_id = e_id;
		this.part = part;
		this.e_loginname = e_loginname;
		this.e_psw = e_psw;
		this.e_img = e_img;
		this.e_sex = e_sex;
		this.e_flag = e_flag;
		this.e_admin = e_admin;
		this.e_remark = e_remark;
		this.e_truename = e_truename;
		this.e_is = e_is;
	}
	public int getE_id() {
		return e_id;
	}
	public void setE_id(int e_id) {
		this.e_id = e_id;
	}
	public Part getPart() {
		return part;
	}
	public void setPart(Part part) {
		this.part = part;
	}
	public String getE_loginname() {
		return e_loginname;
	}
	public void setE_loginname(String e_loginname) {
		this.e_loginname = e_loginname;
	}
	public String getE_psw() {
		return e_psw;
	}
	public void setE_psw(String e_psw) {
		this.e_psw = e_psw;
	}
	public String getE_img() {
		return e_img;
	}
	public void setE_img(String e_img) {
		this.e_img = e_img;
	}
	public String getE_sex() {
		return e_sex;
	}
	public void setE_sex(String e_sex) {
		this.e_sex = e_sex;
	}
	public int getE_flag() {
		return e_flag;
	}
	public void setE_flag(int e_flag) {
		this.e_flag = e_flag;
	}
	public int getE_admin() {
		return e_admin;
	}
	public void setE_admin(int e_admin) {
		this.e_admin = e_admin;
	}
	public String getE_remark() {
		return e_remark;
	}
	public void setE_remark(String e_remark) {
		this.e_remark = e_remark;
	}
	public String getE_truename() {
		return e_truename;
	}
	public void setE_truename(String e_truename) {
		this.e_truename = e_truename;
	}
	public int getE_is() {
		return e_is;
	}
	public void setE_is(int e_is) {
		this.e_is = e_is;
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + e_admin;
		result = prime * result + e_flag;
		result = prime * result + e_id;
		result = prime * result + ((e_img == null) ? 0 : e_img.hashCode());
		result = prime * result + e_is;
		result = prime * result
				+ ((e_loginname == null) ? 0 : e_loginname.hashCode());
		result = prime * result + ((e_psw == null) ? 0 : e_psw.hashCode());
		result = prime * result
				+ ((e_remark == null) ? 0 : e_remark.hashCode());
		result = prime * result + ((e_sex == null) ? 0 : e_sex.hashCode());
		result = prime * result
				+ ((e_truename == null) ? 0 : e_truename.hashCode());
		result = prime * result + ((part == null) ? 0 : part.hashCode());
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
		Emp other = (Emp) obj;
		if (e_admin != other.e_admin)
			return false;
		if (e_flag != other.e_flag)
			return false;
		if (e_id != other.e_id)
			return false;
		if (e_img == null) {
			if (other.e_img != null)
				return false;
		} else if (!e_img.equals(other.e_img))
			return false;
		if (e_is != other.e_is)
			return false;
		if (e_loginname == null) {
			if (other.e_loginname != null)
				return false;
		} else if (!e_loginname.equals(other.e_loginname))
			return false;
		if (e_psw == null) {
			if (other.e_psw != null)
				return false;
		} else if (!e_psw.equals(other.e_psw))
			return false;
		if (e_remark == null) {
			if (other.e_remark != null)
				return false;
		} else if (!e_remark.equals(other.e_remark))
			return false;
		if (e_sex == null) {
			if (other.e_sex != null)
				return false;
		} else if (!e_sex.equals(other.e_sex))
			return false;
		if (e_truename == null) {
			if (other.e_truename != null)
				return false;
		} else if (!e_truename.equals(other.e_truename))
			return false;
		if (part == null) {
			if (other.part != null)
				return false;
		} else if (!part.equals(other.part))
			return false;
		return true;
	}
	@Override
	public String toString() {
		return "Emp [e_id=" + e_id + ", part=" + part + ", e_loginname="
				+ e_loginname + ", e_psw=" + e_psw + ", e_img=" + e_img
				+ ", e_sex=" + e_sex + ", e_flag=" + e_flag + ", e_admin="
				+ e_admin + ", e_remark=" + e_remark + ", e_truename="
				+ e_truename + ", e_is=" + e_is + "]";
	}
	
	
}
