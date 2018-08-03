package com.jidian.ssh.action;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;

import org.apache.struts2.ServletActionContext;


import com.jidian.ssh.entity.Sort;
import com.jidian.ssh.service.SortService;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;


public class SortAction extends ActionSupport implements ModelDriven<Sort>{
	private Sort sort=new Sort();
	private HttpServletRequest request=ServletActionContext.getRequest();
	private HttpServletResponse response=ServletActionContext.getResponse();
	private HttpSession session=request.getSession();
	private String result;
	private SortService sortService;
	private int mydata;
	
	public int getMydata() {
		return mydata;
	}
	public void setMydata(int mydata) {
		this.mydata = mydata;
	}
	public SortService getSortService() {
		return sortService;
	}
	public void setSortService(SortService sortService) {
		this.sortService = sortService;
	}
	
	public Sort getSort() {
		return sort;
	}
	public void setSort(Sort sort) {
		this.sort = sort;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

			//查看类别
	public String ShowSort(){
		System.out.println("查看类别");
		String pis=request.getParameter("pis");
		String current=request.getParameter("current");
		List list=sortService.FindSortService(current, pis, sort.getS_is());
		JSONArray json=JSONArray.fromObject(list);
		result=json.toString();
		return SUCCESS;
	}
	
			//添加类别
	public String AddSort() throws IOException{
		System.out.println("添加类别");
		sort.setS_is(1);
		sortService.AddSort(sort);
		mydata=1;
		return SUCCESS;
	}
	
			//根据名字查找有无
	public String FindSortName(){
		System.out.println("根据名字查找有无");
		this.mydata=sortService.FindSortName(sort.getS_name());
		System.out.println(mydata);
		return SUCCESS;
	}
	
			//下架类别
	public String DelSort() throws IOException{
		System.out.println("下架类别");
		sortService.DelSort(sort.getS_id(),0);
		mydata=1;
		return SUCCESS;
	}
	
			//恢复类别
	public String RecoverSort() throws IOException{
		System.out.println("类别编号"+sort.getS_id());
		sortService.DelSort(sort.getS_id(),1);
		mydata=1;
		return SUCCESS;
	}
	
	@Override
	public Sort getModel() {	
		return sort;
	}

}
