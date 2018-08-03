package com.jidian.ssh.dao.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.jidian.ssh.dao.ClientDao;
import com.jidian.ssh.entity.Client;

public class ClientDaoImpl extends HibernateDaoSupport implements ClientDao{

			//查看客户
	@Override
	public List showClientByEid(int pageNum, int pageSize, int is, int eid) {
		String hql="from Client c inner join fetch c.Emp e where c_is="+is;
		if(eid!=0){
			hql+=" and e.e_id="+eid;
		}
		int num=this.getHibernateTemplate().find(hql).size();
		Session session=this.getSession();
		Query query=session.createQuery(hql);
		query.setFirstResult((pageNum-1)*pageSize);
		query.setMaxResults(pageSize);
		List<Client> list=query.list();
		for (Client client : list) {
			client.setpage(num, pageSize);
			client.setCurrent(pageNum);
		}
		return list;
	}

	@Override
	public void addClient(Client client) {
		this.getHibernateTemplate().save(client);
	}

	@Override
	public void delClient(int cid) {
		Client client=this.getHibernateTemplate().load(Client.class, cid);
		client.setC_is(0);
		this.getHibernateTemplate().update(client);
	}

	@Override
	public Client findClientByCid(int cid) {
		Client client=this.getHibernateTemplate().load(Client.class, cid);
		return client;
	}

	@Override
	public void uppClient(Client client) {
		this.getHibernateTemplate().update(client);
		
	}

	@Override
	public List findClientByCid1(int cid) {
		List list=this.getHibernateTemplate().find("from Client c inner join fetch c.Emp where c.c_id="+cid);
		return list;
	}

	@Override
	public void backClient(int cid) {
		Client client=this.getHibernateTemplate().load(Client.class, cid);
		client.setC_is(1);
		this.getHibernateTemplate().update(client);
	}

	
}
