<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<link rel="stylesheet"
			href="${pageContext.request.contextPath }/css/style.css"
			type="text/css"></link>
		<link rel="stylesheet"
			href="${pageContext.request.contextPath }/css/font-awesome.min.css"
			type="text/css"></link>
		<script type="text/javascript"
			src="${pageContext.request.contextPath }/js/jquery.js">
</script>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/layer/layer.js">
</script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/client/addClient.js">
</script>
		<script type="text/javascript">
var $webName = "${pageContext.request.contextPath}";
var $userLevel=parseInt("${loginUser.EAdmin}");//获取登陆者的权限等级
var $userPId=parseInt("${loginUser.TPart.PId}");//获取登陆者的权限部门编号
var $userID=parseInt("${loginUser.EId}");//获取登陆者的ID
</script>

		<STYLE type="text/css">
.tablelist th,.tablelist td {
	text-align: center;
}

#seachDiv {
	width: 150px;
	background-color: #FFF;
	position: absolute;
	z-index: 1;
	left: 88px;
	border: 1px solid #CCCCCC;
	text-indent: 10px;
	cursor: pointer;
	display: none;
}

#seachDiv span {
	line-height: 25px;
}

.addbg {
	background-color: #D4D4D4;
}

.shu {
	line-height: 35px;
	font-size: 14px;
	font-weight: bolder;
}

.inprospan {
	line-height: 32px;
	text-indent: 3px;
}

</STYLE>
	</head>
	<body>
		<div class="formbody" style="width: 450px;">
			<ul class="forminfo1">
				<li>
					<label>
						客户姓名:
					</label>
					<input type="text" class="dfinput1 newdefault" id="cname"
						placeholder="请输入客户姓名">
				</li>
				<li>
					<label>
						联系方式:
					</label>
					<input type="text" class="dfinput1 newdefault" id="ctel"
						placeholder="请输入客户联系方式">

				</li>
				<li>
					<label>
						客户地址:
					</label>
					<input type="text" class="dfinput1 newdefault" id="caddress"
						placeholder="请输入客户地址">

				</li>
				<li>
					<label>
						所属员工:
					</label>
					<select class="selectinput1" id="partName"></select>
					<select class="selectinput1" id="empName"></select>
				</li>
				<li>
					<label>
						&nbsp;
					</label>
					<input type="submit" class="btn" value="添加客户" style="margin-top: 10px;" />
				</li>
			</ul>
		</div>
	</body>
</html>
