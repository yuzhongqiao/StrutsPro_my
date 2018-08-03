$(function(){
	
	var $current = 0;
	var $up = 0;
	var $next = 0;
	var $allpages = 0;
	var $allcount = 0;
	//查询具体入库传参
	var $partID = 0;
	var $empID = 0;
	var $clientID=0;
	//判断显示是第几层页面
	var $seachType = 0;
	//分页项
	pageItem();
	//加载的方法
	loading();
	//分页项
  	pageItem();
	//第二个下拉框(员工的名称)
    allEmpName();
    //进入第二个层(部门下所有的员工)
    seachInPro();
    //进入第三个层(员工下的所有客户)
    seachInThree();
    //进入第四层(已删除的客户)
     seachInFour();
    //添加客户
    addClient();
    //删除客户
    delClient();
    //查询
     seek();
    //修改客户
     uppClient();
     //恢复客户
     recover();    

});

//加载的方法
function loading()
{
	//layer.msg($userLevel+" "+$userPId);
	$("#partName").empty().append("<option value='-10'>-- 请选择 --</option>");
	$("#empName").empty().append("<option value='-10'>-- 请选择 --</option>");
	var $userLevel1=-1;
	if($userLevel1==-1){//$userLevel==-1
		$.ajax( {
			url : 'FindPart3.action',
			dataType : 'json',
			data : '',
			type : 'post',
			success : function(mydata) {
				var json=eval("("+mydata+")");
				$.each(json, function(index, xx) {
					$("#partName").append("<option value='" + xx.p_id + "'>" + xx.p_name + "</option>");
				});
				$seachType = 1;
				getAll(1);
			}
		});
	}else if($userLevel1==1){
		$.ajax( {
			url : 'FindEmpByPid.action',
			dataType : 'json',
			data : {
				pid : $userPId,
			},
			type : 'post',
			success : function(mydata) {
				var json=eval("("+mydata+")");
				$("#empName").empty().append("<option value='-10'>-- 请选择 --</option>");
				$.each(json, function(index, xx) {
					$("#empName").append("<option value='" + xx.e_id + "'>" + xx.e_truename + "</option>");
				});
				$(".partname").hide();
				$partID=$userPId;
				$seachType = 2;
				getAll(1);
			}
		});
	}else if($userLevel1==0){
		$(".partname").hide();
		$(".empname").hide();
		$(".seachBtn").hide();
		$seachType = 3;
		$empID=$userID;
		getAll(1);
	}
};

//显示第一层(所有部门)
function allOnePart(current)
{
	$.ajax({
		url:"ShowPart.action",
		data:{current:current},
		type:"post",
		dataType:"json",
		success:function(mydata)
		{
			var json=eval("("+mydata+")");
        	 //clientTbody
        	$("#proTit").empty().append("<tr> <th width='8%'>编号</th><th width='10%'>部门名称</th><th width='10%'>查询</th></tr>");
			$("#clientTbody").empty();
			if(json.length>=1)
			{
				  $.each(json,function(index,xx){
					  if(xx.p_id!=null)
					  {
						  $("#clientTbody").append("<tr> <td width='8%'>"+xx.p_id+"</td><td width='10%'>"+xx.p_name+"</td><td width='10%'><a class='cha'><i class='fa fa-search'></i>查询</a><input type='hidden' value="+ xx.p_id+ "> </input></td></tr>");
					  }//else {
						$current = xx.current;
						$up = xx.up;
						$next = xx.next;
						$allpages = xx.allpages;
						$allcount = xx.allcount;
						addFenye();
					//}
				 }) ; 
				 $(".pagin").removeClass("zeroItem");
			}else{
				var str = '<table align="center"><tr><td style="line-height: 50px;"><img src="' + $webName + '/images/xiao.jpg" width="50" height="50">';
				str += '</td><td style="text-indent: 10px;">目前没有客户呦！ </td></tr></table>';
				$(".pagin > .message").empty().append(str);
				$(".pagin").addClass("zeroItem");
			}
		
		}
	});
};

//进入第二个层(部门下所有的员工)
function seachInPro()
{
     $(document).on('click','.cha',function() {
    	$partID =$(this).next().val();
    		$seachType = 2;
			getAll(1);
     });
};

//显示第二层(该部门所有的员工)
function allTwoEmp(current)
{
	$.ajax({
		url:"ShowEmp.action",
		data:{
			current:current,
			pid:$partID
			},
		type:"post",
		dataType:"json",
		success:function(mydata)
		{
			var json=eval("("+mydata+")");
        	 //clientTbody
        	$("#proTit").empty().append("<tr> <th width='8%'>编号</th>  <th width='10%'>姓名</th>  <th width='10%'>性别</th> <th width='10%'>备注</th> <th width='10%'>查看</th> </tr>");
			$("#clientTbody").empty();
			if(json.length>=1)
			{
				  $.each(json,function(index,xx){
					  if(xx.e_id!=null) {
						  $("#clientTbody").append("<tr> <td width='8%'>"+xx.e_id+"</td><td width='10%'>"+xx.e_truename+"</td> <td width='10%'>"+xx.e_sex+"</td> <td width='10%'>"+xx.e_remark+"</td><td width='10%'><a class='eid'><i class='fa fa-search'></i>查看</a><input type='hidden' value="+ xx.e_id+ "> </input></td></tr>");
					  }//else {
						$current = xx.current;
						$up = xx.up;
						$next = xx.next;
						$allpages = xx.allpages;
						$allcount = xx.allcount;
						addFenye();
					//}
				 });
				 $(".pagin").removeClass("zeroItem");
			}else{
				var str = '<table align="center"><tr><td style="line-height: 50px;"><img src="' + $webName + '/images/xiao.jpg" width="50" height="50">';
				str += '</td><td style="text-indent: 10px;">目前该部门下没有员工呦！ </td></tr></table>';
				$(".pagin > .message").empty().append(str);
				$(".pagin").addClass("zeroItem");
			}
		}
	});
};

//进入第三个层(员工下的所有客户)
function seachInThree()
{
    $(document).on('click','.eid',function(){
		$empID =$(this).next().val();
		$seachType = 3;
		getAll(1);
	 });
}

//显示第三个层(员工下的所有客户)
function allThreeClient(current)
{
	$.ajax({
		url:"showClientByEid.action",
		data:{
			current:current,
			eid:$empID
			},
		type:"post",
		dataType:"json",
		success:function(mydata)
		{
        	 //clientTbody
        	$("#proTit").empty().append("<tr> <th width='8%'>编号</th>  <th width='10%'>客户姓名</th>  <th width='10%'>联系方式</th> <th width='10%'>地址</th> <th width='10%'>修改</th>  <th width='10%'>删除</th> </tr>");
			$("#clientTbody").empty();
			if(mydata.length>=1){
				  $.each(mydata,function(index,xx){
					  
					  if(xx.c_id!=null) {
						  $("#clientTbody").append("<tr> <td width='8%'>"+xx.c_id+"</td> <td width='8%'>"+xx.c_name+"</td>  <td width='8%'>"+xx.c_tel+"</td> <td width='10%'>"+xx.c_address+"</td>  <td width='10%'><a class='uppCid'><i class='fa fa-edit fa-lg'></i>修改</a><input type='hidden' value="+ xx.c_id+ "> </input></td>  <td width='10%'><a class='delCid'><i class='fa fa-user-times	 fa-lg'></i>删除</a><input type='hidden' value="+ xx.c_id+ "> </input></td> </tr>");
					  }//else {
						$current = xx.current;
						$up = xx.up;
						$next = xx.next;
						$allpages = xx.allpages;
						$allcount = xx.allcount;
						addFenye();
					//}
				 });
			 	$(".pagin").removeClass("zeroItem");
			}else{
				var str = '<table align="center"><tr><td style="line-height: 50px;"><img src="' + $webName + '/images/xiao.jpg" width="50" height="50">';
				str += '</td><td style="text-indent: 10px;">目前该员工下没有客户呦！ </td></tr></table>';
				$(".pagin > .message").empty().append(str);
				$(".pagin").addClass("zeroItem");
			}
		}
	});
};
 
//进入第四层(已删除的客户)
function  seachInFour()
{
   	$(document).on('click','#delClient',function()
	 {
		$seachType = 4;
		getAll(1);
	 });
};

//显示第四层(已删除的客户)
function allFourClient(current)
{//getDelCilent
		$.ajax({
		url:"showDelClient.action",
		data:{
			current:current,
			},
		type:"post",
		dataType:"json",
		success:function(mydata)
		{
        	 //clientTbody
        	$("#proTit").empty().append("<tr> <th width='8%'>编号</th>  <th width='10%'>姓名</th>  <th width='10%'>联系方式</th> <th width='10%'>地址</th>   <th width='10%'>恢复</th> </tr>");
			$("#clientTbody").empty();
			if(mydata.length>=1)
			{
				  $.each(mydata,function(index,xx){
					  if(xx.c_id!=null) {
						  $("#clientTbody").append("<tr> <td width='8%'>"+xx.c_id+"</td> <td width='8%'>"+xx.c_name+"</td>  <td width='8%'>"+xx.c_tel+"</td> <td width='10%'>"+xx.c_address+"</td>   <td width='10%'><a class='hui'><i class='fa fa-retweet  fa-lg'></i>恢复</a><input type='hidden' value="+ xx.c_id+ "> </input></td> </tr>");
					  }//else {
						$current = xx.current;
						$up = xx.up;
						$next = xx.next;
						$allpages = xx.allpages;
						$allcount = xx.allcount;
						addFenye();
					//}
				 });
			 	$(".pagin").removeClass("zeroItem");
			}else{
				var str = '<table align="center"><tr><td style="line-height: 50px;"><img src="' + $webName + '/images/xiao.jpg" width="50" height="50">';
				str += '</td><td style="text-indent: 10px;">目前还没有被删除的客户呦！ </td></tr></table>';
				$(".pagin > .message").empty().append(str);
				$(".pagin").addClass("zeroItem");
			}
		}
	});
};

//恢复客户
function  recover()
{
	$(document).on('click','.hui',function(){
		var huiid= $(this).next().val();
		$.ajax({
			url:"findClientByCid1.action",
			data:{	
				cid:huiid
				},
			type:"post",
			dataType:"json",
			success:function(mydata){
				var eis=mydata;
				if(eis==1){
					$.ajax({
						url:"backClient.action",
						data:{	
							cid:huiid
							},
						type:"post",
						dataType:"json",
						success:function(mydata)
						{
							layer.msg('恢复成功！', {
								icon : 6,
								time : 3000
							});
							getAll($current);
						}
					});
				}else{
					layer.open( {
						type : 2,
						title : "恢复客户",
						shadeClose : true,
						content : 'findClientByCid2.action?cid='+huiid,
						skin : 'layui-layer-lan',
						shift : 1, //动画类型
						//创建完成层时回调
						success : function(layero, index) {
							layer.style(index, {
								width : '450px',
								height : '200px',
								top : '100px',
								left : ($(window).width() - 430) / 2
							});
						},
						//层被销毁回调
						end : function() {
							getAll($current);
						}
					});
				}
			}
		});	
	});	
}

//修改客户信息
function uppClient()
{
	//uppCid
	$(document).on('click','.uppCid',function(){
		var uppid= $(this).next().val();
		layer.open( {
			type : 2,
			title : "修改客户",
			shadeClose : true,
			content : 'findClientByCid.action?cid='+uppid,
			skin : 'layui-layer-lan',
			shift : 3, //动画类型
			//创建完成层时回调
			success : function(layero, index) {
				layer.style(index, {
					width : '460px',
					height : '300px',
					top : '100px',
					left : ($(window).width() - 430) / 2
				});
			},
			//层被销毁回调
			end : function() {
				getAll($current);
			}
		});
	});
}


//删除客户
function delClient()
{
	$(document).on('click','.delCid',function(){
		var delid= $(this).next().val();
		var name=$(this).parent().parent().find("td:eq(1)").text();
		var str = '确定要删除客户[ '+name+' ]吗？';
		layer.confirm(str, {
			btn : [ '确定', '取消' ],
			title : '删除确定',
			skin : 'layui-layer-lan',
			shift : 1, //动画类型
			shadeClose : true,
			top : '100px',
			left : ($(window).width() - 400) / 2
		}, function() {
			$.ajax({
				url:"delClient.action",
				data:{	
					cid:delid,
				},
				type:"post",
				dataType:"json",
				success:function(mydata)
				{
					layer.msg('删除成功！', {
						icon : 6,
						time : 3000
					});
					getAll($current);
				}
			});	
		});		
	});
}


 //第二个下拉框(员工的名称)
function  allEmpName()
{
	$(document).on('change','#partName',function() {
		var pid =$(this).val();
		$.ajax( {
			url : 'ShowEmp.action',
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
			}
		});
	});
};

//添加客户
function addClient()
{
	$(document).on('click','#addClient',function(){
		layer.open( {
			type : 2,
			title : "添加客户",
			shadeClose : true,
			content : $webName+'/client/addClient.jsp',
			skin : 'layui-layer-lan',
			shift : 3, //动画类型
			//创建完成层时回调
			success : function(layero, index) {
				layer.style(index, {
					width : '460px',
					height : '300px',
					top : '100px',
					left : ($(window).width() - 430) / 2
				});
			},
			//层被销毁回调
			end : function() {
				getAll($current);
			}
		});
	});
}

//提交查询
function seek(){	
	$(document).on('click','#scbtn',function(){
		var partName=$("#partName").val();
		var empName=$("#empName").val();
		//选择了部门 没选择员工 查看部门下的所有客户
		if(partName!=-10&&empName==-10)
		{
			$partID=partName;
			$seachType = 2;
			getAll(1);
		}
		//选择了部门 选择了员工 指定员工的客户
		if(partName!=-10&&empName!=-10)
		{
			$empID=empName;
			$seachType = 3;
			getAll(1);
		}
		//没有部门 没选择员工 查看所有客户
		if(partName==-10&&empName==-10&&$userLevel==-1)
		{
	     	$seachType = 1;
			getAll(1);
		}
		//部门主管 没有选择员工 查看部门下员工的所有客户
		if(partName==-10&&empName==-10&&$userLevel==1)
		{
	     	$partID=$userPId;
			$seachType = 2;
			getAll(1);
		}
		//部门没有选择 员工选择了 查看对应员工的客户
		if(partName==-10&&empName!=-10)
		{
			$empID=empName;
			$seachType = 3;
			getAll(1);
		}
	});
};


//添加分页
function addFenye() {
	$(".pagin > .message").empty().append('统计：共<i class="blue"> ' + $allcount+ '</i> 条记录， 共<i class="blue"> ' + $allpages + ' </i>页，当前显示第&nbsp;<i class="blue">' + $current + '/' + $allpages + '&nbsp;</i>页');
	$(".pagin > .message").append('<ul class="paginList">');
	$(".paginList").append('<li class="paginItem"><a href="javascript:void(0)" class="first">首页</a></li>');
	$(".paginList").append('<li class="paginItem"><a href="javascript:void(0)" class="up">上一页</a></li>');
	$(".paginList").append('<li class="paginItem"><a href="javascript:void(0)" class="next">下一页</a></li>');
	$(".paginList").append('<li class="paginItem"><a href="javascript:void(0)" class="last">尾页</a></li>');
	$(".pagin > .message").append('<SPAN style="float: right;"> 转到第 <select class=select></select> 页</SPAN>');
	for ( var i = 1; i <= $allpages; i++) {
		$(".select").append("<option value='" + i + "'>" + i + "</option>");
	}
	$(".select").val($current);	
	$('.tablelist tbody tr:odd').addClass('odd');
};

//分页项
function pageItem() {
	$(document).on("click", ".first", function() {
		getAll(1);
	});
	$(document).on("click", ".up", function() {
		getAll($up);
	});
	$(document).on("click", ".next", function() {
		getAll($next);
	});
	$(document).on("click", ".last", function() {
		getAll($allpages);
	});
	$(document).on("change", ".select", function() {
		var $page = $(this).val();
		getAll($page);
	});
};

//进入第几个全查询页面
function getAll(current) {
	//layer.msg($seachType);
	if ($seachType == 1) {
		allOnePart(current);
	} else if ($seachType == 2) {
		allTwoEmp(current);
	} else if($seachType == 3)
	{
		allThreeClient(current);
	}else if ($seachType == 4)
	{
		allFourClient(current);
	}
};