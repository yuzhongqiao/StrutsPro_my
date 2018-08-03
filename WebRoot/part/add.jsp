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
		<script type="text/javascript" src="${pageContext.request.contextPath }/js/part/partadd.js"></script>
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
					<input name="p_name" type="text" id="PName" class="dfinput1 newdefault" placeholder="请输入部门名称" />
				</li>
				<li>
					<label>部门备注：</label>
					<textarea name="p_remark" cols="" rows="" class="textinput2" id="PRemark" placeholder="请输入部门备注"></textarea>
				</li>
				<li>
					<label>&nbsp;</label>
					<input type="submit" class="btn" value="新增部门" />
				</li>
			</ul>
		</div>
		<input type="hidden" id="botao">
	</body>
</html>
