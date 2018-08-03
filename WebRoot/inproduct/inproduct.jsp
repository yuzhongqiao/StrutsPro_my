<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
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
			src="${pageContext.request.contextPath}/js/inproduct/inproduct.js">
</script>
		<SCRIPT type="text/javascript"> 
		var $webName="${pageContext.request.contextPath}"; 
		var $userLevel=parseInt("${loginUser.e_admin}");//获取登陆者的权限等级
		var $userPart="${loginUser.part.p_name}"; //获取登陆者的部门名称
		</SCRIPT>
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
					<a
						href="${pageContext.request.contextPath }/inproduct/inproduct.jsp">库存管理</a>
				</li>
				<li>
					<a href="#">出入库管理</a>
				</li>
			</ul>
		</div>

		<div class="rightinfo">
			<div id="usual1" class="usual">
				<div id="tab2" class="tabson">
					<!-- 搜索项位置 -->
					<ul class="seachform">
						<li>
							<label>
								产品类别：
							</label>
							<SELECT class="scselect" id="sort"></SELECT>
						</li>
						<li>
							<label>
								产品名称：
							</label>
							<SELECT class="scselect" id="product"></SELECT>
						</li>
						<li>
							<label>
								产地：
							</label>
							<SELECT class="scselect" id="area"></SELECT>
						</li>
						<li>
							<label>
								&nbsp;
							</label>
							<button class="scbtn" id="scbtn">
								<i class="fa fa-search"></i> 查询
							</button>
						</li>
						<li id="chu">
							<label>
								&nbsp;
							</label>
							<button class="scbtn" id="outPro" style="width: 100px;">
								<i class="fa fa-search"></i> 出库详细
							</button>

						</li>
						<li id="scockSpan">
							<span class="shu"></span>
						</li>
					</ul>
					<!-- 中部内容表格 -->
					<table class="tablelist">
						<thead id="proTit">

						</thead>
						<tbody id="empTbody"></tbody>
					</table>
					<!-- 分页位置 -->
					<div class="pagin">
						<div class="message"></div>
					</div>
				</div>
			</div>
		</div>
	</body>

</html>
