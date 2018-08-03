$(function() {
	//初始化方法
	sortName();
	
	productName();
	addInproduct();
	//数据验证
	checkItem();

});
//初始化方法 加载部门信息
function sortName() {
	$("#sortName").empty().append("<option value='-10'>-- 请选择 --</option>");
	$("#productName").empty().append("<option value='-10'>-- 请选择 --</option>");
	//$("#DNumber").focus();
	$.ajax( {
		url : "FindPart3.action",
		type : "post",
		dataType : "json",
		success : function(mydata) {
			var json=eval("("+mydata+")");
			$("#sortName").empty().append("<option value='-10'>-- 请选择 --</option>");
			$.each(json, function(index, xx) {
				$("#sortName").append("<option value=" + xx.p_id + ">" + xx.p_name + "</option>");
			});
		}
	});
};
//加载员工信息 二级联动
function productName() {
	$(document).on('change','#sortName',function() {
		var p = $(this).val();
		$.ajax( {
			url : "FindEmpByPid.action",
			type : "post",
			dataType : "json",
			data : {
				pid : p
			},
			success : function(mydata) {
				var json=eval("("+mydata+")");
				$("#productName").empty().append("<option value='-10'>-- 请选择 --</option>");
				if(json.length==0){
					$("#productName").addClass("newerror");
				}else{
					$("#productName").removeClass("newerror");
				}
				$.each(json, function(index, xx) {
					$("#productName").append("<option value=" + xx.e_id + ">"+xx.e_truename+"(" + xx.e_loginname + ")</option>");
				});
			}
		});
	});
};
//提交信息 
function addInproduct() {
	$(document).on("click",".btn", function() {
		var Pid = $("#PName").val();
		var productid = $("#productName").val();
		var DNumber = $("#DNumber").val();
		var ERemark = $("#ERemark").val();

		if (ERemark.length == 0) {
			ERemark="未留下备注.";
		} 				
		if (productid==-10) {
			var aaa=$("#sortName").val();
			if(aaa==-10)
				$("#sortName").addClass("c");
			$("#productName").addClass("newerror");
			layer.msg('请选择入库申请人！', {
				icon : 2,
				time : 2000
			});
			return false;
		} else if (DNumber.length == 0) {
			$("#DNumber").addClass("newerror");
			$("#DNumber").focus();
			$partlayer=layer.tips('不能为空！！', '#DNumber', {
				tips : [ 2, 'red' ]
			});
			return false;
		}else if(!((/^(\+|-)?\d+$/).test(DNumber))){
			$partlayer=layer.tips('格式错误！！', '#DNumber', {
				tips : [ 2, 'red' ]
			});
			return false;
		}else{
			var mypp = "inproduct.product.p_id=" + Pid
				 	 + "&inproduct.emp.e_id=" + productid
					 + "&inproduct.d_number=" + DNumber
					 + "&inproduct.d_remark=" + ERemark;
	
			$.post("addInproduct.action", mypp, function(mydata) {
				var i = layer.load(0);
				if (mydata == 1) {
					parent.layer.msg('入库成功！', {
						icon : 6,
						time : 3000
					});
					var index = parent.layer.getFrameIndex(window.name); //获取窗口索引(真正的关 )
					parent.layer.close(index);	
				} else {
					parent.layer.msg('入库失败', 2, 9);
				}
			}, 'json');
		};
	});
};
//数据验证
function checkItem(){
	$(".selectinput1").bind('change',function(){
		var ss=$(this).val();
		if(ss!=-10){
			$(this).addClass("newsuccess");
			$(this).removeClass("newerror");
		}else{
			$(this).addClass("newerror");
			$(this).removeClass("newsuccess");
		}
	});
	$("#DNumber").bind('keyup',function(){
		var DNumber=$(this).val();
		if(((/^(\+|-)?\d+$/).test(DNumber))){
			$("#DNumber").addClass("newsuccess");
			$("#DNumber").removeClass("newerror");
		}else{
			$("#DNumber").addClass("newerror");
			$("#DNumber").removeClass("newsuccess");
		}
	});
	$("#DNumber").bind('blur',function(){
		var DNumber=$(this).val();
		if(DNumber.length==0){
			$partlayer=layer.tips('不能为空！！', '#DNumber', {
				tips : [ 2, 'red' ]
			});
			$("#DNumber").addClass("newerror");
			$("#DNumber").removeClass("newsuccess");
		}else if(!((/^(\+|-)?\d+$/).test(DNumber))){
			$partlayer=layer.tips('格式错误！！', '#DNumber', {
				tips : [ 2, 'red' ]
			});
		}
	});
	$("#ERemark").bind('keyup',function(){
		var remary=$(this).val();
		if(remary){
			$("#ERemark").addClass("newsuccess");
		}else{
			$("#ERemark").removeClass("newsuccess");
		}
	});
};