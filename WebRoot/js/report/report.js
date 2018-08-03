$(function(){
	var $pid=0;
	var $bian=0;
	init();
	fruit();
	loading();
 	partName1();
 	partName2();
 	//click();
	
});
function init(){
	Highcharts.setOptions({
            lang: {
               　 printChart:"打印图表",
                  downloadJPEG: "下载JPEG 图片" , 
                  downloadPDF: "下载PDF文档"  ,
                  downloadPNG: "下载PNG 图片"  ,
                  downloadSVG: "下载SVG 矢量图" , 
                  exportButtonTitle: "导出图片" 
            }
        });
};


//加载的方法
function loading()
{
	$("#partName").empty().append("<option value='-10'>-- 请选择 --</option>");
	$("#partName1").empty().append("<option value='-10'>-- 请选择 --</option>");
	$("#partName2").empty().append("<option value='-10'>-- 请选择 --</option>");
	
	
		var pid=$("#partName").val();
		var pid1=$("#partName1").val();
		var pid2=$("#partName2").val();
		
//		if (pid==-10) {
//			
//		      	$("#partName").addClass("newerror");
//			    $("#partName1").addClass("newerror");
//				$("#partName2").addClass("newerror");
//				$("#partName2").focus();
//			layer.msg('至少选择一个部门！', {
//				icon : 2,
//				time : 2000
//			});
//				return false;
//			}

		
		$.ajax( {
			url : $webName+"/report_oneAllCount.action",
			type : "post",
			dataType : "json",
			data:{pid:pid,pid1:pid1,pid2:pid2},
			async : false,
			success : function(data) {
				bread(data, '<b style="font-size: 25px;">部门业绩统计图</b>');
			}
		});
	
	
		$.ajax( {
			url : 'FindPart3.action',
			dataType : 'json',
			data : '',
			type : 'post',
			success : function(mydata) {
				var json=eval("("+mydata+")");
				$.each(json, function(index, xx) {
					$("#partName").append("<option value='" + xx.p_id + "'>" + xx.p_name + "</option>");
				});
			}
		});
};

function  partName1()
{
	$(document).on('change','#partName',function() {
		
		$pid =$(this).val();
        $.ajax( {
			url : '	FindPart3.action',
			dataType : 'json',
			type : 'post',
			success : function(mydata) {
				var json=eval("("+mydata+")");
				$("#partName1").empty().append("<option value='-10'>-- 请选择 --</option>");
				$("#partName2").empty().append("<option value='-10'>-- 请选择 --</option>");
				
				if($pid !=-10)
				{
					$.each(json, function(index, xx) {
		           //排除上一个下来框选中的值
					if(xx.p_id!=$pid){
						
					$("#partName1").append("<option value='" + xx.p_id + "'>" + xx.p_name + "</option>");
					}
				
				});
				}
			}
		});
	})
};


function  partName2()
{
	$(document).on('change','#partName1',function() {
		
		var pid1 =$(this).val();
        $.ajax( {
			url : '	FindPart3.action',
			dataType : 'json',
			type : 'post',
			success : function(mydata) {
				var json=eval("("+mydata+")");
        	if(pid1!=-10){
        		
        				$("#partName2").empty().append("<option value='-10'>-- 请选择 --</option>");
				$.each(json, function(index, xx) {
					if(xx.p_id!=$pid&&xx.p_id!=pid1){
						
					$("#partName2").append("<option value='" + xx.p_id + "'>" + xx.p_name + "</option>");
					}
				
				});
        		
        	}
			}
		});
	})
};

function fruit() {
	$("#tjd").click(function() {
		var pid=$("#partName").val();
		var pid1=$("#partName1").val();
		var pid2=$("#partName2").val();
		
//		if (pid==-10) {
//			
//		      	$("#partName").addClass("newerror");
//			    $("#partName1").addClass("newerror");
//				$("#partName2").addClass("newerror");
//				$("#partName2").focus();
//			layer.msg('至少选择一个部门！', {
//				icon : 2,
//				time : 2000
//			});
//				return false;
//			}

		
		$.ajax( {
			url : $webName+"/report_oneAllCount.action",
			type : "post",
			dataType : "json",
			data:{pid:pid,pid1:pid1,pid2:pid2},
			async : false,
			success : function(data) {
				bread(data, '<b style="font-size: 25px;">部门业绩统计图</b>');
			}
		});
	});
};

//function click()
//{
//	
//   $(document).on('change','#partName',function() {
//		 $bian =$(this).val();
//		if( $bian==-10){
//			$(this).addClass("newerror");
//			$(this).removeClass("newsuccess");
//			
//		}else{
//			$(this).removeClass("newerror");
//			$("#partName1").removeClass("newerror");
//			$("#partName2").removeClass("newerror");
//		}
//	});
//   
//      $(document).on('change','#partName1',function() {
//		 var a =$(this).val();
//		if(a==-10&& $bian==-10){
//			$(this).addClass("newerror");
//			$(this).removeClass("newsuccess");
//		}else{
//			$(this).removeClass("newerror");
//		}
//	});
//      
//         $(document).on('change','#partName2',function() {
//		 var b =$(this).val();
//		if( b==-10&& $bian==-10){
//			$(this).addClass("newerror");
//			$(this).removeClass("newsuccess");
//		}else{
//			$(this).removeClass("newerror");
//		}
//	});
//	
//};


function bread(Data, title) {
	
	 $('#container').highcharts({
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: title
        },
        tooltip: {
            pointFormat: '部门销量占比: <b>{point.percentage:.1f}%'
           
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format:  '<b style="font-size: 14px;">{point.name}</b>:<b style="font-size: 16px;">{point.percentage:.1f} %</b>'
                }
            }
        },
        credits: {
          enabled:false
		},
        series: [{
            type: 'pie',
            data: Data
        }]
    });
};