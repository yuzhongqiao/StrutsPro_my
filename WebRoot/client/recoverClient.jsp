<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

	<head>
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
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/client/uppClient.js">
</script>
		<script type="text/javascript">
var $webName = "${pageContext.request.contextPath}";
</script>

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

.shu {
	line-height: 35px;
	font-size: 14px;
	font-weight: bolder;
}

.inprospan {
	line-height: 32px;
	text-indent: 3px;
}

.dfinput1 {
	height: 35px;
}
</STYLE>


	</head>
	<body>
		<div class="formbody" style="width: 450px;">
			<ul class="forminfo1">
				<li>
				<input type="hidden"  id="cid" value="${client.c_id}">
					<label>
						客户姓名:
					</label>
					<span>${client.c_name}</span>
					<input type="hidden" class="dfinput1 newdefault" id="cname" value="${client.c_name}"
						placeholder="请输入客户姓名">
				</li>
				<li>
					<input type="hidden" class="dfinput1 newdefault" id="ctel" value="${client.c_tel}"
						placeholder="请输入客户联系方式">

				</li>
				<li>
					<input type="hidden" class="dfinput1 newdefault" id="caddress" value="${client.c_address}"
						placeholder="请输入客户地址">

				</li>
				<li>
					<label>
						所属员工:
					</label>
					<select class="selectinput1" id="partName"></select>
					<select class="selectinput1" id="empName"></select>
				</li>
				<li>
					<label>
						&nbsp;
					</label>
					<input type="submit" class="btn" value="恢复客户" style="margin-top: 10px"/>
				</li>
			</ul>
		</div>
	</body>
</html>
