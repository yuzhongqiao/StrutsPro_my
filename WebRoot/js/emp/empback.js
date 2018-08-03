$(function(){
	check();
	init();
});
function init(){
	$("#ETruename").attr("disabled",true);
	$(".dfinput1").css("width","115px");
}
function check(){
	$(".btn").bind('click',function(){
		var eid=$("#EID").val();
		var pid=$("#pid").val();
		var myemp="e_id="+eid+"&part.p_id="+pid;
	 	var i=layer.load(0);
	   	$.post('http://localhost:8080/JAWeb/recoverEmp.action?eid='+eid+'&pid='+pid,myemp,function(mydata){
		   layer.close(i);
		   if(mydata==1){
				parent.layer.msg('复职成功！', {
					icon : 6,
					time : 3000
				});
				var index = parent.layer.getFrameIndex(window.name); //获取窗口索引(真正的关 )
				parent.layer.close(index);
		   }else{
			   parent.layer.msg('复职失败',2,9);
		   }
	   	},'json');
	});
}