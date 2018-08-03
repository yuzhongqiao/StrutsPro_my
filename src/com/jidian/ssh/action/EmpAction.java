package com.jidian.ssh.action;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.struts2.ServletActionContext;

import com.jidian.ssh.entity.Emp;
import com.jidian.ssh.service.EmpService;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;


import util.ChildDirectory;
import util.Guid;

public class EmpAction extends ActionSupport implements ModelDriven<Emp>{
	private EmpService empService;
	private HttpServletRequest request=ServletActionContext.getRequest();
	private HttpServletResponse response=ServletActionContext.getResponse();
	private HttpSession session=request.getSession();
	
	private Emp emp=new Emp();
	public List tpartList;
	private File photo;
	private String photoFileName;
	private String e_imgContentType;
	private String result;
	private int mydata;
	private String etruename;
	private int pid;
	private String username;
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public int getPid() {
		return pid;
	}
	public void setPid(int pid) {
		this.pid = pid;
	}
	public String getEtruename() {
		return etruename;
	}
	public void setEtruename(String etruename) {
		this.etruename = etruename;
	}
	public int getMydata() {
		return mydata;
	}
	public void setMydata(int mydata) {
		this.mydata = mydata;
	}
	public EmpService getEmpService() {
		return empService;
	}
	public void setEmpService(EmpService empService) {
		this.empService = empService;
	}
	public String getPhotoFileName() {
		return photoFileName;
	}
	public void setPhotoFileName(String photoFileName) {
		this.photoFileName = photoFileName;
	}
	
	public File getPhoto() {
		return photo;
	}
	public void setPhoto(File photo) {
		this.photo = photo;
	}
	
	public List getTpartList() {
		return tpartList;
	}
	public void setTpartList(List tpartList) {
		this.tpartList = tpartList;
	}
	
	public Emp getEmp() {
		return emp;
	}
	public void setEmp(Emp emp) {
		this.emp = emp;
	}
	
	public String getE_imgContentType() {
		return e_imgContentType;
	}
	public void setE_imgContentType(String e_imgContentType) {
		this.e_imgContentType = e_imgContentType;
	}
	
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	
	
		//判断用户登录
	public String login(){
		System.out.println("判断用户登录");
		this.emp=empService.login(emp);
		HttpServletRequest request=ServletActionContext.getRequest();
		if(emp!=null){
			if(emp.getE_is()==0){
				mydata=2;
			}else{
				HttpSession session=request.getSession();
				session.setAttribute("loginUser", emp);
				mydata=1;
			}
		}else{
			mydata=0;
		}
		
		return "resultNum";
	}
	
		//退出
	public String exit(){
		HttpServletRequest request=ServletActionContext.getRequest();
		HttpSession session=request.getSession();
		session.removeAttribute("loginUser");
		return "login";
	}
	
	
	public String ShowEmp(){
		System.out.println("查看员工");
		String pis=request.getParameter("pis");
		String current=request.getParameter("current");
		List list=empService.FindEmp(current, pis,1,pid);
		JSONArray j2 = JSONArray.fromObject(list);
		result=j2.toString();
		System.out.println(j2);
		return SUCCESS;
	}
	
	public String ShowPartCount(){
		System.out.println("查看部门的数量");
		int count=empService.ShowPartCount();
		result="{'count':'"+count+"'}";
		return SUCCESS;
	}
	
	public String FindPart(){
		System.out.println("得到部门");
		tpartList =empService.ShowPart();
		JSONArray json2 = JSONArray.fromObject(tpartList);
		result=json2.toString();
		return SUCCESS;
	}
	
	public String FindEmpByPid(){
		System.out.println("根据部门id得到全部员工");
		tpartList=empService.FindEmpByPid(pid);
		JSONArray json2 = JSONArray.fromObject(tpartList);
		result=json2.toString();
		System.out.println(result);
		return SUCCESS;
	}
	
				//登录名验证
	public String getENameCount(){
		System.out.println("验证是否已有该员工");
		mydata=empService.getENameCount(username);
		return "resultNum";
	}
	
	public String getPCount(){
		System.out.println("查询部门主管是否已经存在");
		String id=request.getParameter("pid");
		int count=empService.getPflag(id);
		result="{'count':'"+count+"'}";
		return SUCCESS;
	}
	
	public String AddEmp(){
		System.out.println("增加员工");
		String storeDirectory = ServletActionContext.getServletContext().getRealPath("/upfile");
		System.out.println(storeDirectory);
		File rootDirectory = new File(storeDirectory);
		if(!rootDirectory.exists()){
			rootDirectory.mkdirs();
		}
		if(photoFileName!=null){
			photoFileName = Guid.guid()+"."+FilenameUtils.getExtension(photoFileName);//DJFIDHFDIHFDIFHID.jpg
		}
		String  dateDirectory = ChildDirectory.getChildDirectory(storeDirectory);
		String path = storeDirectory+File.separator+dateDirectory;
		System.out.println("path:"+path);
		System.out.println("photoFileName:"+photoFileName);
		
		try {
			FileUtils.copyFile(photo,new File(path,photoFileName));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		String path2="upfile/"+dateDirectory+"/"+photoFileName;
		emp.setE_img(path2);
		emp.setE_is(1);
		empService.AddEmp(emp);
		return SUCCESS;
	}
	
	public String findEmpById(){
		System.out.println("通过ID查找员工信息");
		String id=request.getParameter("eid");
		this.emp=empService.FindEmpById(new Integer(id));
		tpartList =empService.ShowPart();
		return SUCCESS;
	}
	
	public String UpDateEmp(){
		System.out.println("修改员工");
		if(photoFileName==null&&photo==null){
			emp.setE_img(emp.getE_img());
		}else{
			String storeDirectory = ServletActionContext.getServletContext().getRealPath("/upfile");//C:\apache-tomcat-7.0.68\webapps\NetStore\images
			File rootDirectory = new File(storeDirectory);
			if(!rootDirectory.exists()){
				rootDirectory.mkdirs();
			}
			
			if(photoFileName!=null){
				photoFileName = Guid.guid()+"."+FilenameUtils.getExtension(photoFileName);//DJFIDHFDIHFDIFHID.jpg
			}
			
			String  dateDirectory = ChildDirectory.getChildDirectory(storeDirectory);
			String path = storeDirectory+File.separator+dateDirectory;
			
			try {
				FileUtils.copyFile(photo,new File(path,photoFileName));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			String path2="upfile/"+dateDirectory+"/"+photoFileName;
			emp.setE_img(path2);
		}
		emp.setE_is(1);
		empService.UpdateEmp(emp);
		return SUCCESS;
	}
	
	public String getClientCount(){
		System.out.println("查询该员工下是否还有客户未交接");
		String eid=request.getParameter("eid");
		int count=0;//empService.getClientCount(eid);
		result="{'count':'"+count+"'}";
		return SUCCESS;
	}
	
	public String delEmp(){
		System.out.println("撤销员工");
		String eid=request.getParameter("eid");
		empService.delEmp(new Integer(eid));
		mydata=1;
		return SUCCESS;
		
	}
	
	public String FindEmpByIs(){
		System.out.println("查看离职的员工");
		String pis=request.getParameter("pis");
		String current=request.getParameter("current");
		List list=empService.FindEmp(current, pis,0,0);
		JSONArray json2 = JSONArray.fromObject(list);
		result=json2.toString();
		return SUCCESS;
	}
	
	public String recoverEmp(){
		System.out.println("恢复员工");
		String eid=request.getParameter("eid");
		String pid=request.getParameter("pid");
		System.out.println("eid:"+eid);
		empService.recoverEmp(eid,pid);
		mydata=1;
		return SUCCESS;
	}
	
		
	public String FindPart2(){
		System.out.println("获取恢复员工的数据");
		String eid=request.getParameter("eid");
		this.emp=empService.FindEmpById(new Integer(eid));
		System.out.println(emp);
		tpartList =empService.ShowPart();
		JSONArray json2 = JSONArray.fromObject(tpartList);
		result=json2.toString();
		return SUCCESS;
	}
	
	public String GetNameByLike() throws IOException{
		System.out.println("模糊匹配用户名");
		List<Emp> list=empService.GetNameByLike(etruename);
		String strname="";
		for (int i = 0; i < list.size(); i++) {
			strname+=list.get(i).getE_truename()+"-";
		}
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out=response.getWriter();
		out.write(strname);
		out.flush();
		out.close();
		return NONE;
	}
	
	public String empSeach(){
		System.out.println("条件查询");
		int pagesize=5;
		String etruename=request.getParameter("etruename");
		String esex=request.getParameter("esex");
		String pid=request.getParameter("pid");
		String current=request.getParameter("current");
		List list=empService.empSeach(etruename,esex,new Integer(pid),current,pagesize);
		JSONArray json2 = JSONArray.fromObject(list);
		result=json2.toString();
		System.out.println(result);
		return SUCCESS;
	}
	
	@Override
	public Emp getModel() {
		// TODO Auto-generated method stub
		return emp;
	}
	
	
}
