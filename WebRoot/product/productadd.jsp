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
			src="${pageContext.request.contextPath }/js/product/productadd.js">
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
			<s:hidden name="tPart.PId" id="PID"></s:hidden>
			<ul class="forminfo1">
				<li>
					<label>
						产品名称：
					</label>
					<input name="PName" type="text" id="PName" class="dfinput1 newdefault"  placeholder="请输入产品名称" />
				</li>
				<li>
					<label>
						产品产地：
					</label>
					<input name="PArea" type="text" id="PArea" class="dfinput1 newdefault"  placeholder="请输入产品产地" />
				</li>
				<li>
					<label>
						产品规格：
					</label>
					<SELECT class="selectinput1" id="guige">
						<option value="包">
							包
						</option>
						<option value="袋">
							袋
						</option>
						<option value="件">
							件
						</option>
						<option value="张">
							张
						</option>
						<option value="个">
							个
						</option>
						<option value="Ml">
							Ml
						</option>
						<option value="Kg">
							Kg
						</option>
						<option value="M">
							M
						</option>
					</SELECT>
				</li>
				<li>
					<label>
						产品类别：
					</label>
					<SELECT class="selectinput1" id="psort">
					</SELECT>
				</li>
				<li>
					<label>
						&nbsp;
					</label>
					<input type="submit" class="btn" value="增加商品"
						style="margin-left: 0px;" />
				</li>
			</ul>
		</div>
		<input type="hidden" id="botao">
	</body>

</html>
