$(function() {

	var $prod=0;
	var $scock=0;
	//初始化方法
	init();
	//产品名称下拉框(第二级连动)
	productName();
	//产品产地下拉框 (第三级连动)
	productArea();
	//产品年份下拉框 (第四级连动)
	productYear();
	//根据产品年份获取价格
	YPrice();
	//提交
	submitOrder();
	
	//数据验证
	checkoo();

});

//初始化方法 加载产品类型
function init() {
	$("#productSort").empty().append("<option value='-10'>-- 请选择 --</option>");
	$("#productName").empty().append("<option value='-10'>-- 请选择 --</option>");
	$("#productArea").empty().append("<option value='-10'>-- 请选择 --</option>");
	$("#productYear").empty().append("<option value='-10'>-- 请选择 --</option>");
	$.ajax( {
		url : 'FindSort.action',
		dataType : 'json',
		data : '',
		type : 'post',
		success : function(mydata) {
			$.each(mydata, function(index, xx) {
				$("#productSort").append(
						"<option value='" + xx.s_id + "'>" + xx.s_name
								+ "</option>");
			});
			$scock=0;
		}
	});
};


//产品名称下拉框(第二级连动)
function productName() {
$(document).on('change','#productSort',function() {
		$("#productArea").empty().append("<option value='-10'>-- 请选择 --</option>");
		$("#productYear").empty().append("<option value='-10'>-- 请选择 --</option>");
		$("#jinPrice").val(0);
		var sid =$(this).val();
		  $prod=sid;
        		$.ajax( {
			url : '	getProductName.action',
			dataType : 'json',
			data : {
				sid : sid,
			},
			type : 'post',
			success : function(mydata) {
				$("#productName").empty().append("<option value='-10'>-- 请选择 --</option>");
				$.each(mydata, function(index, xx) {
					$("#productName").append("<option >" + xx + "</option>");
				});
			}
		});
	});
};


//产品产地下拉框 (第三级连动)
function productArea() {
	$(document).on('change','#productName',function() {
		$("#productYear").empty().append("<option value='-10'>-- 请选择 --</option>");
		$("#jinPrice").val(0);
		var pname = $(this).val();
		    $.ajax( {
			url : '	getProductArea.action',
			dataType : 'json',
			data : {
			   sid:$prod,
			   pname:pname
			},
			type : 'post',
			success : function(mydata) {
				$("#productArea").empty().append("<option value='-10'>-- 请选择 --</option>");
				$.each(mydata, function(index, xx) {
					$("#productArea").append("<option value='"+ xx[0] +"'>" + xx[1] + "</option>");
				});
			}
		});
	});
};


//产品年份下拉框 (第四级连动)
function productYear() {
	$(document).on('change','#productArea',function() {
		$("#jinPrice").val(0);
		var pid = $(this).val();
	    $.ajax( {
			url : '	ShowProductYear.action',
			dataType : 'json',
			data : {
			   pid:pid
			},
			type : 'post',
			success : function(mydata) {
				var json=eval("("+mydata+")");
				$("#productYear").empty().append("<option value='-10'>-- 请选择 --</option>");
				$.each(json, function(index, xx) {
					$("#productYear").append("<option value='"+ xx.y_id +"'>" + xx.y_name + "</option>");
				});
			}
		});
		$.ajax( {
			url : '	findStockNum.action',
			dataType : 'json',
			data : {
			   pid:pid
			},
			type : 'post',
			success : function(mydata) {
				//layer.msg(mydata);
				$scock=mydata;				
			}
		});
	});
};

//根据产品年份获取价格
function YPrice() {
	$(document).on('change','#productYear',function() {
		var pid = $(this).val();
		$.ajax( {
			url : '	getPrice.action',
			dataType : 'json',
			data : {
			   pid:pid
			},
			type : 'post',
			success : function(mydata) {				
				$("#jinPrice").val(mydata);
			}
		});
	});
};

var $addprolayer;
//提交
function submitOrder()
{
	
  $(document).on('click','#btn', function(){
	  
		var yid = $("#productYear").val();
		var pid = $("#productArea").val();
		var rid = $("#rid").val();
		var XCount=$("#count").val();
		var chuPrice=$("#chuPrice").val();
		var oldprice=parseFloat($("#jinPrice").val());
		if($("#productSort").val()==-10||$("#productName").val()==-10||yid==-10||pid==-10){
			if($("#productSort").val()==-10){
				layer.tips('请选择类别', '#productSort', {
					tips : [ 2, 'red' ],
					tipsMore: true
				});
			}
			if($("#productName").val()==-10){
				layer.tips('请选择名称', '#productName', {
					tips : [ 2, 'red' ],
					tipsMore: true
				});
			}
			if($("#productArea").val()==-10){
				layer.tips('请选择产地', '#productArea', {
					tips : [ 2, 'red' ],
					tipsMore: true
				});
			}
			if($("#productYear").val()==-10){
				layer.tips('请选择类别', '#productYear', {
					tips : [ 2, 'red' ],
					tipsMore: true
				});
			}
		}else if(!((/^\d+(\.\d{1,2})?$/).test(chuPrice))){
			$addprolayer=layer.tips('格式错误', '#chuPrice', {
				tips : [ 2, 'red' ]
			});
			$("#chuPrice").focus();
		}else if(!chuPrice){
			$addprolayer=layer.tips('不能为空', '#chuPrice', {
				tips : [ 2, 'red' ]
			});
			$("#chuPrice").focus();
		}else if(chuPrice<oldprice){
			layer.tips('价格过低', '#chuPrice', {
				tips : [ 2, 'red' ],
				tipsMore: true
			});
			$("#chuPrice").focus();
		}else if(!XCount){
			layer.tips('不能为空', '#count', {
				tips : [ 2, 'red' ],
				tipsMore: true
			});
			$("#count").focus();
		}else if(!((/^(\+|-)?\d+$/).test(XCount))){
			layer.tips('格式错误', '#count', {
				tips : [ 2, 'red' ],
				tipsMore: true
			});
			$("#count").focus();
		}else if(XCount>$scock){
			layer.tips('库存不足', '#count', {
				tips : [ 2, 'red' ],
				tipsMore: true
			});
			$("#count").focus();
		}else{
			var ss="ordersmx.orders.r_id="+rid+"&ordersmx.productyear.y_id="+yid+"&ordersmx.product.p_id="+pid+"&ordersmx.x_count="+XCount+"&ordersmx.x_price="+chuPrice+"";
			var i = layer.load(0);
			$.post("addOrdersmx.action",ss,function(mydata){
					layer.close(i);
				if (mydata >= 1) {
					parent.layer.msg('添加成功！', {
						icon : 6,
						time : 3000
					});
					var index = parent.layer.getFrameIndex(window.name); //获取窗口索引(真正的关 )
					parent.layer.close(index);	
				} else {
					parent.layer.msg('添加订单失败', 2, 9);
				}
			}, 'json');
			
		}
		
	});
};

	
  //数据验证
function checkoo(){	
	$(".selectinput1").bind('change',function(){
		var ss=$(this).val();
		if(ss!=-10){
			$(this).addClass("newsuccess");
			$(this).removeClass("newerror");
		}else{
			$(this).addClass("newerror");
			$(this).removeClass("newsuccess");
		}
	});//
	$("#chuPrice").bind('keyup',function(){
		var oldprice=parseFloat($("#jinPrice").val());
		var price =$(this).val();
		var boo=((/^\d+(\.\d{1,2})?$/).test(price));
		//layer.msg(boo);
		if(price>=oldprice&&boo){
			$(this).addClass("newsuccess");
			$(this).removeClass("newerror");
		}else{
			$(this).addClass("newerror");
			$(this).removeClass("newsuccess");
		}
		if($addprolayer){
			layer.close($addprolayer);
		}
	});
	$("#chuPrice").bind('blur',function(){
		var oldprice=parseFloat($("#jinPrice").val());
		var price =$(this).val();
		
		if(!((/^\d+(\.\d{1,2})?$/).test(price))){
			$addprolayer=layer.tips('格式错误', '#chuPrice', {
				tips : [ 2, 'red' ]
			});
		}else if(price<oldprice){
			$addprolayer=layer.tips('价格过低', '#chuPrice', {
				tips : [ 2, 'red' ]
			});
		}		
	});
	$("#count").bind('keyup',function(){
		var pid=$("#productArea").val();
		var num=$(this).val();
		if(((/^(\+|-)?\d+$/).test(num))){
			$("#count").addClass("newsuccess");
			$("#count").removeClass("newerror");
		}else{
			$("#count").addClass("newerror");
			$("#count").removeClass("newsuccess");
			return false;
		}
		var count =parseInt(num);
		$.ajax( {
			url : '	findStockNum.action',
			dataType : 'json',
			data : {
			   pid:pid
			},
			type : 'post',
			success : function(mydata) {
				//layer.msg(mydata);
				if(count<=mydata){
					$("#count").addClass("newsuccess");
					$("#count").removeClass("newerror");
				}else{
					$("#count").addClass("newerror");
					$("#count").removeClass("newsuccess");
				}
			}
		});
	});
	$("#count").bind('blur',function(){
		var pid=$("#productArea").val();
		var num=$(this).val();
		if(!((/^(\+|-)?\d+$/).test(num))){
			layer.tips('格式错误', '#count', {
				tips : [ 2, 'red' ]
			});
			return false;
		}
		var count =parseInt(num);
		$.ajax( {
			url : '	findStockNum.action',
			dataType : 'json',
			data : {
			   pid:pid
			},
			type : 'post',
			success : function(mydata) {
				//layer.msg(mydata);
				$scock=mydata;
				if(count>mydata){
					$addprolayer=layer.tips('库存不足', '#count', {
						tips : [ 2, 'red' ]
					});
				}
			}
		});
	});
};
