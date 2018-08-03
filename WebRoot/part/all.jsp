<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>无标题文档</title>
		<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/css/style.css"></link>
		<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/css/font-awesome.min.css"></link>
		<script src="${pageContext.request.contextPath }/js/jquery.js"></script>
		<script src="${pageContext.request.contextPath}/layer/layer.js"></script>
		<script src="${pageContext.request.contextPath}/js/part/part.js"></script>
		
		
		<SCRIPT type="text/javascript">
		//////////////权限控制！！！//////////////
		var $userLevel=parseInt("${loginUser.e_admin}");//获取登陆者的权限等级
		var $webName="${pageContext.request.contextPath}";
		$userLevel=-1;
		$(function(){
			var tools=$(".tools");
			if($userLevel!=-1){
				//tools.hide();
			}
		});
		
		
</SCRIPT>
	</head>
	<body>
		<!-- 位置信息 -->
		<div class="place">
			<span>位置：</span>
			<ul class="placeul">
				<li><a href="${pageContext.request.contextPath }/main/index.jsp">首页</a></li>
				<li><a href="${pageContext.request.contextPath }/part/all.jsp">部门管理</a></li>
				<li><a href="${pageContext.request.contextPath }/part/all.jsp">基本内容</a></li>
			</ul>
		</div>
		<!-- 内容表格信息 -->
		<div class="rightinfo">
			<div class="tools">
				<ul class="toolbar">
					<li class="addPart">
						<span><img src="${pageContext.request.contextPath }/images/t01.png" /> </span>添加
					</li>
				</ul>
			</div>
			<table class="tablelist">
				<thead><tr>
					<th width="10%">编号<i class="sort"><img src="${pageContext.request.contextPath }/images/px.gif" /> </i></th>
					<th width="25%">部门名称</th>
					<th width="35%">部门备注</th>
					<th width="15%">修改</th>
					<th width="15%">撤销部门</th>
				</tr></thead>
				<tbody id="partTbody"></tbody>
			</table>
			<%-- 分页位置 --%>
			<div class="pagin">
				<div class="message"></div>
			</div>
		</div>
	</body>
</html>
