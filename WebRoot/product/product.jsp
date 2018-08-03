<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>无标题文档</title>
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
			src="${pageContext.request.contextPath}/js/product/product.js">
</script>
	<SCRIPT type="text/javascript">
		//////////////权限控制！！！//////////////
		var $userLevel=parseInt("${loginUser.e_admin}");//获取登陆者的权限等级
		var $webName="${pageContext.request.contextPath}";
		$(function(){
			var tools=$(".tools");
			$userLevel=-1;
			if($userLevel!=-1){
				tools.hide();
			}
		});
</SCRIPT>

		<STYLE type="text/css">
.tablelist th,.tablelist td {
	text-align: center;
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
					<a href="${pageContext.request.contextPath }/product/product.jsp">产品管理</a>
				</li>
				<li>
					<a href="#">基本内容</a>
				</li>
			</ul>
		</div>

		<div class="rightinfo">
			<div class="tools">
				<ul class="toolbar">
					<li class="proall">
						<span><img
								src="${pageContext.request.contextPath }/images/t07.png" /> </span>产品管理
					</li>
					<li class="prodel">
						<span><img
								src="${pageContext.request.contextPath }/images/t03.png" /> </span>下架商品
					</li>
					<li class="proadd">
						<span><img
								src="${pageContext.request.contextPath }/images/t01.png" /> </span>增加商品
					</li>
				</ul>
			</div>
			<table class="tablelist">
				<thead id="proTit">					
				</thead>
				<tbody id="proTbody">
				</tbody>
			</table>
			<div class="pagin">
				<div class="message">
				</div>
			</div>
		</div>
		<script type="text/javascript">
			$('.tablelist tbody tr:odd').addClass('odd');
	</script>
	</body>
</html>
