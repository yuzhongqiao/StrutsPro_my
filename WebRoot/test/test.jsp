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
		<tr><td><input class="a" value=""></td><td class="se">product_addTiao.action</td></tr>
		<tr><td><input class="a" value="sid=3"></td><td class="se">product_getNameBySid.action</td></tr>
		<tr><td><input class="a" value="sid=3&pname=工业酒精"></td><td class="se">product_getArea.action</td></tr>
		<tr><td><input class="a" value="sid=3&pname=工业酒精&parea=武汉"></td><td class="se">product_manyTermForIn.action</td></tr>
		<tr><td><input class="a" value="pid=2"></td><td class="se">product_oneTProduct.action</td></tr>
		<tr><td><input class="a" value=""></td><td class="se">emp_ajaxGetPart.action</td></tr>
		<tr><td><input class="a" value="pid=4"></td><td class="se">emp_ajaxGetEmp.action</td></tr>
		<tr><td>
		<textarea class="a" rows="3" cols="50" id="wandata">inproduct.TProduct.PId=2&inproduct.TEmp.EId=5&inproduct.DNumber=100&inproduct.DRemark=这是备注</textarea>
		</td><td class="se">inproduct_addInProduct.action</td></tr>
		<tr><td><input class="a" value="pid=2"></td><td class="se">inproduct_getInProduct.action</td></tr>
		<tr><td><input class="a" value="pid=2"></td><td class="se">inproduct_getStockNum.action</td></tr>
		<tr><td><input class="a" value=""></td><td class="se">emp_getEmpCount.action</td></tr>
		<tr><td rowspan="2"><textarea rows="5" cols="50" id="wandata">万能方法  填写data</textarea></td>
		<td height="40"><input style="height: 40px;" id="wanurl"/></td></tr>
		<tr><td style="text-align: center;"><button id="wan">确定</button></td></tr>
		
	</table>
	<div id="div">
	</div>
	</body>
</html>