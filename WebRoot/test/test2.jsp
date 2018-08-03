<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<link rel="stylesheet"
			href="${pageContext.request.contextPath }/css/style.css"
			type="text/css"></link>
		<script type="text/javascript"
			src="${pageContext.request.contextPath }/js/jquery.js">
</script>
<style type="text/css">
	td{border: 1px solid red;}
	.se{width: 40%;}
	td input{width: 100%;}
	#div{width: 58%;height: 100%;background-color: #f0f0f0;float: right;word-break:break-all;padding: 1%;}
	.b{text-align: center;}
</style>
		<script type="text/javascript">
$(function() {
	$(".se").click(function(){
		var str=$(this).text();
		var data=$(this).parent().find(".a").val();
		submit(str,data);
	});
	$(document).on("click","#wan",function(){
		var data=$("#wandata").val();
		var str=$("#wanurl").val();
		submit(str,data);
	});
});
function submit(str,data){
	$.ajax( {
		url : str,
		dataType : 'text',
		data : data,
		type : 'post',
		success : function(mydata) {
			$("div").empty().append(mydata);
		}
	});		
};
</script>

	</head>
	<body style="background: #f0f9fd;">
	
	
	<table  width="40%" style="float: left;" id="table">

		<tr><td colspan="2" class="b">获取所有部门  二级联动下拉框使用√</td></tr>
		<tr><td><input class="a" value=""></td><td class="se">emp_ajaxGetPart.action</td></tr>
		<tr><td colspan="2"  class="b">获取部门 下所有员工  二级联动下拉框使用√</td></tr>
		<tr><td><input class="a" value="pid=4"></td><td class="se">emp_ajaxGetEmp.action</td></tr>
		<tr><td colspan="2"  class="b">获取员工下所有客户  三级联动下拉框使用√</td></tr>
		<tr><td><input class="a" value="eid=5"></td><td class="se">client_ajaxClientByEid.action</td></tr>
		<tr><td colspan="2" class="b">>>>>多条件查询<<<<<</td></tr>
		<tr><td><input class="a" value="oid=-10&pid=-10&eid=-10&cid=-10&ris=-10&current=1"></td><td class="se">order_manyTerm.action</td></tr>
		<tr><td colspan="2" class="b">获取客户的   订单(0废弃1未完成2完成-10全部)√</td></tr>
		<tr><td><input class="a" value="cid=-10&ris=-10"></td><td class="se">order_getOrder.action</td></tr>
		<tr><td colspan="2" class="b">根据订单编号获取详细订单信息√</td></tr>
		<tr><td><input class="a" value="oid=1&current=1"></td><td class="se">ordermx_getOrderMx.action</td></tr>
		<tr><td colspan="2" class="b">>>添加订单        【  注意  】 返回值是新的订单id√</td></tr>
		<tr><td><input class="a" value="orders.TEmp.EId=2&orders.TClient.CId=6"></td><td class="se">order_addorder.action</td></tr>
		<tr><td colspan="2" class="b">四级联动之获取产品类别√</td></tr>
		<tr><td><input class="a" value=""></td><td class="se">product_addTiao.action</td></tr>
		<tr><td colspan="2" class="b">四级联动之获取产品名称√</td></tr>
		<tr><td><input class="a" value="sid=3"></td><td class="se">product_getNameBySid.action</td></tr>
		<tr><td colspan="2" class="b">四级联动之获取产品产地√</td></tr>
		<tr><td><input class="a" value="sid=3&pname=工业酒精"></td><td class="se">product_getArea.action</td></tr>
		<tr><td colspan="2" class="b">四级联动之获取产品年份√</td></tr>
		<tr><td><input class="a" value="pid=2"></td><td class="se">productyear_getProYear.action</td></tr>
		<tr><td colspan="2" class="b">新增商品之获取产品价格  根据产品年份id√</td></tr>
		<tr><td><input class="a" value="pid=2"></td><td class="se">productyear_getPriceByYid.action</td></tr>
		<tr><td colspan="2" class="b">新增商品之获取产品库存   根据产品di√</td></tr>
		<tr><td><input class="a" value="pid=2"></td><td class="se">inproduct_getStockNum.action</td></tr>
		
		<tr><td colspan="2" class="b">添加详单信息√</td></tr>
		<tr><td>
		<textarea class="a" rows="3" cols="50" id="wandata">ordersmx.TOrders.RId=3&ordersmx.TProductyear.YId=4&ordersmx.TProduct.PId=8&ordersmx.XCount=60&ordersmx.XPrice=300</textarea>
		</td><td class="se">ordermx_addOrdermx.action</td></tr>
		
		<tr><td colspan="2" class="b">根据商品id获得库存数量√</td></tr>
		<tr><td><input class="a" value="pid=2"></td><td class="se">inproduct_getStockNum.action</td></tr>
		<tr><td colspan="2" class="b">提交订单√</td></tr>
		<tr><td><input class="a" value="oid=2"></td><td class="se">order_saveOrder.action</td></tr>
		<tr><td colspan="2" class="b">废弃订单√</td></tr>
		<tr><td><input class="a" value="oid=2"></td><td class="se">order_delOrder.action</td></tr>
		
		
		<tr><td colspan="2" class="b">根据商品编号查询出库信息√</td></tr>
		<tr><td><input class="a" value="pid=2"></td><td class="se">outproduct_getOutProduct.action</td></tr>
		
		<tr><td colspan="2" class="b">根据部门id查询总业绩√</td></tr>
		<tr><td><input class="a" value="pid=3"></td><td class="se">report_oneAllCount.action</td></tr>
	
		
		
		<tr><td rowspan="2"><textarea rows="5" cols="50" id="wandata">万能方法  填写data</textarea></td>
		<td height="40"><input style="height: 40px;" id="wanurl"/></td></tr>
		<tr><td style="text-align: center;"><button id="wan">确定</button></td></tr>
		
	</table>
	<div id="div">
	</div>
	</body>
</html>