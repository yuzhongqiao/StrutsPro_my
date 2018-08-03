$(function() {
	var $current=0;
	var $up=0;
	var $next=0;
	var $allpages=0;
	var $allcount=0;
	//加载页面数据
	initPart();
	//分页项
	pageItem();
	//恢复离职员工
	huiEmp();
});
function initPart(){
	$(".tablelist,.tablelist th").css("text-align","center");
	getAll(1);
};
function getAll(current){
	$.ajax({
		url:'http://localhost:8080/JAWeb/FindEmpByIs.action',
		dataType:'json',
		data:{current:current,eis:0},
		type:'post',
		success:function(mydata){
			$("#empTbody").empty();
			var json = eval("("+mydata+")");
			if(json.length>=1){
				$.each(json,function(index,xx){
					if(xx.e_id!=null){
						var srt='<tr class="part-tr"><td>'+xx.e_id+'</td><td id="'+xx.e_id+'tt">';
						srt+='<span id="'+xx.e_id+'t">'+xx.part.p_name+'</span>';
						srt+='</td><td>';
						srt+='<span id="'+xx.e_id+'n">'+xx.e_loginname+'</span>';
						srt+='</td><td>';
						//srt+='<span id="'+xx.EId+'w">'+xx.EPsw+'</span>';
						if($userLevel!=-1)
							srt+='<span id="'+xx.e_id+'w">******</span>';
						else
							srt+='<span id="'+xx.e_id+'w">'+xx.e_psw+'</span>';
						srt+='</td><td>';
						if(xx.e_img==null)
							srt+='<img src='+$webName+'/upfile/default.jpg width="50" height="50">';
						else
							srt+='<img src='+$webName+'/'+xx.e_img+' width="50" height="50">';
						srt+='</td><td id="'+xx.e_id+'sexs">';
						srt+='<span id="'+xx.e_id+'s">'+xx.e_sex+'</span>';
						//员工类别
						srt+='</td><td>'+(xx.e_flag==1?'部门主管':xx.e_flag==0?'普工':'系统管理员');
						//权限级别
						srt+='</td><td>'+(xx.e_admin==1?'部门主管':xx.e_admin==0?'普通操作者':'系统管理员');
						srt+='<td>'+xx.e_truename+'</td><td>'+(xx.e_remark==null?'暂无备注':xx.e_remark)+'</td><td>';
						if($userLevel!=-1)
							srt+='<a><span><i class="fa fa-ban fa-lg"></i> 不可操作</span></a>';
						else
							srt+='<a class="uppEmp"><i class="fa fa-retweet fa-lg"></i> 恢复员工</a><input type="hidden" value="'+xx.e_id+'" />';
						$("#empTbody").append(srt);
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
					
				});
			}else{
				var str='<table align="center"><tr><td style="line-height: 50px;"><img src="'+$webName+'/images/xiao.jpg" width="50" height="50">';
				str+='</td><td style="text-indent: 10px;">很庆幸！目前还没有离职的员工。</td></tr></table>';
				$(".pagin > .message").empty();
				$(".pagin").append(str);
				$(".pagin").addClass("zeroItem");
			}
			$('.tablelist tbody tr:odd').addClass('odd');
		}
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

function huiEmp(){
	//查看撤销员工信息
	$(document).on('click','.uppEmp',function() {
		var eid = $(this).next().val();
		$.ajax( {
			type : "post",
			url : "http://localhost:8080/JAWeb/ShowPartCount.action",
			async : true,
			success : (function(msg) {
				var json = eval("("+msg+")");
				if (json.count > 0) {					
					layer.open( {
						type : 2,
						title : "恢复员工",
						shadeClose : true,
						content : "http://localhost:8080/JAWeb/FindPart2.action?eid="+eid,
						skin : 'layui-layer-lan',
						//创建完成层时回调
						success : function(layero, index) {
							layer.style(index, {
								width : '280px',
								height : '200px',
								top : '100px',
								left : ($(window).width() - 280) / 2
							});
						},
						//层被销毁回调
						end : function() {
							getAll($current);
						}
					});
				} else {
					layer.msg('没有正在运作的部门，请先添加部门！', {
						icon : 2,
						time : 3000
					});
				}
			})
		});
	});
};
