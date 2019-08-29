// JavaScript Document
//排行榜
(function($){
    $.fn.slider_top=function(option){
        var option = $.extend(option);
        return this.each(function(){
            var $this = $(this);
            var $Li = $this.find("li");
            $Li.mouseenter(function(){
                var index = $Li.index($(this));
                var liThis = $(this);
                if(index >= 2){
                    liThis.find(".closed").hide().siblings(".open").show();
                    liThis.siblings("li:gt(1)").find(".open").hide();
                    liThis.siblings("li:gt(1)").find(".closed").show();
                    liThis.find('img').lazyload_index({
                        effect: 'show'
                    });
                }
            });

        });
    };
})(jQuery)
//排行榜end
$(function(){

    //全部分类
    $('.classifyAll').bind('mouseenter',function(){
        $(this).addClass('on');
    });
    $('.classifyAll').bind('mouseleave',function(){
        $(this).removeClass('on');
    });

    //菜单
    $('.yMenuItem').bind('mouseenter',function(){
        $(this).addClass('hov');
    });
    $('.yMenuItem').bind('mouseleave',function(){
        $(this).removeClass('hov');
    });

    //搜索框
    var $sForm = $("#search-form");
    var keyValue= $("#search-form").val();
//	alert("sForm:"+$sForm)
    $sForm.val(keyValue);
    $sForm.focus(function(e) {
    	e.preventDefault();
        var value=$.trim($(this).val());
        if(value==keyValue)
        {
            $(this).val("");
            $(this).css("color","#333");
        }
    });
    $sForm.blur(function(e) {
        e.preventDefault();
        var value=$.trim($(this).val());
        if(value=="")
        {
            $(this).val(keyValue);
            $(this).css("color","#999");
        }
    });

    function seaScroll(){
        var oTop = $('.areaBox').offset().top-10;
        var sTop = $(window).scrollTop();
        var $yh = $('.yangHeader');
        if(sTop>=oTop){
            $yh.addClass('searchFixed').stop().animate({top:0},200);
        }else if(sTop<oTop){
            $yh.stop().animate({top:'-60px'},100,function(){
                $(this).removeClass('searchFixed');
            });
        }
    }

    seaScroll();

    $(window).scroll(function(){
        seaScroll();
    });

    //banner
    $(".yangBanner").slide({
        titCell: ".smallBtn ul",
        mainCell: ".bigImg ul",
        effect: "fold",
        autoPlay: true,
        autoPage: true,
        trigger: "mouseenter",
        startFun: function(i) {
            var curLi = jQuery(".yangBanner .bigImg li").eq(i);
            if ( !! curLi.attr("_src")) {
                curLi.css("background-image", curLi.attr("_src")).removeAttr("_src")
            }
        }
    });

	/*秒杀倒计时start*/
    setInterval(function(){
        var $count = $('.eventCount');
        var time=parseInt($count.attr("time"));
        if(time<0||isNaN(time))
        {
            $count.find("b").text("0");
        }
        else{
            time--;
            var handerResult = handerTime(time);
            var hh=handerResult["h"].toString();
            var mm=handerResult["m"].toString();
            var ss=handerResult["s"].toString();

            $count.find(".hours:eq(0)").text(hh.substring(0,1));
            $count.find(".hours:eq(1)").text(hh.substring(1));
            $count.find(".minutes:eq(0)").text(mm.substring(0,1));
            $count.find(".minutes:eq(1)").text(mm.substring(1));
            $count.find(".seconds:eq(0)").text(ss.substring(0,1));
            $count.find(".seconds:eq(1)").text(ss.substring(1));

            $count.attr("time",time);
        }

    },1000)

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
	/*限时抢购倒计时end*/

    //图片预加载
    $(".yangMain").find('img').lazyload_index({
        threshold : 200,
        effect: 'fadeIn'
    });
    $(".logo-wrap").find('img').lazyload_index({
        threshold : 200,
        effect: 'fadeIn'
    });
    $(".rank-box").find('img').lazyload_index({
        threshold : 200,
        effect: 'fadeIn'
    });
    //小轮播
    $(".sliderBox").each(function(){
        var index = $(this).find(".imgBox li").length;
        if(index>1){
            $(this).slider_2({});
        }else{
            $(this).find('.btnBox').hide();
        }


    });

    //商品切换
    $(".main-inner").slider_3();
    //排行榜
    $(".rank-list").slider_top();
})