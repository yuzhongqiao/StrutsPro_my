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
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/js/client/client.js">
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
					<a href="${pageContext.request.contextPath }/client/client.jsp">客户管理</a>
				</li>
				<li>
					<a href="#">客户管理</a>
				</li>
			</ul>
		</div>

		<div class="rightinfo">
			<div id="usual1" class="usual">
				<div id="tab2" class="tabson">
					<!-- 搜索下拉框 -->
					<ul class="seachform">
						<li class="partname">
							<label>
								部门名称：
							</label>
							<SELECT class="scselect" id="partName"></SELECT>
						</li>
						<li class="empname">
							<label>
								员工姓名：
							</label>
							<SELECT class="scselect" id="empName"></SELECT>
						</li>
						<li class="seachBtn">
							<label>
								&nbsp;
							</label>
							<button class="scbtn" id="scbtn">
								<i class="fa fa-search"></i> 查询
							</button>
						</li>
						<li>
							<label>
								&nbsp;
							</label>
							<button class="scbtn" id="addClient" style="width: 100px;">
								<i class="fa fa-user  fa-lg"></i> 添加客户
							</button>

						</li>
						<li>
							<label>
								&nbsp;
							</label>
							<button class="scbtn" id="delClient" style="width: 120px;">
								<i class="fa fa-retweet  fa-lg"></i> 已删除客户
							</button>
						</li>
					</ul>
					<!-- 中部内容表格 -->
					<table class="tablelist"> 
					
						<!-- 标头 -->
						<thead id="proTit"></thead>
						<!--拼接的内容 -->
						<tbody id="clientTbody"></tbody>
					</table>
					<!-- 分页 -->
					<div class="pagin">
						<div class="message"></div>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>
