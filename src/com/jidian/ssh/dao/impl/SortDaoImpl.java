package com.jidian.ssh.dao.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.jidian.ssh.dao.SortDao;
import com.jidian.ssh.entity.Sort;



public class SortDaoImpl extends HibernateDaoSupport implements SortDao{
	
			//分页查看类别数量
	@Override
	public int findtotalRecordsNum(int is) {
		return this.getHibernateTemplate().find("from Sort where s_is="+is).size();
	}

			//分页查看类别
	@Override
	public List FindSort(int pageNum, int pageSize, int is) {
		int totalRecordsNum=findtotalRecordsNum(is); 
		String hql="from Sort where s_is="+is;
		Session session  =this.getSession();
		Query query = session.createQuery(hql);
	    query.setFirstResult((pageNum-1)*pageSize);
	    query.setMaxResults(pageSize);
		List<Sort>list = query.list();
	    for(Sort d:list){
	    	d.setpage(totalRecordsNum, pageSize);
			d.setCurrent(pageNum);
	    }
		return list;
	}

			//添加类别
	@Override
	public void AddSort(Sort sort) {
		this.getHibernateTemplate().save(sort);
	}

			//根据名字查找有无
	@Override
	public int FindSortName(String name) {
		return this.getHibernateTemplate().find("from Sort where s_name='"+name+"'").size();
	}

			//类别恢复和下架
	@Override
	public void DelSort(int id,int sis) {
		Sort sort=this.getHibernateTemplate().load(Sort.class, id);
		sort.setS_is(sis);
		this.getHibernateTemplate().update(sort);
	}

	@Override
	public Sort FindSortById(int sid) {
		Sort sort=this.getHibernateTemplate().load(Sort.class, sid);
		return sort;
	}

}
