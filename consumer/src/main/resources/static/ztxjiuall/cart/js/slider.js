(function($){	
/* 
* Name: slider_2  
* Copyright: 周德志 
* Date: 2014-12-17
* Description: 左右无缝滚动轮播插件 v1.0  
* Funtion: 左右按钮、数字按钮、自动播放、滚动切换 
*/
	$.fn.slider=function(option){
		var defaults ={
			speed : 500, //图片切换 动画时间
			trigger : "click"  //按钮触发事件

			}
		var option = $.extend(defaults,option);
		return this.each(function(){
			var $this=$(this),
			$prevBtn = $this.find(".prevPage"),
			$nextBtn = $this.find(".nextPage"),
			$bigUl = $this.find(".bigUl"),
			liWidth =  $bigUl.find("li").width()+1,
			sliderNum = Math.ceil($bigUl.find("li").length/4),
			currentPage = 0,
			isAnimate = $bigUl.is(":animated"),
			marginLeft = 0,
			$screen_prve = $this.find(".screen-prve"),
			$screen_next = $this.find(".screen-next"),
			$cur_screen = $this.find(".cur-screen"),
			$total_screen = $this.find(".total-screen");
			$total_screen.text(sliderNum)
			/*下一张事件*/
			$nextBtn.bind("click",nextFn);
			$screen_next.bind("click",nextFn);
			function nextFn(){
				if(!isAnimate)
				{
					currentPage++;			
					if(currentPage<sliderNum-1){
						marginLeft = marginLeft+1000;
						$bigUl.stop().animate({"marginLeft":-marginLeft+"px"},option.speed);
					}else if(currentPage==sliderNum-1){
						marginLeft = liWidth*($bigUl.find("li").length-4)
						$bigUl.stop().animate({"marginLeft":-marginLeft+"px"},option.speed);
					}else if(currentPage>sliderNum-1){
						currentPage=sliderNum-1;
					}					
					$cur_screen.text(currentPage+1);
				}else
				{					
					return false;						
				}
			};
			/*上一张事件*/
			$prevBtn.bind("click",prevFn);
			$screen_prve.bind("click",prevFn);
			function prevFn(){
				if(!isAnimate)
				{
					currentPage--;
					if(currentPage>0&&currentPage<sliderNum-1){
						marginLeft=marginLeft-1000;
						$bigUl.stop().animate({"marginLeft":-marginLeft+"px"},option.speed);
					}else if(currentPage==0){
						marginLeft=0;
						$bigUl.stop().animate({"marginLeft":"0px"},option.speed);
					}else if(currentPage<0){
						currentPage=0;
					}
					$cur_screen.text(currentPage+1);
				}else
				{					
					return false;						
				}
			}
		});
	};
})(jQuery)
