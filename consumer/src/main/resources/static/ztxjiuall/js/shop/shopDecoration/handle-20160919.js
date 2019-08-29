//处理领券
function handleReceiveCouponJsonp(dataJsonp) {
    var data = eval("(" + dataJsonp + ")");
    var local=window.location.href;

    if(null!=data){
        if(data.status==2){
            if(confirm("您还未登录不能领取优惠券，是否现在登录？")){
                location=domain_passprot+"/login.htm?from="+local;
            }else{
                return;
            }
        }else if(data.status==12){
            if(confirm("亲，该领券需要绑定手机号，是否去绑定？")){
                setCookie("receiveCoupon_BindMobileSkipUrl","."+local+".",1);
                window.location.href=domain_member + "/myaccount/verify_phone.htm";
            }else{
                return;
            }
        }else{
            alert(data.msg);
        }
    }else {
        alert("服务器响应错误");
    }
}


// JavaScript Document
$(document).ready(function(e) {
	
	//图片延迟加载
	/*$(".shopCouponBox img,.shopFocusBox img,.shopComBox img,.shopSellerBox img").lazyload({
		placeholder : "http://misc.jiuxian.com/images/shop/shopDecoration/loading.gif",        
		effect : "fadeIn",
		threshold:200
	});*/
	$("img:not([slider='banner'])").lazyload({
		placeholder : window.jxdomain.misc+"/images/shop/shopDecoration/loading.gif",        
		effect : "fadeIn",
		threshold:600
	});
	
	//页面背景处理
	var bgColor = $("#layoutContain").attr("bgColor");
	var bgImage = $("#layoutContain").attr("bgImage");
	var reaptPattern = $("#layoutContain").attr("reaptPattern");
	var bgData;
	if(bgColor==""&&bgImage!=""){
		bgData = "url("+bgImage+") "+reaptPattern;
	}else if(bgColor!=""&&bgImage!=""){
		bgData = "#"+bgColor+" url("+bgImage+") "+reaptPattern;
	}else if(bgColor!=""&&bgImage==""){
		bgData = "#"+bgColor;
	}else if(bgColor==""&&bgImage==""){
		bgData = "none";
	}
	$("#layoutContain").css({"background":bgData});

	//侧边栏处理
	$(".shopSidesNavBox").each(function() {
		var winWidth_1 = $(window).width();
		var scrollTop = $(window).scrollTop();
        var shopSidesNavBoxDataString = $(this).attr("data");	
		var shopSidesNavBoxData = eval("("+shopSidesNavBoxDataString+")");
		$(this).css({"top":shopSidesNavBoxData["heightToTop"]+"px",
					 "width":shopSidesNavBoxData["imgWidth"]+"px",
					 "height":shopSidesNavBoxData["imgHeight"]+"px"
					 });
		if(shopSidesNavBoxData["isFirstShow"]=="2"){  //第一屏是否显示   默认隐藏
		 	$(this).show();		
		}else{
			$(this).hide();	
		}		
		if(scrollTop>500){ 
		 	$(this).show();		
		}
		if(shopSidesNavBoxData["showLocation"]==1){   //侧边栏位置  
			var left = (winWidth_1-1000)/2+1000;
		 	$(this).css({"left":left+"px"})
		}else{
			var left = (winWidth_1-1000)/2-shopSidesNavBoxData["imgWidth"];
		 	$(this).css({"left":left+"px"});			
		}		
		
		$(this).find("li").each(function(index) {
            $(this).css({"height":shopSidesNavBoxData["detail"][index]});
        });	
    });
	
	
	//左侧广告位处理
	$(".shopSidesNavBoxTwe").each(function() {
		var winWidth_1 = $(window).width();
		var scrollTop = $(window).scrollTop();
        var shopSidesNavBoxDataString = $(this).attr("data");	
		var shopSidesNavBoxData = eval("("+shopSidesNavBoxDataString+")");
		$(this).css({"top":shopSidesNavBoxData["heightToTop"]+"px",
					 "width":shopSidesNavBoxData["imgWidth"]+"px",
					 "height":shopSidesNavBoxData["imgHeight"]+"px"
					 });
		if(shopSidesNavBoxData["isFirstShow"]=="2"){  //第一屏是否显示   默认隐藏
		 	$(this).show();		
		}else{
			$(this).hide();	
		}		
		if(scrollTop>500){ 
		 	$(this).show();		
		}
		if(shopSidesNavBoxData["showLocation"]==1){   //侧边栏位置  
			var left = (winWidth_1-1000)/2-shopSidesNavBoxData["imgWidth"];
		 	$(this).css({"left":left+"px"});	
		}
    });
	
	

	$(window).bind("resize",function(){
		adjustuserDefinedBox();	
		var winWidth_2 = $(window).width(); 
		$(".shopSidesNavBox").each(function(index, element) {
			var shopSidesNavBoxDataString = $(this).attr("data");	
			var shopSidesNavBoxData = eval("("+shopSidesNavBoxDataString+")");
			if(shopSidesNavBoxData["showLocation"]=="1"){   //侧边栏位置  
				var left = (winWidth_2-1000)/2+1000;
				$(this).css({"left":left+"px"})
			}else{
				var left = (winWidth_2-1000)/2-shopSidesNavBoxData["imgWidth"];
				$(this).css({"left":left+"px"})
			}
   	 	});
		
		$(".shopSidesNavBoxTwe").each(function(index, element) {
			var shopSidesNavBoxDataString = $(this).attr("data");	
			var shopSidesNavBoxData = eval("("+shopSidesNavBoxDataString+")");
			if(shopSidesNavBoxData["showLocation"]=="1"){   //侧边栏位置  
				var left = (winWidth_2-1000)/2-shopSidesNavBoxData["imgWidth"];
			 	$(this).css({"left":left+"px"});	
			}
   	 	});
	});
	
	$(window).bind("scroll",function(){
		$(".shopSidesNavBox").each(function(index, element) {
			var shopSidesNavBoxDataString = $(this).attr("data");	
			var shopSidesNavBoxData = eval("("+shopSidesNavBoxDataString+")");
			if(shopSidesNavBoxData["isFirstShow"]=="1"){
				var scrollTop = $(window).scrollTop();
				if(scrollTop>500){
					$(this).show();			
				}else{
					$(this).hide();	
				}
			}
		});
		
		
		$(".shopSidesNavBoxTwe").each(function(index, element) {
			var shopSidesNavBoxDataString = $(this).attr("data");	
			var shopSidesNavBoxData = eval("("+shopSidesNavBoxDataString+")");
			if(shopSidesNavBoxData["isFirstShow"]=="1"){
				var scrollTop = $(window).scrollTop();
				if(scrollTop>500){
					$(this).show();			
				}else{
					$(this).hide();	
				}
			}
		});
	});
	
	
	var activitBtn = $('.activityImg img'),
		activitBj = $('.activityBj,.activityWarp span'),
		activityWarp = $('.activityWarp,.activityBj'),
		bodyHeight = $('body').height();
	activitBtn.click(function(){
		activityWarp.show();
		$('.activityBj').css({"height":bodyHeight+"px"});
	});
	activitBj.bind('click',function(){
		activityWarp.hide();
	})
	
	//轮播调用
	$(".mainBanner").each(function() {
        var sliderTime = parseInt($(this).attr("sliderTime"));
		$(this).slider_1({pausetime:sliderTime*1000}); 
    });	
	 
    $(".floorSlider").each(function() {
	   var sliderTime = parseInt($(this).attr("sliderTime"));
       $(this).slider_2({pausetime:sliderTime*1000});
    });
	
	//倒计时	
	$(".shopCountdown").each(function() {
        var $this = $(this);
		handleTime($this);

    });

	function handleTime(obj){
		var data = obj.attr("data");
		var time = eval("("+data+")");
		var timeStart = Date.parse(time["timeStart"]);
		var timeEnd = Date.parse(time["timeEnd"]);
		var timeNow = new Date().getTime();
		var temp;
		if(timeStart>timeNow){
			 //活动未开始
			 temp=parseInt((timeStart-timeNow)/1000); 
			 obj.find(".title").text("距离活动开始还有");
		}else{
			//活动已开始
			 temp=parseInt((timeEnd-timeNow)/1000); 
			 obj.find(".title").text("距离活动结束还有");
		}
		var timeChange=setInterval(function(){
		temp--;
		var day=parseInt(temp/(24*3600));
		day=day<10?"0"+day:day;
		var hour=parseInt((temp%(24*3600))/3600);
		hour=hour<10?"0"+hour:hour;
		var minute=parseInt((temp%3600)/60);
		minute=minute<10?"0"+minute:minute
		var second=parseInt(temp%60);
		second=second<10?"0"+second:second;
		if(temp>0)
		{
			obj.find(".day").text(day);
			obj.find(".hour").text(hour);
			obj.find(".minute").text(minute);
			obj.find(".second").text(second);
		}
		else
		{
			obj.find(".day").text("00");
			obj.find(".hour").text("00");
			obj.find(".minute").text("00");
			obj.find(".second").text("00");
			clearInterval(timeChange);	
		}	
		},1000)	
	}
	
	//自定义区域图片居中处理函数
	function adjustuserDefinedBox(){
		$(".userDefinedBox[userconwidth=1920]").each(function() {
			var width = $(window).width();
			var marginWidth = (1920-width)/2;
			$(this).css({"width":"1920","margin-left":-marginWidth});			
		});
	}
	
	adjustuserDefinedBox();
	
	
	//带价格的搜索框响应函数
	$(".shopSearchBox .seaBut").click(function(){
		var keywords = $(this).parents(".shopSearchBox").find(".seaText").val();
		var highPrice = $(this).siblings("span").find(".priVal").eq(1).find("input").val();
		var lowPrice = $(this).siblings("span").find(".priVal").eq(0).find("input").val();
		
		var linkUrl= window.jxdomain.list+"/search.htm?keys=" + encodeURI(keywords) +"&pr="+lowPrice+"|" +highPrice;
		window.open(linkUrl);
		
	});	
	//导航栏的搜索框
	$(".shopNavSearch .search-but").click(function(){
		var keywords = $(this).parents(".shopNavSearch").find(".search-text").val();
		var linkUrl= window.jxdomain.list+"/search.htm?keys=" + encodeURI(keywords);
		window.open(linkUrl);
		
	});	
	
	
	
	
	/*优惠券*/
	$(".shopCouponBox a").click(function(){



		var quanId=$(this).attr('couponId');
		var gx = new Date().getTime();
		var actId=$(this).attr('activeid');
		var local=encodeURIComponent(window.location.href);
		var act_request_url=window.jxdomain.special+"/coupon/receiveCoupon.htm?actId="+actId+"&couponId="+quanId + "&pageUrl="+local+"&t="+ gx+"&callback=handleReceiveCouponJsonp";

            $.ajax({
            url: act_request_url,
            dataType : "jsonp",
            jsonp : "handleReceiveCouponJsonp"
        })
	});
	

	
	//动态更新商品的价格
	//价格同步start	

    var proIds = [];  //商品模块商品id
	var goodIds = [];  //促销语商品id
	var leadIds = [];  //排行榜商品id
	

    $(".shopComBox .sCom-price").each(function(){
	    var id=$(this).find("em").attr("npgoodid")
		proIds.push(id);
    });	
    
    $(".shopSellerBox .seller-price").each(function(){
	    var id=$(this).attr("npgoodid")
		leadIds.push(id);
    });	
    
    
	//促销广告语同步开始
	jQuery(".shopComBox .sCom-pro[adStatus=adDefault]").each(function(){
		var goodId=$(this).parents("li").find(".sCom-price em").attr("npgoodid");
		goodIds.push(goodId);
	});
	
	var shopSidesNavBoxTwe = $(".shopSidesNavBoxTwe,.shopSidesNavBoxThr");
	shopSidesNavBoxTwe.parent().css({"min-height":"0px"})
	//价格同步end   
	document.domain = 'jiuxian.com';
	getProductActAdDes(goodIds.join(","));
	//促销广告语同步结束1
    //getProductActPrice(proIds.join(","), "callbackGood");
    getProductActPrice(leadIds.join(","), "callbackLead"); 
    
    //雪花效果
    var dataString = $(".snowBd ").attr("data");
    if(dataString != undefined){
    	var data = JSON.parse(dataString);
    	var snow = $('.snow ');
    	$(".snowBd ").css({"height":"0px"})
    	if(data["src"] != ""){
    		if(data["status"] == 1){
    			sonwShow(20,50,data["src"],450)
    		} else if(data["status"] == 0){
    			sonwShow(20,50,data["src"],450)
    			snow.addClass("imgXz");
    		}
    	}
    }

	var proxy_url = "/httpProxyAccess.htm?date="+new Date().getTime();
	jQuery.ajax({
		type:'get',
		url:proxy_url,
		data:{target:window.jxdomain.pub+"/addJXCenterCookie.htm"},
		dataType:'json',
		success:function(data){
			if(data==undefined)
				return;
				profileback(data);
		}
	});	
	
});


function callbackGood(priceData){
	priceData =eval("("+priceData+")");
    for (var proId in priceData) {
        var proPrices = priceData[proId];
        $("em[npgoodid='"+proId+"']").text(proPrices);
    }
} 
 
function callbackLead(priceData){
	priceData =eval("("+priceData+")");
    for (var proId in priceData) {
        var proPrices = priceData[proId];
        $("p[npgoodid='"+proId+"']").text(proPrices);
    }
} 
function callbackAdDes(data){
	//var dataJson = eval("(" + data + ")");
	//var dataDes = dataJson.allActAdDes;
    for(var id in data){   
	     var slogan = data[id];	     
	     $("em[npgoodid='"+id+"']").parents(".sCom-price").prev().text(slogan["adDes"]);//获取最新的商品活动的广告语
	    // $("em[npgoodid='"+id+"']").parents(".sCom-price").prev().attr("title",slogan["adDes"]);//获取最新的商品活动的广告语
}

}
function getProductActAdDes(proIds) {	
	if (proIds != "") {
		var brand_request_url = window.jxdomain.brand+"/selectProActInfoByGoodids.htm";
		var proxy_url = "/httpProxyAccess.htm?t=" + (new Date()).getTime()+"&target="+brand_request_url;
		jQuery.post(proxy_url,{proIds : proIds}, function(data){
			if (data != null) {
					callbackAdDes(data.allActAdDes)
			}
		}, "JSON")
	}
}
//雪花效果
function sonwShow(minSnowSize,maxSnowSize,img,sum){		
	var flake = $(".snow").html('<img src="'+img+'" />');
	var documentHeight = $(window).height();
	var documentWidth = $(window).width();
	var windowWidth = $(window).width()-200;
	var windowHeight = $(window).height()-100;
	$(".snowWrap,snowBd").css({"width":windowWidth,"height":"0px","position":"fixed","top":"0px","left":"0px","z-index":"9999"});
	$("body").css({"width":"100%","overflow-x":"hidden"})
	setInterval(function () {
		var startPositionLeft = Math.random() * documentWidth;
		var sizeFlake = minSnowSize + Math.random() * maxSnowSize;
		var endPositionLeft = Math.random() * documentWidth;
		var durationFall = documentHeight * 10 + Math.random() * 3000;
		var startOpacity = 0.7 + 0.3 * Math.random();
		flake.clone().appendTo($(".snowWrap")).css({
			"left": startPositionLeft,
			"opacity": startOpacity,
			"width":sizeFlake +"px",
			"height":sizeFlake +"px",
			"color": "#fff"
		}).animate({
			"top": documentHeight - 40,
			"left": endPositionLeft,
			"opacity": 0
		}, durationFall, function () {
			$(this).remove();
		});
	}, sum);
}
