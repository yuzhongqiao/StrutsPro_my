<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>无标题文档</title>
		<link rel="stylesheet"
			href="${pageContext.request.contextPath }/css/style.css"
			type="text/css"></link>
		<script type="text/javascript"
			src="${pageContext.request.contextPath }/js/jquery.js">
</script>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/layer/layer.js">
</script>
		<SCRIPT type="text/javascript">
		var $partlayer;
$(function(){
	$("#SName").focus();
	$("#SName").focusout(function(){
		var sname=$("#SName").val();
		$.ajax({
			type:"post",
			url:"http://localhost:8080/JAWeb/FindSortName.action",
			async:true,
			data:"s_name="+sname,
			success:(function(msg){
				if(msg>0){
					layer.tips('该类别已存在！', '#SName', {
						tips : [ 2, 'red' ]
					});
				}
				$("#botao").val(msg);
			})
		});
		if($("#SName").val().length==0){
			layer.tips('类别名不能为空！', '#SName', {
				tips : [ 2, 'red' ]
			});
		}
	});	
	$("#SName").keyup(function() {
		layer.close($partlayer);
		var pname = $("#SName").val();
		$.ajax( {
			type : "post",
			url : "http://localhost:8080/JAWeb/FindSortName.action",
			async : true,
			data : "S_name=" + pname,
			success : (function(msg) {
				if (msg == 0&&pname) {
					$("#SName").addClass("newsuccess");
					$("#SName").removeClass("newerror");
				}else{
					$("#SName").addClass("newerror");
					$("#SName").removeClass("newsuccess");
				}
			})
		});
	});
	$("#SRemark").keyup(function() {
		var PRemark=$(this).val();
		if(PRemark){
			$("#SRemark").addClass("newsuccess");
		}else{
			$("#SRemark").removeClass("newsuccess");
		}
	});
});
function commitItem(){
	var SnameCount=$("#botao").val();
	var SName=$("#SName").val();
	var SRemark=$("#SRemark").val();
	if(SnameCount>0){
		$partlayer=layer.tips('该类别已存在！', '#SName', {
			tips : [ 2, 'red' ]
		});
		$("#SName").focus();
	}else if(SName.length==0){
		$partlayer=layer.tips('类别名不能为空！', '#SName', {
			tips : [ 2, 'red' ]
		});
		$("#SName").focus();
		return false;
	}else{
	   var mysort="s_name="+SName+"&s_remark="+SRemark;
	   var i=layer.load(0);
	   $.post('http://localhost:8080/JAWeb/AddSort.action',mysort,function(mydata){
		   layer.close(i);
		   if(mydata==1){
				parent.layer.msg('添加成功！', {
					icon : 6,
					time : 3000
				});
				var index = parent.layer.getFrameIndex(window.name); //获取窗口索引(真正的关 )
				parent.layer.close(index);
		   }else{
			   parent.layer.msg('增加失败',2,9);
		   }
	   },'json');
	}
	return false;	
}

</SCRIPT>
		<STYLE type="text/css">
.forminfo1 li {
	margin-bottom: 15px;
	clear: both;
}
</STYLE>
	</head>

	<body>
		<div class="formbody">
			<ul class="forminfo1">
				<li>
					<label>
						类别名称：
					</label>
					<input type="text" id="SName" class="dfinput1" placeholder="请输入类别名称" />
				</li>

				<li>
					<label>
						类别备注：
					</label>
					<textarea cols="" rows="" class="textinput2" id="SRemark"  placeholder="请输入类别备注"></textarea>
				</li>
				<li>
					<label>
						&nbsp;
					</label>
					<input type="submit" class="btn" onclick="commitItem();"
						value="新增类别" />
				</li>
			</ul>
		</div>
		<input type="hidden" id="botao">
	</body>
</html>
