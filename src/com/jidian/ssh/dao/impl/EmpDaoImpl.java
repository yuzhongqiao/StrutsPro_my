package com.jidian.ssh.dao.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.jidian.ssh.dao.EmpDao;
import com.jidian.ssh.entity.Emp;
import com.jidian.ssh.entity.Part;

import util.DBUtil;


public class EmpDaoImpl extends HibernateDaoSupport implements EmpDao{

			//分页查看
	@Override
	public List FindEmp(int pageNum, int pageSize, int is,int pid) {
		System.out.println("pid:"+pid);
		String hql="from Emp e inner join fetch e.Part p where e.e_is="+is;
		if(pid!=0){
			hql+=" and p.p_id="+pid+"";
		}
		System.out.println(hql);
		int num=this.getHibernateTemplate().find(hql).size();	
		Session session=this.getSession();
		Query query=session.createQuery(hql);
		query.setFirstResult((pageNum-1)*pageSize);
		query.setMaxResults(pageSize);
		List<Emp> list=query.list();
		for (Emp emp : list) {
			emp.setpage(num, pageSize);
			emp.setCurrent(pageNum);
		}
		return list;
	}

			//查看部门的数量
	@Override
	public int ShowPartCount() {
		int count=this.getHibernateTemplate().find("from Part where p_is=1").size();
		return count;
	}

			//得到部门
	@Override
	public List ShowPart() {
		List list=this.getHibernateTemplate().find("from Part where p_is=1");
		return list;
	}
			

			// 判断是否存在该员工
	@Override
	public int getENameCount(String name) {
		int count=this.getHibernateTemplate().find("from Emp where e_loginname='"+name+"'").size();
		return count;
	}

			// 查看部门主管是否唯一
	@Override
	public int getPflag(String id) {
		int count=this.getHibernateTemplate().find("from Emp where e_flag=1 and p_id="+id).size();
		return count;
	}
	
			//增加员工
	@Override
	public void AddEmp(Emp emp) {
		this.getSessionFactory().getCurrentSession().save(emp);
		this.getSessionFactory().getCurrentSession().flush();
	}

			//得到要修改员工的信息
	@Override
	public Emp FindEmpById(int id) {
		Emp emp=this.getHibernateTemplate().load(Emp.class, id);
		return emp;	
	}

			//修改员工
	@Override
	public void UpdateEmp(Emp emp) {
		this.getHibernateTemplate().update(emp);
	}

			//撤销员工
	@Override
	public void delEmp(int eid) {
		Emp emp=this.getHibernateTemplate().load(Emp.class, eid);
		emp.setE_is(0);
		this.getHibernateTemplate().update(emp);
	}
	
			//恢复员工
	@Override
	public void recoverEmp(String eid,String pid) {
		Session session=this.getSession();
		Query query=session.createQuery("update Emp set e_is=1,p_id='"+pid+"' where e_id='"+eid+"' ");
		query.executeUpdate();
	}

			//分类查看
	@Override
	public List empSeach(String etruename, String esex, int pid,
			int pageNum,int pagesize) {
		
		String hql="from Emp e inner join fetch e.Part p where e.e_is=1";
		if(etruename!=null && !etruename.trim().equals("")){
			hql+=" and e_truename='"+etruename+"'";
		}
		if(esex!=null && !esex.equals("-10")){
			hql+=" and e_sex='"+esex+"'";
		}
		if(pid!=-10 && pid!=-1){
			hql+=" and p.p_id="+pid+"";
		}
		int num=this.getHibernateTemplate().find(hql).size();//条件查询数量
		System.out.println(hql);
		Session session=this.getSession();
		Query query=session.createQuery(hql);
		query.setFirstResult((pageNum-1)*pagesize);
		query.setMaxResults(pagesize);
		List<Emp> list=query.list();
		for (Emp emp : list) {
			emp.setpage(num, pagesize);
			emp.setCurrent(pageNum);
		}
		return list;
	}

	//模糊查询
	@Override
	public List<Emp> GetNameByLike(String etruename) {
		List list=this.getHibernateTemplate().find("from Emp where e_truename like '%"+etruename+"%'");
		System.out.println(list);
		return list;
	}

	@Override
	public List FindEmpByPid(int pid) {
		System.out.println("进入FindEmpByPid方法");
		List list=this.getHibernateTemplate().find("from Emp where e_is=1 and p_id="+pid);
		return list;
	}

	@Override
	public List allNameEmp() {
		List list=this.getHibernateTemplate().find("from Emp a  inner join fetch a.Part where a.e_is=1 and a.e_id > 0");
		return list;
	}

	@Override
	public List login(Emp emp) {
		List list=this.getHibernateTemplate().find("from Emp a inner join fetch a.Part where a.e_loginname='"+emp.getE_loginname()+"' and a.e_psw='"+emp.getE_psw()+"'");
		return list;
	}

	
}
