package com.jidian.ssh.action;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;

import org.apache.struts2.ServletActionContext;


import com.jidian.ssh.entity.Product;
import com.jidian.ssh.entity.ProductYear;
import com.jidian.ssh.service.ProductService;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;


public class ProductAction extends ActionSupport implements ModelDriven<Product>{
	
	private ProductService productService;
	private HttpServletRequest request=ServletActionContext.getRequest();
	private HttpServletResponse response=ServletActionContext.getResponse();
	private HttpSession session=request.getSession();
	private Product product=new Product();
	private ProductYear productYear=new ProductYear();
	private String result;
	private String zuName;
	private List list;
	private String pname;
	private String parea;
	private int sid;
	private int mydata;
	private int pid;
	private String yname;
	private int yprice;
	private int yid;
	
	
	public int getYid() {
		return yid;
	}

	public void setYid(int yid) {
		this.yid = yid;
	}

	public String getYname() {
		return yname;
	}

	public void setYname(String yname) {
		this.yname = yname;
	}

	public int getYprice() {
		return yprice;
	}

	public void setYprice(int yprice) {
		this.yprice = yprice;
	}

	public int getPid() {
		return pid;
	}

	public void setPid(int pid) {
		this.pid = pid;
	}

	public int getMydata() {
		return mydata;
	}

	public void setMydata(int mydata) {
		this.mydata = mydata;
	}

	public String getPname() {
		return pname;
	}

	public void setPname(String pname) {
		this.pname = pname;
	}

	public String getParea() {
		return parea;
	}

	public void setParea(String parea) {
		this.parea = parea;
	}

	public int getSid() {
		return sid;
	}

	public void setSid(int sid) {
		this.sid = sid;
	}

	public List getList() {
		return list;
	}

	public void setList(List list) {
		this.list = list;
	}

	public String getZuName() {
		return zuName;
	}

	public void setZuName(String zuName) {
		this.zuName = zuName;
	}

	public ProductService getProductService() {
		return productService;
	}

	public void setProductService(ProductService productService) {
		this.productService = productService;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

			//查看商品-根据商品名称
	public String ShowProduct(){
		System.out.println("查看商品");
		String pis=request.getParameter("pis");
		String current=request.getParameter("current");
		List list=productService.FindProduct(current, pis,1);
		JSONArray j1 = JSONArray.fromObject(list);
		result=j1.toString();
		System.out.println(result);
		return SUCCESS;
	}
	
			//查看商品-根据产地
	public String ShowProductSelect(){
		int sid1 = Integer.parseInt(zuName
				.substring(zuName.lastIndexOf("_") + 1));
		String pname1 = zuName.substring(0, zuName.lastIndexOf("_"));
		
		String pis=request.getParameter("pis");
		String current=request.getParameter("current");

		List list=productService.FindProductSelect(sid1,pname1,current, pis,1);
		JSONArray j2 = JSONArray.fromObject(list);
		result=j2.toString();
		System.out.println(result);
		return SUCCESS;
}

			//查看商品-根据年份
	public String ShowProductYear(){
		String pis=request.getParameter("pis");
		String current=request.getParameter("current");
		String pid=request.getParameter("pid");
		List list=productService.FindProductYear(new Integer(pid),current, pis);
		JSONArray j3 = JSONArray.fromObject(list);
		result=j3.toString();
		return SUCCESS;
	}
			//得到产品类别
	public String FindSort(){
		System.out.println("得到产品类别");
		this.list=productService.FindSort();
		return SUCCESS;
	}
	
			//产品名和产地不能重复
	public String checkRepeat(){
		System.out.println("查询产品名和产地");
		int count=productService.checkRepeat(pname, parea, sid);
		mydata=count;
		return SUCCESS;
	}
	
			//添加产品
	public String addProduct(){
		System.out.println("添加产品");
		product.setP_is(1);
		productService.addProduct(product);
		mydata=1;
		return SUCCESS;
	}
	
			//下架商品
	public String delProduct(){
		System.out.println("下架商品");
		productService.delProduct(pid);
		mydata=1;
		return SUCCESS;
	}
	
			//上架商品
	public String recoverProduct(){
		System.out.println("上架商品");
		productService.recoverProduct(pid);
		mydata=1;
		return SUCCESS;
	}
	
			//查看撤销商品
	public String ShowdelProduct(){
		System.out.println("查看撤销商品");
		String pis=request.getParameter("pis");
		String current=request.getParameter("current");
		List list=productService.FindProduct(current, pis,0);
		JSONArray j1 = JSONArray.fromObject(list);
		result=j1.toString();
		System.out.println(result);
		return SUCCESS;
	}
	
			//得到修改的信息
	public String findId(){
		System.out.println("得到修改的信息");
		this.product=productService.findId(pid);
		return SUCCESS;
	}
	
			//修改商品
	public String uppProduct(){
		System.out.println("修改商品");
		product.setP_is(1);
		productService.uppProduct(product);
		mydata=1;
		return SUCCESS;
	}
	
	public String getProYear(){
		list=productService.getProYear(pid);
		return SUCCESS;
	}
	
			//更新价格
	public String uppPrice(){
		System.out.println("更新价格");
		int count=productService.findyear(pid,yname);
		System.out.println("pid:"+pid);
		//判断年份和价格是否存在，存在则更新，不存在则添加
		if(count>0){
			//根据pid和yname得到ProductYear的实体类
			ProductYear productYear=productService.findAllProductYear(pid, yname);
			productYear.setY_price(yprice);
			productService.uppPrice(productYear);
		}else{
			productYear.setY_name(yname);
			productYear.setY_price(yprice);
			product.setP_id(pid);
			productYear.setProduct(product);
			productService.addPrice(productYear);
		}
		mydata=1;
		return SUCCESS;
	}
	
	public String getProductName(){
		System.out.println("根据id查询商品的名称");
		this.list=productService.getProductName(sid);
		System.out.println(list);
		return SUCCESS;
	}
	
	public String productSeach(){
		System.out.println("按条件查询");
		String current=request.getParameter("current");
		List list=productService.FindProductSeach(sid,pname,current, "5");
		JSONArray j3 = JSONArray.fromObject(list);
		result=j3.toString();
		return SUCCESS;
	}
	
	public String getProductArea(){
		System.out.println("根据类别id和商品名查询产地");
		this.list=productService.findArea(sid, pname);
		return SUCCESS;
	}
	
	public String getPrice(){
		System.out.println("根据pid得到商品年份的价格");
		mydata=productService.getPrice(pid);
		System.out.println("prices:"+mydata);
		return SUCCESS;
	}
	
	public String showProductAll(){
		System.out.println("三级联动-根据sid,pname,parea");
		String current=request.getParameter("current");
		this.list=productService.showProductAll(sid, pname, parea, current, "5");
		return SUCCESS;
	}
	
			//得到商品的信息-入库
	public String findId2(){
		System.out.println("得到修改的信息");
		this.product=productService.findId(pid);
		session.setAttribute("product",product);
		return SUCCESS;
	}
	
	public String oneProduct(){
		System.out.println("得到库存的数量");
		return SUCCESS;
	}
	
	@Override
	public Product getModel() {
		// TODO Auto-generated method stub
		return product;
	}
	

}
