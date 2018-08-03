package com.jidian.ssh.dao;

import java.util.List;

public interface ReportDao {

		//查询所有的部门
		List allPart();
		
		//计算一个部门的总业绩
		//double oneAllCount(int pid);
		
		//生成饼状图数据
		//Object[] [] bztAll(int[] a);
		String onePartName(int pid);
		
		//根据部门id得到全部员工
		List FindEmpByPid(int pid);
		
		List OneEmpOrder(int eid);
		
		List showOrdersmx(int oid);
		
		 List OneOrdersmxCount(int xid);
}
