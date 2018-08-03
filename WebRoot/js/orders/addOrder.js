$(function() {

	//初始化方法
	init();
	//员工下拉框(第二级连动)
	empName();
	//客户下拉框 (第三级连动)
	clientName();
	//提交
	submitOrder();
	//数据验证
	checkoo();

});

//初始化方法 加载部门信息
function init() {
	$("#partName").empty().append("<option value='-10'>-- 请选择 --</option>");
	$("#empName").empty().append("<option value='-10'>-- 请选择 --</option>");
	$("#clientName").empty().append("<option value='-10'>-- 请选择 --</option>");
	getPartName();
	if($userLevel!=-1){
		getEmpname($userPId);
	}
	if($userLevel==0){
		getClientName($userID);
	}
};


//员工下拉框(第二级连动)
function empName() {
	$(document).on('change','#partName',function() {
		$("#clientName").empty().append("<option value='-10'>-- 请选择 --</option>");
		
		var pid =$(this).val();
		getEmpname(pid);
	});
};

//客户下拉框 (第三级连动)
function clientName() {
	$(document).on('change','#empName',function() {
		var eid = $(this).val();
	    getClientName(eid);
	});
};
function getPartName(){
	$.ajax( {
		url : 'FindPart3.action',
		dataType : 'json',
		data : '',
		type : 'post',
		success : function(mydata) {
			var json=eval("("+mydata+")");
			$.each(json, function(index, xx) {
				$("#partName").append(
						"<option value='" + xx.p_id + "'>" + xx.p_name
								+ "</option>");
			});
			var $userLevell=-1;
			if($userLevel1!=-1){
				$("#partName").val($userPId);
				$("#partName").attr("disabled","disabled");
			}
		}
	});
};
function getEmpname(pid){
	$.ajax( {
		url : '	FindEmpByPid.action',
		dataType : 'json',
		data : {
			pid : pid,
		},
		type : 'post',
		success : function(mydata) {
			var json=eval("("+mydata+")");
			$("#empName").empty().append("<option value='-10'>-- 请选择 --</option>");
			$.each(json, function(index, xx) {
				$("#empName").append("<option value='" + xx.e_id + "'>" + xx.e_truename + "</option>");
			});
			if($userLevel==0){
				$("#empName").val($userID);
				$("#empName").attr("disabled","disabled");
			}
			
		}
	});
};
function getClientName(eid){
	$.ajax( {
		url : '	showClientByEid.action',
		dataType : 'json',
		data : {
		   eid:eid
		},
		type : 'post',
		success : function(mydata) {
			$("#clientName").empty().append("<option value='-10'>-- 请选择 --</option>");
			$.each(mydata, function(index, xx) {
				$("#clientName").append("<option value='"+ xx.c_id +"'>" + xx.c_name + "</option>");
			});
		}
	});
};
//提交
function submitOrder()
{
	
  $(document).on('click','.btn', function(){
	  
	var cid = $("#clientName").val();
	var pid = $("#partName").val();
	var eid = $("#empName").val();
	
	if (cid==-10) {
		
			if(eid==-10){
			$("#clientName").addClass("newerror");
			layer.msg('请选择客户名称！', {
				icon : 2,
				time : 2000
			});
			}
			$("#empName").addClass("newerror");
			layer.msg('请选择员工名称！', {
				icon : 2,
				time : 2000
			});
			return false;
		}else
		{
			var ss="orders.emp.e_id="+eid+"&orders.client.c_id="+cid+"";
				var i = layer.load(0);
			$.post("addOrders.action",ss,function(mydata){
					layer.close(i);
				if (mydata >= 1) {
				   parent.$('.yin').val(mydata);
					parent.layer.msg('添加成功！', {
						icon : 6,
						time : 3000
					});
			
					var index = parent.layer.getFrameIndex(window.name); //获取窗口索引(真正的关 )
					parent.$('#libin').val(1);
					parent.layer.close(index);
				} else {
					parent.layer.msg('添加订单失败', 2, 9);
				}
			}, 'json');
			
		}
		});
}

			
  //数据验证
function checkoo(){
	
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
	
}
