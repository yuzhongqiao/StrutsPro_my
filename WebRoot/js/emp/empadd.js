$(function() {
	
	var $PCount="";
	var $Player;	
	//数据验证
	checkadd();
	//部门改变及联动
	partItem();
	//提交验证
	checkBtn();
	//头像预览
	imgYL();
		
});
function checkadd(){	
	//真是姓名非空验证
	$("#ETruename").focusout(function(){
		var truename=$("#ETruename").val();
		if(truename.length==0){
			layer.tips('真实姓名不能为空！', '#ETruename', {
				tips : [ 2, 'red' ]
			});
		}
	});
	$("#ETruename").keyup(function(){
		var truename=$("#ETruename").val();
		if(truename.length==0){
			layer.tips('真实姓名不能为空！', '#ETruename', {
				tips : [ 2, 'red' ]
			});
		}
	});
	//密码非空验证
	$("#EPsw").focusout(function(){
		var truename=$("#EPsw").val();
		if(truename.length==0){
			layer.tips('登录密码不能为空！', '#EPsw', {
				tips : [ 2, 'red' ]
			});
		};		
	});
	//用户名重复验证
	$("#ELoginname").focusout(function(){
		var loginname=$("#ELoginname").val();
		$.ajax({
			type:"post",
			url:"http://localhost:8080/JAWeb/getENameCount.action",
			async:true,
			data:"username="+loginname,
			success:(function(msg){
				if(msg>0){
					layer.tips('该用户名已存在！', '#ELoginname', {
						tips : [ 2, 'red' ]
					});
				}
				$("#botao").val(msg);
			})
		});
		if($("#ELoginname").val().length==0){
			layer.tips('用户名不能为空！', '#ELoginname', {
				tips : [ 2, 'red' ]
			});
		}
	});
};
//联动以及验证主管
function partItem(){
	//联动
	$("#EFlag").change(function() {
		var a = $("#EFlag option:selected").val();
		var pid=$("#PId").val();
		if(a==1){
			$("#EAdmin").empty().append("<option value='1'>部门主管</option>");
			checkPPP(pid);
		}else{
			$("#EAdmin").empty().append("<option value='0'>普通操作者</option>");
			layer.close($Player);
			$PCount=0;
		}
	})
	//部门改变
	$("#PId").change(function() {
		var pid=$("#PId").val();
		var a = $("#EFlag option:selected").val();
		if(a==1)
			checkPPP(pid);
		else
			layer.close($Player);
	})
};
//验证部门主管的唯一
function checkPPP(pid){
	$.ajax({
		url:'http://localhost:8080/JAWeb/getPCount.action',
		dataType:'json',
		data:{pid:pid},
		type:'post',
		success:function(mydata){
			var json=eval("("+mydata+")");
			$PCount=json;
			if(json.count>0){
				$Player=layer.tips('当前部门已经存在部门主管', '#EFlag', {
					tips : [ 2, '#4476a7' ]
				});
			}else{
				layer.close($Player);
			}
		}
	});
};
//提交按钮的点击事件
function checkBtn(){
	$PCount=0;

	$(".btn").bind('click',function(){
		check();
	});
};
//数据验证
	var $ETruename=$("#ETruename").val();
	var $ELoginname=$("#ELoginname").val();
	var $EPsw=$("#EPsw").val();
	var $PId=$("#PId").val();
	var $ESex= $('input[name="emp.ESex"]:checked ').val()
	
	var $EImgimg=$("#EImgimg").val();
	var $ERemark=$("#ERemark").val();
	var $EFlag=$("#EFlag").val();
	var $EAdmin=$("#EAdmin").val();
	
function check(){
	$ETruename=$("#ETruename").val();
	$ELoginname=$("#ELoginname").val();
	$EPsw=$("#EPsw").val();
	$PId=$("#PId").val();
	$ESex= $('input[name="emp.ESex"]:checked ').val();
	$EImgimg=$("#EImgimg").val();
	$ERemark=$("#ERemark").val();
	$EFlag=$("#EFlag").val();
	$EAdmin=$("#EAdmin").val();
	if($ETruename.length==0){
		layer.msg('请输入真实姓名！！', {
			icon : 2,
			time : 2000
		});
		$("#ETruename").focus();
		return false;
	}
	if($ELoginname.length==0){
		layer.msg('请输入登录名称！！', {
			icon : 2,
			time : 2000
		});
		$("#ELoginname").focus();
		return false;
	}
	if($("#botao").val()>0){
		layer.msg('当前用户名已经存在！！', {
			icon : 2,
			time : 2000
		});
		$("#ELoginname").focus();
		return false;	
	}else if($EPsw.length==0){
		layer.msg('请输入密码！！', {
			icon : 2,
			time : 2000
		});
		$("#EPsw").focus();
		return false;
	}else if($PCount>0){
		var confirmStr="该部门已经存在主管，是否替换该主管？";
		layer.confirm(confirmStr, {
			btn : [ '确定替换', '设为普工' ],
			title : '主管替换确定',
			skin : 'layui-layer-lan',
			shift : 1, //动画类型
			shadeClose : true,
			top : '30px',
			left : ($(window).width() - 400) / 2
		}, function() {
			submitForm();
		},function() {
			$EFlag=0;
			$EAdmin=0;
			submitForm();
		});
	}else{
		submitForm();
	}
};
//提交表单
function submitForm(){

	$.ajaxFileUpload({
		url:'http://localhost:8080/JAWeb/AddEmp.action',
		secureuri:false,//一般设置为false
		fileElementId:'EImgimg',//上传对象 
		data:{
			"e_id" :-10,
			"e_truename" : $ETruename,
			"e_loginname": $ELoginname,
			"e_psw": $EPsw,
			"part.p_id":$PId,
			"e_sex": $ESex,
			"photo":$EImgimg,
			"e_remark": $ERemark,
			"e_flag": $EFlag,
			"e_admin": $EAdmin
		}, //上传控件以外的控件对应的参数
		dataType: 'json',
		success:function(mydata,status){
			parent.layer.msg('添加成功！', {
				icon : 6,
				time : 3000
			});
			var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
			parent.layer.close(index);
		},
		error: function (data, status, e)//服务器响应失败处理函数
		{
			parent.layer.msg('添加成功！', {
				icon : 6,
				time : 3000
			});
			var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
			parent.layer.close(index);
	 	}
	});			
};
//头像预览
function imgYL(){
	$("#EImgimg").bind('change',function(){
		previewImage(this);
	});
}
//图片上传预览    IE是用了滤镜。
function previewImage(file){
  var MAXWIDTH  = 104; 
  var MAXHEIGHT = 104;
  var div = document.getElementById('preview');
  if (file.files && file.files[0])
  {
      div.innerHTML ='<img id=imghead>';
	  var img = document.getElementById('imghead');
	  img.onload = function(){
	    var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
	    img.width  =  rect.width;
	    img.height =  rect.height;
//                 img.style.marginLeft = rect.left+'px';
		img.style.marginTop = rect.top+'px';
      }
      var reader = new FileReader();
      reader.onload = function(evt){img.src = evt.target.result;}
      reader.readAsDataURL(file.files[0]);
  }
  else //兼容IE
  {
    var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
	file.select();
	var src = document.selection.createRange().text;
	div.innerHTML = '<img id=imghead>';
	var img = document.getElementById('imghead');
	img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
	var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
	status =('rect:'+rect.top+','+rect.left+','+rect.width+','+rect.height);
	div.innerHTML = "<div id=divhead style='width:"+rect.width+"px;height:"+rect.height+"px;margin-top:"+rect.top+"px;"+sFilter+src+"\"'></div>";
  }
}
function clacImgZoomParam( maxWidth, maxHeight, width, height ){
    var param = {top:0, left:0, width:width, height:height};
    if( width>maxWidth || height>maxHeight )
    {
        rateWidth = width / maxWidth;
        rateHeight = height / maxHeight;
        
        if( rateWidth > rateHeight )
        {
            param.width =  maxWidth;
            param.height = Math.round(height / rateWidth);
        }else
        {
            param.width = Math.round(width / rateHeight);
            param.height = maxHeight;
        }
    }
    
    param.left = Math.round((maxWidth - param.width) / 2);
    param.top = Math.round((maxHeight - param.height) / 2);
    return param;
}
