<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<link rel="stylesheet"
			href="${pageContext.request.contextPath }/css/style.css"
			type="text/css"></link>
		<script type="text/javascript"
			src="${pageContext.request.contextPath }/js/jquery.js">
</script>
		<script type="text/javascript">
$(function() {
	//导航切换
	$(".menuson .header").click(
			function() {
				var $parent = $(this).parent();
				$(".menuson>li.active").not($parent).removeClass("active open")
						.find('.sub-menus').hide();

				$parent.addClass("active");
				if (!!$(this).next('.sub-menus').size()) {
					if ($parent.hasClass("open")) {
						$parent.removeClass("open").find('.sub-menus').hide();
					} else {
						$parent.addClass("open").find('.sub-menus').show();
					}

				}
			});

	// 三级菜单点击
	$('.sub-menus li').click(function(e) {
		$(".sub-menus li.active").removeClass("active")
		$(this).addClass("active");
	});

	$('.title').click(function() {
		var $ul = $(this).next('ul');
		$('dd').find('.menuson').slideUp();
		if ($ul.is(':visible')) {
			$(this).next('.menuson').slideUp();
		} else {
			$(this).next('.menuson').slideDown();
		}
	});

})
</script>
		<script type="text/javascript">
$(function() {
	var $userLevel = parseInt("${loginUser.e_admin}");//获取登陆者的权限等级
	var perPartDel = $("#PartDel"); //撤销部门模块
	var perEmpBack = $("#empBack"); //撤销员工模块
	var perEmpSeach = $("#empSeach"); //员工查询模块
	var perProSeach = $("#proSeach"); //产品查询模块

	switch ($userLevel) {
	case 0://员工
		perPartDel.hide();
		perEmpBack.hide();
		perEmpSeach.hide();
		perProSeach.hide();
		$('#empAll').find("a").text('我的信息');
		break;
	case 1://部门主管
		perEmpSeach.hide();
		break;
	case -1://最高管理员
		break;
	}
	$("#test").hide();//入库测试
	$("#test1").hide();//客户测试
	$("#test2").hide();//出库 订单测试
});
</script>

	</head>
	<body style="background: #f0f9fd;">
		<div class="lefttop">
			<span></span>江岸日用化工管理
		</div>

		<dl class="leftmenu">

			<dd>
				<div class="title">
					<span><img
							src="${pageContext.request.contextPath }/images/leftico01.png" />
					</span>部门管理
				</div>
				<ul class="menuson">
					<li>
						<div class="header">
							<cite></cite>
							<a href="${pageContext.request.contextPath }/part/all.jsp"
								target="rightFrame">部门管理</a>
							<i></i>
						</div>
					</li>

					<li id="PartDel">
						<div class="header">
							<cite></cite>
							<a href="${pageContext.request.contextPath }/part/delall.jsp"
								target="rightFrame">恢复部门</a>
							<i></i>
						</div>
					</li>
				</ul>
			</dd>


			<dd>
				<div class="title">
					<span><img
							src="${pageContext.request.contextPath }/images/leftico02.png" />
					</span>员工管理
				</div>
				<ul class="menuson">
					<li id="empAll">
						<div class="header">
							<cite></cite>
							<a href="${pageContext.request.contextPath }/emp/all.jsp"
								target="rightFrame">员工管理</a>
							<i></i>
						</div>
					</li>
					<li id="empBack">
						<div class="header">
							<cite></cite>
							<a href="${pageContext.request.contextPath }/emp/delall.jsp"
								target="rightFrame">恢复员工</a>
							<i></i>
						</div>
					</li>
					<li id="empSeach">
						<div class="header">
							<cite></cite>
							<a href="${pageContext.request.contextPath }/emp/seach.jsp"
								target="rightFrame">查询员工</a>
							<i></i>
						</div>
					</li>
				</ul>
			</dd>
			<dd>
				<div class="title">
					<span><img
							src="${pageContext.request.contextPath }/images/leftico03.png" />
					</span>产品管理
				</div>
				<ul class="menuson">
					<li>
						<div class="header">
							<cite></cite>
							<a href="${pageContext.request.contextPath }/product/sort.jsp"
								target="rightFrame">类别管理</a>
							<i></i>
						</div>
					</li>

					<li>
						<div class="header">
							<cite></cite>
							<a href="${pageContext.request.contextPath }/product/product.jsp"
								target="rightFrame">产品管理</a>
							<i></i>
						</div>
					</li>
					<li id="proSeach">
						<div class="header">
							<cite></cite>
							<a
								href="${pageContext.request.contextPath }/product/productSeach.jsp"
								target="rightFrame">产品查询</a>
							<i></i>
						</div>
					</li>
				</ul>
			</dd>


			<dd>
				<div class="title">
					<span><img
							src="${pageContext.request.contextPath }/images/leftico04.png" />
					</span>库存管理
				</div>
				<ul class="menuson">
					<li>
						<div class="header">
							<cite></cite>
							<a
								href="${pageContext.request.contextPath }/inproduct/inproduct.jsp"
								target="rightFrame">出入库管理</a>
							<i></i>
						</div>
					</li>
				</ul>
			</dd>
			<dd>
				<div class="title">
					<span><img
							src="${pageContext.request.contextPath }/images/leftico04.png" />
					</span>客户管理
				</div>
				<ul class="menuson">
					<li>
						<div class="header">
							<cite></cite>
							<a href="${pageContext.request.contextPath }/client/client.jsp"
								target="rightFrame">客户管理</a>
							<i></i>
						</div>
					</li>
				</ul>
			</dd>
			<dd>
				<div class="title">
					<span><img
							src="${pageContext.request.contextPath }/images/leftico04.png" />
					</span>订单管理
				</div>
				<ul class="menuson">
					<li>
						<div class="header">
							<cite></cite>
							<a href="${pageContext.request.contextPath }/orders/orders.jsp" target="rightFrame">订单管理</a>
							<i></i>
						</div>
					</li>
				</ul>
			</dd>
			<dd>
				<div class="title">
					<span><img
							src="${pageContext.request.contextPath }/images/leftico04.png" />
					</span>业绩报表
				</div>
				<ul class="menuson">
					<li>
						<div class="header">
							<cite></cite>
							<a href="${pageContext.request.contextPath }/report/report.jsp"  target="rightFrame">部门业绩统计</a>
							<i></i>
						</div>
					</li>

					<li>
						<div class="header">
							<cite></cite>
							<a href="${pageContext.request.contextPath }/report/zxt.jsp" target="rightFrame">产品业绩销售统计</a>
							<i></i>
						</div>
					</li>
					<li>
						<div class="header">
							<cite></cite>
							<a href="${pageContext.request.contextPath }/report/break.jsp" target="rightFrame">员工个人业绩</a>
							<i></i>
						</div>
					</li>
				</ul>
			</dd>
		</dl>
		<ul class="menuson" id="test">
			<li>
				<div class="header">
					<cite></cite>
					<a href="/JAWeb/test/test.jsp" target="rightFrame">测试页面</a>
					<i></i>
				</div>
			</li>
		</ul>
		<ul class="menuson" id="test1">
			<li>
				<div class="header">
					<cite></cite>
					<a href="/JAWeb/test/test1.jsp" target="rightFrame">测试页面</a>
					<i></i>
				</div>
			</li>
		</ul>
		<ul class="menuson" id="test2">
			<li>
				<div class="header">
					<cite></cite>
					<a href="/JAWeb/test/test2.jsp" target="rightFrame">测试页面</a>
					<i></i>
				</div>
			</li>
		</ul>

	</body>
</html>