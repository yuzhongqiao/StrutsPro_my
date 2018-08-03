<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>无标题文档</title>
		<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/css/style.css"></link>
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/layer/layer.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/ajaxfileupload.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/emp/empupp.js"></script>
		<SCRIPT type="text/javascript"> var $webName="${pageContext.request.contextPath}"; </SCRIPT>
	</head>

	<body>
		<div class="formbody">
			<!-- 图片预览 -->
			<div id="preview">
			    <img id="imghead" border=0 src="${pageContext.request.contextPath}/upfile/default.jpg" width="104" height="104" />
			</div>
			<s:hidden name="emp.e_id" id="EID"></s:hidden>
			<s:hidden name="e_sex" id="ESex"></s:hidden>
			<ul class="forminfo1">
				<li>
					<label>真实姓名：</label>
					<s:textfield name="emp.e_truename" cssClass="dfinput1" id="ETruename"></s:textfield>
				</li>
				<li>
					<label>登录名称：</label>
					<s:textfield name="emp.e_loginname" cssClass="dfinput1" id="ELoginname" disabled="true"></s:textfield>
					<s:hidden id="oldpname"></s:hidden>
				</li>
				<li>
					<label>登录密码：</label>
					<s:textfield name="emp.e_psw" class="dfinput1" id="EPsw"></s:textfield>
				</li>
				<li>
					<label>所在部门：</label>
					<div class="vocation">
						<s:select list="tpartList" listKey="p_id" listValue="p_name" name="emp.part.p_id" cssClass="selectinput" id="PId"></s:select>
					</div>
				</li>
				<li>
					<label>员工性别：</label>
					<cite>
						<input name="e_sex" type="radio" value="男" id="nan" /> 男&nbsp;&nbsp;&nbsp;&nbsp;
						<input name="e_sex" type="radio" value="女" id="nv" /> 女
					</cite>
				</li>
				<li>
					<label>员工头像：</label>
					<input type="file" class="dfinput2" style="height: 30px;" name="photo" id="EImgimg" />
					<s:hidden name="emp.e_img" id="oldImage"></s:hidden>
				</li>
				<li>
					<label>员工备注：</label>
					<s:textarea cssClass="textinput2" name="emp.e_remark" id="ERemark"></s:textarea>
				</li>
				<li>
					<label>员工类别：</label>
					<div class="vocation">
						<SELECT class="selectinput" id="EFlag" name="e_flag">
							<option value="0">普工</option>
							<option value="1">部门主管</option>
						</SELECT>
						<s:hidden name="e_flag" id="EFlagHD"></s:hidden>
					</div>
				</li>
				<li>
					<label>权限级别：</label>
					<div class="vocation">
						<SELECT class="selectinput" id="EAdmin" name="e_admin">
							<option value="0">普通操作者</option>
						</SELECT>
					</div>
				</li>
				<li>
					<label>&nbsp;</label>
					<input type="submit" class="btn" value="修改员工" />
				</li>
			</ul>
		</div>
		<input type="hidden" id="botao">
		<input type="hidden" id="botao1">
	</body>
</html>
