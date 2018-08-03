$(function() {
	init();
	//数据验证
	checkItem();
	//提交验证
	commitBtn();
});
function init() {
	$("#added").hide();
	$("#oldpname").val($("#PName").val());
	$("#PName").focus();
};
var $partlayer;
function checkItem() {
	$("#PName").focusout(function() {
		var pname = $("#PName").val();
		$.ajax( {
			type : "post",
			url : "http://localhost:8080/JAWeb/FindPartName.action",
			async : true,
			data : "name=" + pname,
			success : (function(msg) {
				if (msg > 0 && $("#oldpname").val() != $("#PName").val()) {
					$partlayer=layer.tips('该部门已存在！', '#PName', {
						tips : [ 2, 'red' ]
					});
				}
				$("#botao").val(msg);
			})
		});
		if ($("#PName").val().length == 0) {
			$partlayer=layer.tips('部门名称不可以为空！', '#PName', {
				tips : [ 2, 'red' ]
			});
		}
	});
	$("#PName").keyup(function() {
		layer.close($partlayer);
		var pname = $("#PName").val();
		if (!pname) {
			$("#PName").addClass("newerror");
			$("#PName").removeClass("newsuccess");
		}else{
			$.ajax( {
				type : "post",
				url : "http://localhost:8080/JAWeb/FindPartName.action",
				async : true,
				data : "name=" + pname,
				success : (function(msg) {
					if (msg > 0 && $("#oldpname").val() != $("#PName").val()) {
						$("#PName").addClass("newerror");
						$("#PName").removeClass("newsuccess");					
					}else{
						$("#PName").addClass("newsuccess");
						$("#PName").removeClass("newerror");
					}				
				})
			});
		}		
	});
	$("#PRemark").keyup(function() {
		var PRemark=$(this).val();
		if(PRemark){
			$("#PRemark").addClass("newsuccess");
		}else{
			$("#PRemark").removeClass("newsuccess");
		}
	});
};
function commitBtn() {
	$(".btn").bind('click', function() {
		commitItem();
	});
};
//表单提交
function commitItem() {
	var pnameCount = $("#botao").val();
	var pname = $("#PName").val();
	var PRemark = $("#PRemark").val();
	var pid = $("#pid").val();
	if ($("#botao").val() > 0 && $("#oldpname").val() != $("#PName").val()) {
		$partlayer=layer.tips('该部门已存在！', '#PName', {
			tips : [ 2, 'red' ]
		});
		$("#PName").focus();
		return false;
	} else if ($("#PName").val().length == 0) {
		$partlayer=layer.tips('部门名称不能为空！！', '#PName', {
			tips : [ 2, 'red' ]
		});
		$("#PName").focus();
		return false;
	} else {
		var mypart = "p_name=" + pname + "&p_remark=" + PRemark
				+ "&p_id=" + pid+"&p_is=1";
		var i = layer.load(0);
		$.post('http://localhost:8080/JAWeb/UpdatePart.action', mypart, function(mydata) {
			layer.close(i);
			if (mydata == 1) {
				parent.layer.msg('修改成功！', {
					icon : 6,
					time : 3000
				});
				var index = parent.layer.getFrameIndex(window.name); //获取窗口索引(真正的关 )
				parent.layer.close(index);
			} else {
				parent.layer.msg('修改失败', 2, 9);
			}
		}, 'json');
	}
}
