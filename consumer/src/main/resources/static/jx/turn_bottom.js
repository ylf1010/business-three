// JavaScript Document

$.fn.Popup=function(opts){
		var opt={
			oDiv	 : null
		};		
		$.extend(opt,opts);
		return this.each(function(){
			
			$(this).bind('click',function(){
		
				var iWidth=parseInt($('.popup').children('div').eq(1).css('width'))+62;
			    $('.popup').css('width',iWidth+'px');
			    $('.popup .title').css('width',iWidth+'px');
				var iLeft=($(window).width()-$('.popup').outerWidth())/2;
				var iTop=($(window).height()-$('.popup').outerHeight())/2;
				$('.popup').css({'top':iTop+'px','left':iLeft+'px'});
				
				$('.popupMask').show();
				$('.popup').show();
				$('.popup .accNotic').hide();
				 
			})
			//alert($('.popup').children('div').eq(1).css('width'))
			
			
			$('.popupClose').bind('click',function(){
				
				$('.popupMask').hide();
				$('.popup').hide();
				
			})
			
			$(window).bind('resize',function(){
				
				var iLeft=($(window).width()-$('.popup').outerWidth())/2;
				var iTop=($(window).height()-$('.popup').outerHeight())/2;
				$('.popup').css({'top':iTop+'px','left':iLeft+'px'});
			})

	   })
}


$(document).ready(function(e) {
	
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
	
		
//	var pageNum;
//	var sliderWidth;
//    var newW = $(window).width();
//		if(newW>1200)
//		{
//			pageNum=5;
//			sliderWidth=900;
//			
//		}
//		else{
//			pageNum=4;
//			sliderWidth=700;
//
//			}

	$(window).resize(function(){
		var newW = $(window).width();
		if(newW>1200)
		{
			pageNum=5;
			sliderWidth=900;
			
		}
		else{
			pageNum=4;
			sliderWidth=700;

			}
		$(".ubRemList").find("ul").css("margin-left","0");
		$(".ubRemList").Slider({
		"pageNum":pageNum,
		"width":sliderWidth
	     });
		
	});
    
	
//	/*底部轮播*/
//    $(".ubRemList").Slider({
//		"pageNum":pageNum,
//		"width":sliderWidth
//	});

		
//    /*底部翻页*/
//	var currentNum=1;
//	var length=$(".history").find("ul").length;
//	$(".ubHisPage .ubHis-Prev").click(function() {
//		currentNum--;
//		if(currentNum<=0)
//		{
//			currentNum=1;
//			return false;		
//		}
//		$(".history").find("ul").hide();
//		$(".history").find("ul").eq(currentNum-1).show();
//		$(this).next("span").find("b").text(currentNum);
//		$(this).css("background-position","-167px -72px");
//		$(".ubHisPage .ubHis-Next").css("background-position","-200px -72px");
//   
//    });
//		
//	$(".ubHisPage .ubHis-Next").click(function() {
//		currentNum++;
//		
//		if(currentNum>length)
//		{
//			currentNum=length;
//			return false;	
//		}
//		$(".history").find("ul").hide();
//		$(".history").find("ul").eq(currentNum-1).show();
//		$(this).prev("span").find("b").text(currentNum);
//		$(this).css("background-position","-263px -72px");
//		$(".ubHisPage .ubHis-Prev").css("background-position","-231px -72px");
//
//        
//    });
	

	
})