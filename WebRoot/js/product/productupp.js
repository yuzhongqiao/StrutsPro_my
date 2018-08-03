$(function(){
	var $oldname="";
	var $oldarea="";
	var $oldml="";
	var $oldsid="";
	init();	
	check();
});
function init(){
	selectinit();
	datainit();
};
//填充下拉框
function selectinit(){
	$.ajax({
		url:'FindSort.action',
		dataType:'json',
		data:'',
		type:'post',
		success:function(mydata){
			$.each(mydata,function(index,xx){
				$("#psort").append('<option value="'+xx.s_id+'">'+xx.s_name+'</option>');
			});
		}
	});
};
//填充值proid
function datainit(){
	var proid = $("#proid").val();
	$.ajax( {
		url : 'findId.action',
		dataType : 'json',
		data : 'pid=' + proid,
		type : 'post',
		success : function(mydata) {
			if (mydata != null) {
				$("#PName").val(mydata.p_name);
				$("#PArea").val(mydata.p_area);
				$("#guige").val(mydata.p_ml);
				$("#psort").val(mydata.sort.s_id);
				$oldname=mydata.p_name;
				$oldarea=mydata.p_area;
				$oldml=mydata.p_ml;
				$oldsid=mydata.sort.s_id;
			}
		}
	});
};
function check(){
	$("#PName").bind("blur",function(){
		var PName=$("#PName").val().trim();
		if(PName.length==0){
			layer.tips('不能为空！', '#PName', {
				tipsMore : true,
				tips : [ 2, 'red' ]
			});
		}
	});
	$("#PArea").bind("blur",function(){
		var PArea=$("#PArea").val().trim();
		if(PArea.length==0){
			layer.tips('不能为空！', '#PArea', {
				tipsMore : true,
				tips : [ 2, 'red' ]
			});
		}
	});
	$("#PName,#PArea").bind("keyup",function(){
		var PName=$(this).val().trim();
		if (PName) {
			$(this).addClass("newsuccess");
			$(this).removeClass("newerror");
		}else{
			$(this).addClass("newerror");
			$(this).removeClass("newsuccess");
		}
	});
	$(".btn").bind("click",function(){
		checkCount();
	});
};
function checkCount(){
	var $num=0;
	var PName=$("#PName").val().trim();
	var PArea=$("#PArea").val().trim();
	var psort=$("#psort").val();
	var guige=$("#guige").val();
	if(PName.length==0){
		layer.tips('不能为空！', '#PName', {
			tipsMore : true,
			tips : [ 2, 'red' ]
		});
		$num=$num+1;
	}
	if(PArea.length==0){
		layer.tips('不能为空！', '#PArea', {
			tipsMore : true,
			tips : [ 2, 'red' ]
		});
		$num=$num+1;
	}
	//alert($oldname+" "+$oldarea+" "+$oldml+" "+$oldsid);
	//alert(PName+" "+PArea+" "+guige+" "+psort);
	if($num==0){
		$.ajax({
			url:'checkRepeat.action',
			dataType:'json',
			data:{
				pname:PName,
				parea:PArea,
				sid:psort
			},
			type:'post',
			success:function(mydata){
				if(mydata>0&&!($oldname==PName&&$oldarea==PArea&&$oldsid==psort)){					
					layer.msg('该类别下已经存在此产地的此商品！！', {
						icon : 2,
						time : 2000
					});
				}else{
					commitForm();
				}
			}
		});
	}
};
function commitForm(){
	var PName=$("#PName").val().trim();
	var PArea=$("#PArea").val().trim();
	var psort=$("#psort").val();
	var guige=$("#guige").val();
	var ididid= $("#proid").val();
	var myProduct = "product.p_id=" + ididid+"&product.p_name=" + PName + "&product.p_area=" + PArea
			+ "&product.p_ml="+guige+"&sort.s_id="+psort;
	//alert(myProduct);
	var i = layer.load(0);
	$.post('uppProduct.action', myProduct, function(mydata) {
		layer.close(i);
		if (mydata == 1) {
			parent.layer.msg('修改成功！', {
				icon : 6,
				time : 3000
			});
			var index = parent.layer.getFrameIndex(window.name); //获取窗口索引(真正的关 )
			parent.layer.close(index);
		} else {
			parent.layer.msg('修改失败', 2, 9);}}, 'json');
}
