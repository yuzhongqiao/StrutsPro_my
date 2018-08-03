$(function(){
	init();
	loading();
	empName();
	fruit();
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
	$("#empName").empty().append("<option value='-10'>-- 请选择 --</option>");
	
		 	var i=$("#empName").val();
	     	var p=$("#partName").val();
	 		$.ajax( {
			url : "report_reportAll.action",
			type : "post",
			data:{eid:i,pid:p},
			dataType : "json",
			async : true,
			success : function(data) {
				botao(data, '<b style="font-size: 25px;">员工个人业绩折线图</b>');
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

function empName()
{
		$(document).on('change','#partName',function() {
		var pid =$(this).val();
        		$.ajax( {
			url : '	FindEmpByPid.action',
			dataType : 'json',
			data : {
				pid : pid,
			},
			type : 'post',
			success : function(mydata) {
				var json=eval("("+mydata+")");
				$("#empName").empty().append("<option value='-10'>-- 请选择 --</option>");
				$.each(json, function(index, xx) {
					$("#empName").append("<option value='" + xx.e_id + "'>" + xx.e_truename + "</option>");
				});
			}
		});
	});
};

function fruit() {
	
	$("#tjd").click(function() {

	 	var i=$("#empName").val();
	 	var p=$("#partName").val();
	 	
//	 	if(i==-10&&p==-10)
//	 	{
//	 			layer.msg('至少选择一个部门！', {
//				icon : 2,
//				time : 2000
//			});
//				return false;
//	 	}
	 		
	 		$.ajax( {
			url : "report_reportAll.action",
			type : "post",
			data:{eid:i,pid:p},
			dataType : "json",
			async : true,
			success : function(data) {
				botao(data, '<b style="font-size: 25px;">员工个人业绩折线图</b>');
			}
		});
	});
};

function botao(data,title){
	  
	    $('#container').highcharts({
        title: {
            text: title,
            x: -20 //center
        },
        subtitle: {
            x: -20
        },
        xAxis: {
             categories:data[0]
        },
        yAxis: {
            title: {
                text: '人民币 (￥)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '￥'
        },
        credits: {
          enabled:false
		},
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
         series: data[1] 
    });
	  
};
