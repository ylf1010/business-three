function handleUserCenterPagePrice(priceData) {
	
	priceData=eval("("+priceData+")");
	
	priceData=priceData.data;
	
	for ( var proId in priceData) {
		var proPrices = priceData[proId];
		$(".userCenter_nowPrice_" + proId).text("￥" + proPrices.np.toFixed(2));
		$(".userCenter_marketPrice_" + proId).text("￥" + proPrices.mp.toFixed(2));
	}
};

//获取当前为星期几
function getTodayWeek(){
	var weekDay="",today=new Date();
	if(today.getDay()==0)  weekDay= "星期日";
	if(today.getDay()==1)  weekDay= "星期一";
	if(today.getDay()==2)  weekDay= "星期二";
	if(today.getDay()==3)  weekDay= "星期三";
	if(today.getDay()==4)  weekDay= "星期四";
	if(today.getDay()==5)  weekDay= "星期五";
	if(today.getDay()==6)  weekDay= "星期六";
	return weekDay;
}

// JavaScript Document
$(document).ready(function(e) {
    var width=$(window).width();
	var ohead1 = document.getElementById("newLink");
	if(width>1200)
	{
		
		ohead1.href=domain_misc + "/css/usercenter/user_1200.css";
		$(".ubRemList ul,.colFrame ul").css("left","0");
	}
	else
		{
			
			ohead1.href="";
			$(".ubRemList ul,.colFrame ul").css("left","0");
		}
	$(window).bind("resize",function() {
		var resizewidth=$(window).width();
		if(resizewidth>1200)
		{
		    ohead1.href=domain_misc + "/css/usercenter/user_1200.css";
		    $(".ubRemList ul,.colFrame ul").css("left","0");
		}
		else
		{
			ohead1.href="";
			$(".ubRemList ul,.colFrame ul").css("left","0");
		}
	
    });
	
});