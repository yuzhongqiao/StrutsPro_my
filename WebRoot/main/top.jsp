<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<script type="text/javascript"
			src="${pageContext.request.contextPath }/js/jquery.js">
</script>
		<link rel="stylesheet"
			href="${pageContext.request.contextPath }/css/style.css"
			type="text/css"></link>
		<script type="text/javascript">
$(function() {
	//顶部导航切换
	$(".nav li a").click(function() {
		$(".nav li a.selected").removeClass("selected")
		$(this).addClass("selected");
	})
})
</script>


	</head>
	<body
		style="background: url(${pageContext.request.contextPath }/images/topbg.gif) repeat-x;">

		<div class="topleft">
			<a href="index.jsp" target="rightFrame"><img
					src="${pageContext.request.contextPath }/images/logo.png"
					title="系统首页" /> </a>
		</div>

		<ul class="nav">
			<li>
				<a href="${pageContext.request.contextPath}/MyJsp.jsp" target="rightFrame" class="selected"><img
						src="${pageContext.request.contextPath }/images/icon01.png"
						title="工作台" /> <span> 工作台 </span> </a>
			</li>
			<li>
				<a href="index.jsp" target="rightFrame"><img
						src="${pageContext.request.contextPath }/images/icon02.png"
						title="模型管理" /> <span> 模型管理 </span> </a>
			</li>
			<li>
				<a href="index.jsp" target="rightFrame"><img
						src="${pageContext.request.contextPath }/images/icon03.png"
						title="模块设计" /> <span> 模块设计 </span> </a>
			</li>
			<li>
				<a href="index.jsp" target="rightFrame"><img
						src="${pageContext.request.contextPath }/images/icon04.png"
						title="常用工具" /> <span> 常用工具 </span> </a>
			</li>
			<li>
				<a href="index.jsp" target="rightFrame"><img
						src="${pageContext.request.contextPath }/images/icon05.png"
						title="文件管理" /> <span> 文件管理 </span> </a>
			</li>
			<li>
				<a href="index.jsp" target="rightFrame"><img
						src="${pageContext.request.contextPath }/images/icon06.png"
						title="系统设置" /> <span> 系统设置 </span> </a>
			</li>
		</ul>

		<div class="topright">
			<ul>
				<li>
					<span><img
							src="${pageContext.request.contextPath }/images/help.png"
							title="帮助" class="helpimg" /> </span><a href="#">帮助</a>
				</li>
				<li>
					<a href="#">关于</a>
				</li>
				<li>
					<a href="${pageContext.request.contextPath }/login_exit.action"
						target="_parent">退出</a>
				</li>
			</ul>

			<div class="user">
				<span>${loginUser.e_truename}</span>
				<i>消息</i>
				<b>0</b>
			</div>

		</div>

	</body>
</html>