package com.jidian.ssh.service;

import java.util.List;

public interface ReportService {

	//查询所有的部门
	List allPart();
	
	//计算一个部门的总业绩
	double oneAllCount(Integer pid);
	
	//生成饼状图数据
	Object[] [] bztAll(int[] a);
	String onePartName(int pid);
	
	//计算一个类别里产品业绩的集合
	public List oneSortCount(String name);
	
	//生成柱状图
	public List zxtAll(Integer sid);
	
	//折线图
	public List breaks(Integer pid,Integer eid);
		
	public  List reportAll(Integer pid,Integer eid);
}
