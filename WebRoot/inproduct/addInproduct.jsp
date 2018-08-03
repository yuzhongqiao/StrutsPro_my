<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/css/style.css"></link>
		<script type="text/javascript" src="${pageContext.request.contextPath }/js/jquery.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/layer/layer.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/inproduct/addInproduct.js"></script>
		<SCRIPT type="text/javascript"> var $webName="${pageContext.request.contextPath}"; </SCRIPT>
	<style type="text/css">
		.inprospan{
			line-height: 32px;
			text-indent: 3px;
		}
	</style>
	</head>
	

	<body>

		<div class="formbody" style="width: 450px;">
			<ul class="forminfo1">
				<li>
					<label>
						　产品名称：
					</label> 
					<SPAN class="inprospan"> ${product.p_name}</SPAN>
					<input type="hidden" value="${product.p_id}" id="PName">
				</li>
				<li>
					<label>
						　产品产地：
					</label>
					<SPAN  class="inprospan" id="PArea"> ${product.p_area}</SPAN>
				</li>
				<li>
					<label>
						入库申请人：
					</label>
					<select class="selectinput1" id="sortName"></select>
					<select class="selectinput1" id="productName"></select>
				</li>
				<li>
					<label>
						　入库数量：
					</label>
					<input type="text" class="dfinput1 newdefault" id="DNumber" placeholder="请输入库存数量">
				</li>
				<li>
					<label>
						入库经办人：
					</label>
					<SPAN  class="inprospan" id="ETruename">余忠巧</SPAN><!-- ${loginUser.ETruename} -->
				</li>

				<li>
					<label>
						　入库备注：
					</label>
					<textarea rows="" cols="" class="textinput2" id="ERemark" placeholder="请输入备注信息"></textarea>
				</li>
				<li>
					<label>
						&nbsp;
					</label>
					<input type="submit" class="btn" value="商品入库" />
				</li>
			</ul>
		</div>
	</body>
</html>
