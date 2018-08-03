package com.jidian.ssh.action;

import java.util.List;

import com.google.gson.Gson;
import com.jidian.ssh.entity.Part;
import com.jidian.ssh.service.ReportService;
import com.opensymphony.xwork2.ActionSupport;

public class ReportAction extends ActionSupport{

	private double zong;
	private ReportService reportService;
	private int pid;
	private int pid1;
	private int pid2;
	private List sortList;
	private Object[][] objects;
	private Integer sid;
	private Integer eid;
	
	public List getSortList() {
		return sortList;
	}
	public void setSortList(List sortList) {
		this.sortList = sortList;
	}
	public double getZong() {
		return zong;
	}
	public void setZong(double zong) {
		this.zong = zong;
	}
	public Integer getSid() {
		return sid;
	}
	public void setSid(Integer sid) {
		this.sid = sid;
	}
	public Integer getEid() {
		return eid;
	}
	public void setEid(Integer eid) {
		this.eid = eid;
	}
	public Object[][] getObjects() {
		return objects;
	}
	public void setObjects(Object[][] objects) {
		this.objects = objects;
	}
	public ReportService getReportService() {
		return reportService;
	}
	public void setReportService(ReportService reportService) {
		this.reportService = reportService;
	}
	public int getPid() {
		return pid;
	}
	public void setPid(int pid) {
		this.pid = pid;
	}
	public int getPid1() {
		return pid1;
	}
	public void setPid1(int pid1) {
		this.pid1 = pid1;
	}
	public int getPid2() {
		return pid2;
	}
	public void setPid2(int pid2) {
		this.pid2 = pid2;
	}
	
			//部门业绩统计饼状图
	public String oneAllCount(){
		System.out.println("部门业绩统计饼状图");
		if(pid==-10&&pid1==-10&&pid2==-10)
		{
		List ar=this.reportService.allPart();
		int [] aa = new int[ar.size()];
		for (int i = 0; i < ar.size(); i++) {
			Part part=(Part) ar.get(i);
			aa[i]=part.getP_id();
		}
		System.out.println("进入bztAll方法");
		this.objects = this.reportService.bztAll(aa);	
			
		}else if (pid2 != -10) {
			int[] aa = { pid, pid1, pid2 };
			this.objects = this.reportService.bztAll(aa);
		} else if (pid1 != -10) {
			int[] aa = { pid, pid1 };
			objects = this.reportService.bztAll(aa);
		} else if (pid != -10) {
			int[] aa = { pid };
			objects = this.reportService.bztAll(aa);
		}		
		
		return "bztall";
	}
	
		// 根据商品类别查询所有商品的业绩（柱状图）
		public String OneSortCount() {
			System.out.println("根据商品类别查询所有商品的业绩（柱状图）");
			this.sortList = this.reportService.zxtAll(sid);
			Gson gson = new Gson();
			System.out.println(gson.toJson(sortList.get(0)));
			System.out.println(gson.toJson(sortList.get(1)));
			return "zxtall";
		}
		
		// 个人业绩（折线图）
		public String reportAll() {

			this.sortList = this.reportService.reportAll(pid, eid);

			return "reportAll";
		}
}
