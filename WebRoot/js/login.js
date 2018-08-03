var $botao;
$(function() {
	init();
	$("#loginuser").focusout(function() {
		var pname = $("#loginuser").val();
		if (pname.length == 0) {
			layer.tips('用户名不能为空！', '#loginuser', {
				tipsMore : true,
				tips : [ 2, 'red' ]
			});
		} else {
			$.ajax( {
				type : "post",
				url : "login_getENameCount.action",
				async : true,
				data : "username=" + pname,
				success : (function(msg) {
					$botao = msg;
					if (msg == 0) {
						layer.tips('此用户名不存在！', '#loginuser', {
							tipsMore : true,
							tips : [ 2, 'red' ]
						});
					} else {
						layer.tips('用户名合法！', '#loginuser', {
							tips : [ 2, '#4ca2d4' ]
						});
					}
				})
			});
		}
	});
});
//初始化方法
function init() {
	//用户名输入框获得焦点
	$("#loginuser").focus();
	$('.loginbox').css( {
		'position' : 'absolute',
		'left' : ($(window).width() - 692) / 2
	});
	$(window).resize(function() {
		$('.loginbox').css( {
			'position' : 'absolute',
			'left' : ($(window).width() - 692) / 2
		});
	});
	//登录
	document.onkeydown = function(e) {
		if (e.which == 13) {
			$(".loginbtn").focus();
			check();
		}
	};
}
//登录按钮的点击事件
function check() {
	if ($("#loginuser").val().length == 0) {
		layer.tips('用户名不能为空！', '#loginuser', {
			tipsMore : true,
			tips : [ 2, 'red' ]
		});
		$("#loginuser").focus();
		return false;
	}
	if ($botao == 0) {
		layer.tips('此用户名不存在！', '#loginuser', {
			tipsMore : true,
			tips : [ 2, 'red' ]
		});
		$("#loginuser").focus();
		return false;
	}
	if ($("#upsw").val().length == 0) {
		layer.tips('请输入密码！', '#upsw', {
			tipsMore : true,
			tips : [ 2, 'red' ]
		});
		$("#upsw").focus();
		return false;
	} else {
		var username = $("#loginuser").val();
		var psw = $("#upsw").val();
		var data = "emp.e_loginname=" + username + "&emp.e_psw=" + psw;
		$.ajax( {
			type : "post",
			url : "login_login.action",
			async : true,
			data : data,
			success : (function(msg) {
				if (msg == 1) {
					window.location = "/JAWeb/main/main.jsp";
				} else if(msg == 2){
					layer.tips('已经离职！！', '#upsw', {
						tipsMore : true,
						tips : [ 2, 'red' ]
					});
					$("#upsw").focus();
				}else {
					layer.tips('密码错误！！', '#upsw', {
						tipsMore : true,
						tips : [ 2, 'red' ]
					});
					$("#upsw").focus();
				}
			})
		});
	}
}
//window的onload事件，窗体加载完毕的时候
window.onload = function() {
	var aa = "${flag}";
	if (aa == 1) {
		swal("退出成功", "${message}", "success");
	}
};