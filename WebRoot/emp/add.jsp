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
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/emp/empadd.js"></script>
		<SCRIPT type="text/javascript"> var $webName="${pageContext.request.contextPath}"; </SCRIPT>
	</head>
	<body>
		<div class="formbody">
			<!-- 图片预览 -->
			<div id="preview">
			    <img id="imghead" border=0 src="${pageContext.request.contextPath}/upfile/default.jpg" width="104" height="104" />
			</div>
			<ul class="forminfo1">
				<li><label>真实姓名：</label>
					<s:textfield name="e_truename" cssClass="dfinput1" id="ETruename"></s:textfield>
				</li>
				<li>
					<label>登录名称：</label>
					<s:textfield name="e_loginname" cssClass="dfinput1" id="ELoginname"></s:textfield>
				</li>
				<li>
					<label>登录密码：</label>
					<input type="password" name="e_psw" class="dfinput1" id="EPsw">
				</li>
				<li>
					<label>所在部门：</label>
					<div class="vocation">
						<s:select list="tpartList" listKey="p_id" listValue="p_name" name="part.p_id" cssClass="selectinput" id="PId"></s:select>
					</div>
				</li>
				<li>
					<label>员工性别：</label>
					<cite>
						<input name="emp.ESex" type="radio" value="男" checked="checked"> 男&nbsp;&nbsp;&nbsp;&nbsp; 
						<input name="emp.ESex" type="radio" value="女" /> 女 
					</cite>
				</li>
				<li>
					<label>员工头像：</label>
					<input type="file" class="dfinput2" style="height: 30px;" name="photo" id="EImgimg" />
				</li>
				<li>
					<label>员工备注：</label>
					<textarea rows="" cols="" class="textinput2" name="e_remark" id="ERemark"></textarea>
				</li>
				<li>
					<label>员工类别：</label>
					<div class="vocation">
						<SELECT class="selectinput" id="EFlag" name="e_flag">
							<option value="0">普工</option>
							<option value="1">部门主管</option>
						</SELECT>
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
					<input type="submit" class="btn" value="新增员工" />
				</li>
			</ul>
		</div>
		<input type="hidden" id="botao">
	</body>
</html>
