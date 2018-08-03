package com.jidian.ssh.service.impl;

import java.util.List;

import com.jidian.ssh.dao.PartDao;
import com.jidian.ssh.dao.impl.PartDaoImpl;
import com.jidian.ssh.entity.Part;
import com.jidian.ssh.service.PartService;



public class PartServiceImpl implements PartService{
	private PartDao dao;
	
	
	public PartDao getDao() {
		return dao;
	}

	public void setDao(PartDao dao) {
		this.dao = dao;
	}

	@Override
	public List FindPartService(String num,String size,int is) {
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
		//int totalRecordsNum=dao.findTotableRecordsNumDao();
		//Page page=new Page(pageNum,pageSize,totalRecordsNum);
		List Department=dao.FindPart(pageNum,pageSize,is);
		//page.setRecords(Department);
		return Department;
	}

	@Override
	public int FindPartName(String pname) {
		// TODO Auto-generated method stub
		return dao.FindPartName(pname);
	}

	@Override
	public void AddPart(Part part) {
		// TODO Auto-generated method stub
		dao.AddPart(part);
	}

	@Override
	public void UpdatePart(Part part) {
		// TODO Auto-generated method stub
		dao.UpdatePart(part);
	}

	@Override
	public Part FindPartById(int pid) {
		// TODO Auto-generated method stub
		return dao.FindPartById(pid);
	}

	@Override
	public void recoverPart(int id) {
		// TODO Auto-generated method stub
		dao.recoverPart(id);
	}

	@Override
	public void removePart(int id) {
		// TODO Auto-generated method stub
		dao.removePart(id);
	}

//	@Override
//	public List FindClietByEmp(String id) {
//		// TODO Auto-generated method stub
//		return dao.FindClietByEmp(id);
//	}

//	@Override
//	public List FindEmpByPart(String id) {
//		// TODO Auto-generated method stub
//		return dao.FindEmpByPart(id);
//	}
	
}
