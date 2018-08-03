package com.jidian.ssh.service.impl;

import java.util.List;

import com.jidian.ssh.dao.EmpDao;
import com.jidian.ssh.dao.impl.EmpDaoImpl;
import com.jidian.ssh.entity.Emp;
import com.jidian.ssh.service.EmpService;



public class EmpServiceImpl implements EmpService{
	private EmpDao empDao;
	
	
	public EmpDao getEmpDao() {
		return empDao;
	}

	public void setEmpDao(EmpDao empDao) {
		this.empDao = empDao;
	}

	@Override
	public List FindEmp(String num, String size, int is,int pid) {
		// TODO Auto-generated method stub
		int pageNum=0;
		if(num==null||num==""){
			pageNum=1;
		}else{
			pageNum=new Integer(num);
		}
		int pageSize=0;
		if(size==null||size==""){
			pageSize=5;
		}else{
			pageSize=new Integer(size);
		}
		List emp=empDao.FindEmp(pageNum,pageSize,is,pid);
		return emp;
	}

	@Override
	public int ShowPartCount() {
		// TODO Auto-generated method stub
		return empDao.ShowPartCount();
	}

	@Override
	public List ShowPart() {
		// TODO Auto-generated method stub
		return empDao.ShowPart();
	}

	@Override
	public void AddEmp(Emp emp) {
		// TODO Auto-generated method stub
		empDao.AddEmp(emp);
	}

	@Override
	public int getENameCount(String name) {
		// TODO Auto-generated method stub
		return empDao.getENameCount(name);
	}

	@Override
	public int getPflag(String id) {
		// TODO Auto-generated method stub
		return empDao.getPflag(id);
	}

	@Override
	public void delEmp(int eid) {
		// TODO Auto-generated method stub
		empDao.delEmp(eid);
	}

	@Override
	public Emp FindEmpById(int id) {
		// TODO Auto-generated method stub
		return empDao.FindEmpById(id);
	}

	@Override
	public void UpdateEmp(Emp emp) {
		// TODO Auto-generated method stub
		empDao.UpdateEmp(emp);
	}

	@Override
	public void recoverEmp(String eid,String pid) {
		// TODO Auto-generated method stub
		empDao.recoverEmp(eid,pid);
	}

	@Override
	public List empSeach(String etruename, String esex, int pid,
			String current,int pagesize) {
		int pageNum=0;
		if(current==null||current==""){
			pageNum=1;
		}else{
			pageNum=new Integer(current);
		}
		return empDao.empSeach(etruename,esex,pid,pageNum,pagesize);
	}

	@Override
	public List<Emp> GetNameByLike(String etruename) {
		// TODO Auto-generated method stub
		return empDao.GetNameByLike(etruename);
	}

	@Override
	public List FindEmpByPid(int pid) {
		// TODO Auto-generated method stub
		return empDao.FindEmpByPid(pid);
	}

	@Override
	public Emp login(Emp emp) {
		List list1=empDao.login(emp);
		if(list1.size()>0){
			return (Emp) list1.get(0);
		}else{
			return null;
		}
		
	}

}
