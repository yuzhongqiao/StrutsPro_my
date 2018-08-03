<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<link rel="stylesheet" type="text/css"
			href="${pageContext.request.contextPath }/css/style.css"></link>
		<script type="text/javascript"
			src="${pageContext.request.contextPath }/js/jquery.js">
</script>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/layer/layer.js">
</script>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/js/orders/addOrder.js">
</script>
		<script type="text/javascript">
var $webName = "${pageContext.request.contextPath}";
var $userLevel = parseInt("${loginUser.e_admin}");//获取登陆者的权限等级
var $userPId = parseInt("${loginUser.part.p_id}");//获取登陆者的权限部门编号
var $userID = parseInt("${loginUser.e_id}");//获取登陆者的ID
</script>
<style type="text/css">
.btn
{
margin-left: 50px;
margin-top: 10px;
}
</style>
	</head>

	<body>
		<div class="formbody" style="width: 330px;">
			<ul class="forminfo1">
				<li class="partname">
					<label>
						部门名称：
					</label>
					<SELECT class="selectinput1" id="partName"></SELECT>
				</li>
				<li class="empname">
					<label>
						员工名称：
					</label>
					<SELECT class="selectinput1" id="empName"></SELECT>
				</li>
				<li>
					<label>
						客户姓名：
					</label>
					<SELECT class="selectinput1" id="clientName"></SELECT>
				</li>
				<li>
				   <input type="submit" class="btn" value="添加订单"/>
				</li>
			</ul>
		</div>
	</body>
</html>
