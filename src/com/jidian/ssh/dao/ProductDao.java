package com.jidian.ssh.dao;

import java.util.List;

import com.jidian.ssh.entity.Product;
import com.jidian.ssh.entity.ProductYear;
import com.jidian.ssh.entity.Sort;

public interface ProductDao {

	//分页查看产品
	List FindProduct(int pageNum, int pageSize,int is);
	
	List FindProductBySid(int sid);

	//分页查看产品详细
	List FindProductSelect(int sid,String p_name,int pageNum, int pageSize,int is);

	//分页查看产品年份
	List FindProductYear(int p_id,int pageNum, int pageSize);
	
	//查看类别
	List<Sort> FindSort();
	
	int checkRepeat(String p_name,String p_area,int s_id);
	
	void addProduct(Product product);
	
	void delProduct(int pid);
	
	void recoverProduct(int pid);
	
	Product findId(int pid);
	
	void uppProduct(Product product);
	
	List getProYear(int pid);
	
	int findyear(int pid,String yname);
	
	ProductYear findAllProductYear(int pid,String yname);
	
	void uppPrice(ProductYear productYear);
	
	void addPrice(ProductYear productYear);
	
	List getProductName(int sid);
	
	List FindProductSeach(int sid,String pname,int current, int pis);
	
	List findArea(int sid,String pname);
	
	List showProductAll(int sid,String pname,String parea,int pageNum,int pageSize);
	
	int getPrice(int pid);
	
	List findAll();
	
	List findProductBySname(String name);
}
