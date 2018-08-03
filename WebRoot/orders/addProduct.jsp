<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<link rel="stylesheet" type="text/css"
			href="${pageContext.request.contextPath }/css/style.css"></link>
		<script type="text/javascript"
			src="${pageContext.request.contextPath }/js/jquery.js">
</script>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/layer/layer.js">
</script>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/js/orders/addProduct.js">
</script>
		<SCRIPT type="text/javascript"> var $webName="${pageContext.request.contextPath}"; </SCRIPT>
		<style type="text/css">
.dfinput1 {
	width: 130px;
}
.btn{
	margin-top: 10px;
	margin-left: 80px;
}
</style>
	</head>

	<body>
		<div class="formbody" style="width: 370px;">
			<ul class="forminfo1">
				<li>
					<label>
						产品类别：
					</label>
					<SELECT class="selectinput1" id="productSort"></SELECT>
				</li>
				<li>
					<label>
						产品名称：
					</label>
					<SELECT class="selectinput1" id="productName"></SELECT>
				</li>
				<li>
					<label>
						产品产地：
					</label>
					<SELECT class="selectinput1" id="productArea"></SELECT>
				</li>
				<li>
					<label>
						产品年份：
					</label>
					<SELECT class="selectinput1" id="productYear"></SELECT>
				</li>


				<li>
					<label>
						进货价格：
					</label>
					<input type="text" class="dfinput1" id="jinPrice" value="0"
						disabled="disabled" style="width: 100px; font-weight: bolder;">
					/元

				</li>
				<li>
					<label>
						出货价格：
					</label>
					<input type="text" class="dfinput1 newdefault" id="chuPrice"
						 placeholder="请输入出货价格">
				</li>

				<li>
					<label>
						购买数量：
					</label>
					<input type="text" class="dfinput1 newdefault" id="count"
						placeholder="请输入购买数量">
				</li>

				<li>
					<input type="submit" class="btn" id="btn" value="添加订单" />
				</li>


			</ul>
			<input type="hidden" value="<%=request.getParameter("rid") %>"
				id="rid">
		</div>

	</body>
</html>
