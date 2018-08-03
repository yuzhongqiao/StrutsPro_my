$(function(){
	var $current=0;
	var $up=0;
	var $next=0;
	var $allpages=0;
	var $allcount=0;
	var $seachType=0;
	var $proName="";
	var $proID="";
	init();
	//增加类别
	addSort();
	//所有类别
	allSort();
	//所有下架类别
	alldelSort();
	//查看产品详细信息
	seePro();
	//分页项
	pageItem();
	//修改信息
	uppitem();
	//showmaney
	seeyear();
	//更新价格
	uppmoney();
	//下架
	delpro();
	//恢复商品
	backpro();
	//双击修改价格
	upmoney();
});

function init(){
	$seachType=1;
	getFirstAll(1);	
};
function getFirstAll(current){
	$.ajax({
		url:'ShowProduct.action',
		dataType:'json',
		data:{current:current},
		type:'post',
		success:function(mydata){
			var json = eval("("+mydata+")");
			$("#proTit").empty().append('<tr><th width="15%">序列号</th><th width="30%">产品名称</th><th width="30%">类别名称</th></tr>');
			$("#proTbody").empty();
			if(json.length>=1){
				$.each(json,function(index,xx){
					if(xx.p_name!=null){
						$("#proTbody").append('<tr><td>'+(index+1)+'</td><td><a class="nameItem"><i class="fa fa-link fa-lg"></i>'+xx.p_name+'</a><input type="hidden" value="'+xx.p_name+'_'+xx.sort.s_id+'"></input></td><td>'+xx.sort.s_name+'</td></tr>');
					}
						$current=xx.current;
						$up=xx.up;
						$next=xx.next;
						$allpages=xx.allpages;
						$allcount=xx.allcount;
						addFenye();
					
				});
				$(".pagin").removeClass("zeroItem");
			}else{
				var str='<table align="center"><tr><td style="line-height: 50px;"><img src="'+$webName+'/images/xiao.jpg" width="50" height="50">';
				str+='</td><td style="text-indent: 10px;">还没有在售的产品呦！ </td></tr></table>';
				$(".pagin > .message").empty().append(str);
				$(".pagin").addClass("zeroItem");
			}
			$('.tablelist tbody tr:odd').addClass('odd');
		}
	});
};
function getSecondAll(current){
	$.ajax({
		url:'ShowProductSelect.action',
		dataType:'json',
		data:{zuName:$proName,current:current},
		type:'post',
		success:function(mydata){
			var json = eval("("+mydata+")");
			$("#proTit").empty().append('<tr><th>产品编号</th><th>产品名称</th><th>产地</th><th>产品规格</th><th>修改信息</th><th>更新价格</th><th>下架</th></tr>');
			$("#proTbody").empty();
			if(json.length>=1){
				$.each(json,function(index,xx){
					if(xx.p_name!=null){
						//<tr><td>1</td><td>工工业酒精</td><td>武汉</td><td>ML</td><td>修修改信息</td><td>更更新价格</td><td>下下架</td></tr>
						var str='<tr><td>'+xx.p_id+'</td><td>'
						+'<a class="showmaney"><i class="fa fa-link fa-lg"></i>'+xx.p_name+'</a></td><td>'
						+xx.p_area+'</td><td>'+xx.p_ml+'</td><td>';
						if($userLevel!=-1){
							str+='<a><span><i class="fa fa-ban fa-lg"></i> 不可操作</span></a></td><td>';
							str+='<a><span><i class="fa fa-ban fa-lg"></i> 不可操作</span></a></td><td>';
							str+='<a><span><i class="fa fa-ban fa-lg"></i> 不可操作</span></a></td></tr>';
						}else{
							str+='<a class="uppItem"><i class="fa fa-wrench fa-lg"></i> 修改信息</a></td><td>';
							str+='<a class="uppyear"><i class="fa fa-refresh fa-lg"></i> 更新价格</a></td><td>';
							str+='<a class="delpro"><i class="fa fa-trash fa-lg"></i> 下架</a></td></tr>';
						}
						$("#proTbody").append(str);
						//$("#proTbody").append('<tr><td>'+(index+1)+'</td><td><a class="nameItem"><i class="fa fa-link fa-lg"></i>'+xx.p_name+'</a><input type="hidden" value="'+xx.PName+'_'+xx.Sort.s_id+'"></input></td><td>'+xx.Sort.s_name+'</td></tr>');
					}//else{
						$current=xx.current;
						$up=xx.up;
						$next=xx.next;
						$allpages=xx.allpages;
						$allcount=xx.allcount;
						addFenye();
					//}
				});
			}else{
				$seachType=1;
				getFirstAll(current);
			}
			$('.tablelist tbody tr:odd').addClass('odd');
		}
	});
};
function getThirdAll(current){
	$.ajax({
		url:'ShowProductYear.action',
		dataType:'json',
		data:{pid:$proID,current:current},
		type:'post',
		success:function(mydata){
			var json = eval("("+mydata+")");
			$("#proTit").empty().append('<tr><th>年份</th><th width="50%">价格（元）</th></tr>');
			$("#proTbody").empty();
			if(json.length>0){
				$.each(json,function(index,xx){
					if(xx.y_name!=null){
						var str="";
						if($userLevel!=-1){
							str='<tr><td>'+xx.y_name+'</td><td>￥'
						+xx.y_price+'</td></tr>';
						}else{
							str='<tr><td>'+xx.y_name+'</td><td class="upmoney">￥'
						+xx.y_price+'</td></tr>';
						}
						//<tr><td>1</td><td>工工业酒精</td><td>武汉</td><td>ML</td><td>修修改信息</td><td>更更新价格</td><td>下下架</td></tr>
						$("#proTbody").append(str);
						//$("#proTbody").append('<tr><td>'+(index+1)+'</td><td><a class="nameItem"><i class="fa fa-link fa-lg"></i>'+xx.PName+'</a><input type="hidden" value="'+xx.PName+'_'+xx.TSort.SId+'"></input></td><td>'+xx.TSort.SName+'</td></tr>');
					}else{
						$current=xx.current;
						$up=xx.up;
						$next=xx.next;
						$allpages=xx.allpages;
						$allcount=xx.allcount;
						addFenye();
					}
				});
				$(".pagin").removeClass("zeroItem");
			}else{
				var str='<table align="center"><tr><td style="line-height: 50px;"><img src="'+$webName+'/images/xiao.jpg" width="50" height="50">';
				str+='</td><td style="text-indent: 10px;">此商品暂时还没有历史价格呦！ </td></tr></table>';
				$(".pagin > .message").empty().append(str);
				$(".pagin").addClass("zeroItem");
			}
			$('.tablelist tbody tr:odd').addClass('odd');
		}
	});
};
function getDelAll(current){
	$.ajax({
		url:'ShowdelProduct.action',
		dataType:'json',
		data:{current:current},
		type:'post',
		success:function(mydata){
			var json = eval("("+mydata+")");
			$("#proTit").empty().append('<tr><th>产品编号</th><th>产品名称</th><th>产品类别</th><th>产地</th><th>产品规格</th><th>下架</th></tr>');
			$("#proTbody").empty();
			if(json.length>=1){
				$.each(json,function(index,xx){
					if(xx.p_name!=null){
						//<tr><td>1</td><td>工工业酒精</td><td>武汉</td><td>ML</td><td>修修改信息</td><td>更更新价格</td><td>下下架</td></tr>
						var str='<tr><td>'+xx.p_id+'</td><td>';
						str+='<a class="showmaney"><i class="fa fa-link fa-lg"></i>'+xx.p_name+'</a></td><td>';
						str+=xx.sort.s_name+'</td><td>'+xx.p_area+'</td><td>'+xx.p_ml+'</td><td>';
						if(xx.sort.s_is==0)
							str+='<a><i class="fa fa-ban fa-lg"></i> 不可恢复</a>';
						else
							str+='<a class="backpro"><i class="fa fa-retweet fa-lg"></i> 恢复上架</a>';
						str+='</td></tr>';
						$("#proTbody").append(str);
						//$("#proTbody").append('<tr><td>'+(index+1)+'</td><td><a class="nameItem"><i class="fa fa-link fa-lg"></i>'+xx.PName+'</a><input type="hidden" value="'+xx.PName+'_'+xx.TSort.SId+'"></input></td><td>'+xx.TSort.SName+'</td></tr>');
					}else{
						$current=xx.current;
						$up=xx.up;
						$next=xx.next;
						$allpages=xx.allpages;
						$allcount=xx.allcount;
						addFenye();
					}
				});
				$(".pagin").removeClass("zeroItem");
			}else{
				var str='<table align="center"><tr><td style="line-height: 50px;"><img src="'+$webName+'/images/xiao.jpg" width="50" height="50">';
				str+='</td><td style="text-indent: 10px;">暂时还没有下架的商品呦！ </td></tr></table>';
				$(".pagin > .message").empty().append(str);
				$(".pagin").addClass("zeroItem");
			}
			$('.tablelist tbody tr:odd').addClass('odd');
		}
	});
};
//添加分页
function addFenye(){
	$(".pagin > .message").empty().append('统计：共<i class="blue"> '+$allcount+'</i> 条记录， 共<i class="blue"> '+$allpages+' </i>页，当前显示第&nbsp;<i class="blue">'+$current+'/'+$allpages+'&nbsp;</i>页');
	$(".pagin > .message").append('<ul class="paginList">');
	$(".paginList").append('<li class="paginItem"><a href="javascript:void(0)" class="first">首页</a></li>');
	$(".paginList").append('<li class="paginItem"><a href="javascript:void(0)" class="up">上一页</a></li>');
	$(".paginList").append('<li class="paginItem"><a href="javascript:void(0)" class="next">下一页</a></li>');
	$(".paginList").append('<li class="paginItem"><a href="javascript:void(0)" class="last">尾页</a></li>');
	$(".pagin > .message").append('<SPAN style="float: right;"> 转到第 <select class=select></select> 页</SPAN>');
	for(var i=1;i<=$allpages;i++){
		$(".select").append("<option value='"+i+"'>"+i+"</option>");
	}
	$(".select").val($current);
};

//增加商品
function addSort(){
	
	$(".proadd").bind('click',function(){
		layer.open( {
			type : 2,
			title : "增加商品",
			shadeClose : true,
			content : "productadd.jsp",
			skin : 'layui-layer-lan',
			shift: 3, //动画类型
			//创建完成层时回调
			success : function(layero, index) {
				layer.style(index, {
					width : '480px',
					height : '320px',
					top : '100px',
					left : ($(window).width() - 500) / 2
				});
			},
			//层被销毁回调
			end : function() {
				getAll($current);
			}
		});
	});
};

//所有类别
function allSort(){
	$(".proall").bind('click',function(){
		$seachType=1;
		getAll(1);	
	});
};
//下架类别
function alldelSort(){
	$(".prodel").bind('click',function(){
		$seachType=4;
		getAll(1);	
	});	
};
//进入第二层 查看商品信息 
function seePro(){
	$(document).on('click','.nameItem',function(){
		var nameid=$(this).next().val();
		$proName=nameid;
		$seachType=2;
		getAll(1);	
	});
};
//分页项
function pageItem(){
	$(document).on("click",".first",function() {
		getAll(1);
	});	
	$(document).on("click",".up",function() {
		getAll($up);
	});	
	$(document).on("click",".next",function() {
		getAll($next);
	});	
	$(document).on("click",".last",function() {
		getAll($allpages);
	});
	$(document).on("change",".select",function() {
		var $page=$(this).val();
		getAll($page);
	});
};
//修改信息
function uppitem(){
	$(document).on('click','.uppItem',function(){
		var proid=$(this).parent().parent().find("td:eq(0)").text();
		layer.open( {
			type : 2,
			title : "修改商品",
			shadeClose : true,
			content : "productupp.jsp?proid="+proid,
			skin : 'layui-layer-lan',
			shift: 3, //动画类型
			//创建完成层时回调
			success : function(layero, index) {
				layer.style(index, {
					width : '480px',
					height : '320px',
					top : '100px',
					left : ($(window).width() - 500) / 2
				});
			},end:function(){
				getAll($current);
			}
		});
	});
}
//showmaney
function seeyear(){
	$(document).on('click','.showmaney',function(){
		var proid=$(this).parent().parent().find("td:eq(0)").text();
		$proID=proid;
		$seachType=3;
		getAll(1);	
	});
}
//更新价格
function uppmoney(){
	$(document).on('click','.uppyear',function(){
		var proid=$(this).parent().parent().find("td:eq(0)").text().trim();
		layer.open( {
			type : 2,
			title : "更新价格",
			shadeClose : true,
			content : "productyear.jsp?proid="+proid,
			skin : 'layui-layer-lan',
			shift: 3, //动画类型
			//创建完成层时回调
			success : function(layero, index) {
				layer.style(index, {
					width : '480px',
					height : '320px',
					top : '100px',
					left : ($(window).width() - 500) / 2
				});
			}
		});	
	});
}
//下架
function delpro(){
	$(document).on('click','.delpro',function(){
		var proid=$(this).parent().parent().find("td:eq(0)").text();
		var str = '确定要下架' + proid + '号商品吗？';
		layer.confirm(str, {
			btn : [ '确定', '取消' ],
			title : '下架确定',
			skin : 'layui-layer-lan',
			shift: 1, //动画类型
			shadeClose : true,
			top : '30px',
			left : ($(window).width() - 400) / 2
		},function(){
			$.ajax({
				url:'delProduct.action',
				dataType:'json',
				data:{pid:proid},
				type:'post',
				success:function(mydata){
					if(mydata>0){
						getAll($current);
						layer.msg('下架成功！', {
							icon : 6,
							time : 3000
						});
					}else{
						layer.msg('下架失败！', {
							icon : 5,
							time : 3000
						});
					}
				}
			});
		});
	});
};

//上架
function backpro(){
	$(document).on('click','.backpro',function(){
		var proid=$(this).parent().parent().find("td:eq(0)").text();
		var str = '确定要恢复' + proid + '号商品吗？';
		layer.confirm(str, {
			btn : [ '确定', '取消' ],
			title : '恢复确定',
			skin : 'layui-layer-lan',
			shift: 1, //动画类型
			shadeClose : true,
			top : '30px',
			left : ($(window).width() - 400) / 2
		},function(){
			$.ajax({
				url:'recoverProduct.action',
				dataType:'json',
				data:{pid:proid},
				type:'post',
				success:function(mydata){
					if(mydata>0){
						getAll($current);
						layer.msg('恢复成功！', {
							icon : 6,
							time : 3000
						});
					}else{
						layer.msg('恢复失败！', {
							icon : 5,
							time : 3000
						});
					}
				}
			});
		});
	});
};
function upmoney(){
	var oldVal;
	$(document).on('dblclick','.upmoney',function(){
		//产品编号$proID
		var money=$(this).text();
		$(this).empty().append("<input class=input2></input>");
		money=money.substring(1,money.length);
		$(".tablelist .input2").focus();
		oldVal=money;
		$(".tablelist .input2").val(money);
		$(this).removeClass("upmoney");
	});
	$(document).on('blur','.tablelist .input2',function(){
		//旧值oldVal
		var newValue=$(this).val().trim();
		if(!newValue){
			$(this).parent().addClass("upmoney");
			$(this).parent().text("￥"+oldVal);
			layer.msg('修改失败，价格不能为空!!', {
				icon : 5,
				time : 1000
			});
		}else if(!(/^\d+(\.\d{1,2})?$/).test(newValue)){
			$(this).parent().addClass("upmoney");
			$(this).parent().text("￥"+oldVal);
			layer.msg('修改失败，价格格式错误!!', {
				icon : 5,
				time : 1000
			});
		}else{
			//可以
			var year=$(this).parent().parent().find("td:eq(0)").text();
			uppYearMoney(year,newValue);
		}
	});
};

function uppYearMoney(year,money){
	$.ajax({
		url:'productyear_saveOrUpp.action',
		dataType:'json',
		data:{
			pid:$proID,
			yname:year,
			yprice:money
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

function getAll(current){
	//layer.msg($seachType);
	if($seachType==1){
		getFirstAll(current);
	}else if($seachType==2){
		getSecondAll(current);
	}else if($seachType==3){
		getThirdAll(current);
	}else if($seachType==4){
		getDelAll(current);
	}
};