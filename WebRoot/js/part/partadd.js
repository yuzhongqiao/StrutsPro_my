$(function() {
	init();
	//数据验证
	checkItem();
	//提交验证
	commitBtn();
});
function init() {
	$("#PName").focus();
};
var $partlayer;
function checkItem() {
		//根据名字查找部门
	$("#PName").focusout(function() {
		var pname = $("#PName").val();
		$.ajax( {
			type : "post",
			url : "${pageContext.request.contextPath}/FindPartName.action",
			async : true,//异步
			data : "name=" + pname,
			success : (function(msg) {
				var s = eval("("+msg+")");
				var count=s.count;
				if (count > 0) {
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
		$.ajax( {
			type : "post",
			url : "http://localhost:8080/JAWeb/FindPartName.action",
			async : true,
			data : "name=" + pname,
			success : (function(msg) {
				var s = eval("("+msg+")");
				var count=s.count;
				if (count == 0&&pname) {
					$("#PName").addClass("newsuccess");
					$("#PName").removeClass("newerror");
				}else{
					$("#PName").addClass("newerror");
					$("#PName").removeClass("newsuccess");
				}
			})
		});
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
function commitBtn(){
	$(".btn").bind('click',function(){
		commitItem();
	});
};
//表单提交
function commitItem() {
	var pnameCount = $("#botao").val();
	var pname = $("#PName").val();
	var PRemark = $("#PRemark").val();
	if (pnameCount > 0) {
		$partlayer=layer.tips('该部门已存在！', '#PName', {
			tips : [ 2, 'red' ]
		});
		$("#PName").focus();
		return false;
	} else if (pname.length == 0) {
		$partlayer=layer.tips('部门名称不可以为空！', '#PName', {
			tips : [ 2, 'red' ]
		});
		$("#PName").focus();
		return false;
	} else {
		var mypart = "p_name=" + pname + "&p_remark=" + PRemark
				+ "&tPart.PId=-1";
		var i = layer.load(0);
		$.post('http://localhost:8080/JAWeb/AddPart.action', mypart, function(mydata) {
			layer.close(i);//弹出层关闭
			if (mydata == 1) {
				parent.layer.msg('添加成功！', {
					icon : 6,
					time : 3000
				});
				var index = parent.layer.getFrameIndex(window.name); //获取窗口索引(真正的关 )
				parent.layer.close(index);
			} else {parent.layer.msg('增加失败', 2, 9);}}, 'json');
	}
}
