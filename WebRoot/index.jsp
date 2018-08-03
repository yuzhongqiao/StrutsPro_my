<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>江岸日用化工管理系统</title>
		<link href="${pageContext.request.contextPath}/css/style.css"
			rel="stylesheet" type="text/css" />
		<link href="${pageContext.request.contextPath}/css/sweet-alert.css"
			rel="stylesheet" type="text/css">
		<script src="${pageContext.request.contextPath}/js/jquery.js">
</script>
		<script src="${pageContext.request.contextPath}/js/cloud.js">
</script>
		<script src="${pageContext.request.contextPath}/layer/layer.js">
</script>
		<script src="${pageContext.request.contextPath}/js/sweet-alert.min.js">
</script>
		<script src="${pageContext.request.contextPath}/js/login.js">
</script>
	</head>
	<body
		style="background-color: #1c77ac; background-image: url(${pageContext.request.contextPath}/images/light.png); background-repeat: no-repeat; background-position: center top; overflow: hidden;">

		<div class="logintop">
			<span>欢迎登录后台管理界面平台</span>
			<ul>
				<li>
					<a href="index.jsp">回首页</a>
				</li>
				<li>
					<a href="#">帮助</a>
				</li>
				<li>
					<a href="#">关于</a>
				</li>
			</ul>
		</div>

		<div class="loginbody">

			<span class="systemlogo"></span>
			<div class="loginbox">
				<ul>
					<li>
						<input name="emp.e_loginname" type="text" class="loginuser"
							placeholder="请输入用户名" id="loginuser" />
					</li>
					<li>
						<input name="emp.e_psw" type="password" class="loginpwd" id="upsw"
							placeholder="请输入密码" />
					</li>
					<li>
						<input name="" type="submit" class="loginbtn" value="登录"
							onclick="check();" />
						<label>
							<input name="" type="checkbox" value="" checked="checked" />
							记住密码
						</label>
						<label>
							<a href="#">忘记密码？</a>
						</label>
					</li>
				</ul>
			</div>
		</div>
		<div class="loginbm">
			版权所有 2016
			<a href="${pageContext.request.contextPath}">江岸日用化工管理</a>
			仅供学习交流，勿用于任何商业用途
		</div>
	</body>
</html>
