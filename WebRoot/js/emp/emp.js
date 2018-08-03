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
	//离职员工
	delEmp();
	//添加员工
	addEmp();
	//修改员工
	uppEmp();
});
function initPart(){
	$(".tablelist,.tablelist th").css("text-align","center");
	getAll(1);
};
function getAll(current){
	$.ajax({
		url:'http://localhost:8080/JAWeb/ShowEmp.action',
		dataType:'json',
		data:{current:current,pis:5},
		type:'post',
		success:function(mydata){
			var json = eval("("+mydata+")");
			$("#empTbody").empty();
			$.each(json,function(index,xx){
				if(xx.e_id!=null){
					var srt='<tr class="part-tr"><td>'+xx.e_id+'</td>';
					
					if(xx.e_id==0)
						srt+='<td>'+xx.e_truename+'</td>' ;
					else
						srt+='<td><span id="'+xx.e_id+'a" ondblclick=huotrue('+xx.e_id+',"'+xx.e_id+'a","'+xx.e_truename+'")>'+xx.e_truename+'</span></td>' ;
					
					srt+='<td id="'+xx.e_id+'tt">';
					if(xx.e_id==0||$userLevel!=-1)
						srt+='<span id="'+xx.e_id+'t">'+xx.part.p_name+'</span>';
					else
						srt+='<span id="'+xx.e_id+'t" ondblclick=huobu('+xx.e_id+',"'+xx.e_id+'t",'+xx.part.p_id+',"'+xx.part.p_name+'")>'+xx.part.p_name+'</span>';
					srt+='</td><td>';
					if(xx.e_id==0||$userLevel!=-1)
						srt+='<span id="'+xx.e_id+'n">'+xx.e_loginname+'</span>';
					else
						srt+='<span id="'+xx.e_id+'n" ondblclick=huoname('+xx.e_id+',"'+xx.e_id+'n","'+xx.e_loginname+'")>'+xx.e_loginname+'</span>';
					srt+='</td><td>';
					if(xx.e_id==0)
						srt+='<span id="${x.e_id}w">'+xx.e_psw+'</span>';
					else 
					{
						if($userLevel==-1)
							srt+='<span id="'+xx.e_id+'w" ondblclick=huopsw('+xx.e_id+',"'+xx.e_id+'w","'+xx.e_psw+'")>'+xx.e_psw+'</span>';
						if($userLevel==1&&$userID==xx.e_id)
							srt+='<span id="'+xx.e_id+'w" ondblclick=huopsw('+xx.e_id+',"'+xx.e_id+'w","'+xx.e_psw+'")>'+xx.e_psw+'</span>';
						if($userLevel==1&&$userID!=xx.e_id)
							srt+='<span id="'+xx.e_id+'w" ondblclick=huopsw('+xx.e_id+',"'+xx.e_id+'w","'+xx.e_psw+'")>******</span>';
						if($userLevel==0)
							srt+='<span id="'+xx.e_id+'w" ondblclick=huopsw('+xx.e_id+',"'+xx.e_id+'w","'+xx.e_psw+'")>'+xx.e_psw+'</span>';
					}
					
					srt+='</td><td id="'+xx.e_id+'sexs">';
					if(xx.e_id==0)
						srt+='<span id="'+xx.e_id+'s">'+xx.e_sex+'</span>';
					else
						srt+='<span id="'+xx.e_id+'s" ondblclick=huosex('+xx.e_id+',"'+xx.e_id+'s","'+xx.e_sex+'")>'+xx.e_sex+'</span>';
					srt+='</td><td>';
					if(xx.e_img==null)
						srt+='<img src='+$webName+'/upfile/default.jpg width="50" height="50">';
					else
						srt+='<img src='+$webName+'/'+xx.e_img+' width="50" height="50">';
					//员工类别
					srt+='</td><td>'+(xx.e_flag==1?'部门主管':xx.e_flag==0?'普工':'系统管理员');
					//权限级别
					srt+='</td><td>'+(xx.e_admin==1?'部门主管':xx.e_admin==0?'普通操作者':'系统管理员')+'<td>';
					if(xx.e_id==0||$userLevel!=-1)
						srt+='<a><span><i class="fa fa-ban fa-lg"></i> 不可操作</span></a>';
					else
						srt+='<a class="uppEmp"><i class="fa fa-edit fa-lg"></i> 修改</a>&nbsp;&nbsp;| <a class="delEmp"><i class="fa fa-user-times	 fa-lg"></i> 离职</a><input type="hidden" value="'+xx.e_id+'" />';
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
					}
			);
			//if($userLevel==0)
				//$(".pagin").hide();
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

//离职
function delEmp(){
	$(document).on("click",".delEmp",function() {
		var eid = $(this).parent().find("input").val();
		//getClientCount
		$.ajax({
			type : "post",
			url : "http://localhost:8080/JAWeb/getClientCount.action",
			data:'eid='+eid,
			async : true,
			success : (function(msg) {
				if(false){			
					var str = '请先交接该员工名下的客户！';
					layer.confirm(str, {
						btn : [ '确定' ],
						title : '离职失败',
						skin : 'layui-layer-lan',
						shift: 1, //动画类型
						shadeClose : true,
						top : '30px',
						left : ($(window).width() - 400) / 2
					});
				}else{
					var str = '确定要离职' + eid + '号员工吗？';
					layer.confirm(str, {
						btn : [ '确定', '取消' ],
						title : '离职确定',
						skin : 'layui-layer-lan',
						shift: 1, //动画类型
						shadeClose : true,
						top : '30px',
						left : ($(window).width() - 400) / 2
					}, function() {
						$.ajax({
							url:'http://localhost:8080/JAWeb/delEmp.action',
							dataType:'json',
							data:{eid:eid},
							type:'post',
							success:function(mydata){
								if(mydata>0){
									layer.msg('离职成功！', {
										icon : 6,
										time : 3000
									});
									getAll($current);
								}
							}
						});	
					});
				}
			})
		});	
	});
}

function addEmp(){
	//新增员工信息
	$(document).on("click",".addEmp",function() {
		$.ajax( {
			type : "post",
			url : "http://localhost:8080/JAWeb/ShowPartCount.action",
			async : true,
			success : (function(msg) {
				var json = eval("("+msg+")");
				if (json.count> 0) {
						layer.open( {
						type : 2,
						title : "添加员工",
						shadeClose : true,
						content : 'http://localhost:8080/JAWeb/FindPart.action',
						skin : 'layui-layer-lan',
						shift: 3, //动画类型
						//创建完成层时回调
						success : function(layero, index) {
							layer.style(index, {
								width : '500px',
								height : '520px',
								top : '30px',
								left : ($(window).width() - 500) / 2
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
function uppEmp(){
	//修改员工信息
	$(document).on("click",".uppEmp",function() {
		var eid = $(this).parent().find("input").val();
		$.ajax( {
			type : "post",
			url : "http://localhost:8080/JAWeb/ShowPartCount.action",
			async : true,
			success : (function(msg) {
				var json = eval("("+msg+")");
				if (json.count > 0) {
					layer.open( {
						type : 2,
						title : "修改员工",
						shadeClose : true,
						content : 'http://localhost:8080/JAWeb/findEmpById.action?eid=' + eid,
						skin : 'layui-layer-lan',
						shift: 3, //动画类型
						//创建完成层时回调
						success : function(layero, index) {
							layer.style(index, {
								width : '500px',
								height : '520px',
								top : '30px',
								left : ($(window).width() - 500) / 2
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

//分页

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

//********************员工登陆名称*************************
//双击用户名事件

function huoname(pid, xid, values) {
	if (sexnum == 1) {
		sexback();
	}
	if (selnum == 1) {
		selBack();
	}

	mxid = xid;
	mpid = pid;
	oldvalue = values;
	document.getElementById(xid).outerHTML = "<input type=text id='" + xid
			+ "' class='input' value='" + values + "' onblur=huonamechuan("
			+ pid + ",this,'" + xid + "')>";

	document.getElementById(xid).focus();

}

//用户名输入框失去焦点事件
function huonamechuan(pid, obj, xid) {
	var ss = obj.value;
	mxvalue = ss;
	//输入了空值！！！
	if (mxvalue.length == 0) {
		layer.msg('用户名不能为空！', {
			icon : 2,
			time : 2000
		});
		document.getElementById(mxid).outerHTML = "	<span id=" + mxid
				+ " ondblclick=huoname(" + mpid + ",'" + mxid + "','"
				+ oldvalue + "')>" + oldvalue + "</span>";
	} else {
		getIE();
		//先判断当前的是否用户名是否存在
		var url = $webName + "/emp_allloginnameCount.action?eloginname=" + ss;
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
			layer.msg('该用户名已经存在！', {
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
	var url = $webName + "/emp_uppTpart.action?eid=" + mpid + "&eloginname="
			+ mxvalue + "";
	var myurl = encodeURI(url);
	xmlhttp.open("post", myurl, true);
	xmlhttp.send();
	xmlhttp.onreadystatechange = getname;
}
//用户名的回调方法
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

//********************员工登陆密码*************************
//员工登陆密码的双击事件

function huopsw(pid, xid, values) {
	if (sexnum == 1) {
		sexback();
	}
	if (selnum == 1) {
		selBack();
	}

	mxid = xid;
	mpid = pid;
	oldvalue = values;
	document.getElementById(xid).outerHTML = "<input type=text id='" + xid
			+ "'  class='input' value='" + values + "' onblur=huopswchuan("
			+ pid + ",this,'" + xid + "')>";
	document.getElementById(xid).focus();

}
//员工登陆密码输入框的失去焦点事件
function huopswchuan(pid, obj, xid) {
	var er = obj.value;
	mxvalue = er;

	if (mxvalue.length == 0) {
		layer.msg('密码不能为空！', {
			icon : 2,
			time : 2000
		});

		document.getElementById(mxid).outerHTML = "	<span id=" + mxid
				+ " ondblclick=huopsw(" + mpid + ",'" + mxid + "','" + oldvalue
				+ "')>" + oldvalue + "</span>";
	} else {

		getIE();
		var url = $webName + "/emp_uppTpart.action?eid=" + pid + "&epsw=" + er
				+ "";
		var myurl = encodeURI(url);
		xmlhttp.open("post", myurl, true);
		xmlhttp.send();
		xmlhttp.onreadystatechange = getBei;
	}

}
//员工登陆密码的回调方法
function getBei() {
	if (xmlhttp.readyState == 4 & xmlhttp.status == 200) {
		if($userLevel==-1||$userLevel==0||$userID==mpid){
			document.getElementById(mxid).outerHTML = "	<span id=" + mxid
				+ " ondblclick=huopsw(" + mpid + ",'" + mxid + "','" + mxvalue
				+ "')>" + mxvalue + "</span>";
		}else {
			document.getElementById(mxid).outerHTML = "	<span id=" + mxid
				+ " ondblclick=huopsw(" + mpid + ",'" + mxid + "','" + mxvalue
				+ "')>******</span>";
		}

		layer.msg('修改成功！', {
			icon : 6,
			time : 2000
		});
	}
}
//********************员工真实姓名*************************
//员工登陆密码的双击事件

function huotrue(pid, xid, values) {
	if (sexnum == 1) {
		sexback();
	}
	if (selnum == 1) {
		selBack();
	}

	mxid = xid;
	mpid = pid;
	oldvalue = values;
	document.getElementById(xid).outerHTML = "<input type=text id='" + xid
			+ "'  class='input' value='" + values + "' onblur=huotruechuan("
			+ pid + ",this,'" + xid + "')>";
	document.getElementById(xid).focus();

}
//员工真实姓名输入框的失去焦点事件
function huotruechuan(pid, obj, xid) {
	var er = obj.value;
	mxvalue = er;

	if (mxvalue.length == 0) {
		layer.msg('真实姓名不能为空！', {
			icon : 2,
			time : 2000
		});

		document.getElementById(mxid).outerHTML = "	<span id=" + mxid
				+ " ondblclick=huotrue(" + mpid + ",'" + mxid + "','" + oldvalue
				+ "')>" + oldvalue + "</span>";
	} else {
		getIE();
		var url = $webName + "/emp_uppTpart.action?eid=" + pid + "&etruename=" + er;
		var myurl = encodeURI(url);
		xmlhttp.open("post", myurl, true);
		xmlhttp.send();
		xmlhttp.onreadystatechange = gettrue;
	}

}
//员工登陆密码的回调方法
function gettrue() {
	if (xmlhttp.readyState == 4 & xmlhttp.status == 200) {
		document.getElementById(mxid).outerHTML = "	<span id=" + mxid
			+ " ondblclick=huotrue(" + mpid + ",'" + mxid + "','" + mxvalue
			+ "')>" + mxvalue + "</span>";

		layer.msg('修改成功！', {
			icon : 6,
			time : 2000
		});
	}
}
//性别
var sexxid;
var sexid;
var sexvalue;
var sexnum;
/*
 var sexxid=mpid = pid;;
 var sexid=mxid = xid;;
 var sexvalue===xvalues;
 */
//********************员工性别*************************
//双击用户性别事件
function huosex(pid, xid, xvalues) {
	if (sexnum == 1) {
		sexback();
	}
	if (selnum == 1) {
		selBack();
	}
	sexxid = pid;
	sexid = xid;
	sexvalue = xvalues;
	var nan = "<input type=radio value='男' id='" + xid + "' onchange=sexli("
			+ pid + ",this,'" + xid
			+ "');  checked='checked'>男 <input type=radio value='女' id='" + xid
			+ "' onchange=sexli(" + pid + ",this,'" + xid + "');>女";

	var nv = "<input type=radio value='男' id='" + xid + "' onchange=sexli("
			+ pid + ",this,'" + xid + "'); >男 <input type=radio value='女' id='"
			+ xid + "' onchange=sexli(" + pid + ",this,'" + xid
			+ "'); checked='checked'>女";
	sexnum = 1;
	if (xvalues == '男') {
		document.getElementById(xid).outerHTML = nan;
	} else {
		document.getElementById(xid).outerHTML = nv;
	}

}
//性别改变的事件
function sexli(pid, obj, xid) {

	var zhi = obj.value;
	sexvalue = zhi;
	getIE();
	var biaoshi = xid.substring(xid.length - 1, xid.length);
	var url = "";
	if (biaoshi == "s") {
		url = $webName + "/emp_uppTpart.action?esex=" + zhi + "&eid=" + pid
				+ "";
	}
	var myurl = encodeURI(url);
	xmlhttp.open("post", myurl, true);
	xmlhttp.send();
	xmlhttp.onreadystatechange = getsex;
}
//修改性别之后的回调方法
function getsex() {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		var ss = sexxid + "sexs";
		document.getElementById(ss).innerHTML = "<span id=" + sexid
				+ " ondblclick=huosex(" + sexxid + ",'" + sexid + "','"
				+ sexvalue + "');>" + sexvalue + "</span>";
		layer.msg('修改成功！', {
			icon : 6,
			time : 2000
		});
		sexnum = 0;
	}
}
//性别回滚
function sexback() {
	var ss = sexxid + "sexs";
	document.getElementById(ss).innerHTML = "<span id=" + sexid
			+ " ondblclick=huosex(" + sexxid + ",'" + sexid + "','" + sexvalue
			+ "');>" + sexvalue + "</span>";
	sexnum = 0;
}

//部门
var mtid;
var selxid;
var selid;
var selvalue;
var selnum;
var selname;
var mtid1;
var selvalue1;
var selname1;
/*
 var selxid=mpid = pid;;
 var selid=mxid = xid;;
 var selvalue;
 mtid
 */
//********************员工部门*************************
//双击部门事件
function huobu(pid, xid, tid, name) {
	if (sexnum == 1) {
		sexback();
	}
	if (selnum == 1) {
		selBack();
	}
	selxid = pid;
	selid = xid;
	mtid = tid;
	selname = name;
	getIE();
	var url = $webName + "/emp_deptAll.action?eid=" + pid + "&pid=" + tid + "";
	var myurl = encodeURI(url);
	xmlhttp.open("post", myurl, true);
	xmlhttp.send();
	xmlhttp.onreadystatechange = getxia;
}
//双击部门的回调方法
function getxia() {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		var ssd = xmlhttp.responseText;
		document.getElementById(selid).outerHTML = ssd;
		selnum = 1;
	}
}
//部门改变时执行
function libin(pid, Obj) {
	var ss = Obj.options[Obj.selectedIndex].value;
	mtid1 = ss;
	selvalue1 = Obj.options[Obj.selectedIndex].innerHTML;
	selname1 = selvalue1;
	getIE();
	var url = $webName + "/emp_upppartEmp.action?pid=" + ss + "&eid=" + pid
			+ "";
	var myurl = encodeURI(url);
	xmlhttp.open("post", myurl, true);
	xmlhttp.send();
	xmlhttp.onreadystatechange = getbin;

}
//回调 修改页面
function getbin() {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		var ssd = xmlhttp.responseText;
		if(ssd>0){
			var ss = selxid + "tt";
			document.getElementById(ss).innerHTML = "<span id=" + selid
					+ " ondblclick=huobu(" + selxid + ",'" + selid + "','" + mtid1
					+ "','" + selname1 + "');>" + selname1 + "</span>";
			layer.msg('修改成功！', {
				icon : 6,
				time : 2000
			});
			selnum = 0;
		}else{
			layer.msg('修改失败！部门已经存在主管', {
				icon : 5,
				time : 2000
			});
			selBack();
		}
	}
}

function selBack() {
	var ss = selxid + "tt";
	document.getElementById(ss).innerHTML = "<span id=" + selid
			+ " ondblclick=huobu(" + selxid + ",'" + selid + "','" + mtid
			+ "','" + selname + "');>" + selname + "</span>";
	selnum = 0;
};
