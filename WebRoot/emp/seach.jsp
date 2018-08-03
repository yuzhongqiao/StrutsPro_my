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
		<script type="text/javascript" src="${pageContext.request.contextPath }/js/emp/empseach.js"></script>
		<SCRIPT type="text/javascript"> var $webName="${pageContext.request.contextPath}"; </SCRIPT>
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
</STYLE>
	</head>

	<body>
		<!-- 位置信息 -->
		<div class="place">
			<span>位置：</span>
			<ul class="placeul">
				<li><a href="${pageContext.request.contextPath }/main/index.jsp">首页</a></li>
				<li><a href="${pageContext.request.contextPath }/emp/all.jsp">员工管理</a></li>
				<li><a href="#">查询员工</a></li>
			</ul>
		</div>
		<div class="rightinfo"><div id="usual1" class="usual"><div id="tab2" class="tabson">
			<!-- 搜索项位置 -->
			<ul class="seachform">
				<li>
					<label>员工姓名：</label>
					<s:textfield name="e_truename" cssClass="scinput" id="uname"></s:textfield>
					<div id="seachDiv"></div>
				</li>
				<li>
					<label>性别：</label>
					<s:select list="#{'-10':'-- 请选择 --','男':'男','女':'女'}" cssClass="scselect" name="e_sex" id="scsex"></s:select>
				</li>
				<li>
					<label>部门：</label>
					<SELECT class="scselect" id="scpart"></SELECT>
				</li>
				<li>
					<label>&nbsp;</label>
					<button class="scbtn" id="scbtn"><i class="fa fa-search"></i> 查询</button>
				</li>
			</ul>
			<!-- 中部内容表格 -->
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
					<th width="6%">状态</th>
				</tr></thead>
				<tbody id="empTbody"></tbody>
			</table>
			<!-- 分页位置 -->
			<div class="pagin"><div class="message"></div></div>
		</div></div></div>
	</body>
</html>