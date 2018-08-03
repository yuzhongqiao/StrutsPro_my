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

		<tr><td colspan="2" class="b">获取所有部门  二级联动下拉框使用</td></tr>
		<tr><td><input class="a" value=""></td><td class="se">emp_ajaxGetPart.action</td></tr>
		<tr><td colspan="2"  class="b">获取部门 下所有员工  二级联动下拉框使用</td></tr>
		<tr><td><input class="a" value="pid=4"></td><td class="se">emp_ajaxGetEmp.action</td></tr>
		<tr><td colspan="2" class="b">获取所有部门   包含分页数据</td></tr>
		<tr><td><input class="a" value="current=1"></td><td class="se">part_allTpartByPages.action</td></tr>
		<tr><td colspan="2" class="b">获取部门 下所有员工  包含分页数据</td></tr>
		<tr><td><input class="a" value="pid=4&current=1"></td><td class="se">emp_allTEmpByPages.action</td></tr>
		<tr><td colspan="2" class="b">新增客户信息</td></tr>
		<tr><td>
		<textarea class="a" rows="3" cols="50" id="wandata">client.TEmp.EId=5&client.CName=张三&client.CTel=10086&client.CAddress=河南郑州</textarea>
		</td><td class="se">client_addClient.action</td></tr>
		
		<tr><td colspan="2" class="b">获取客户信息 根据员工编号</td></tr>
		<tr><td><input class="a" value="eid=5&current=1"></td><td class="se">client_getClientByEid.action</td></tr>
		<tr><td colspan="2" class="b">获取单个客户信息</td></tr>
		<tr><td><input class="a" value="cid=1"></td><td class="se">client_oneClientByCid.action</td></tr>
		<tr><td colspan="2" class="b">修改客户信息</td></tr>
		<tr><td>
		<textarea class="a" rows="3" cols="50" id="wandata">client.CId=1&client.TEmp.EId=5&client.CName=李三&client.CTel=10086&client.CAddress=河南郑州1</textarea>
		</td><td class="se">client_uppClient.action</td></tr>
		<tr><td colspan="2" class="b">删除客户信息</td></tr>
		<tr><td><input class="a" value="cid=1"></td><td class="se">client_delClient.action</td></tr>
		<tr><td colspan="2" class="b">恢复客户信息</td></tr>
		<tr><td><input class="a" value="cid=1"></td><td class="se">client_backClient.action</td></tr>
		<tr><td colspan="2" class="b">获取删除的客户信息</td></tr>
		<tr><td><input class="a" value=""></td><td class="se">client_getDelCilent.action</td></tr>
		
		
		
		<tr><td rowspan="2"><textarea rows="5" cols="50" id="wandata">万能方法  填写data</textarea></td>
		<td height="40"><input style="height: 40px;" id="wanurl"/></td></tr>
		<tr><td style="text-align: center;"><button id="wan">确定</button></td></tr>
		
	</table>
	<div id="div">
	</div>
	</body>
</html>