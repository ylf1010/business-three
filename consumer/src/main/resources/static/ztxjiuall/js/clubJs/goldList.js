// JavaScript Document 会员特卖js 
$(function(){
	$('.integralArea[integralArea=0] input').focus(function() {
        $(this).parent('span').siblings('.areaSub').show();
    });
	//分类选中页面加载样式显示js控制
	var gt = $("#gt").val();
	if(gt<1||gt>8){
		gt = 1;
	}
	gt = gt -1;
	$(".goldSubnav a").eq(gt).removeClass("gsGift").addClass("gsGiftOn");
	//排序选中页面加载样式显示js控制
	var sort = $("#sort").val();//排序字段
	if(sort!=1&&sort!=2){
		sort = 0;
	}
	$("#orderText .xssgtab").eq(sort).addClass("on").siblings().removeClass("on");
	var order = $("#order").val();//排序字段
	if(order!=1){
		order = 0;
	}
	if(order ==0)
	{
		$("#orderText .xssgtab").eq(sort).find('i').css('background-position','-272px -160px')
	}
	else
	{
		$("#orderText .xssgtab").eq(sort).find('i').css('background-position',' -304px -160px')
	}
	var start = $('#start').val();
	if(start>0){
		$("#minPrice").val(start);
	}
	var end = $('#end').val();
	if(end>0){
		$("#maxPrice").val(end);
	}
	
	
	
	
	$(".cancle").click(function(){
		$("#minPrice").val("");
		$("#maxPrice").val("");
		$("#start").val(0);
		$("#end").val(0);
		sendGold($("#gt").val(),$("#sort").val(),$("#order").val(),$("#start").val(),$("#end").val());
	});
	$(".ok").click(function(){
		var value1 = parseInt($("#minPrice").val());
		var value2 = parseInt($("#maxPrice").val());
		    if (isNaN(value1) || isNaN(value2) || value1 > value2 || value1 <0 || value2<0) {
			$("#minPrice").val("");
		    $("#maxPrice").val("");
			alert('请输入正确的价格区间！');
			return;
		    }else{
		    	$('#start').val(value1);
		    	$('#end').val(value2);
		    	$('#minPrice').val(value1);
		    	$('#maxPrice').val(value2);
		    	sendGold($("#gt").val(),$("#sort").val(),$("#order").val(),$("#start").val(),$("#end").val());
		    }
	});
		
});