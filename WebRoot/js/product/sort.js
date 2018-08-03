$(function(){
	var $current=0;
	var $up=0;
	var $next=0;
	var $allpages=0;
	var $allcount=0;
	var $seachFlag=0;
	var $oldValue="";
	init();
	//增加类别
	addSort();
	//查询所有类别
	allSort();
	//查询下架类别
	alldelSort();
	//执行下架
	delSort();
	//执行恢复 上架
	backSort();	
	//分页项
	pageItem();
	//双击修改
	upItem();
});

function init(){
	$current=1;
	$seachFlag=1;
	getAll($current,$seachFlag);	
};
function getAll(current,s_is){
	$.ajax({
		url:'http://localhost:8080/JAWeb/ShowSort.action',
		dataType:'json',
		data:{current:current,s_is:s_is},
		type:'post',
		success:function(mydata){
			$("#empTbody").empty();
			var json=eval("("+mydata+")");
			if(json.length>=1){
			$.each(json,function(index,xx){
				if(xx.s_id!=null){
					var str='<tr>';
					if($userLevel!=-1)
						str+='<td>'+xx.s_id+'</td><td>'+xx.s_name+'</td><td>';
					else
						str+='<td>'+xx.s_id+'</td><td class="uppitem">'+xx.s_name+'</td><td class="uppitem">';
					str+=(xx.s_remark==null?'暂无备注':xx.s_remark)+'</td><td>';
					if($userLevel!=-1){
						str+='<a><span><i class="fa fa-ban fa-lg"></i> 不可操作</span></a>';
					}else{
						if(s_is==1)
							str+='<a href="javascript:void(0)" class="delItem"><i class="fa fa-trash fa-lg"></i> 下架</a>';
						else
							str+='<a href="javascript:void(0)" class="backItem"><i class="fa fa-trash fa-lg"></i> 恢复商品</a>';
					}
					
					str+='</td></tr>';
					$("#empTbody").append(str);
				}
					$current=xx.current;
					$up=xx.up;
					$next=xx.next;
					$allpages=xx.allpages;
					$allcount=xx.allcount;
					addFenye();
				
			});
			$('.tablelist tbody tr:odd').addClass('odd');
			$(".pagin").removeClass("zeroItem");
		}else{
				var str='<table align="center"><tr><td style="line-height: 50px;"><img src="'+$webName+'/images/xiao.jpg" width="50" height="50">';
				str+='</td><td style="text-indent: 10px;">';
				if(s_is!=0)
					str+='暂时还没有可用的商品类别呦！ ';
				else
					str+='暂时还没有已经删除的商品类别呦！ ';
				str+='</td></tr></table>';
				$(".pagin > .message").empty().append(str);
				$(".pagin").addClass("zeroItem");
		}
	}
});	
	

	

	$('.tablelist tbody tr:odd').addClass('odd');
};

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
}


function addSort(){
	$(".proadd").bind('click',function(){
		layer.open( {
			type : 2,
			title : "增加类别",
			shadeClose : true,
			content : "sortadd.jsp",
			skin : 'layui-layer-lan',
			shift: 3, //动画类型
			//创建完成层时回调
			success : function(layero, index) {
				layer.style(index, {
					width : '500px',
					height : '300px',
					top : '100px',
					left : ($(window).width() - 500) / 2
				});
			},
			//层被销毁回调
			end : function() {
				getAll($current,$seachFlag);
			}
		});
	});
};

//所有类别
function allSort(){
	$(".proall").bind('click',function(){
		$seachFlag=1;
		$current=1;
		getAll($current,$seachFlag);
	});
};
//下架类别
function alldelSort(){
	$(".prodel").bind('click',function(){
		$seachFlag=0;
		$current=1;
		getAll($current,$seachFlag);
	});	
};
//下架delItem
function delSort(){
	$(document).on("click",".delItem",function() {
		var s_id=$(this).parent().parent().find("td:eq(0)").text().trim();
		var sname=$(this).parent().parent().find("td:eq(1)").text().trim();
		var str = '确定要下架[' + sname + ']类别吗？';
		layer.confirm(str, {
			btn : [ '确定', '取消' ],
			title : '下架确定',
			skin : 'layui-layer-lan',
			shift: 1, //动画类型
			shadeClose : true,
			top : '30px',
			left : ($(window).width() - 400) / 2
		}, function() {
			$.ajax({
				url:'http://localhost:8080/JAWeb/DelSort.action',
				dataType:'json',
				data:{s_id:s_id},
				type:'post',
				success:function(mydata){
					if(mydata>0){
						layer.msg('下架成功！', {
							icon : 6,
							time : 3000
						});
						getAll($current,$seachFlag);
					}
				}
			});	
		});
	});	
};

//上架backItem
function backSort(){
	$(document).on("click",".backItem",function() {
		var s_id=$(this).parent().parent().find("td:eq(0)").text().trim();		
		$.ajax({
			url:'http://localhost:8080/JAWeb/RecoverSort.action',
			dataType:'json',
			data:{s_id:s_id},
			type:'post',
			success:function(mydata){
				if(mydata>0){
					layer.msg('恢复成功！', {
						icon : 6,
						time : 3000
					});
					getAll($current,$seachFlag);
				}
			}
		});	
	});	
};

//分页项
function pageItem(){
	$(document).on("click",".first",function() {
		getAll(1,$seachFlag);
	});	
	$(document).on("click",".up",function() {
		getAll($up,$seachFlag);
	});	
	$(document).on("click",".next",function() {
		getAll($next,$seachFlag);
	});	
	$(document).on("click",".last",function() {
		getAll($allpages,$seachFlag);
	});
	$(document).on("change",".select",function() {
		var $page=$(this).val();
		getAll($page,$seachFlag);
	});
};

//双击修改
function upItem(){
	$(document).on("dblclick",".uppitem",function() {
		//var a=$(this).is($(this).parent().find("td:eq(1)"));
		var parent=$(this).parent();
		var value=$(this).text();
		$oldValue=value;
		$(this).empty().append("<input class='input'></input>");
		parent.find(".input").focus().val(value);
		$(this).removeClass("uppitem");
	});
	$(document).on("blur",".input",function() {
		var id=$(this).parent().parent().find("td:eq(0)").text().trim();
		var value=$(this).val();
		var parent=$(this).parent();//td
		var a=$(this).parent().is($(this).parent().parent().find("td:eq(1)"));
		if(a){//修改名字
			if(value.length==0){
				layer.msg('修改失败，类别名不能为空！！', {
					icon : 2,
					time : 2000
				});
				parent.empty().append($oldValue);
				parent.addClass("uppitem");
				return false;
			}
			$.ajax({
				type:"post",
				url:"sort_getNameCount.action",
				async:true,
				data:"name="+value,
				success:(function(msg){
					if(msg>0&&$oldValue!=value){
						layer.msg('修改失败，该类别名已经存在！！', {
							icon : 2,
							time : 2000
						});
						parent.empty().append($oldValue);
						parent.addClass("uppitem");
					}else{
						$.ajax({
							type:"post",
							url:"sort_uppTSort.action",
							async:true,
							data:{
								sid:id,
								sname:value
							},
							success:(function(msg){
								if(msg>0){
									layer.msg('修改成功！！', {
										icon : 6,
										time : 2000
									});
									parent.empty().append(value);;
									parent.addClass("uppitem");
								}else{
									layer.msg('修改失败！！', {
										icon : 5,
										time : 2000
									});
									parent.empty().append($oldValue);
									parent.addClass("uppitem");
								}
							})
						});	
					}
				})
			});				
		}else{//修改备注
			$.ajax({
				type:"post",
				url:"sort_uppTSort.action",
				async:true,
				data:{
					sid:id,
					sremark:value
				},
				success:(function(msg){
					if(msg>0){
						layer.msg('修改成功！！', {
							icon : 6,
							time : 2000
						});
						parent.empty().append(value);
						parent.addClass("uppitem");
					}else{
						layer.msg('修改失败！！', {
							icon : 5,
							time : 2000
						});
						parent.empty().append($oldValue);
						parent.addClass("uppitem");
					}
				})
			});	
		}
	});
};