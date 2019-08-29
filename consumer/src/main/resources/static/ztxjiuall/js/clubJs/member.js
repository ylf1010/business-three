$(function(){
	   /*编辑用户信息*/
    $(".myInfo .mask").hover(function(){		
		$(".myInfo .maskInn,.myInfo .edit").show();
		},function(){
		$(".myInfo .maskInn,.myInfo .edit").hide();
	});
	
	$(".myInfo .maskInn, .myInfo .edit").hover(function(){		
		$(".myInfo .maskInn,.myInfo .edit").show();
		},function(){
		$(".myInfo .maskInn,.myInfo .edit").hide();
	});
	//导航菜单下拉框
	$(".MemLev").hover(function() { 
		$(this).children(".cMenuLink").addClass("mlon");
        $(this).children(".member-level").show();
    },
    function() {
        $(this).children(".cMenuLink").removeClass("mlon");
        $(this).children(".member-level").hide();
    });
	
	$(".member-level a").hover(function() { 
		$(this).css('background','#f6f6f6');
        $(this).siblings().css('background','none');
    });
	
    //兑换排行榜
	//var nGsRank=$(".gsRanking li").index($(this));
	$(".gsRanking li").slice(0,3).find(".gUnfold-nub").addClass('on');
	$(".gsRanking li").last().addClass('bb');
	$(".gsRanking").find("li").bind('mouseover',function(){
		$(this).children(".gsRanUnfold").show();
		$(this).children(".gsRanPackup").hide();
		$(this).siblings("li").find(".gsRanUnfold").hide();
		$(this).siblings("li").find(".gsRanPackup").show();
	})
	
	//商品搜索导航
    
	if($('#xssGoldFil').length>0)
	{
		var gftop = $('#xssGoldFil').offset().top;
		
		if(gftop != null)
		{
			$(window).bind('scroll', function() {
			if ($(window).scrollTop() > gftop) {
				$("#xssGoldFil").addClass('goldFil_fixed');
				$("#xssGoldFil").removeClass('xssGoldFil');
			} else {
				$("#xssGoldFil").addClass('xssGoldFil');
				$("#xssGoldFil").removeClass('goldFil_fixed');
			}
	
			if ($(window).scrollTop() < gftop) {
				$("#xssGoldFil").addClass('xssGoldFil');
				$("#xssGoldFil").removeClass('goldFil_fixed');
			}
			});
		}else
		{
			return false;
		}
	}
	
    
	
	//商品价格搜索确定按钮的显隐
	
	 
    $('.integralArea[integralArea=0] input').focus(function() {
        $(this).parent('span').siblings('.areaSub').show();
    });
	/*$('.integralArea[integralArea=0] input').blur(function() {
        $(this).parent('span').siblings('.areaSub').hide();
    });*/
	
	$(".areaSub").hover(function(){	
		$(this).show();
		},function(){
			$(this).hide();
		
	});
	
    $(".areaSub  .cancle").bind("click",function(e) {
        $(".integralArea").find("input").val("");
		$(".areaSub").hide();
        return false;
    });
	
	$(".areaSub .sub").bind("click",function(e) { //验证输入的价格区间
        var value1 = parseInt($(".integralArea").find("input").eq(0).val());
        var value2 = parseInt($(".integralArea").find("input").eq(1).val());
        if (isNaN(value1) || isNaN(value2) || value1 > value2) {
            $(".integralArea").find("input").val("") ;
			$(".areaSub").hide();
            return false;
        } else {
			$(".areaSub").hide();
            return true;

        }

    });
	

   
	//商品详情弹窗
	$(".duiNow .duiBtn").bind('click',function(){
		$(".notEnoughFrame").show();
	})
	$(".zpEnClose,.zpEnCloseBtn").bind('click',function(){
		$(this).parents(".notEnoughFrame").hide();
	})
	//购物数量加减
	var buySum= $(".zpInput").find('input').val();
	
	$(".zpIncrease").bind('click',function(){
		buySum++;
		if(buySum>1){
			$(this).siblings(".zpDecrise").removeClass("zpdStop");
		}
		$(".zpInput").find('input').val(buySum);
	})
	$(".zpDecrise").bind('click',function(){
		buySum--;
		if(buySum<=1){
			buySum=1;
			$(this).addClass("zpdStop");
		}
		$(".zpInput").find('input').val(buySum);
	})
	
	//移入商品显示边框
	$(".proList li").hover(function() { 
	
        $(this).find("div").eq(0).show();

    },
    function() {
		
        $(this).find("div").eq(0).hide();

    });
	
	//移入礼品显示边框
	$(".xssGoldCon li").hover(function() { 
	
        $(this).addClass("on");

    },
    function() {
		
        $(this).removeClass("on");

    });
	//赚金币任务提示
	$(".memTaskCon .mtCon-l").hover(function() { 
	
        $(this).siblings(".memTask-pro").show();

    },
    function() {
		
       $(this).siblings(".memTask-pro").hide();

    });
	
	
	
	/*我的特权
	$(".MyvilegeList li").hover(function(){
		var index=$(".MyvilegeList li").index($(this));
		$(".vilegeListPop").eq(index).show();
		
		},function(){
		var index=$(".MyvilegeList li").index($(this));	
		$(".vilegeListPop").eq(index).hide();
	});*/
	
	/*首页轮播*/

    var number = $(".clubFocusBtn").find("span").length;
    var index = 2;
    var current = 0;
    var change=null;
    function turn() {
        change = setInterval(function() {
            current++;
            index++;
            if (current == number) {
                current = 0;
            }
            $(".clubFocusBtn span").removeClass("on");
            $(".clubFocusBtn span").eq(current).addClass("on");
            $(".clubFocusPic li").stop();
            $(".clubFocusPic li").eq(current).css({"opacity": "0","z-index": index});       
            $(".clubFocusPic li").eq(current).animate({"opacity": "1"}, 800);

        },
        2000)
    }

    $(".clubFocusBtn span").mouseover(function(e) {
        clearInterval(change);
        var onNumber = $(".clubFocusBtn span").index($(this));
        if (onNumber == current) {
            return false;

        }

        $(".clubFocusBtn span").removeClass("on");
        $(".clubFocusBtn span").eq(onNumber).addClass("on");
        $(".clubFocusPic li").stop();
        $(".clubFocusPic li").eq(onNumber).css({"opacity": "0","z-index": index+1});
        $(".clubFocusPic li").eq(onNumber).animate({"opacity": "1"},800);
        index++;
        current = onNumber;

    });

    $(".clubFocusPic").mouseover(function() {
        clearInterval(change);
    });
    $(".clubFocusPic").mouseout(function() {
        clearInterval(change);
        turn();
    });

    turn();
	
	
	$(".goldSubnav a").click(function(e) {
		$(".goldSubnav a").removeClass("gsGiftOn");
		$(this).siblings().addClass("gsGift");
		$(this).removeClass("gsGift");
        $(this).addClass("gsGiftOn");
		
    });
	

	$(".frameC li,.situ li").click(function(e) {
		$(this).siblings().removeClass("on");
		$(this).addClass("on");
        
		
    });
	
	/* 我的特权 
	var iLeft=$('.MyvilegeList').width();
	
	var oLi='<li>';
	var numLi=Math.ceil($('.MyvilegeList li').length/4);

	for(var i=0; i<numLi; i++)
	{
		$('.moreIcon').find('ul').append(oLi);
	}
	
	$('.moreIcon').find('li').eq(0).addClass('on');
	
	$('.moreIcon li').live('click',function(){
		
		var n=$('.moreIcon li').index($(this));
		
		$('.moreIcon li').removeClass('on');
		$(this).addClass('on');
		
		$('.MyvilegeList ul').stop().animate({'left':(-iLeft*n)+'px'},500);
	})
	

	$('.MyvilegeList li').hover(function(){
		
		var n=$('.MyvilegeList li').index($(this));
		var text=$(".MyvilegeList li").eq(n).attr('contentVal');
		$(".vilegeListPop").text(text);
		n=n%4;
		
		switch(n)
		{
			case 0:
			  $('.vilegeListPop').css('left',0);
			 break;	
			case 1:
			 $('.vilegeListPop').css('left','43px');
			 break; 
			case 2:
			 $('.vilegeListPop').css('left','86px');
			 break;
			case 3:
			 $('.vilegeListPop').css('left','129px');
			 break;
		}
		
		$(".vilegeListPop").show();
	},function(){
		
		$(".vilegeListPop").hide();
		
	})*/

    /* 换一批 */
	var numUl=Math.ceil($('.clubTaskList').find('li').length/3);
	var numLi=3-($('.clubTaskList').find('li').length%3);
	
	for(var i=0;i<numLi;i++)
	{
	   $('.clubTaskList ul').append($('<li>').html($('.clubTaskList').find('li').eq(i).html()))	
	}
	
	
	for(var i=0;i<numUl;i++)
	{
		$('.clubTaskList').append('<ul style="opacity:0; z-index:0; position:absolute; left:0; top:0;display:none">');
	}
	
	
	$('.clubTaskList li').each(function(i){
		
		var m=parseInt(i/3);
		
		if(m==0)
		{
			$('.clubTaskList ul').eq(1).append($('<li>').html($(this).html()))
		}
		else if(m==1)
		{
			$('.clubTaskList ul').eq(2).append($('<li>').html($(this).html()))
		}
		else if(m==2)
		{
			$('.clubTaskList ul').eq(3).append($('<li>').html($(this).html()))
		}
		else if(m==3)
		{
			$('.clubTaskList ul').eq(4).append($('<li>').html($(this).html()))
		}
		
	})
	
	$('.clubTaskList ul:eq(0)').remove();
	$('.clubTaskList ul:eq(0)').css({'opacity':1,'z-index':1,'display':'block'})
	
	var oUlNum=$('.clubTaskList ul').length;
	var changNum=0;
	
	$('#changeShop').click(function(){
	
	   changNum++;
	  
	   if(changNum>=oUlNum)
	   {
		   changNum=0;
	   }
	   $('.clubTaskList ul').css({'opacity':0,'z-index':0,'display':'none'});
	   $('.clubTaskList ul').eq(changNum).css({'z-index':1,'display':'block'}).animate({'opacity':1},500)
	   
	  
		
	})
	
	
})