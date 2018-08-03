<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>无标题文档</title>
		<link rel="stylesheet"
			href="${pageContext.request.contextPath }/css/style.css"
			type="text/css"></link>
		<script type="text/javascript"
			src="${pageContext.request.contextPath }/js/jquery.js">
</script>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/layer/layer.js">
</script>
		<script type="text/javascript"
			src="${pageContext.request.contextPath }/js/product/productyear.js">
</script>
		<STYLE type="text/css">
.forminfo1 li {
	margin-bottom: 15px;
	clear: both;
}

.formbody {
	padding-left: 50px;
	width: 400px;
}
</STYLE>
	</head>

	<body>
		<div class="formbody">
			<ul class="forminfo1">
				<li>
					<label>
						产品名称：
					</label>
					<input name="tPart.PName" type="text" id="PName" class="dfinput1 newdefault"
						disabled="disabled" />
					<input type="hidden" id="proid"
						value="<%=request.getParameter("proid")%>">
				</li>
				<li>
					<label>
						产品类别：
					</label>
					<input name="tPart.PName" type="text" id="PSort" class="dfinput1 newdefault"
						disabled="disabled" />
				</li>
				<li>
					<label>
						产品年份：
					</label>
					<SELECT class="selectinput1" id="year">
					</SELECT>
				</li>
				<li>
					<label>
						产品价格：
					</label>
					<input name="tPart.PName" type="text" id="price" class="dfinput1 newdefault"  placeholder="请输入产品价格" />
				</li>
				<li>
					<label>
						&nbsp;
					</label>
					<input type="submit" class="btn" value="确定更改"
						style="margin-left: 0px;" />
				</li>
			</ul>
		</div>
		<input type="hidden" id="botao">
	</body>

</html>
