package com.jidian.ssh.dao;

import java.util.List;

import com.jidian.ssh.entity.Part;


public interface PartDao {
	//查询部门数量
	int findtotalRecordsNum(int is);

	//分页查看部门
	List FindPart(int pageNum, int pageSize,int is);
	
	//根据名称查找部门
	int FindPartName(String pname);
	
	//添加部门
	void AddPart(Part part);
	
	//根据部门ID找到部门信息
	Part FindPartById(int pid);
	
	//修改部门
	void UpdatePart(Part part);
	
	//先查询要撤销的部门是否存在员工(根据部门ID找到员工信息)
	//List FindEmpByPart(String id);
	
	//员工是否存在未交接的顾客(根据员工ID找到顾客信息)
	//List FindClietByEmp(String id);
	
	//撤销部门
	void removePart(int id);
	
	//恢复部门
	void recoverPart(int id);
}
