<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>无标题文档</title>
		<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/css/style.css"></link>
		<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/css/font-awesome.min.css"></link>
		<script type="text/javascript" src="${pageContext.request.contextPath }/js/jquery.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath }/layer/layer.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath }/js/emp/empdel.js"></script>
		<SCRIPT type="text/javascript">
			var $userLevel=parseInt("${loginUser.e_admin}");//获取登陆者的权限等级
			var $userLevel=-1;
			var $webName="${pageContext.request.contextPath}";
		</SCRIPT>
	</head>
	<body>
		<!-- 位置信息 -->
		<div class="place">
			<span>位置：</span>
			<ul class="placeul">
				<li><a href="${pageContext.request.contextPath }/main/index.jsp">首页</a></li>
				<li><a href="${pageContext.request.contextPath }/emp/all.jsp">员工管理</a></li>
				<li><a href="${pageContext.request.contextPath }/emp/delall.jsp">恢复员工</a></li>
			</ul>
		</div>
		<!-- 内容表格 -->
		<div class="rightinfo">
			<table class="tablelist">
				<thead><tr>
					<th width="8%">员工编号<i class="sort"><img src="${pageContext.request.contextPath }/images/px.gif" /> </i></th>
					<th width="10%">所在部门</th>
					<th width="10%">登录名</th>
					<th width="10%">登录密码</th>
					<th width="7%">员工头像</th>
					<th width="7%">员工性别</th>
					<th width="8%">员工类别</th>
					<th width="8%">权限级别</th>
					<th width="10%">员工真实姓名</th>
					<th width="10%">员工备注</th>
					<th width="12%">操作</th>
				</tr></thead>
				<tbody id="empTbody"></tbody>
			</table>
			<!-- 分页位置 -->
			<div class="pagin"><div class="message"></div></div>
		</div>
	</body>
</html>
