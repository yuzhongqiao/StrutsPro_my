<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<script language="javascript">
$(function() {
	$('.loginbox').css( {
		'position' : 'absolute',
		'left' : ($(window).width() - 692) / 2
	});
	$(window).resize(function() {
		$('.loginbox').css( {
			'position' : 'absolute',
			'left' : ($(window).width() - 692) / 2
		});
	})
	window.location="";
});
</script>

		<link rel="stylesheet" href="../css/style.css" type="text/css"></link>
		<link rel="stylesheet" href="../css/csshake.min.css" type="text/css"></link>
		<script type="text/javascript" src="../js/jquery.js"></script>
		<script type="text/javascript" src="../js/cloud.js"></script>
		<script type="text/javascript" src="../js/index.js"></script>
		
<style type="text/css">
	/* clock */
	.clock{position:relative;top:100px;left:82%;width:360px;height:120px;transform:translate(-50%, -50%);color:#1C77AC;font-family:"Lato", sans-serif;}
	.clock div{position:relative;float:left;background:#86BFE0;border-radius:6px;width:96px;height:80px;line-height:80px;text-align:center;font-size:60px;margin:0px 5px;}
</style>
		
	</head>
	<body
		style="background-color: #1c77ac; background-image: url(images/light.png); background-repeat: no-repeat; background-position: center top; overflow: hidden;">
		<div id="mainBody">
			<div id="cloud1" class="cloud"></div>
			<div id="cloud2" class="cloud"></div>
		</div>

		<div class="loginbody">
			<span class="systemlogo"></span>
		</div>
		
		<div class='clock'>
		  <div class='h shake shake-slow'></div>
		  <div class='m shake shake-slow'></div>
		  <div class='s shake shake-slow'></div>
		</div>
		
		<div class="loginbm">
			版权所有 2014
			<a href="http://www.uimaker.com">uimaker.com</a> 仅供学习交流，勿用于任何商业用途
		</div>
	</body>
</html>