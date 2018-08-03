package com.jidian.ssh.service;

import java.util.List;

import com.jidian.ssh.entity.Product;
import com.jidian.ssh.entity.ProductYear;

public interface ProductService {
	//查看商品
	List FindProduct(String current, String pis,int is);
	
	//查看商品详细
	List FindProductSelect(int sid,String p_name,String current, String pis,int is);
	
	//查看商品年份
	List FindProductYear(int p_id,String current, String pis);
	
	//查看部门
	List FindSort();
	
	int checkRepeat(String p_name,String p_area,int s_id);
	
	//添加产品
	void addProduct(Product product);
	
	void delProduct(int pid);
	
	void recoverProduct(int pid);
	
	Product findId(int pid);
	
	List getProYear(int pid);
	
	void uppProduct(Product product);
	
	int findyear(int pid,String yname);
	
	ProductYear findAllProductYear(int pid,String yname);
	
	void uppPrice(ProductYear productYear);
	
	void addPrice(ProductYear productYear);
	
	List getProductName(int sid);
	
	List FindProductSeach(int sid,String pname,String current, String pis);
	
	List findArea(int sid,String pname);
	
	List showProductAll(int sid,String pname,String parea,String pageNum,String pageSize);
	
	int getPrice(int pid);
}
