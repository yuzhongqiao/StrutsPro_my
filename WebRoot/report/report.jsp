<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>

		<link rel="stylesheet"
			href="${pageContext.request.contextPath }/css/style.css"
			type="text/css"></link>

		<script type="text/javascript"
			src="${pageContext.request.contextPath}/js/jquery.js">
</script>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/js/highcharts.js">
</script>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/js/highcharts-3d.src.js">
</script>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/js/exporting.src.js">
</script>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/layer/layer.js">
</script>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/js/report/report.js">
</script>
		<SCRIPT type="text/javascript"> 
		var $webName="${pageContext.request.contextPath}"; 
		</SCRIPT>

	</head>
	<body>
		<div class="place">
			<span>位置：</span>
			<ul class="placeul">
				<li>
					<a href="${pageContext.request.contextPath }/main/index.jsp">首页</a>
				</li>
				<li>
					<a href="${pageContext.request.contextPath }/report/report.jsp">业绩报表</a>
				</li>
				<li>
					<a href="#">部门业绩统计</a>
				</li>
			</ul>
		</div>


		<div class="rightinfo">
			<div id="usual1" class="usual">
				<div id="tab2" class="tabson">
					<!-- 搜索项位置 -->

					<ul class="seachform">
						<li>
							<label>
								部门名称：
							</label>
							<SELECT class="scselect" id="partName"></SELECT>
						</li>
						<li>
							<label>
								部门名称：
							</label>
							<SELECT class="scselect" id="partName1"></SELECT>
						</li>
						<li>
							<label>
								部门名称：
							</label>
							<SELECT class="scselect" id="partName2"></SELECT>
						</li>

						<li class="li">
						 <input type="submit" class="scbtn" id="tjd" value="查询">
						
						</li>
					</ul>

				</div>
			</div>
		</div>

		<div id="container" style="min-width: 800px; height: 500px"></div>


	</body>
</html>
