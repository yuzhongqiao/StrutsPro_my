$(function(){
	init();
	loading();
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
	$("#sortName").empty().append("<option value='-10'>-- 请选择 --</option>");
	
	var i= $("#sortName").val();
			$.ajax( {
			url : "report_OneSortCount.action",
			type : "post",
			data:{sid:i},
			dataType : "json",
			async : true,
			success : function(data) {
				botao(data, '<b style="font-size: 25px;">产品业绩销售统计图</b>');
			}
		});
	
			$.ajax({
		url:'FindSort.action',
		dataType:'json',
		data:'',
		type:'post',
		success:function(mydata){
			$.each(mydata,function(index,xx){
				$("#sortName").append('<option value="'+xx.s_id+'">'+xx.s_name+'</option>');
			});
		}
	});
};



function fruit() {
	
	$("#tjd").click(function() {

	 	var i= $("#sortName").val();
		if(false)
		{
            	layer.msg('至少选择一个产品类别！', {
				icon : 2,
				time : 2000
			});
			return false;
		}else{
				
		$.ajax( {
			url : "report_OneSortCount.action",
			type : "post",
			data:{sid:i},
			dataType : "json",
			async : true,
			success : function(data) {
				botao(data, '<b style="font-size: 25px;">产品业绩销售统计图</b>');
			}
		});
			
		}
	});
};



function botao(data,title){
	  $('#container').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: title
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories:data[0]
        },
        yAxis: {
            min: 0,
            title: {
                text: '产品销量业绩'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table  style="width: 130px;">',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} ￥</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        credits: {
          enabled:false
		},
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: data[1] 
    });
};
