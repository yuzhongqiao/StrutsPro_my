<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<link rel="stylesheet" type="text/css"
			href="${pageContext.request.contextPath }/css/style.css"></link>
		<link rel="stylesheet" type="text/css"
			href="${pageContext.request.contextPath }/css/font-awesome.min.css"></link>
		<script type="text/javascript"
			src="${pageContext.request.contextPath }/js/jquery.js">
</script>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/layer/layer.js">
</script>

		<script type="text/javascript"
			src="${pageContext.request.contextPath}/js/orders/orders.js">
</script>
		<script type="text/javascript">
var $webName = "${pageContext.request.contextPath}";
var $userLevel = parseInt("${loginUser.e_admin}");//获取登陆者的权限等级
var $userPId = parseInt("${loginUser.part.p_id}");//获取登陆者的权限部门编号
var $userID = parseInt("${loginUser.e_id}");//获取登陆者的ID
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

.scbtn {
	font-size: 12px;
	width: 120px;
}

.scselect {
	width: 100px;
}

.li {
	margin: 0px;
}

.seachbutton {
	height: 42px;
	padding-left: 10px;
}

.ding {
	font-weight: bolder;
	font-size: 16px;
}

.button {
	width: 100%;
	text-align: right;
}

.btn {
	margin-left: 10px;
}

#tjs {
	margin-left: 10px;
}
</STYLE>

	</head>

	<body>
		<div class="place">
			<span>位置：</span>
			<ul class="placeul">
				<li>
					<a href="${pageContext.request.contextPath }/main/index.jsp">首页</a>
				</li>
				<li>
					<a href="${pageContext.request.contextPath }/orders/orders.jsp">订单管理</a>
				</li>
				<li>
					<a href="#">订单管理</a>
				</li>
			</ul>
		</div>

		<div class="rightinfo">
			<div id="usual1" class="usual">
				<div id="tab2" class="tabson">
					<!-- 搜索项位置 -->
					<ul class="seachbutton">
						<li>
							<label class="ding">
							</label>
							<button class="scbtn" id="tjs">
								<i class="fa fa-search"></i>添加商品
							</button>
						</li>
					</ul>

					<ul class="seachform">

						<li class="partname">
							<label>
								部门名称：
							</label>
							<SELECT class="scselect" id="partName"></SELECT>
						</li>
						<li class="empname">
							<label>
								员工名称：
							</label>
							<SELECT class="scselect" id="empName"></SELECT>
						</li>
						<li>
							<label>
								客户姓名：
							</label>
							<SELECT class="scselect" id="clientName"></SELECT>
						</li>

						<li class="li">
							<button class="scbtn" id="cxw">
								<i class="fa fa-search"></i> 查询未完成订单
							</button>
						</li>
						<li class="li">
							<button class="scbtn" id="cxy">
								<i class="fa fa-search"></i> 查询已完成订单
							</button>
						</li>
						<li class="li">
							<button class="scbtn" id="cxf">
								<i class="fa fa-search"></i> 查询废弃订单
							</button>
						</li>
						<li class="li">
							<button class="scbtn" id="tjd">
								<i class="fa fa-search"></i> 添加订单
							</button>
						</li>
					</ul>

					<input type="hidden" class="yin">
					<!-- 中部内容表格 -->
					<table class="tablelist">
						<thead id="proTit">
						</thead>

						<tbody id="empTbody">
						</tbody>

					</table>

					<!-- 分页位置 -->
					<div class="pagin">

						<div class="message"></div>
					</div>
					<div class="button">
						<input type="button" class="btn" id="success" value="完成订单" />
						<input type="button" class="btn" id="discard" value="放弃订单" />
					</div>
				</div>
			</div>
		</div>
		<input type="hidden" id="libin" value="0">
	</body>

</html>
