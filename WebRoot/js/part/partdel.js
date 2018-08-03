$(function() {
	var $current=0;
	var $up=0;
	var $next=0;
	var $allpages=0;
	var $allcount=0;
	var $editFlag=0;//部门操作的表示1为添加部门 2为修改部门
	//加载页面数据
	initPart();
	
	//恢复部门
	huiPart();
	//分页项
	pageItem();
});
function initPart(){
	$(".tablelist,.tablelist th").css("text-align","center");
	getAll(1);		
}
function getAll(current){
	$.ajax({
		url:'http://localhost:8080/JAWeb/ShowRemove.action',
		dataType:'json',
		data:{current:current,pis:3},
		type:'post',
		success:function(mydata){
			var json = eval("("+mydata+")");
			$("#partTbody").empty();
			if(json.length>=1){
				$.each(json,function(index,xx){
					if(xx.p_id!=null){
						var srt='<tr class="part-tr"><td>'+xx.p_id+'</td><td>';
						srt+='<span>'+xx.p_name+'</span>';
						srt+='</td><td style="text-align: left">';
						srt+='<span>'+(xx.p_remark==null?'暂无备注':xx.p_remark)+'</span>';
						srt+='</td><td>';
						$userLevel=-1;
						if($userLevel!=-1)
							srt+='<a><span><i class="fa fa-ban fa-lg"></i> 不可操作</span></a>';
						else
							srt+='<a class="huiPart"><i class="fa fa-retweet fa-lg"></i> 恢复部门</a><input type="hidden" value="'+xx.p_id+'" />';
						srt+='</td></tr>';	
						$("#partTbody").append(srt);
					}
						$current=xx.current;
						$up=xx.up;
						$next=xx.next;
						$allpages=xx.allpages;
						$allcount=xx.allcount;
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
				);
			}else{
				var str='<table align="center"><tr><td style="line-height: 50px;"><img src="'+$webName+'/images/xiao.jpg" width="50" height="50">';
				str+='</td><td style="text-indent: 10px;">很庆幸！目前还没有被删除的部门。</td></tr></table>';
				$(".pagin > .message").empty();
				$(".pagin").append(str);
				$(".pagin").addClass("zeroItem");
			}
			$('.tablelist tbody tr:odd').addClass('odd');
		}
	});
};

//恢复部门
function huiPart(){
	//恢复部门
	$(document).on("click",".huiPart",function() {
		var pid = $(this).next().val();
		$.ajax({
			url:'http://localhost:8080/JAWeb/recoverPart.action',
			dataType:'json',
			data:{pid:pid},
			type:'post',
			success:function(mydata){
				if(mydata>0){
					layer.msg('恢复成功！', {
						icon : 6,
						time : 2000
					});
					getAll($current);
				}
			}
		});				
	});
};


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
