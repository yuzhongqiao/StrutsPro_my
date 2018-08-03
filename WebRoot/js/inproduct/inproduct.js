$(function() {

	var $current = 0;
	var $up = 0;
	var $next = 0;
	var $allpages = 0;
	var $allcount = 0;
	//判断显示是第几层页面
	var $seachType = 0;
	//查询具体入库传参
	var $proID = 0;
	//加载 初始化
	init();
	//分页项
	pageItem();
	//点击进入第二个表
	seachInPro();
	//二级连动(产品名称)
	chanpin();
	//三级连动(产地)
	chandi();
	//查询提交
	toSeach();
	//入库
	addInPro();
	
	//出库
	outProSeach();

});

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
//页面初始化方法
function init() {
	$("#sort").empty().append("<option value='-10'>-- 请选择 --</option>");
	$("#product").empty().append("<option value='-10'>-- 请选择 --</option>");
	$("#area").empty().append("<option value='-10'>-- 请选择 --</option>");
	$.ajax( {
		url : 'FindSort.action',
		dataType : 'json',
		data : '',
		type : 'post',
		success : function(mydata) {
			$.each(mydata, function(index, xx) {
				$("#sort").append("<option value='" + xx.s_id + "'>" + xx.s_name + "</option>");
			});
			$seachType = 1;
			getAll(1);
		}
	});
};

//产品下拉框(第二级连动)
function chanpin() {
	$(document).on('change','#sort',function() {
		$("#area").empty().append("<option value='-10'>-- 请选择 --</option>");
		var sortid = $(this).val();
		$.ajax({
			url : 'getProductName.action',
			dataType : 'json',
			data : 'sid=' + sortid,
			type : 'post',
			success : function(mydata) {
				$("#product").empty().append("<option value='-10'>-- 请选择 --</option>");
				$.each(mydata,function(index, xx) {
					$("#product").append("<option>" + xx + "</option>");
				});
			}
		});
	});
};

//产地下拉框 (第三级连动)
function chandi() {
	$(document).on('change','#product',function() {
		var pname = $(this).val();
		var sid = $("#sort").val();

		$.ajax( {
			url : 'getProductArea.action',
			dataType : 'json',
			data : {
				sid : sid,
				pname : pname
			},
			type : 'post',
			success : function(mydata) {
				$("#area").empty().append("<option value='-10'>-- 请选择 --</option>");
				$.each(mydata, function(index, xx) {
					$("#area").append("<option>" + xx[1] + "</option>");
				});
			}
		});
	});
};

function toSeach() {
	$(document).on('click', '#scbtn', function() {
		$("#chu").hide();
		$("#scockSpan").hide();
		$seachType = 1;
		getAll(1);
	});
};

//出库记录
function outProSeach() {
	$(document).on('click', '#outPro', function() {
		$seachType = 3;
		outPro(1);
	});
};

//查看出库详细信息
function outPro(current){
	$.ajax( {
		url : "showOutproduct.action",
		type : "post",
		data : {
			pid : $proID,
			current:current
		},
		dataType : "json",
		success : function(mydata) {
			$("#proTit").empty().append('<tr><th>编号</th><th>产品名称</th><th>出库申请人</th><th>出库备注</th><th>出库数量</th><th>出库时间</th></tr>');
			$("#empTbody").empty();
			if (mydata.length >=1) {
				$.each(mydata, function(index, xx) {
				if (xx.o_id !== null) {
						$("#empTbody").append("<tr><td>" 
							+ xx.o_id + "</td> <td>"
							+ xx.product.p_name + "</td><td>"
							+ xx.empbyeid.e_truename + "</td><td>" 
							+ xx.o_remark + "</td><td>" 
							+ xx.o_number + "</td><td>" 
							+ xx.o_time + "</td></tr>");
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
				str += '</td><td style="text-indent: 10px;">暂时还没有出库记录呦！ </td></tr></table>';
				$(".pagin > .message").empty().append(str);
				$(".pagin").addClass("zeroItem");
			};
			$('.tablelist tbody tr:odd').addClass('odd');
		}
	});
};




function addInPro() {
	//新增入库信息
	$(document).on("click", ".addku", function() {
		var ee = $(this).parent().parent().find("td:eq(0)").text();		
		layer.open( {
			type : 2,
			title : "商品入库",
			shadeClose : true,
			content : "findId2.action?pid=" + ee,
			skin : 'layui-layer-lan',
			shift : 3, //动画类型
			//创建完成层时回调
			success : function(layero, index) {
				layer.style(index, {
					width : '450px',
					height : '430px',
					top : '30px',
					left : ($(window).width() - 430) / 2
				});
			},
			//层被销毁回调
			end : function() {
				getAll($current);
			}
		});
	}); 
};

//第一个全查询页面(查询出入库管理)
function getoneAll(current) {
	var sid = $("#sort").val();
	var pname = $("#product").val();
	var parea = $("#area").val();
	
	$.ajax( {
		url : "${pageContext.request.contextPath}/showProductAll.action",
		type : "post",
		data : {
			sid : sid,
			pname : pname,
			parea : parea,
			current : current
		},
		dataType : "json",
		success : function(mydata) {
			$("#proTit").empty().append("<tr> <th width='8%'>编号</th><th width='10%'>产品类别</th><th width='10%'>产品名</th><th width='10%'>产地</th><th width='7%'>规格</th><th width='7%'>出入库查询</th><th width='8%'>剩余数量</th><th width='8%'>入库</th></tr>");
			$("#empTbody").empty();
			if (mydata.length >=1) {
				$.each(mydata,function(index, xx) {
					if (xx.product.p_id !== null) {
						var str="<tr> <td>"
							+ xx.product.p_id
							+ "</td> <td>"
							+ xx.product.sort.s_name
							+ "</td>  <td>"
							+ xx.product.p_name
							+ "</td>  <td>"
							+ xx.product.p_area
							+ "</td>  <td>"
							+ xx.product.p_ml
							+ "</td><td>" ;
						//if($userLevel==-1||$userPart=='仓管部'||$userPart=='仓库管理部')
							str+="<a class='ru'><i class='fa fa-search fa-lg'></i> 出入库查询</a>";
						//else
							//str+= "<a><i class='fa fa-ban fa-lg'></i> 不可操作</a>" ;
						str+="<input type='hidden' value="
							+ xx.product.p_id
							+ "> </input></td>  <td>"
							+ xx.k_sum
							+ "</td>  <td>" ;
						//if($userLevel==-1||$userPart=='仓管部'||$userPart=='仓库管理部')
							str+= "<a class='addku'><i class='fa fa-shopping-cart fa-lg'></i> 入库</a>" ;	
						//else
							//str+= "<a><i class='fa fa-ban fa-lg'></i> 不可操作</a>" ;	
						str+= "</td> </tr>";
						
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
				str += '</td><td style="text-indent: 10px;">暂时还没有满足条件的商品呦！ </td></tr></table>';
				$(".pagin > .message").empty().append(str);
				$(".pagin").addClass("zeroItem");
			}
			$('.tablelist tbody tr:odd').addClass('odd');
		}
	});
};

//入库的详细信息
function gettwoAll(current) {
	$.ajax( {
		url : "showInproduct.action",
		type : "post",
		data : {
			pid : $proID,
			current : current
		},
		dataType : "json",
		success : function(mydata) {
			$("#proTit").empty().append('<tr><th>编号</th><th>产品名称</th><th>入库申请人</th><th>入库备注</th><th>入库数量</th><th>入库时间</th></tr>');
			$("#empTbody").empty();
			if (mydata.length >=1) {
				$.each(mydata, function(index, xx) {
					if (xx.d_id !== null) {
						$("#empTbody").append("<tr><td>" 
							+ xx.d_id + "</td> <td>"
							+ xx.product.p_name + "</td><td>"
							+ xx.emp.e_truename + "</td><td>" 
							+ xx.d_remark + "</td><td>" 
							+ xx.d_number + "</td><td>" 
							+ xx.d_time + "</td></tr>");
					} //else {
						$current = xx.current;
						$up = xx.up;
						$next = xx.next;
						$allpages = xx.allpages;
						$allcount = xx.allcount;
						addFenye();

					//};
				});
				$(".pagin").removeClass("zeroItem");
			} else {
				var str = '<table align="center"><tr><td style="line-height: 50px;"><img src="' + $webName + '/images/xiao.jpg" width="50" height="50">';
				str += '</td><td style="text-indent: 10px;">暂时还没有入库记录呦！ </td></tr></table>';
				$(".pagin > .message").empty().append(str);
				$(".pagin").addClass("zeroItem");
			};
			$('.tablelist tbody tr:odd').addClass('odd');
		}
	});

	//获取总数量
	$.ajax({
		url:"findStockNum.action",
		type:"post",
		data:{
			pid:$proID,
		},
		dataType:"json",
		success:function (mydata)
		{
			$(".shu").empty().append(" 目前库存量: "+mydata);
		}
	});
};
//查看入库详细信息
function seachInPro()
{
	$(document).on('click','.ru',function(){		
		$proID= $(this).next().val();
		$("#chu").show();
		$("#scockSpan").show();
		$seachType=2;
		getAll(1);
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
};

//进入第几个全查询页面
function getAll(current) {
	//layer.msg($seachType);
	if ($seachType == 1) {
		getoneAll(current);
		$("#chu").hide();
	} else if ($seachType == 2) {
		gettwoAll(current);
		$("#chu").show();
	}else if ($seachType == 3) {
		outPro(current);
	}
};

