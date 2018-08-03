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
			src="${pageContext.request.contextPath }/js/product/productSeach.js">
</script>
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
					<a href="#">产品查询</a>
				</li>
			</ul>
		</div>
		<div class="rightinfo">
			<div id="usual1" class="usual">
				<div id="tab2" class="tabson">
					<ul class="seachform">

						<li>
							<label>
								产品类别：
							</label>
							<SELECT class="scselect" id="sort"></SELECT>

						</li>
						<li>
							<label>
								商品名称：
							</label>
							<SELECT class="scselect" id="pro"></SELECT>
						</li>
						<li>
							<label>
								&nbsp;
							</label>
							<button class="scbtn" id="scbtn">
								<i class="fa fa-search"></i> 查询
							</button>
						</li>
					</ul>
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
			</div>
		</div>
	</body>
</html>