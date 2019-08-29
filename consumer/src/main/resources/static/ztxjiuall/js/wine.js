/*限时抢购倒计时 start*/
function changeTime(){
    setInterval(function(){
        $(".limitLastTime").each(function() {
            var time=parseInt($(this).attr("time"));
            if(time<=0||isNaN(time))
            {
                $(this).css("display","none");
                $(this).siblings(".buyEnd").css("display","block");
                //$(this).parents("li").remove();
                //setProAct();
            }else{
                time--;
                $(this).attr("time",time);
                var handerResult = handerTime(time);
                $(this).find(".hours").text(handerResult["h"]);
                $(this).find(".minus").text(handerResult["m"]);
                $(this).find(".seconds").text(handerResult["s"]);
            }
        });
    },1000);

};

function handerTime(time){
    var h=parseInt(time/3600);
    h=h<10?'0'+h:h;
    var m=parseInt((time%3600)/60);
    m=m<10?'0'+m:m;
    var s=parseInt(time%60);
    s=s<10?'0'+s:s;
    return {
        'h':h,
        'm':m,
        's':s
    }
}
/*限时抢购倒计时 end*/

function setProAct(){
    jQuery.ajax({
        type:'post',
        url:'/wine/wineXsgProInfos.htm?t='+new Date().getTime().toString(),
        data:{'time':new Date().getTime().toString()},
        dataType:'json',
        cache:false,
        async:true,
        success:function(data){
            if(data && data.xsgInfos){
                var xsqgInfo = $(".wineLimitList ul");
                var xsqgInfoLi = "";
                var numDjs = 0;
                for(var e in data.xsgInfos.list){
                    if(numDjs>=5){
                        break;
                    }
                    var maplist = data.xsgInfos.list[e];
                    var proIds = maplist.proId;
                    if(proIds=="" || proIds==undefined){
                        break;
                    }
                    var proName = maplist.proName;
                    var imgUrl = "http://img10.jiuxian.com"+maplist.imgPath.replace(".","2.");
                    //var imgUrl = "http://img10.jiuxian.com"+maplist.imgPath;
                    var proUrl =  window.jxdomain.detail + "/goods-"+proIds+".html";
                    var eTimePro = maplist.eTime;
                    var tagContent=maplist.tagContent;
                    // getProductActPrice(proIds,'handleSpiritWinePagePriceXsg');
                    var newTagContent="";
                    if(tagContent=="" || tagContent==undefined){
                        newTagContent = "";
                    }else{
                        if(tagContent.indexOf("&")!=-1){
                            newTagContent=tagContent.replace('&','');
                        }else{
                            newTagContent=tagContent;
                        }
                    }
                    if(newTagContent!=''){
                        xsqgInfoLi += "<li product-box='"+proIds+"'>" +
                            "<div class='pic'><a href='"+proUrl+"' target='_blank' title="+proName+"><img " +
                            "src="+imgUrl+" alt="+proName+" width='160' height='160' /></a></div><div class='name'>" +
                            "<a href="+proUrl+" target='_blank'" +
                            " title="+proName+">"+proName+"</a></div><div class='price'><span goodId="+proIds+" class=jxIndex_actPrice_"+proIds+">￥</span>" +
                            "<i class='wTag'>"+newTagContent+"</i></div>" +
                            // "<div class='statusBox'>" +
                            // "<div class='limitLastTime' time="+eTimePro+"><i class='wIcon'></i><span>距结束</span><b><s class='hours'>" +
                            // "</s></b><b><s class='minus'></s></b><b><s class='seconds'></s></b></div><div class='buyEnd' style='display:none;'>抢购结束</div>" +
                            // "<div class='buyNow' style='display:none;'><a href='http://cart.jiuxian.com/buynow.htm?goods="+proIds+"' target='_blank'>立即抢购</a></div></div>" +
                            "</li>"
                    }else{
                        xsqgInfoLi += "<li product-box='"+proIds+"'>" +
                            "<div class='pic'><a href='"+proUrl+"' target='_blank' title="+proName+"><img " +
                            "src="+imgUrl+" alt="+proName+" width='160' height='160' /></a></div><div class='name'>" +
                            "<a href="+proUrl+" target='_blank'" +
                            " title="+proName+">"+proName+"</a></div><div class='price'><span goodId="+proIds+" class=jxIndex_actPrice_"+proIds+">￥</span>" +
                            "</div>" +
                            // "<div class='statusBox'>" +
                            // "<div class='limitLastTime' time="+eTimePro+"><i class='wIcon'></i><span>距结束</span><b><s class='hours'>" +
                            // "</s></b><b><s class='minus'></s></b><b><s class='seconds'></s></b></div><div class='buyEnd' style='display:none;'>抢购结束</div>" +
                            // "<div class='buyNow' style='display:none;'><a href='http://cart.jiuxian.com/buynow.htm?goods="+proIds+"' target='_blank'>立即抢购</a></div></div>" +
                            "</li>"
                    }

                    numDjs++;
                }
                xsqgInfo.html(xsqgInfoLi);

                MallPcPrice.getPrices4Wine('wineLimitList');
                changeTime();
            }

        }
    });
}
$(document).ready(function(e) {
    /*头部背景*/
    if(typeof(wineHeaderBg1200) == 'undefined'){
        $('.wineHeader').css('background','#fff');
    }else{
        if(wineHeaderBg1200 != '' && wineHeaderBg1200.indexOf("LeftBgImg") == -1){
            $('.wineHeader').css('background','url('+ wineHeaderBg1200 +') no-repeat center top');
        }
    }

    /* 红酒首页显示菜单下拉效果 start */
    $(".categoryBox").css("display","block");
    /* 红酒首页显示菜单下拉效果 end */

    $(".mainBox").find('img').lazyload_index({
        threshold : 300,
        effect: 'fadeIn'
    });

    $(".brandBox").find('img').lazyload_index({
        effect: 'fadeIn'
    });


    /*页面轮播*/
    /*banner图轮播 start*/
    $(".wineBanner").slider_1({});


    /*banner图轮播 end*/
    /*楼层轮播 一张图片时去掉切换效果  start*/
    $(".bannerSlier").each(function(){
        var index = $(this).find(".imgBox li").length;
        if(index>1){
            $(this).slider_2({});
        }
    });
    /*楼层轮播 一张图片时去掉切换效果  end*/
    /* 今日团购和活动专区轮播 start*/
    $(".tCustomerList").each(function(){
        var index = $(this).find("li").length;
        if(index>1){
            $(this).slider_2();
        }
    });
    $(".actAreaLogo li p").hover(function(){
        $(this).find(".alOn").css('display','block');
    },function(e){
        $(this).find(".alOn").css('display','none');
    });
    /* 今日团购和活动专区轮播 start*/
    /*轮播下方广告位效果*/
    $(".middleFocus a").hover(function(e){
        $(this).children().stop().animate({'left':'-60px'},300);
    },function(e){
        $(this).children().stop().animate({'left':0},300);
    });
    /*限时抢购按钮切换*/
//	$(".wineLimitList .statusBox").hover(function(e){
//		var lStatus = $(this).find(".buyEnd").css('display');
//		//alert(1);
//		if(lStatus=="none"){
//			$(this).find(".limitLastTime").hide();
//			$(this).find(".buyNow").show();	
//		}
//	},function(e){
//		var lStatus = $(this).find(".buyEnd").css('display');
//		if(lStatus=="none"){
//			$(this).find(".limitLastTime").show();
//			$(this).find(".buyNow").hide();
//		}
//	});

    $(".wineLimitList .statusBox").live("mouseover",function(e){
        var lStatus = $(this).find(".buyEnd").css('display');
        //alert(1);
        if(lStatus=="none"){
            $(this).find(".limitLastTime").hide();
            $(this).find(".buyNow").show();
        }
    });
    $(".wineLimitList .statusBox").live("mouseout",function(e){
        var lStatus = $(this).find(".buyEnd").css('display');
        if(lStatus=="none"){
            $(this).find(".limitLastTime").show();
            $(this).find(".buyNow").hide();
        }
    });



    /*活动专区tab切换*/

    $(".actAreaList li").mouseenter(function() {
        var bgPosition = {"0":[53,0],"1":[233,-1012],"2":[415,-2024],"3":[594,-3036]};
        var index = $(".actAreaList li").index($(this));
        $(".actAreaList p").stop(true,true).animate({"left":bgPosition[index][0]},600);
        $(".actAreaList li").removeClass("on");
        $(this).addClass("on");
        $(".actAreaLayerSlider").stop(true,true).animate({"left":bgPosition[index][1]},600,function(){
            $(".actAreaBox").find('img').lazyload_index({
                threshold : 300,
                effect: 'show'
            });

        });



    });

    $(".goodsBox li").hover(function(){
        $(this).addClass("on");
    },function(){
        $(this).removeClass("on");
    });
    /*知名品牌广告位滑动*/
    $(".brandList .brand-1").bind('mouseenter',function(e){
        $(this).siblings(".brand-2").stop(true,true).animate({'left':'700px'},500);
        $(this).siblings(".brand-3").stop(true,true).animate({'left':'950px'},500);
    });
    $(".brandList .brand-2").bind('mouseenter',function(e){
        $(this).stop(true,true).animate({'left':'250px'},500);
        $(this).siblings(".brand-3").stop(true,true).animate({'left':'950px'},500);
    });
    $(".brandList .brand-3").bind('mouseenter',function(e){
        $(this).siblings(".brand-2").stop(true,true).animate({'left':'250px'},500);
        $(this).stop(true,true).animate({'left':'500px'},500);
    });
    /*跟随层end*/
    var iScroll=$(window).scrollTop();
    var iTop=$(window).height()/2-200;
    $(window).bind("resize",function(){
        var riTop=$(window).height()/2-200;
        $(".fixDiv").css("top",riTop);
        resizeWidth();
    });

    var floorOne=$(".firstScreen").offset().top-300;
    var floorTwo=$(".actAreaBox").offset().top-300;
    var floorThree=$(".brandBox").offset().top-350;
    var floorFour=$(".grapeWine").offset().top-450;
    var floorFive=$(".foreignWine").offset().top-450;
    var floorSix=$(".beerWine").offset().top-550;
    var floorSeven=$(".glassWine").offset().top-600;
    var dTop=$(".footer").offset().top-630;

    var floorOne1=$(".firstScreen").offset().top-iTop;
    var floorTwo1=$(".actAreaBox").offset().top-iTop;
    var floorThree1=$(".brandBox").offset().top-iTop;
    var floorFour1=$(".grapeWine").offset().top-iTop;
    var floorFive1=$(".foreignWine").offset().top-iTop;
    var floorSix1=$(".beerWine").offset().top-iTop;
    var floorSeven1=$(".glassWine").offset().top-iTop;
    var dTop1=$(".glassWine").offset().top-iTop;
    var bgArray = [floorOne1,floorTwo1,floorThree1,floorFour1,floorFive1,floorSix1,floorSeven1];


    $(".fixDiv").css('top',iTop);
    if($.browser.msie&&$.browser.version<7.0){
        return false;
    }else{
        resizeWidth();
        scrollTop();
    }
    $(window).bind("scroll",function(){
        iScroll=$(window).scrollTop();
        if($.browser.msie&&$.browser.version<7.0){
            return false;
        }else{
            scrollTop();
        }


    })

    function resizeWidth(){
        var iL=parseInt(($(window).width()-$('.mainBox').width())/2);
        var fixL=parseInt(iL-$(".fixDiv").width()-10);
        $(".fixDiv").css('left',fixL+'px');

    }
    function scrollTop(){
        $(".fixDiv a").removeClass("on");
        if(iScroll<=floorOne){
            $(".fixDiv").hide();
        }
        else if(iScroll<=floorTwo&&iScroll>floorOne)
        {	$(".fixDiv").show();
            $(".fixDiv a").hide();
            $(".fixDiv i").show();
            $(".fixDiv a:eq(0)").css({"display":"inline-block"}).addClass("on");
            $(".fixDiv a:eq(0)").siblings().hide();
        }
        else if(iScroll>floorTwo&&iScroll<=floorThree){
            $(".fixDiv").show();
            $(".fixDiv a").hide();
            $(".fixDiv i").show();
            $(".fixDiv a:eq(1)").css({"display":"inline-block"}).addClass("on");
            $(".fixDiv a:eq(1)").siblings().hide();
        }
        else if(iScroll>=floorThree&&iScroll<floorFour){
            $(".fixDiv").show();
            $(".fixDiv a").hide();
            $(".fixDiv i").show();
            $(".fixDiv a:eq(2)").css({"display":"inline-block"}).addClass("on");
            $(".fixDiv a:eq(2)").siblings().hide();
        }
        else if(iScroll>=floorFour&&iScroll<floorFive){
            $(".fixDiv").show();
            $(".fixDiv a").hide();
            $(".fixDiv i").show();
            $(".fixDiv a:eq(3)").css({"display":"inline-block"}).addClass("on");
            $(".fixDiv a:eq(3)").siblings().hide();
        }
        else if(iScroll>=floorFive&&iScroll<floorSix){
            $(".fixDiv").show();
            $(".fixDiv a").hide();
            $(".fixDiv i").show();
            $(".fixDiv a:eq(4)").css({"display":"inline-block"}).addClass("on");
            $(".fixDiv a:eq(4)").siblings().hide();
        }
        else if(iScroll>=floorFive&&iScroll<floorSeven){
            $(".fixDiv").show();
            $(".fixDiv a").hide();
            $(".fixDiv i").show();
            $(".fixDiv a:eq(5)").css({"display":"inline-block"}).addClass("on");
            $(".fixDiv a:eq(5)").siblings().hide();
        }
        else if(iScroll>=floorSeven&&iScroll<dTop){
            $(".fixDiv").show();
            $(".fixDiv a").hide();
            $(".fixDiv i").show();
            $(".fixDiv a:eq(6)").css({"display":"inline-block"}).addClass("on");
            $(".fixDiv a:eq(6)").siblings().hide();
        }
        else if(iScroll>=dTop){
            $(".fixDiv").hide();
        }
    }

    $(".fixDiv div").mouseenter(function(e) {
        //$(this).removeClass("on");
        $(this).find("i").hide().siblings().css("display","block");
        e.stopPropagation();
    });

    $(".fixDiv div").mouseleave(function(e) {
        scrollTop();
        //$(this).find("i").show().siblings().css("display","none");
        e.stopPropagation();
    });

    $(".fixDiv div").bind("click",function(){
        var index = $(".fixDiv div").index($(this));
        $('html,body').stop(true,true).animate({"scrollTop":bgArray[index]},800);
    });



    /*	$('.fixDiv span').bind('click',function(){

     $('html,body').stop().animate({'scrollTop':0},800)
     })
     $('.fixDiv span').bind('mouseenter',function(){

     $(this).find('i').css('background-position','-302px -134px')
     })
     $('.fixDiv span').bind('mouseleave',function(){

     $(this).find('i').css('background-position','-274px -134px')
     })*/

    /*跟随层end*/




    // 限时抢购商品加入购物车 start
    var toCartCallBack = function(data) {
        location.href = "http://cart.jiuxian.com";
    }
    function go_to_cart(id) {
        var number = $("#number" + id).val();
        addSkuToCartWithSrc(id, number, "QC", 5, toCartCallBack);
    }
    // 限时抢购商品加入购物车 end
});
