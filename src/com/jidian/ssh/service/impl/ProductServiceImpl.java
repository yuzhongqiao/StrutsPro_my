package com.jidian.ssh.service.impl;

import java.util.List;

import com.jidian.ssh.dao.ProductDao;
import com.jidian.ssh.entity.Product;
import com.jidian.ssh.entity.ProductYear;
import com.jidian.ssh.service.ProductService;



public class ProductServiceImpl implements ProductService{
	private ProductDao productDao;
	
	public ProductDao getProductDao() {
		return productDao;
	}

	public void setProductDao(ProductDao productDao) {
		this.productDao = productDao;
	}

	@Override
	public List FindProduct(String num, String size, int is) {
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
		List P=productDao.FindProduct(pageNum, pageSize, is);
		return P;
	}
	
	public List FindProductSelect(int sid,String p_name,String num, String size, int is) {
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
		List P=productDao.FindProductSelect(sid,p_name,pageNum, pageSize, is);
		return P;
	}
	
	public List FindProductYear(int p_id,String num, String size) {
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
		List P=productDao.FindProductYear(p_id,pageNum, pageSize);
		return P;
	}

	@Override
	public List FindSort() {
		// TODO Auto-generated method stub
		return productDao.FindSort();
	}

	@Override
	public int checkRepeat(String p_name, String p_area, int s_id) {
		// TODO Auto-generated method stub
		return productDao.checkRepeat(p_name, p_area, s_id);
	}

	@Override
	public void addProduct(Product product) {
		// TODO Auto-generated method stub
		productDao.addProduct(product);
	}

	@Override
	public void delProduct(int pid) {
		// TODO Auto-generated method stub
		productDao.delProduct(pid);
	}

	@Override
	public void recoverProduct(int pid) {
		// TODO Auto-generated method stub
		productDao.recoverProduct(pid);
	}

	@Override
	public Product findId(int pid) {
		// TODO Auto-generated method stub
		return productDao.findId(pid);
	}

	@Override
	public void uppProduct(Product product) {
		// TODO Auto-generated method stub
		productDao.uppProduct(product);
	}

	@Override
	public List getProYear(int pid) {
		// TODO Auto-generated method stub
		return productDao.getProYear(pid);
	}

	@Override
	public int findyear(int pid,String yname) {
		// TODO Auto-generated method stub
		return productDao.findyear(pid,yname);
	}

	@Override
	public ProductYear findAllProductYear(int pid, String yname) {
		// TODO Auto-generated method stub
		return productDao.findAllProductYear(pid, yname);
	}

	@Override
	public void addPrice(ProductYear productYear) {
		// TODO Auto-generated method stub
		productDao.addPrice(productYear);
	}

	@Override
	public void uppPrice(ProductYear productYear) {
		// TODO Auto-generated method stub
		productDao.uppPrice(productYear);
	}

	@Override
	public List getProductName(int sid) {
		// TODO Auto-generated method stub
		return productDao.getProductName(sid);
	}

	@Override
	public List FindProductSeach(int sid, String pname, String num,
			String size) {
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
		return productDao.FindProductSeach(sid, pname,new Integer(num), new Integer(size));
	}

	@Override
	public List findArea(int sid, String pname) {
		// TODO Auto-generated method stub
		return productDao.findArea(sid, pname);
	}

	@Override
	public List showProductAll(int sid, String pname, String parea,String num,String size) {
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
		return productDao.showProductAll(sid, pname, parea, new Integer(num), new Integer(size));
	}

	@Override
	public int getPrice(int pid) {
		return productDao.getPrice(pid);
	}


}
