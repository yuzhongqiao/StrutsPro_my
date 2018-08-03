$(function() {
	var $errorNum = 0;
	init();
	//数据验证
	check();
	//提交表单
	commitItem();
});
function init() {
	//关闭自带的输入提示
	$("#price").attr("autocomplete", "off");
	//获取名称和产地
	var proid = $("#proid").val();
	$.ajax( {
		url : 'findId.action',
		dataType : 'json',
		data : 'pid=' + proid,
		type : 'post',
		success : function(mydata) {
			if (mydata != null) {
				$("#PName").val(mydata.p_name);
				$("#PSort").val(mydata.sort.s_name);
			}
		}
	});
	//填充下拉框
	var nowYear = new Date().getFullYear();
	for(var i=nowYear;i>=2000;i--){
		$("#year").append('<option value='+i+'>'+i+'</option>');		
	}
	$("#price").focus();
	$errorNum = 0;
};
function check() {
	$("#price").bind("keyup", function() {
		var price = $("#price").val().trim();
		if(((/^\d+(\.\d{1,2})?$/).test(price))){
			$("#price").addClass("newsuccess");
			$("#price").removeClass("newerror");
		}else{
			$("#price").addClass("newerror");
			$("#price").removeClass("newsuccess");
		}
	});
};
function commitItem(){
	$(".btn").bind('click',function(){
		var pid=$("#proid").val();
		var year=$("#year").val();
		var price=$("#price").val();
		var myYearMoney = "pid=" + pid+"&yname=" + year + "&yprice=" + price;
		
		if(!price){
			layer.tips('不能为空！', '#price', {
				tipsMore : true,
				tips : [ 2, 'red' ]
			});
			$("#price").focus();
		}else if(!(/^\d+(\.\d{1,2})?$/).test(price)){
			layer.tips('格式错误！', '#price', {
				tipsMore : true,
				tips : [ 2, 'red' ]
			});
			$("#price").focus();
		}else{
			commit(myYearMoney);
		}

	});
};
function commit(str){
	var i = layer.load(0);
	$.post('uppPrice.action', str, function(mydata) {
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
