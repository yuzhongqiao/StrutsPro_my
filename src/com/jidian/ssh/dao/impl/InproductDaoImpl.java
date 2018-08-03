package com.jidian.ssh.dao.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.jidian.ssh.dao.InproductDao;
import com.jidian.ssh.entity.Inproduct;
import com.jidian.ssh.entity.Outproduct;
import com.jidian.ssh.entity.Product;
import com.jidian.ssh.entity.Stock;

public class InproductDaoImpl extends HibernateDaoSupport implements InproductDao{

			//得到库存
	@Override
	public Stock findSum(int pid) {
		Stock stock=(Stock) this.getHibernateTemplate().find("from Stock where p_id="+pid).get(0);
		System.out.println(stock);
		return stock;
	}

			//更新库存
	@Override
	public void uppStock(Stock stock) {
		this.getHibernateTemplate().update(stock);
	}
	
			//添加入库信息
	@Override
	public void addInproduct(Inproduct inproduct) {
		this.getHibernateTemplate().save(inproduct);		
	}

			//查看入库详细信息
	@Override
	public List showInproduct(int pid, int pageNum, int pageSize) {
		int num=this.getHibernateTemplate().find("from Inproduct i inner join fetch i.Product p where p.p_id="+pid).size();
		System.out.println(num);
		String hql="from Inproduct i inner join fetch i.Product p where p.p_id="+pid;
		Session session=this.getSession();
		Query query=session.createQuery(hql);
		query.setFirstResult((pageNum-1)*pageSize);
		query.setMaxResults(pageSize);
		List<Inproduct> list=query.list();
		for (Inproduct inproduct : list) {
			inproduct.setpage(num, pageSize);
			inproduct.setCurrent(pageNum);
		}
		return list;
	}

			//查看出库详细信息
	@Override
	public List showOutproduct(int pid, int pageNum, int pageSize) {
		int num=this.getHibernateTemplate().find("from Outproduct o inner join fetch o.Product p where p.p_id="+pid).size();
		System.out.println(num);
		String hql="from Outproduct o inner join fetch o.Product p where p.p_id="+pid;
		Session session=this.getSession();
		Query query=session.createQuery(hql);
		query.setFirstResult((pageNum-1)*pageSize);
		query.setMaxResults(pageSize);
		List<Outproduct> list=query.list();
		for (Outproduct outproduct : list) {
			outproduct.setpage(num, pageSize);
			outproduct.setCurrent(pageNum);
		}
		return list;
	}

	
}
