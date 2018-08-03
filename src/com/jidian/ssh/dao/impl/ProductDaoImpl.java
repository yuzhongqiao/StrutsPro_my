package com.jidian.ssh.dao.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.jidian.ssh.dao.ProductDao;
import com.jidian.ssh.entity.Product;
import com.jidian.ssh.entity.ProductYear;
import com.jidian.ssh.entity.Sort;
import com.jidian.ssh.entity.Stock;

import util.DBUtil;


public class ProductDaoImpl extends HibernateDaoSupport implements ProductDao{
	
			//查看产品-根据商品名称
	@Override
	public List FindProduct(int pageNum, int pageSize, int is) {
		//select distinct p.PName,p.TSort.SId from TProduct p where p.PIs=?
		int num=this.getHibernateTemplate().find("from Product where p_is=?",is).size();
		System.out.println(num);
		String hql="from Product p inner join fetch p.Sort where p.p_is="+is;
		Session session=this.getSession();
		Query query=session.createQuery(hql);
		query.setFirstResult((pageNum-1)*pageSize);
		query.setMaxResults(pageSize);
		List<Product> list=query.list();
		for (Product product : list) {
			product.setpage(num, pageSize);
			product.setCurrent(pageNum);
		}
		return list;
	}
	
			//查看产品-根据产地
	@Override
	public List FindProductSelect(int sid,String p_name,int pageNum, int pageSize, int is) {
		int num=this.getHibernateTemplate().find("from Product p inner join fetch p.Sort s where p_name='"+p_name+"'and s.s_id="+sid+" and p_is="+is).size();
		String hql="from Product p inner join fetch p.Sort where p_name='"+p_name+"' and p.p_is="+is;
		Session session=this.getSession();
		Query query=session.createQuery(hql);
		query.setFirstResult((pageNum-1)*pageSize);
		query.setMaxResults(pageSize);
		List<Product> list=query.list();
		for (Product product : list) {
			product.setpage(num, pageSize);
			product.setCurrent(pageNum);
		}
		return list;
	}
		
		//查看产品年份
			@Override
	public List FindProductYear(int p_id,int pageNum, int pageSize) {
		int num=this.getHibernateTemplate().find("from ProductYear where p_id="+p_id+"").size();
		String hql="from ProductYear y inner join fetch y.Product p where p.p_id="+p_id;
		Session session=this.getSession();
		Query query=session.createQuery(hql);
		query.setFirstResult((pageNum-1)*pageSize);
		query.setMaxResults(pageSize);
		List<ProductYear> list=query.list();
		for (ProductYear py : list) {
				py.setpage(num, pageSize);
				py.setCurrent(pageNum);
			}
		return list;	
		
	}
				//得到类别
		@Override
		public List<Sort> FindSort() {
			List<Sort> list=this.getHibernateTemplate().find("from Sort where s_is=1");
			return list;
		}

				//检查产品名和产地
		@Override
		public int checkRepeat(String p_name, String p_area, int s_id) {
			int count=this.getHibernateTemplate().find("from Product p inner join fetch p.Sort where p.p_name='"+p_name+"' and p.p_area='"+p_area+"' and p.Sort.s_id="+s_id+"").size();
			return count;
		}

				//添加商品
		@Override
		public void addProduct(Product product) {
			System.out.println(product);
			this.getHibernateTemplate().save(product);
		}

				//下架商品
		@Override
		public void delProduct(int pid) {
			Product product=this.getHibernateTemplate().load(Product.class, pid);
			product.setP_is(0);
			this.getHibernateTemplate().update(product);
		}
		
				//上架商品
		@Override
		public void recoverProduct(int pid) {
			Product product=this.getHibernateTemplate().load(Product.class, pid);
			product.setP_is(1);
			this.getHibernateTemplate().update(product);
		}

				//得到商品的信息
		@Override
		public Product findId(int pid) {
			Product product=this.getHibernateTemplate().load(Product.class, pid);
			System.out.println(product);
			return product;
		}

				//更新商品
		@Override
		public void uppProduct(Product product) {
			this.getHibernateTemplate().update(product);
		}

		@Override
		public List getProYear(int pid) {
			List list=this.getHibernateTemplate().find("from ProductYear y inner join fetch y.Product where y.p_id="+pid+"");
			return list;
		}

				//判断商品年份和价格是否存在
		@Override
		public int findyear(int pid,String yname) {
			return this.getHibernateTemplate().find("from ProductYear y inner join fetch y.Product p where p.p_id="+pid+" and y.y_name='"+yname+"' ").size();
		}

				//得到年份的实体类
		@Override
		public ProductYear findAllProductYear(int pid, String yname) {
			ProductYear productYear=(ProductYear) this.getHibernateTemplate().find("from ProductYear a inner join fetch a.Product where a.Product.p_id="+pid+" and a.y_name='"+yname+"'").get(0);
			System.out.println(productYear);
			return productYear;
		}

				//添加年份和价格
		@Override
		public void addPrice(ProductYear productYear) {
			this.getHibernateTemplate().save(productYear);
		}

				//更新年份和价格
		@Override
		public void uppPrice(ProductYear productYear) {
			// TODO Auto-generated method stub
			this.getHibernateTemplate().update(productYear);
		}

				//得到商品名称
		@Override
		public List getProductName(int sid) {
			List list=this.getHibernateTemplate().find("select p.p_name from Product p where p.Sort.s_id="+sid+" group by p.p_name");
			return list;
		}

				//产品条件查询
		@Override
		public List FindProductSeach(int sid, String pname, int pageNum,
				int pageSize) {
			String hql="from Product p inner join fetch p.Sort s where 1=1";
			if(sid>0){
				hql+=" and s.s_id="+sid+"";
			}
			if(pname!=null && pname!=""){
				hql+=" and p.p_name='"+pname+"'";
			}
			System.out.println(hql);
			int num=this.getHibernateTemplate().find(hql).size();
			System.out.println("num:"+num);
			Session session=this.getSession();
			Query query=session.createQuery(hql);
			query.setFirstResult((pageNum-1)*pageSize);
			query.setMaxResults(pageSize);
			List<Product> list=query.list();
			for (Product product : list) {
				product.setpage(num, pageSize);
				product.setCurrent(pageNum);
			}
			return list;
		}

				//得到产地
		@Override
		public List findArea(int sid, String pname) {
			List list=this.getHibernateTemplate().find("select a.p_id,a.p_area from Product a where a.Sort.s_id="+sid+" and a.p_name='"+pname+"' group by a.p_id,a.p_area");
			return list;
		}

				//三级联动-根据sid,pname,parea
		@Override
		public List showProductAll(int sid, String pname, String parea, int pageNum,
				int pageSize) {
			String hql="from Stock k inner join fetch k.Product p inner join fetch p.Sort s where 1=1";
			if(sid>0){
				hql+=" and s.s_id="+sid+"";
			}
			if(pname!=null && pname!="" && !pname.equals("-10")){
				hql+=" and p.p_name='"+pname+"'";
			}
			if(parea!=null && parea!="" && !parea.equals("-10")){
				hql+=" and p.p_area='"+parea+"'";
			}
			System.out.println(hql);
			int num=this.getHibernateTemplate().find(hql).size();
			System.out.println("num:"+num);
			Session session=this.getSession();
			Query query=session.createQuery(hql);
			query.setFirstResult((pageNum-1)*pageSize);
			query.setMaxResults(pageSize);
			List<Stock> list=query.list();
			for (Stock stock : list) {
				stock.setpage(num, pageSize);
				stock.setCurrent(pageNum);
			}
			System.out.println(list);
			return list;
		}

		//根据pid得到商品的价格
		@Override
		public int getPrice(int pid) {
			ProductYear py=(ProductYear) this.getHibernateTemplate().find("from ProductYear where p_id="+pid).get(0);
			return py.getY_price();
		}

		@Override
		public List findAll() {
			List list=this.getHibernateTemplate().find("from Product");
			return list;
		}

		@Override
		public List FindProductBySid(int sid) {
			List list=this.getHibernateTemplate().find("from Product a inner join fetch a.Sort where a.Sort.s_id="+sid);
			return list;
		}
		
		@Override
		public List findProductBySname(String name) {
			List list=this.getHibernateTemplate().find("from Product a inner join fetch a.Sort where a.Sort.s_name='"+name+"'");
			return list;
		}

		
		
}
