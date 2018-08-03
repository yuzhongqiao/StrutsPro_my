package com.jidian.ssh.action;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;

import org.apache.struts2.ServletActionContext;


import com.jidian.ssh.entity.Part;
import com.jidian.ssh.service.PartService;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;


public class PartAction extends ActionSupport implements ModelDriven<Part>{
	private Part part=new Part();
	private String result;
	private HttpServletRequest request=ServletActionContext.getRequest();
	private HttpServletResponse response=ServletActionContext.getResponse();
	private HttpSession session=request.getSession();
	private PartService service;
	private Integer result1;
	

	public Integer getResult1() {
		return result1;
	}

	public void setResult1(Integer result1) {
		this.result1 = result1;
	}

	public PartService getService() {
		return service;
	}

	public void setService(PartService service) {
		this.service = service;
	}

	public Part getPart() {
		return part;
	}

	public void setPart(Part part) {
		this.part = part;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

			//查看部门
	public String ShowPart(){
		System.out.println("查看部门");
		String pis=request.getParameter("pis");
		String current=request.getParameter("current");
		//System.out.println("current"+current+" pis"+pis);
		List list=service.FindPartService(current,pis,1);
		System.out.println(list);
		JSONArray j1=JSONArray.fromObject(list);
		result=j1.toString();
		System.out.println(j1);
		return SUCCESS;
	}
	
			//根据名字查找部门
	public String FindPartName(){
		System.out.println("根据名字查找部门");
		String name = request.getParameter("name");
		int count=0;
		count = service.FindPartName(name);
		result = "{'count':"+count+"}";
		return SUCCESS;
	}
	
			//添加部门
	public String AddPart() throws IOException{
		System.out.println("添加部门");
		part.setP_is(1);
		service.AddPart(part);
		result1=1;
		return SUCCESS;	
	}
	
			//修改部门
	public String UpdatePart(){
		System.out.println("修改部门");
		part.setP_is(1);
		service.UpdatePart(part);
		result1=1;
		return SUCCESS;
	}
			//根据ID查找部门信息
	public String FindPartById(){
		System.out.println("根据ID查找部门信息");
		String id=request.getParameter("p_id");	
		this.part=service.FindPartById(new Integer(id));
		return SUCCESS;
	}
	
			//根据部门ID找到员工信息
	public String FindEmpByPart(){
		System.out.println("根据部门ID找到员工信息");
		String id=request.getParameter("pid");
		//List list=service.FindEmpByPart(id);
		return NONE;
	}
	
			//根据员工ID找到顾客信息
	public String FindClietByEmp(){
		System.out.println("根据员工ID找到顾客信息");
		String id=request.getParameter("pid");
		System.out.println(id);
		//List list=service.FindClietByEmp(id);
		//JSONArray json2 = JSONArray.fromObject(list);
		//result=json2.toString();
		//System.out.println(list);
		//设置响应的字符编码
//		response.setCharacterEncoding("utf-8");
//		try {
//			if(list.isEmpty()){
//				//d==null表示可以添加
//				//直接打印名字
//				result="{'count':'0'}";
//			}else{
//				//这里表示已经存在相同名字的部门
//				result="{'count':'1'}";
//			}
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
		return SUCCESS;
	}
	
			//撤销部门
	public String removePart() throws IOException{
		System.out.println("撤销部门");
		String pid = request.getParameter("pid");
		service.removePart(new Integer(pid));
		response.getWriter().write("1");
		return NONE;
	}
	
			//查看所有被删除的部门
	public String ShowRemove(){
		System.out.println("查看所有被删除的部门");
		String pis=request.getParameter("pis");
		String current=request.getParameter("current");
		List list=service.FindPartService(current, pis, 0);
		JSONArray json2 = JSONArray.fromObject(list);
		result=json2.toString();
		return SUCCESS;
	}
			//恢复部门
	public String recoverPart(){
		System.out.println("恢复部门");
		String pid = request.getParameter("pid");
		service.recoverPart(new Integer(pid));
		result1=1;
		return SUCCESS;
	}
	
	@Override
	public Part getModel() {
		// TODO Auto-generated method stub
		return part;
	}

}
