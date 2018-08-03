$(function() {
	var $current=0;
	var $up=0;
	var $next=0;
	var $allpages=0;
	var $allcount=0;
	var $editFlag=0;//部门操作的表示1为添加部门 2为修改部门
	//加载页面数据
	initPart();
	//添加部门
	addPart();
	//修改部门
	uppPart();
	//撤销部门
	delPart();
	//分页项
	pageItem();
});
function initPart(){
	$(".tablelist,.tablelist th").css("text-align","center");
	getAll(1);		
};
function getAll(current){
	$.ajax({
		url:'${pageContext.request.contextPath}/ShowPart.action',
		dataType:'json',
		data:{current:current,pis:3},
		type:'post',
		success:function(mydata){
			 var json = eval("("+mydata+")");
			$("#partTbody").empty();
			$.each(json,function(index,xx){
				if(xx.p_id!=null){
					var srt='<tr class="part-tr"><td>'+xx.p_id+'</td><td>';
					if(xx.p_id==0||$userLevel>-1)
						srt+='<span id="'+xx.p_id+'n">'+xx.p_name+'</span>';
					else
						srt+='<span id="'+xx.p_id+'n" ondblclick=huoname('+xx.p_id+',"'+xx.p_id+'n","'+xx.p_name+'");>'+xx.p_name+'</span>';
					srt+='</td><td id="'+xx.p_id+'sexs" style="text-align: left">';
					if(xx.p_id==0||$userLevel>-1)
						srt+='<span id="'+xx.p_id+'n">'+(xx.p_remark==null?'暂无备注':xx.p_remark)+'</span>';
					else
						srt+='<span id="'+xx.p_id+'s" ondblclick=huobei('+xx.p_id+',"'+xx.p_id+'s","'+xx.p_remark+'");>'+xx.p_remark+'</span>';
					srt+='</td><td>';
					if(xx.p_id==0||$userLevel!=-1)
						srt+='<a><span><i class="fa fa-ban fa-lg"></i> 不可操作</span></a>';
					else
						srt+='<a class="uppPart"> <i class="fa fa-edit fa-lg"></i>修改</a><input type="hidden" value="'+xx.p_id+'" />';
					srt+='</td><td>';
					if(xx.p_id==0||$userLevel!=-1)
						srt+='<a><span><i class="fa fa-ban fa-lg"></i> 不可操作</span></a>';
					else
						srt+='<a class="delPart"><i class="fa fa-reply fa-lg"></i> 撤销</a><input type="hidden" value="'+xx.p_id+'" />';
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
			$('.tablelist tbody tr:odd').addClass('odd');
		}
	});
};
//添加部门
function addPart(){
	//点击添加按钮的绑定cilck事件	
	$(".addPart").bind("click",function() {
		layer.open( {//弹出层
			type : 2,
			title : "添加部门",
			shadeClose : true,
			content : $webName+'/part/add.jsp',//内容
			skin : 'layui-layer-lan',//样式类名
			shift: 4, //动画类型
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
				getAll($current);
			}
		});
	});
};
//修改部门
function uppPart(){
	//点击修改部门的绑定cilck事件
	$(document).on("click",".uppPart",function() {
		var p_id = $(this).next().val();
		layer.open( {
			type : 2,
			title : "修改部门",
			shadeClose : true,
			content : $webName+'/FindPartById.action?p_id='+p_id,
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
				getAll($current);
			}
		});
	});
};

//撤销部门
function delPart(){
	//撤销部门
	$(document).on("click",".delPart",function() {
		var pid = $(this).next().val();
		trueDelPart(pid);
		//getTrueEmpClientCount
//		$.ajax({
//			url:'part_getTrueEmpClientCount.action',
//			dataType:'json',
//			data:{pid:pid},
//			type:'post',
//			success:function(mydata){
//				var json=eval("("+mydata+")");
//				if(json.length==0){
//					trueDelPart(pid);
//				}else{
//					var str = '该部门下有以下员工存在未交接的客户！<br/>';
//					$.each(mydata,function(index,xx){
//						if(index/3==0){
//							str+='['+xx.ETruename+']';
//						}else{
//							str+='['+xx.ETruename+']<br/>';
//						}
//					});
//					str += '<br/>请先完成客户的交接工作！！';
//					layer.confirm(str, {
//						btn : [ '确定'],
//						title : '撤销失败',
//						skin : 'layui-layer-lan',
//						shift : 1, //动画类型
//						shadeClose : true,
//						top : '30px',
//						left : ($(window).width() - 400) / 2
//					});
//				}
//			}
//		});
	});
};
function trueDelPart(pid){
	var str = '此操作会导致该部门下所有员工离职！<br/>确定要撤销' + pid + '号部门吗？';
	layer.confirm(str, {
		btn : [ '确定', '取消' ],
		title : '撤销确定',
		skin : 'layui-layer-lan',
		shift : 1, //动画类型
		shadeClose : true,
		top : '30px',
		left : ($(window).width() - 400) / 2
	}, function() {
		$.ajax({
			url:'http://localhost:8080/JAWeb/removePart.action',
			dataType:'json',
			data:{pid:pid},
			type:'post',
			success:function(mydata){
				if(mydata>0){
					layer.msg('撤销成功！', {
						icon : 6,
						time : 3000
					});
					getAll($current);
				}
			}
		});				
	});
}

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

//双击修改

//分页${pageContext.request.contextPath }/part_delPis.action?pid=${x.PId}

var xmlhttp;
var mxid;
var mpid;
var mxvalue;
var oldvalue;

//判断浏览器
function getIE() {

	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
}
//双击部门名称事件
function huoname(pid, xid, values) {
	mxid = xid;
	mpid = pid;
	oldvalue = values;
	document.getElementById(xid).outerHTML = "<input type=text id='" + xid
			+ "'  class='input' value='" + values + "' onblur=huonamechuan("
			+ pid + ",this,'" + xid + "')>";

	document.getElementById(xid).focus();

}
//部门名称输入框失去焦点事件
function huonamechuan(pid, obj, xid) {

	var ss = obj.value;
	mxvalue = ss;
	//输入了空值！！！
	if (mxvalue.length == 0) {
		layer.msg('部门名称不能为空！', {
			icon : 2,
			time : 2000
		});
		document.getElementById(mxid).outerHTML = "	<span id=" + mxid
				+ " ondblclick=huoname(" + mpid + ",'" + mxid + "','"
				+ oldvalue + "')>" + oldvalue + "</span>";
	} else {
		getIE();
		//先判断当前的是否部门名称是否存在
		var url = $webName+"/part_getNameCount.action?name="
				+ ss;
		var myurl = encodeURI(url);
		xmlhttp.open("post", myurl, true);
		xmlhttp.send();
		xmlhttp.onreadystatechange = getnameback;
	}
}
//查询数量之和的回调方法
function getnameback() {
	if (xmlhttp.readyState == 4 & xmlhttp.status == 200) {
		if (mxvalue == oldvalue || xmlhttp.responseText == 0) {
			//可以
			getnameback1();
		} else {
			//不可以

			layer.msg('部门名称已经存在！', {
				icon : 5,
				time : 2000
			});
			document.getElementById(mxid).outerHTML = "	<span id=" + mxid
					+ " ondblclick=huoname(" + mpid + ",'" + mxid + "','"
					+ oldvalue + "')>" + oldvalue + "</span>";
		}
	}
}
//可以修改 执行修改过程
function getnameback1() {
	getIE();
	var url =$webName+"/part_uppTpart.action?pid="
			+ mpid + "&pname=" + mxvalue + "";
	var myurl = encodeURI(url);
	xmlhttp.open("post", myurl, true);
	xmlhttp.send();
	xmlhttp.onreadystatechange = getname;
}
//部门名称的回调方法
function getname() {

	if (xmlhttp.readyState == 4 & xmlhttp.status == 200) {

		document.getElementById(mxid).outerHTML = "	<span id=" + mxid
				+ " ondblclick=huoname(" + mpid + ",'" + mxid + "','" + mxvalue
				+ "')>" + mxvalue + "</span>";
		layer.msg('修改成功！', {
			icon : 6,
			time : 2000
		});
	}

}
//部门备注的双击事件
function huobei(pid, xid, values) {

	mxid = xid;
	mpid = pid;
	document.getElementById(xid).outerHTML = "<input type=text id='" + xid
			+ "'  class='input' value='" + values + "' onblur=huobeichuan("
			+ pid + ",this,'" + xid + "')>";
	document.getElementById(xid).focus();

}
//部门输入框的失去焦点事件
function huobeichuan(pid, obj, xid) {
	var er = obj.value;
	mxvalue = er;
	getIE();
	var url =$webName+"/part_uppTpart.action?pid="
			+ pid + "&premark=" + er + "";
	var myurl = encodeURI(url);
	xmlhttp.open("post", myurl, true);
	xmlhttp.send();
	xmlhttp.onreadystatechange = getBei;

}
//部门备注的回调方法
function getBei() {
	if (xmlhttp.readyState == 4 & xmlhttp.status == 200) {

		document.getElementById(mxid).outerHTML = "	<span id=" + mxid
				+ " ondblclick=huobei(" + mpid + ",'" + mxid + "','" + mxvalue
				+ "')>" + mxvalue + "</span>";
		layer.msg('修改成功！', {
			icon : 6,
			time : 2000
		});
	}

}