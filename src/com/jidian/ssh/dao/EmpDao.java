package com.jidian.ssh.dao;

import java.util.List;

import com.jidian.ssh.entity.Emp;


public interface EmpDao {
	
	List login(Emp emp);
		
	//查看员工
	List FindEmp(int pageNum, int pageSize,int is,int pid);
	
	//查询部门数量
	int ShowPartCount();
		
	//查看部门
	List ShowPart();
	
	//根据部门id得到全部员工
	List FindEmpByPid(int pid);
	
	//判断该员工是否已经存在
	int getENameCount(String name);
			
	//查询部门主管是否已经存在
	int getPflag(String id);
	
	//增加员工
	void AddEmp(Emp emp);
	
	//查询要修改的员工的信息
	Emp FindEmpById(int id);
			
	//修改员工
	void UpdateEmp(Emp emp);
			
	//恢复员工
	void recoverEmp(String eid,String pid);
	
	//撤销员工
	void delEmp(int eid);
	
	//模糊查询
	List<Emp> GetNameByLike(String etruename);
	
	//条件查看
	List empSeach(String etruename, String esex, int pid, int pageNum,int pagesize);
	
	List allNameEmp();
	
}
