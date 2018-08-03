<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>无标题文档</title>
		<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/css/style.css"></link>
		<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/css/font-awesome.min.css"></link>
		<script type="text/javascript" src="${pageContext.request.contextPath }/js/jquery.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/layer/layer.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/part/partdel.js"></script>
		<SCRIPT type="text/javascript">
			var $userLevel=parseInt("${loginUser.e_admin}");//获取登陆者的权限等级
			var $webName="${pageContext.request.contextPath}";
		</SCRIPT>
	</head>
	<body>
		<div class="place">
			<!-- 位置信息 -->
			<span>位置：</span>
			<ul class="placeul">
				<li>
					<a href="${pageContext.request.contextPath }/main/index.jsp">首页</a>
				</li>
				<li>
					<a href="${pageContext.request.contextPath }/part/all.jsp">部门管理</a>
				</li>
				<li>
					<a href="${pageContext.request.contextPath }/part/delall.jsp">恢复部门</a>
				</li>
			</ul>
		</div>
		<!-- 表格主体部门 -->
		<div class="rightinfo">
			<table class="tablelist">
				<thead><tr>
					<th width="10%">编号<i class="sort"><img src="${pageContext.request.contextPath }/images/px.gif" /> </i></th>
					<th width="25%">部门名称</th>
					<th width="35%">部门备注</th>
					<th width="15%">操作</th>
				</tr></thead>
				<tbody id="partTbody"></tbody>
			</table>
			<!-- 分页信息 -->
			<div class="pagin">
				<div class="message"></div>
			</div>
		</div>
	</body>
</html>
