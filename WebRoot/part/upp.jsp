<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>无标题文档</title>
		<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/css/style.css"></link>
		<script type="text/javascript" src="${pageContext.request.contextPath }/js/jquery.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/layer/layer.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath }/js/part/partupp.js"></script>
		<STYLE type="text/css">
.forminfo1 li {
	margin-bottom: 15px;
	clear: both;
}
</STYLE>
	</head>
	<body>
		<div class="formbody">
			<ul class="forminfo1">
				<li>
					<label>部门名称：</label>
					<s:textfield name="part.p_name" id="PName" cssClass="dfinput1"></s:textfield>
					<s:hidden id="oldpname"></s:hidden>
					<s:hidden name="p_id" id="pid"></s:hidden>
				</li>
				<li>
					<label>部门备注：</label>
					<s:textarea name="part.p_remark" cols="" rows="" cssClass="textinput2" id="PRemark"></s:textarea>
				</li>
				<li>
					<label>&nbsp;</label>
					<input type="submit" class="btn" value="修改部门" />
				</li>
			</ul>
		</div>
		<input type="hidden" id="botao">
	</body>
</html>
