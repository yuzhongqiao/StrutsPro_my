$(function() {

	var $current = 0;
	var $up = 0;
	var $next = 0;
	var $allpages = 0;
	var $allcount = 0;
	var $proID = 0;
	var $ris = 0;
	var $ban=0;
	var $idid=0;
	//判断显示是第几层页面
	var $seachType = 0;
	//查询具体入库传参
	var $proID = 0;
	//加载 初始化
	init();
	//产品下拉框(第二级连动)
	empName();
	//客户下拉框 (第三级连动)
	clientName();
	//分页项
	pageItem();
	//点击提交未完成订单按钮
	cxwOrder();
	//点击提交已完成订单按钮
	cxyOrder();
	//点击提交已废弃订单按钮
	cxfOrder();
	//点击提交添加订单按钮
	tjdOrder();
	//进入第二个查询页面（订单详细页面）
	getTwo();
	//添加商品
	tjsProduct();
	//完成订单
	successOrder();
	//放弃订单
	renounceOrder();
    //删除订单的一条数据
	delOrderOne();
	//双击修改
	upitem();
});



//页面初始化方法
function init() {
	$("#partName").empty().append("<option value='-10'>-- 请选择 --</option>");
	$("#empName").empty().append("<option value='-10'>-- 请选择 --</option>");
	$("#clientName").empty().append("<option value='-10'>-- 请选择 --</option>");
	getPart();
	var $userLevel1=-1;
	if($userLevel1!=-1){
		$(".partname").hide();
		getEmp($userPId);
	}
	if($userLevel==0){
		$(".empname").hide();
		getClientName($userID);
	}
};

//员工下拉框(第二级连动)
function empName() {
$(document).on('change','#partName',function() {
		$("#clientName").empty().append("<option value='-10'>-- 请选择 --</option>");
		var pid =$(this).val();
		getEmp(pid);
	});
};


//客户下拉框 (第三级连动)
function clientName() {
	$(document).on('change','#empName',function() {
		var eid = $(this).val();
		getClientName(eid);
	});
};
function getPart(){
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
			//var $userLevel1=-1;
			if($userLevel1=-1){//$userLevel!=-1
				$("#partName").val($userPId);
			}
			$seachType = 1;
			$ris = -10;
			getAll(1);
		}
	});
};
function getEmp(pid){
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
			}
		}
	});
};
function getClientName(eid){
    $.ajax( {
		url : 'showClientByEid.action',
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
//第一个全查询页面(查询出入库管理)
function getoneAll(current) {
	
	var pid = $("#partName").val();
	var eid = $("#empName").val();
	var cid = $("#clientName").val();
	//layer.msg(pid+" "+eid+" "+cid);
	$.ajax( {
		url : "showOrders.action",
		type : "post",
		data : {
			ris : $ris,
			cid : cid,
			pid:pid,
			eid:eid,
			oid:-10,
			current : current
		},
		dataType : "json",
		success : function(mydata) {
			$("#proTit").empty().append("<tr> <th width='8%'>订单编号</th><th width='10%'>客户姓名</th><th width='10%'>下单员工</th><th width='10%'>下单时间</th><th width='7%'>订单状态</th><th width='7%'>订单详情</th></tr>");
			$("#empTbody").empty();
			
			if (mydata.length >=1) {
				$.each(mydata,function(index, xx) {
					if (xx.r_id !== null) {
						var rs="";
						if(xx.r_is==1)
						{
							rs="未完成";
						}
						else if(xx.r_is==2)
						{
							rs="已完成";
						}else if(xx.r_is==0)
						{
							rs="已废弃";
						}
						var str="<tr> <td>"
							+ xx.r_id
							+ "</td> <td>"
							+ xx.client.c_name
							+ "</td>  <td>"
							+ xx.emp.e_truename
							+ "</td>  <td>"
							+ xx.r_time
							+ "</td>  <td>"
							+ rs+"<input type='hidden' class='ris' value="+ xx.r_is + "> </input>"
							+ "</td>  <td><a class='xiang'><i class='fa fa-search fa-lg'></i> 查询详情</a><input type='hidden' value="
							+ xx.r_id
							+ "> </input></td> </tr>" ;
						
						$("#empTbody").append(str);
						
						
						//$userLevel
					} //else {
						$current = xx.current;
						$up = xx.up;
						$next = xx.next;
						$allpages = xx.allpages;
						$allcount = xx.allcount;
						addFenye();
					//}
				});
				$(".pagin").removeClass("zeroItem");
			} else {
				var str = '<table align="center"><tr><td style="line-height: 50px;"><img src="' + $webName + '/images/xiao.jpg" width="50" height="50">';
				str += '</td><td style="text-indent: 10px;">暂时还没有满足条件的订单呦！ </td></tr></table>';
				$(".pagin > .message").empty().append(str);
				$(".pagin").addClass("zeroItem");
			}
		
		}
	});
};

//进入第二个查询页面（订单详细页面）
function getTwo()
{
	$(document).on('click','.xiang',function(){
		$proID=$(this).next().val();
		$seachType=2;
		var ris=$(this).parent().parent().find(".ris").val();
		$ban=ris;
		if(ris==1){
			$(".seachform").hide();
			$(".seachbutton").show();
			$(".button").show();
			$(".ding").empty().append(""+$proID+"号订单");
		}
		getAll(1);
	});
	
	
}

//第二全查询页面(商品详细页面)
function gettwoAll(current) {
	
	
	$.ajax( {
		url : "showOrdersmx.action",
		type : "post",
		data : {
		    oid:$proID,
			current : current
		},
		dataType : "json",
		success : function(mydata) {
			$("#proTit").empty().append("<tr> <th width='8%'>商品名称</th><th width='10%'>商品产地</th><th width='10%'>产品年份</th><th width='10%'>产品数量</th><th width='10%'>出售价格</th><th width='7%'>小计</th>  <th width='7%'>删除</th></tr>");
			$("#empTbody").empty();
			
			if (mydata.length >=1) {
				$.each(mydata,function(index, xx) {
					if (xx.x_id !== null) {
						var str="<tr> <td>"
							+ xx.product.p_name
							+ "</td> <td>"
							+ xx.product.p_area
							+ "</td>  <td>"
							+ xx.productyear.y_name
							+ "</td>";
						if($ban==1){
							var count=xx.x_count;
							if(xx.scockError==0){
								//可以								
							}else{
								//不可以
								count+="<font color=red>(库存不足)</font>";
							}
							str+= "<td class='upitem'>"+count+"<input type='hidden' value="
								+ xx.x_count
								+ "></td>";
						} else
							str+= "<td>"+xx.x_count+"</td>";
						str+= "<td>"
							+ xx.x_price
							+ "</td>  <td>"
							+ (xx.x_count*xx.x_price)
							+ "</td>" ;
							if($ban==1)
							{
							str+="<td><a class='delete'><i class='fa fa-trash fa-lg'></i> 删除</a><input type='hidden' class='idid' value="
							+ xx.x_id
							+ "> </input></td> </tr>";
							}else
							{
							str+="<td>不可操作</td> </tr>";
							}
						
						$("#empTbody").append(str);
						
						
						//$userLevel
					} //else {
						$current = xx.current;
						$up = xx.up;
						$next = xx.next;
						$allpages = xx.allpages;
						$allcount = xx.allcount;
						addFenye();
					//}
				});
				$(".pagin").removeClass("zeroItem");
			} else {
				var str = '<table align="center"><tr><td style="line-height: 50px;"><img src="' + $webName + '/images/xiao.jpg" width="50" height="50">';
				str += '</td><td style="text-indent: 10px;">暂时还没有订单详细呦！ </td></tr></table>';
				$(".pagin > .message").empty().append(str);
				$(".pagin").addClass("zeroItem");
			}
			$('.tablelist tbody tr:odd').addClass('odd');
		}
	});
};




//点击提交未完成订单按钮
function cxwOrder()
{
	$(document).on('click','#cxw',function(){
		var eid = $("#empName").val();
	    var cid = $("#clientName").val();
		
	    
	        $ris=1;
			$seachType = 1;
			getAll(1);
	    
	    
			
	});
};

//点击提交已完成订单按钮
function cxyOrder()
{
		$(document).on('click','#cxy',function(){
		var eid = $("#empName").val();
	    var cid = $("#clientName").val();
		
	        $ris=2;
			$seachType = 1;
			getAll(1);
	});
};

//点击提交已废弃订单按钮
function cxfOrder()
{
		$(document).on('click','#cxf',function(){
		var eid = $("#empName").val();
	    var cid = $("#clientName").val();
		
	        $ris=0;
			$seachType = 1;
			getAll(1);
	});
};

//点击提交添加订单按钮
function tjdOrder()
{
		$(document).on('click','#tjd',function(){
			layer.open({
			  type: 2,
			  title: '添加订单',
			  shadeClose: true,
			  shift:3,
			  skin:'layui-layer-lan',
			  content: 'addOrder.jsp' ,	
			  success : function(layero, index) {
				layer.style(index, {
					width : '330px',
					height : '260px',
					top : '100px',
					left : ($(window).width() - 330) / 2
				});
			},			
			//层被销毁回调
			end : function() {
				if($('#libin').val()==1){ 
					$proID=$(".yin").val();
					$seachType = 2;
					$(".seachform").hide();
					$(".seachbutton").show();
					$(".button").show();
					$(".ding").empty().append(""+$proID+"号订单");
					getAll(1);
					$ban=1;
					$('#libin').val(0);
				}	
			}
		}); 
	});
};

//添加商品
function tjsProduct()
{
	$(document).on("click", "#tjs", function() {
		layer.open( {
			type : 2,
			title : "添加商品",
			shadeClose : true,
			content : "addProduct.jsp?rid="+$proID ,
			skin : 'layui-layer-lan',
			shift : 3, //动画类型
			//创建完成层时回调
			success : function(layero, index) {
				layer.style(index, {
					width : '370px',
					height : '400px',
					top : '30px',
					left : ($(window).width() - 350) / 2
				});
			},
			//层被销毁回调
			end : function() {
				 
				getAll($current);
			}
		});
	}); 

};

//完成订单
function successOrder()
{
   $(document).on('click','#success',function(){
   
   		var str = '确定要提交' + $proID + '号订单吗？';
		layer.confirm(str, {
			btn : [ '确定', '取消' ],
			title : '完成订单',
			skin : 'layui-layer-lan',
			shift: 1, //动画类型
			shadeClose : true,
			top : '30px',
			left : ($(window).width() - 400) / 2
		}, function() {
			$.ajax({
				url:'saveOrder.action',
				dataType:'json',
				data:{oid:$proID},
				type:'post',
				success:function(mydata){
					if(mydata>0){
					
						layer.msg('完成提交！', {
							icon : 6,
							time : 3000
						});
						$seachType = 1;
						getAll($current);
					}else{
						layer.msg('提交失败，库存不足', {
							icon : 5,
							time : 3000
						});
						$seachType = 1;
						getAll($current);
					}
				}
			});	
		});
   });
};

//放弃订单
function renounceOrder()
{
      $(document).on('click','#discard',function(){
   
   		var str = '确定要放弃' + $proID + '号订单吗？';
		layer.confirm(str, {
			btn : [ '确定', '取消' ],
			title : '放弃订单',
			skin : 'layui-layer-lan',
			shift: 1, //动画类型
			shadeClose : true,
			top : '30px',
			left : ($(window).width() - 400) / 2
		}, function() {
			$.ajax({
				url:'delOrder.action',
				dataType:'json',
				data:{oid:$proID},
				type:'post',
				success:function(mydata){
					if(mydata>0){
						layer.msg('完成操作！', {
							icon : 6,
							time : 3000
						});
						$seachType = 1;
						getAll($current);
					}
				}
			});	
		});
   });

};

//删除订单的一条数据 ordermx_delOrder.action
function delOrderOne()
{
  $(document).on('click','.delete',function()
  {
       var ss=$(this).next().val();
       var pname=$(this).parent().parent().find("td:eq(0)").text();
       
   		var str = '确定要删除' + pname + '吗？';
		layer.confirm(str, {
			btn : [ '确定', '取消' ],
			title : '删除商品',
			skin : 'layui-layer-lan',
			shift: 1, //动画类型
			shadeClose : true,
			top : '30px',
			left : ($(window).width() - 400) / 2
		}, function() {
			$.ajax({
				url:'delOrdersmx.action',
				dataType:'json',
				data:{oid:ss},
				type:'post',
				success:function(mydata){
					if(mydata>0){
					
						layer.msg('完成操作！', {
							icon : 6,
							time : 3000
						});
						$seachType = 2;
						getAll($current);
					}
				}
			});	
		});
  
  });
};
function upitem(){
	var oldVal;
	$(document).on('dblclick','.upitem',function(){
		$idid =$(this).parent().find(".idid").val();
		var num=$(this).find("input").val();
		$(this).empty().append("<input class=input></input>");
		$(".tablelist .input").focus();
		$(".tablelist .input").val(num);
		$(this).removeClass("upmoney");
	});
	$(document).on('blur','.tablelist .input',function(){
		//旧值oldVal
		var newValue=$(this).val().trim();
		if(!newValue){
			layer.msg('修改失败，数量不能为空!!', {
				icon : 5,
				time : 1000
			});
			getAll($current);
		}else if(!((/^(\+|-)?\d+$/).test(newValue))){
			layer.msg('修改失败，格式错误!!', {
				icon : 5,
				time : 1000
			});
			getAll($current);
		} else{
			uppNum(newValue);
		}
	});
};

//修改
function uppNum(num){
	$.ajax({
		url:'uppOrdersmx.action',
		dataType:'json',
		data:{
			oid:$idid,
			count:num
		},
		type:'post',
		success:function(mydata){
			getAll($current);
			layer.msg('恭喜，修改成功!!', {
				icon : 6,
				time : 2000
			});
		}
	});
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

//进入第几个全查询页面
function getAll(current) {
	//layer.msg($seachType);
	if ($seachType == 1) {
		$(".seachform").show();
		$(".seachbutton").hide();
		$(".button").hide();
		getoneAll(current);
	} else if ($seachType == 2) {
		gettwoAll(current);
	}
};