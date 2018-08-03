package com.jidian.ssh.dao.impl;


import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.jidian.ssh.dao.PartDao;
import com.jidian.ssh.entity.Part;

import util.DBUtil;

public class PartDaoImpl extends HibernateDaoSupport implements PartDao{
	
			//分页查看部门
	public List FindPart(int pageNum, int pageSize,int is){
		int totalRecordsNum=findtotalRecordsNum(is); 
		String hql="from Part where p_is="+is;
		Session session  =this.getSession();
		Query query = session.createQuery(hql);
	    query.setFirstResult((pageNum-1)*pageSize);
	    query.setMaxResults(pageSize);
		List<Part>list = query.list();
	    for(Part d:list){
	    	d.setpage(totalRecordsNum, pageSize);
			d.setCurrent(pageNum);
	    }
		return list;
	}

			//分页查看数量
	@Override
	public int findtotalRecordsNum(int is) {
		List list = this.getHibernateTemplate().find("from Part where p_is=?",is);
		return list.size();
	}

			//根据名字查找部门名称
	@Override
	public int FindPartName(String pname) {
		List list = this.getHibernateTemplate().find("from Part where p_is=1 and p_name=?",pname);
		return list.size();
	}

			//添加部门
	@Override
	public void AddPart(Part part) {
		//this.getHibernateTemplate().save(part);会自动提交事务，而id设置的是自动增长列
		this.getSessionFactory().getCurrentSession().save(part);//存入一级缓存
		this.getSessionFactory().getCurrentSession().flush();//强制同步到数据库里面
		
	}
	
			//加载部门信息
	@Override
	public Part FindPartById(int pid) {
		Part part=this.getHibernateTemplate().load(Part.class, pid);
		return part;
	}
	
			//修改部门
	@Override
	public void UpdatePart(Part part) {
		this.getHibernateTemplate().update(part);	
	}

			//恢复部门
	@Override
	public void recoverPart(int id) {
		Part part=getHibernateTemplate().load(Part.class, id);
		part.setP_is(1);
		getHibernateTemplate().update(part);
	}

			//撤销部门
	@Override
	public void removePart(int id) {
		Part part=this.getHibernateTemplate().load(Part.class, id);
		part.setP_is(0);
		this.getHibernateTemplate().update(part);
	}

//	@Override
//	public List FindClietByEmp(String id) {
//		// TODO Auto-generated method stub
//		String sql="select t_employee.* from t_client,t_employee where t_client.e_id=t_employee.e_id and c_is=1 and t_employee.e_id in(select e_id from t_employee where d_id='"+id+"')";
//		List <Staff> list=new ArrayList<Staff>();
//		Staff staff=null;
//		Department department=null;
//		ResultSet rs=DBUtil.query(sql);
//		try {
//			while(rs.next()){
//				staff=new Staff();
//				department=new Department();
//				staff.setE_id(rs.getString("e_id"));
//				department.setD_id(rs.getString("d_id"));
//				staff.setDepartment(department);
//				staff.setE_loginname(rs.getString("e_loginname"));
//				staff.setE_psw(rs.getString("e_psw"));
//				staff.setE_img(rs.getString("e_img"));
//				staff.setE_sex(rs.getString("e_sex"));
//				staff.setE_flag(rs.getInt("e_flag"));
//				staff.setE_admin(rs.getInt("e_admin"));
//				staff.setE_remark(rs.getString("e_remark"));
//				staff.setE_truename(rs.getString("e_truename"));
//				staff.setE_is(rs.getInt("e_is"));
//				list.add(staff);
//			}
//		} catch (SQLException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}finally{
//			DBUtil.close();
//		}
//		return list;
//	}

//	@Override
//	public List FindEmpByPart(String id) {
//		// TODO Auto-generated method stub
//		String sql="select * from t_employee where e_is=1 and d_id='"+id+"'";
//		List <Staff> list=new ArrayList<Staff>();
//		Staff staff=null;
//		Department department=null;
//		ResultSet rs=DBUtil.query(sql);
//		try {
//			while(rs.next()){
//				staff=new Staff();
//				department=new Department();
//				staff.setE_id(rs.getString("e_id"));
//				department.setD_id(rs.getString("d_id"));
//				staff.setDepartment(department);
//				staff.setE_loginname(rs.getString("e_loginname"));
//				staff.setE_psw(rs.getString("e_psw"));
//				staff.setE_img(rs.getString("e_img"));
//				staff.setE_sex(rs.getString("e_sex"));
//				staff.setE_flag(rs.getInt("e_flag"));
//				staff.setE_admin(rs.getInt("e_admin"));
//				staff.setE_remark(rs.getString("e_remark"));
//				staff.setE_truename(rs.getString("e_truename"));
//				staff.setE_is(rs.getInt("e_is"));
//				list.add(staff);
//			}
//		} catch (SQLException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}finally{
//			DBUtil.close();
//		}
//		return list;
//	}
	
}
