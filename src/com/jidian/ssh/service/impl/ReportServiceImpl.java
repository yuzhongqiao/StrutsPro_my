package com.jidian.ssh.service.impl;

import java.util.ArrayList;
import java.util.List;

import com.jidian.ssh.dao.EmpDao;
import com.jidian.ssh.dao.OrdersDao;
import com.jidian.ssh.dao.PartDao;
import com.jidian.ssh.dao.ProductDao;
import com.jidian.ssh.dao.ReportDao;
import com.jidian.ssh.dao.SortDao;
import com.jidian.ssh.entity.Emp;
import com.jidian.ssh.entity.Orders;
import com.jidian.ssh.entity.Ordersmx;
import com.jidian.ssh.entity.Product;
import com.jidian.ssh.entity.ZztUtil;
import com.jidian.ssh.service.ReportService;


public class ReportServiceImpl implements ReportService{
	
	private ReportDao reportDao;
	private EmpDao empDao;
	private OrdersDao ordersDao;
	private PartDao partDao;
	private ProductDao productDao;
	private SortDao sortDao;

	public EmpDao getEmpDao() {
		return empDao;
	}

	public void setEmpDao(EmpDao empDao) {
		this.empDao = empDao;
	}

	public OrdersDao getOrdersDao() {
		return ordersDao;
	}

	public void setOrdersDao(OrdersDao ordersDao) {
		this.ordersDao = ordersDao;
	}

	public PartDao getPartDao() {
		return partDao;
	}

	public void setPartDao(PartDao partDao) {
		this.partDao = partDao;
	}

	public ProductDao getProductDao() {
		return productDao;
	}

	public void setProductDao(ProductDao productDao) {
		this.productDao = productDao;
	}

	public SortDao getSortDao() {
		return sortDao;
	}

	public void setSortDao(SortDao sortDao) {
		this.sortDao = sortDao;
	}

	public ReportDao getReportDao() {
		return reportDao;
	}

	public void setReportDao(ReportDao reportDao) {
		this.reportDao = reportDao;
	}

	
	//得到全部部门
	@Override
	public List allPart() {
		// TODO Auto-generated method stub
		return reportDao.allPart();
	}

	// 计算一个部门的总业绩
	@Override
	public double oneAllCount(Integer pid) {
		System.out.println("计算一个部门的总业绩");
		double zong = 0;
		double OneXD = 0;
		List empList = new ArrayList();

		empList=this.reportDao.FindEmpByPid(pid);

		for (int i = 0; i < empList.size(); i++) {
			// 获取员工id（根据员工查订单）
			Emp emp = (Emp) empList.get(i);
			List OrderList =this.reportDao.OneEmpOrder(emp.getE_id());
			for (int j = 0; j < OrderList.size(); j++) {
				// 获取订单的id（根据订单查询详单）
				Orders orders = (Orders) OrderList.get(j);
				List ar =reportDao.showOrdersmx(orders.getR_id());
				for (int p = 0; p < ar.size(); p++) {
					Ordersmx o = (Ordersmx) ar.get(p);
					//o.getOrders().getEmp().setPart(null);
					//o.getProduct().setSort(null);
				}

				// 根据详单编号获取每个详单的小计
				System.out.println(" 根据详单编号获取每个详单的小计");
				for (int k = 0; k < ar.size(); k++) {
					Ordersmx ordersmx = (Ordersmx) ar.get(k);
					double r = Double.parseDouble(this.reportDao.OneOrdersmxCount(ordersmx.getX_id()).get(0).toString());
					OneXD += r;
					System.out.println("double:"+r);
				}
				zong += OneXD;
				System.out.println("zong:"+zong);
				OneXD = 0;
			}
		}
		return zong;
	}

	// 饼状图集合
	@Override
	public Object[][] bztAll(int[] a) {
		Object[][] object = new Object[a.length][2];
		for (int i = 0; i < a.length; i++) {

			object[i][0] = onePartName(a[i]);
			System.out.println(object[i][0]);
			object[i][1] = oneAllCount(a[i]);
			System.out.println(object[i][1]);
		}
		return object;
	}

	// 根据编号查询单个部门
	@Override
	public String onePartName(int pid) {
		return reportDao.onePartName(pid);
	}
	
	// 生成柱状图
		public List zxtAll(Integer sid) {

			List zxt = new ArrayList();
			if(sid==-10){
				
				List arr = new ArrayList();
				List id = AllTproductId();
				System.out.println("id:"+id);
				List s = AllTproductName();
				System.out.println("s:"+id);
				// List count=oneSortCount(sid);
				for (int i = 0; i < 1; i++) {

					arr.add(new ZztUtil("产品销量", allTproductCount(id)
							 ));
				}
				zxt.add(s);
				zxt.add(arr);
				
			}else{
				
				List arr = new ArrayList();
				List name = oneTSort(sid);
				List s = getAllProBySid(sid);
				// List count=oneSortCount(sid);
				for (int i = 0; i < name.size(); i++) {

					arr.add(new ZztUtil(name.get(i).toString(), oneSortCount(name.get(i).toString())));
				}
				zxt.add(s);
				zxt.add(arr);
				
			}
			

			return zxt;
		}
		
		//查询所有产品的id
		public List AllTproductId()
		{
			System.out.println("查询所有产品的id");
			List NameList = new ArrayList();
			List ar=this.productDao.findAll();
			
//			for (int i = 0; i < ar.size(); i++) {
//				
//				TProduct product=(TProduct) ar.get(i);
//				int a =product.getPId();
//				NameList.add(a);
//			}
			return ar;
		}
		
		//查询所有产品的名称
		public List AllTproductName()
		{
			System.out.println("查询所有产品的名称");
			List NameList = new ArrayList();
			List ar=this.productDao.findAll();
			
			for (int i = 0; i < ar.size(); i++) {
				
				Product product=(Product) ar.get(i);
				String a =product.getP_name();
				a=a+"-"+product.getP_area();
				NameList.add(a);
			}
			return NameList;
		}

		// 查询一个类别
		public List oneTSort(int sid) {
			System.out.println("查询一个类别");

			List NameList = new ArrayList();

			if (sid == -10) {
				List ar = this.productDao.FindSort();
				for (int i = 0; i < ar.size(); i++) {

					String a = this.productDao.FindSort().get(i).getS_name();
					NameList.add(a);
				}

			} else {

				String a = this.sortDao.FindSortById(sid).getS_name();
				NameList.add(a);
			}

			return NameList;
		}
		
		// 全查询商品的名称根据类别的ID
		public List getAllProBySid(int sid) {
			List NameList = new ArrayList();

			if (false) {
				NameList = null;

			} else {
				List ar = this.productDao.FindProductBySid(sid);

				for (int i = 0; i < ar.size(); i++) {
					Product product = (Product) ar.get(i);
					String a = product.getP_name();
					a=a+"-"+product.getP_area();
					NameList.add(a);
				}
			}

			return NameList;
		}
		
		// //计算商品全查询小计
		public List allTproductCount(List id) {
			double zong = 0;
			double OneXD = 0;
			List arr = new ArrayList();
			  List tproductAll= this.productDao.findAll();

			  for (int i = 0; i < id.size(); i++) {
				
				  Product product =(Product) id.get(i);
				// 根据产品编号查询所有订单明细
				List ar = this.ordersDao.OneProductOrderMx(product.getP_id());
				// 根据详单编号获取小计

				for (int k = 0; k < ar.size(); k++) {
					Ordersmx ordersmx = (Ordersmx) ar.get(k);
					double r = Double.parseDouble(this.ordersDao.OneOrdersmxCount(ordersmx.getX_id()).get(0).toString());
					OneXD += r;
				}
				zong = OneXD;
				OneXD = 0;
				arr.add(zong);
			  }
			return arr;

		}
		
		// //计算一个类别里商品业绩集合
		public List oneSortCount(String name) {
			double zong = 0;
			double OneXD = 0;
			List arr = new ArrayList();
			// 根据产品种类获取所有产品
			List ProdutList = this.productDao.findProductBySname(name);
			for (int i = 0; i < ProdutList.size(); i++) {

				Product product = (Product) ProdutList.get(i);
				// 根据产品编号查询所有订单明细
				List ar = this.ordersDao.OneProductOrderMx(product.getP_id());
				// 根据详单编号获取小计

				for (int k = 0; k < ar.size(); k++) {
					Ordersmx ordersmx = (Ordersmx) ar.get(k);
					double r = Double.parseDouble(this.ordersDao
							.OneOrdersmxCount(ordersmx.getX_id()).get(0).toString());
					OneXD += r;
				}
				zong = OneXD;
				OneXD = 0;
				arr.add(zong);
			}
			return arr;

		}
		
		// 生成折线图
		public List reportAll(Integer pid, Integer eid) {
			List zxt = null;
			if(eid==-10&&pid==-10)
			{
				zxt = new ArrayList();
				List arr = new ArrayList();
				List name = allNameEmp();
				System.out.println("name:"+name);
				List s = yearAll();
				for (int i = 0; i < name.size(); i++) {
					Emp e=(Emp) name.get(i);
					arr.add(new ZztUtil(e.getE_truename(), breaks(pid, e.getE_id())));
				}
				zxt.add(s);
				zxt.add(arr);
				
				
			}else if (eid != -10) {
				zxt = new ArrayList();
				List arr = new ArrayList();
				String name = nameEmp(eid);
				List s = yearAll();
				// List count=oneSortCount(sid);
				for (int i = 0; i < 1; i++) {

					arr.add(new ZztUtil(name, breaks(pid, eid)));
				}
				zxt.add(s);
				zxt.add(arr);
			} else {
				zxt = new ArrayList();
				List arr = new ArrayList();
				List name = nameAllEmp(pid);
				List s = yearAll();
				List id = idAllEmp(pid);
				// List count=oneSortCount(sid);
				for (int i = 0; i < name.size(); i++) {
					Emp e=(Emp) name.get(i);
					arr.add(new ZztUtil(e.getE_truename(), breaks(pid, e.getE_id())));
				}
				zxt.add(s);
				zxt.add(arr);
			}
			return zxt;
		}
		
		// 查询所有员工的名字
		public List allNameEmp() {
			List ar = this.empDao.allNameEmp();
			return ar;
		}
		
		public List allIdEmp() {
			List arr = this.empDao.allNameEmp();
			List ars = new ArrayList();
			for (int i = 0; i < arr.size(); i++) {

				Emp emp = (Emp) arr.get(i);
				Integer b = emp.getE_id();
				ars.add(b);
			}
			return ars;
		}
		
		// 月份
		public List yearAll() {
			List ar = new ArrayList();
			for (int i = 1; i <= 12; i++) {

				String a = i + "月份";
				ar.add(a);
			}

			return ar;
		}
		
		// 回去该员工的名字
		public String nameEmp(Integer eid) {
			String empName = this.empDao.FindEmpById(eid).getE_truename();
			return empName;
		}
		
		// 部门下所有员工的名字
		public List nameAllEmp(Integer pid) {
			List ar = this.empDao.FindEmpByPid(pid);
//			List ss = new ArrayList();
//			for (int i = 0; i < ar.size(); i++) {
	//
//				TEmp emp = (TEmp) ar.get(i);
//				String a = emp.getETruename();
//				ss.add(a);
	//
//			}

			return ar;
		}
		
		public List idAllEmp(Integer pid) {
			List arr = this.empDao.FindEmpByPid(pid);
			List ars = new ArrayList();
			for (int i = 0; i < arr.size(); i++) {

				Emp emp = (Emp) arr.get(i);
				Integer b = emp.getE_id();
				ars.add(b);
			}
			return ars;
		}
		
		public List breaks(Integer pid, Integer eid) {
			System.out.println("breaks");
			double zong = 0;
			double OneXD = 0;
			List arr = null;
			
			if(pid==-10)
			{
				arr = new ArrayList();
				// 根据id查询一个员工的信息
				Emp emp = this.empDao.FindEmpById(eid);
				// 根据员工的id和月份查询本月的订单
				for (int i = 1; i <= 12; i++) {

					List orderList = this.ordersDao
							.OneEmpTimeOrder(emp.getE_id(), i);
					if(orderList.size()==0){
						arr.add(0);
					}else{
						for (int j = 0; j < orderList.size(); j++) {
							// 获取订单的id（根据订单查询详单）
							Orders orders = (Orders) orderList.get(j);
							List ar =ordersDao.showOrdersmx(orders.getR_id());
							for (int p = 0; p < ar.size(); p++) {
								Ordersmx o = (Ordersmx) ar.get(p);
								//o.getOrders().getEmp().setPart(null);
								//o.getProduct().setSort(null);
							}
		
							// 根据详单编号获取每个详单的小计
							for (int k = 0; k < ar.size(); k++) {
								Ordersmx ordersmx = (Ordersmx) ar.get(k);
								double r = Double.parseDouble(this.ordersDao
										.OneOrdersmxCount(ordersmx.getX_id()).get(0)
										.toString());
		
								OneXD += r;
							}
							zong += OneXD;
							OneXD = 0;
							eid = 0;
						}
						arr.add(zong);
						zong=0;
					}				
				}			
			}else if (eid != -10 && eid != null) {
				arr = new ArrayList();
				// 根据id查询一个员工的信息
				Emp emp = this.empDao.FindEmpById(eid);
				// 根据员工的id和月份查询本月的订单
				for (int i = 1; i <= 12; i++) {

					List orderList = this.ordersDao
							.OneEmpTimeOrder(emp.getE_id(), i);
					if(orderList.size()==0){
						arr.add(0);
					}else{				
						for (int j = 0; j < orderList.size(); j++) {
							// 获取订单的id（根据订单查询详单）
							Orders orders = (Orders) orderList.get(j);
							List ar = ordersDao.showOrdersmx(orders.getR_id());
							for (int p = 0; p < ar.size(); p++) {
								Ordersmx o = (Ordersmx) ar.get(p);
								//o.getOrders().getEmp().setPart(null);
								//o.getProduct().setSort(null);
							}
		
							// 根据详单编号获取每个详单的小计
							for (int k = 0; k < ar.size(); k++) {
								Ordersmx ordersmx = (Ordersmx) ar.get(k);
								double r = Double.parseDouble(this.ordersDao
										.OneOrdersmxCount(ordersmx.getX_id()).get(0)
										.toString());
		
								OneXD += r;
							}
							zong += OneXD;
							OneXD = 0;
							eid = 0;
							
						}
						arr.add(zong);
						zong=0;
					}
				}
			} else {
				arr = new ArrayList();
				// 获取部门下所有的员工
				List empList = this.empDao.FindEmpByPid(pid);

				for (int t = 0; t < empList.size(); t++) {

					Emp emp = (Emp) empList.get(t);
					// 根据员工的id和月份查询本月的订单
					for (int i = 1; i <= 12; i++) {

						List orderList = this.ordersDao.OneEmpTimeOrder(emp
								.getE_id(), i);
						if(orderList.size()==0){
							arr.add(0);
						}else{
							for (int j = 0; j < orderList.size(); j++) {
								// 获取订单的id（根据订单查询详单）
								Orders orders = (Orders) orderList.get(j);
								List ar = ordersDao.showOrdersmx(orders.getR_id());
								for (int p = 0; p < ar.size(); p++) {
									Ordersmx o = (Ordersmx) ar.get(p);
									//o.getOrders().getEmp().setPart(null);
									//o.getProduct().setSort(null);
								}
		
								// 根据详单编号获取每个详单的小计
								for (int k = 0; k < ar.size(); k++) {
									Ordersmx ordersmx = (Ordersmx) ar.get(k);
									double r = Double.parseDouble(this.ordersDao
											.OneOrdersmxCount(ordersmx.getX_id()).get(0)
											.toString());
		
									OneXD += r;
								}
								zong += OneXD;
								OneXD = 0;
								eid = 0;
							}
							arr.add(zong);
							zong=0;
						}					
					}				
				}

			}
			return arr;

		}
}
