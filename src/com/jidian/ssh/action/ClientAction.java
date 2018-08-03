package com.jidian.ssh.action;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;

import org.apache.struts2.ServletActionContext;

import com.jidian.ssh.entity.Client;
import com.jidian.ssh.entity.Emp;
import com.jidian.ssh.service.ClientService;
import com.opensymphony.xwork2.ActionSupport;

public class ClientAction extends ActionSupport{
	
	private int current;
	private int eid;
	private Client client=new Client();
	private ClientService clientService;
	private List list;
	private int mydata;
	private int cid;
	private String result;

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public int getCid() {
		return cid;
	}

	public void setCid(int cid) {
		this.cid = cid;
	}

	public int getCurrent() {
		return current;
	}

	public void setCurrent(int current) {
		this.current = current;
	}

	public int getEid() {
		return eid;
	}

	public void setEid(int eid) {
		this.eid = eid;
	}

	public Client getClient() {
		return client;
	}

	public void setClient(Client client) {
		this.client = client;
	}

	public ClientService getClientService() {
		return clientService;
	}

	public void setClientService(ClientService clientService) {
		this.clientService = clientService;
	}

	public List getList() {
		return list;
	}

	public void setList(List list) {
		this.list = list;
	}

	public int getMydata() {
		return mydata;
	}

	public void setMydata(int mydata) {
		this.mydata = mydata;
	}

			//查看客户
	public String showClientByEid(){
		System.out.println("查看客户");
		this.list=clientService.showClientByEid(current, "5", 1, eid);
		return SUCCESS;
	}
	
			//添加客户
	public String addClient(){
		System.out.println("添加客户");
		client.setC_is(1);
		clientService.addClient(client);
		mydata=1;
		return SUCCESS;
	}
	
			//查看已删除客户
	public String showDelClient(){
		System.out.println("查看已删除客户");
		this.list=clientService.showClientByEid(current, "5", 0, eid);
		return SUCCESS;
	}
	
			//删除客户
	public String delClient(){
		System.out.println("删除客户");
		clientService.delClient(cid);
		mydata=1;
		return SUCCESS;
	}
	
			//得到客户的信息
	public String findClientByCid(){
		System.out.println("得到客户的信息");
		this.client=clientService.findClientByCid(cid);
		return "success";
	}
	
			//修改客户
	public String uppClient(){
		System.out.println("修改客户");
		client.setC_is(1);
		clientService.uppClient(client);
		mydata=1;
		return SUCCESS;
	}
	
			//得到
	public String findClientByCid1(){
		System.out.println("得到");
		Emp emp=new Emp();
		this.list=clientService.findClientByCid1(cid);
		Client c=(Client) this.list.get(0);
		mydata=c.getEmp().getE_is();
		return "success";
	}
	
			//恢复客户
	
	public String backClient(){
		System.out.println("恢复客户");
		clientService.backClient(cid);
		return "success";
	}
}
