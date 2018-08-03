package com.jidian.ssh.dao.impl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.jidian.ssh.dao.OrdersDao;
import com.jidian.ssh.entity.Client;
import com.jidian.ssh.entity.Orders;
import com.jidian.ssh.entity.Ordersmx;
import com.jidian.ssh.entity.Outproduct;
import com.jidian.ssh.entity.Stock;

public class OrdersDaoImpl extends HibernateDaoSupport implements OrdersDao{

			//查看订单
	@Override
	public List showOrders(int pageNum, int pageSize, int pid, int eid,
			int cid, int oid, int ris) {
		String hql="from Orders o where 1=1";
		if(pid!=-10){
			hql+=" and o.Emp.Part.p_id="+pid;
		}
		if(eid!=-10){
			hql+=" and o.Emp.e_id="+eid;
		}
		if(cid!=-10){
			hql+=" and o.Client.c_id="+cid;
		}
		if(oid!=-10){
			hql+=" and o.r_id="+oid;
		}
		if(ris!=-10){
			hql+=" and o.r_is="+ris;
		}
		int num=this.getHibernateTemplate().find(hql).size();
		Session session=this.getSession();
		Query query=session.createQuery(hql);
		query.setFirstResult((pageNum-1)*pageSize);
		query.setMaxResults(pageSize);
		List<Orders> list=query.list();
		for (Orders orders : list) {
			orders.setpage(num, pageSize);
			orders.setCurrent(pageNum);
		}
		return list;
	}
			//添加订单
	@Override
	public void addOrders(Orders orders) {
		this.getHibernateTemplate().save(orders);
	}
	
			//查看订单详细
	@Override
	public List showOrdersmx(int pageNum, int pageSize, int oid) {
		String hql="from Ordersmx o where r_id="+oid;
		int num=this.getHibernateTemplate().find(hql).size();
		System.out.println("num:"+num);
		Session session=this.getSession();
		Query query=session.createQuery(hql);
		query.setFirstResult((pageNum-1)*pageSize);
		query.setMaxResults(pageSize);
		List<Ordersmx> list=query.list();
		for (Ordersmx ordersmx : list) {
			ordersmx.setpage(num, pageSize);
			ordersmx.setCurrent(pageNum);
		}
		System.out.println("list:"+list);
		return list;
	}
	
			//添加订单详细
	@Override
	public void addOrdersmx(Ordersmx ordersmx) {
		this.getHibernateTemplate().save(ordersmx);
	}
	
			//得到库存数
	@Override
	public Stock findStock(int pid) {
		Stock stock=(Stock) this.getHibernateTemplate().find("from Stock where p_id="+pid).get(0);
		return stock;
	}
	
	@Override
	public List showOrdersmxGroup(int oid) {
		List list=this.getHibernateTemplate().find("select o.product.p_id,sum(o.x_count) from Ordersmx o where o.orders.r_id="+oid+" group by o.product.p_id");
		System.out.println("list:"+list);
		return list;
	}
	
	@Override
	public List showOrdersmx(int oid) {
		List list=this.getHibernateTemplate().find("from Ordersmx where r_id="+oid);
		System.out.println("list:"+list);
		return list;
	}
	
	@Override
	public void uppStock(Stock stock) {
		this.getHibernateTemplate().update(stock);
	}
	
	@Override
	public Orders getOrder(int oid) {
		Orders orders=(Orders) this.getHibernateTemplate().find("from Orders where r_id="+oid).get(0);
		return orders;
	}
	
	@Override
	public void addOutproduct(Outproduct outproduct) {
		this.getHibernateTemplate().save(outproduct);
	}
	
	@Override
	public void uppOrders(Orders orders) {
		this.getHibernateTemplate().update(orders);		
	}
	
	@Override
	public void delOrdersmx(int oid) {
		Ordersmx ordersmx=(Ordersmx) this.getHibernateTemplate().find("from Ordersmx where x_id="+oid).get(0);
		this.getHibernateTemplate().delete(ordersmx);
		
	}
	
	@Override
	public void uppOrdersmx(int oid, int count) {
		Ordersmx ordersmx=(Ordersmx) this.getHibernateTemplate().find("from Ordersmx where x_id="+oid).get(0);
		ordersmx.setX_count(count);
		System.out.println(ordersmx);
		this.getHibernateTemplate().update(ordersmx);
	}
	
	@Override
	public List OneEmpOrder(int eid) {
		List list=this.getHibernateTemplate().find("from Orders o where o.Emp.e_id="+eid);
		return list;
	}
	@Override
	public List OneOrdersmxCount(int xid) {
		Session session=this.getSession();
		List arr =session.createQuery("select sum(a.x_count),sum(a.x_price) from Ordersmx a where a.x_id=?").setInteger(0, xid).list();
        Object[] ob =(Object[]) arr.get(0);	
        double a= Double.parseDouble(ob[0].toString());
        double b=Double.parseDouble(ob[1].toString());
        double count=a*b;
        List ar=new ArrayList();
        ar.add(count);
        
        return ar;
	}
	
	//根据产品编号查询所有订单明细
	@Override
	public List OneProductOrderMx(int pid) {
		List list=this.getHibernateTemplate().find("from Ordersmx a where a.product.p_id="+pid);
		return list;
	}
	
	// 根据员工的id和时期查询所有的订单
	@Override
	public List OneEmpTimeOrder(final Integer eid, final int time) {
		return this.getHibernateTemplate().executeFind(new HibernateCallback() {

			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				String t1 = "";
				String t2 = "";
				if (time <= 8) {
					t1 = "2016-0" + time + "-01 00:00:00";
					t2 = "2016-0" + (time + 1) + "-01 00:00:00";

				} else if(time==12){
					t1 = "2016-" + time + "-01 00:00:00";
					t2 = "2016-" +time + "-31 23:59:59";
				}else if(time==9){
					t1 = "2016-0" + time + "-01 00:00:00";
					t2 = "2016-" + (time + 1) + "-01 00:00:00";
				}else {
					t1 = "2016-" + time + "-01 00:00:00";
					t2 = "2016-" + (time + 1) + "-01 00:00:00";
				}
				List ar = session.createQuery(
						"from Orders a where a.Emp.e_id=? and a.r_time between '"
								+ t1 + "' and '" + t2 + "' and a.r_is=2")
						.setInteger(0, eid).list();
				return ar;
			}
		});
	}
	
	

}
