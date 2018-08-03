package com.jidian.ssh.dao.impl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.jidian.ssh.dao.ReportDao;
import com.jidian.ssh.entity.Part;


public class ReportDaoImpl extends HibernateDaoSupport implements ReportDao{

	@Override
	public List allPart() {
		List list=this.getHibernateTemplate().find("from Part where p_is=1 order by p_id desc");
		return list;
	}


	@Override
	public String onePartName(int pid) {
		Part part=this.getHibernateTemplate().load(Part.class, pid);
		System.out.println("part:"+part);
		return part.getP_name();
	}


	@Override
	public List FindEmpByPid(int pid) {
		System.out.println("进入FindEmpByPid方法");
		List list=this.getHibernateTemplate().find("from Emp e inner join fetch e.Part p where e.e_is=1 and p.p_id="+pid);
		return list;
	}


	@Override
	public List OneEmpOrder(int eid) {
		List list=this.getHibernateTemplate().find("from Orders o inner join fetch o.Emp e where e.e_id="+eid);
		System.out.println("OneEmpOrder的list:"+list);
		return list;
	}


	@Override
	public List showOrdersmx(int oid) {
		List list=this.getHibernateTemplate().find("from Ordersmx where r_id="+oid);
		System.out.println("list:"+list);
		return list;
	}


	@Override
	public List OneOrdersmxCount(final int xid) {
		System.out.println("OneOrdersmxCount方法");
		return this.getHibernateTemplate().executeFind(new HibernateCallback() {

			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				 List arr =session.createQuery("select sum(a.x_count),sum(a.x_price) from Ordersmx a where a.x_id="+xid).list();
                      Object[] ob =(Object[]) arr.get(0);	
                      double a= Double.parseDouble(ob[0].toString());
                      double b=Double.parseDouble(ob[1].toString());
                      double count=a*b;
				 List ar=new ArrayList();
                 ar.add(count);
				return ar;
			}
		});
	}

}
