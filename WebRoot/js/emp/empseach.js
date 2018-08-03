$(function() {
	//分页全局属性
	var $current=2;
	var $up=0;
	var $next=0;
	var $allpages=0;
	var $allcount=0;
	//查询所需属性
	var $etruename="";
	var $esex="";
	var $pid="";
	init();
	getName();
	//查询开始
	seach();
	//分页项
	pageItem();
});

function init() {
	//关闭自带的输入提示
	$("#uname").attr("autocomplete", "off");
	//填充下拉框
	getPart();
	//获得第一页数据
	$etruename="";
	$esex=-10;
	$pid=-10;
	getSeachEmp($current=1);
	//事件
	$(document).keydown(function(e) {
		e = e || window.event;
		var keycode = e.which ? e.which : e.keyCode;
		if (keycode == 38) {
			if (jQuery.trim($("#seachDiv").html()) == "") {
				return;
			}
			movePrev();
		} else if (keycode == 40) {
			if (jQuery.trim($("#seachDiv").html()) == "") {
				return;
			}
			$("#uname").blur();
			if ($(".item").hasClass("addbg")) {
				moveNext();
			} else {
				$(".item").removeClass('addbg').eq(0).addClass('addbg');
			}

		} else if (keycode == 13) {
			dojob();
		}
	});
};
function getPart(){
	$.ajax({
		url:'http://localhost:8080/JAWeb/FindPart3.action',
		dataType:'json',
		data:'',
		type:'post',
		success:function(mydata){
			var json=eval("("+mydata+")");
			$("#scpart").empty().append('<option value="-10">-- 请选择 --</option>');
			$("#scpart").append('<option value="-1">待议</option>');
			$.each(json,function(index,xx){
				$("#scpart").append('<option value="'+xx.p_id+'">'+xx.p_name+'</option>');
			});
		}
	});
};

function seach(){
	$(document).on('click', '#scbtn', function() {
		$("#seachDiv").hide();
		$etruename=$("#uname").val();
		$esex=$("#scsex").val();
		$pid=$("#scpart").val();
		//alert($etruename+" "+$esex+" "+$pid);
		$current=1;
		getSeachEmp($current);
	});
};
function getSeachEmp(page){
	//alert($etruename+" "+$esex+" "+$pid+" "+current);
	//alert($etruename+" "+$esex+" "+$pid);
		$.ajax({
		url:'http://localhost:8080/JAWeb/empSeach.action',
		dataType:'json',
		data:{etruename:$etruename,esex:$esex,pid:$pid,current:page},
		type:'post',
		success:function(mydata){
			var json=eval("("+mydata+")");
			$("#empTbody").empty();
			$(".pagin").removeClass("zeroItem");
			if(json.length>=1){
				$(".pagin > .message").empty();
				$.each(json,function(index,xx){
					if(xx.e_id!=null){
						var srt='<tr class="part-tr"><td>'+xx.e_id+'</td><td id="'+xx.e_id+'tt">';
						srt+='<span id="'+xx.e_id+'t">'+xx.part.p_name+'</span>';
						srt+='</td><td>';
						srt+='<span id="'+xx.e_id+'n">'+xx.e_loginname+'</span>';
						srt+='</td><td>';
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
						srt+='<td>'+xx.e_truename+'</td><td>'+(xx.e_remark==null?'暂无备注':xx.e_remark)+'</td><td>'+(xx.e_is==0?'离职':'在职');
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
				str+='</td><td style="text-indent: 10px;">没有满足此搜索条件的员工呦！ </td></tr></table>';
				$(".pagin > .message").empty().append(str);
				$(".pagin").addClass("zeroItem");
			}
			$('.tablelist tbody tr:odd').addClass('odd');
		}
	});
};

//分页项
function pageItem(){
	$(document).on("click",".first",function() {
		getSeachEmp(1);
	});	
	$(document).on("click",".up",function() {
		getSeachEmp($up);
	});	
	$(document).on("click",".next",function() {
		getSeachEmp($next);
	});	
	$(document).on("click",".last",function() {
		getSeachEmp($allpages);
	});
	$(document).on("change",".select",function() {
		var $page=$(this).val();
		getSeachEmp($page);
	});
};

//键盘事件 以及模糊查询
function getName() {
	$(document).on('keyup', '#uname', function() {
		var truename = $(this).val();
		if (truename == "") {
			$("#seachDiv").hide();
		} else {
			$.ajax( {
				url : "http://localhost:8080/JAWeb/GetNameByLike.action",
				type : "POST",
				data : {
					etruename : truename
				},
				success : function(msg) {
					if (msg == "") {
						$("#seachDiv").hide();
					} else {
						$("#seachDiv").empty().show();
						var arr = msg.split('-');
						for ( var i = 0; i < arr.length - 1; i++) {
							var span = "<span  class='item' onmouseenter='getFocus(this)' onClick='getCon(this);'>"+ arr[i]+ "</span>";
							$("#seachDiv").append(span);
						}
					}
				}
			});
		}
	});
};
var movePrev = function() {
	$("#uname").blur();
	var index = $(".addbg").prevAll().length;
	if (index == 0) {
		$(".item").removeClass('addbg').eq($(".item").length - 1).addClass(
				'addbg');
	} else {
		$(".item").removeClass('addbg').eq(index - 1).addClass('addbg');
	}
}

var moveNext = function() {
	var index = $(".addbg").prevAll().length;
	if (index == $(".item").length - 1) {
		$(".item").removeClass('addbg').eq(0).addClass('addbg');
	} else {
		$(".item").removeClass('addbg').eq(index + 1).addClass('addbg');
	}
}

var dojob = function() {
	$("#uname").blur();
	var value = $(".addbg").text();
	$("#uname").val(value);
	$("#seachDiv").hide().html("");
}

function getFocus(obj) {
	$(".item").removeClass("addbg");
	$(obj).addClass("addbg");
}

function getCon(obj) {
	var value = $(obj).text();
	$("#uname").val(value);
	$("#seachDiv").hide().html("");
}
function nameClick() {
	$(document).on('click', "#seachDiv span", function() {
		var truename = $(this).text();
		$("#uname").val(truename);
		$("#seachDiv").hide();
	});
};