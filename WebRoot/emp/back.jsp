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
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/emp/empback.js"></script>
	</head>
	<body>
		<div class="formbody" style="width: 250px;">
			<s:hidden name="emp.e_id" id="EID"></s:hidden>
			<ul class="forminfo1">
				<li>
					<label>员工姓名：</label>
					<s:textfield name="emp.e_truename" cssClass="dfinput1" id="ETruename" disabled="disabled"></s:textfield>
				</li>
				<li>
					<label>重新分配到：</label>
					<div class="vocation">
						<s:select list="tpartList" listKey="p_id" listValue="p_name" name="emp.part.p_id" cssClass="selectinput1" id="pid" ></s:select>
					</div>
				</li>

				<li>
					<label>&nbsp;</label>
					<input type="submit" class="btn" value="确定复职" style="margin-left: -30px; margin-top: 10px;" />
				</li>
			</ul>
		</div>
		<input type="hidden" id="botao">
	</body>
</html>
