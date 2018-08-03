$(function() {
	var $current=0;
	var $up=0;
	var $next=0;
	var $allpages=0;
	var $allcount=0;
	var $seachType=1;
	var $proID=0;
	init();
	//二级联动
	sortChange();
	//查找按钮的点击事件
	seachBtn();
	//分页
	pageItem();
	//显示钱数
	showMoney();
});
function init() {
	$("#sort").empty().append("<option value='-10'>-- 请选择 --</option>");
	$("#pro").empty().append("<option value='-10'>-- 请选择 --</option>");
	$("#proTit").empty().append("<tr><th>编号</th><th>商品名</th><th>产地</th><th>类别</th><th>规格</th><th>商品状态</th></tr>");
	$.ajax( {
		url : 'FindSort.action',
		dataType : 'json',
		data : '',
		type : 'post',
		success : function(mydata) {
			$.each(mydata,function(index,xx){
				$("#sort").append("<option value='"+xx.s_id+"'>"+xx.s_name+"</option>");
			});
			$seachType=1;
			getAll(1);
		}
	});
};
//二级联动
function sortChange(){
	$("#sort").bind("change",function(){
		var sortid=$(this).val();
		$.ajax( {
			url : 'getProductName.action',
			dataType : 'json',
			data : 'sid='+sortid,
			type : 'post',
			success : function(mydata) {
				$("#pro").empty().append("<option value='-10'>-- 请选择 --</option>");
				$.each(mydata,function(index,xx){
					$("#pro").append("<option>"+xx+"</option>");
				});
			}
		});
	});
};

function seachBtn(){
	$(".scbtn").bind('click',function(){
		$seachType=1;
		getAll(1);
	});
};
function getFirstAll(current){
		var sortid=$("#sort").val();
		var pro=$("#pro").val();
		$.ajax( {
			url : 'productSeach.action',
			dataType : 'json',
			data : {
				sid:sortid,
				pname:pro,
				current:current
			},
			type : 'post',
			success : function(mydata) {
				var json = eval("("+mydata+")");
				$("#proTit").empty().append("<tr><th>编号</th><th>商品名</th><th>产地</th><th>类别</th><th>规格</th><th>商品状态</th></tr>");
				$("#proTbody").empty();
				if(json.length>=1){
					$.each(json,function(index,xx){
						if(xx.p_name!=null){
							var str='<tr><td>'+xx.p_id+'</td><td>'
							+'<a class="showmaney"><i class="fa fa-link fa-lg"></i>'+xx.p_name+'</a></td><td>'
							+xx.p_area+'</td><td>'+xx.sort.s_name+'</td><td>'+xx.p_ml+'</td><td>'						
							+(xx.p_is==1?'在售':'已下架')+'</td></tr>';
							$("#proTbody").append(str);
						}//else{
							$current=xx.current;
							$up=xx.up;
							$next=xx.next;
							$allpages=xx.allpages;
							$allcount=xx.allcount;
							addFenye();
						//}
					});
					$(".pagin").removeClass("zeroItem");
				}else{
					var str='<table align="center"><tr><td style="line-height: 50px;"><img src="'+$webName+'/images/xiao.jpg" width="50" height="50">';
					str+='</td><td style="text-indent: 10px;">暂时还没有满足条件的商品呦！ </td></tr></table>';
					$(".pagin > .message").empty().append(str);
					$(".pagin").addClass("zeroItem");
				}
			}
		});
};
function getSecondAll(current){
	$.ajax({
		url:'ShowProductYear.action',
		dataType:'json',
		data:{pid:$proID,current:current},
		type:'post',
		success:function(mydata){
			var json = eval("("+mydata+")");
			$("#proTit").empty().append('<tr><th>年份</th><th>价格（元）</th></tr>');
			$("#proTbody").empty();
			if(json.length>=1){
				$.each(json,function(index,xx){
					if(xx.y_name!=null){
						//<tr><td>1</td><td>工工业酒精</td><td>武汉</td><td>ML</td><td>修修改信息</td><td>更更新价格</td><td>下下架</td></tr>
						var str='<tr><td>'+xx.y_name+'</td><td>￥'
						+xx.y_price+'</td></tr>';
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
function showMoney(){
	$(document).on('click','.showmaney',function(){
		var pid=$(this).parent().parent().find("td:eq(0)").text();
		$proID=pid;
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
function getAll(current){
	//layer.msg($seachType);
	if($seachType==1){
		getFirstAll(current);
	}else if($seachType==2){
		getSecondAll(current);
	}
};