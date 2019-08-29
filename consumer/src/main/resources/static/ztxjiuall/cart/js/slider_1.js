;(function($) {
	$.fn.slider_1 = function(option) {
		var option = $.extend(option);
		return this.each(function() {
			//var $nav = jQuery(this).find(".recNavBox").find("span");
			var $prevBtn = jQuery(this).find(".recLeft");
			var $nextBtn = jQuery(this).find(".recRight");
			var $bigUl = jQuery(this).find("ul");
			var sliderLength = Math.ceil($bigUl.find("li").length / 6);
			var sliderWidth = ($bigUl.find("li").width() + 20) * 6;
			var index = 0;
			var width = sliderWidth * sliderLength;
			$bigUl.css('width', width);
			//$nav.css('display', 'none');
			/*for (var i = 0; i < sliderLength; i++) {
				$nav.eq(i).css('display', 'inline-block');
			}*/
			$prevBtn.addClass("off");
			if(sliderLength <= 1){
				$prevBtn.addClass("off");	
				$nextBtn.addClass("off");
			}else{
				$nextBtn.removeClass("off");
			}
				
			/* 翻页事件 */
			/*$nav.bind("click", function() {
				index = jQuer(this).index();
				sliderActive(index);
			});*/
			/* 下一张事件 */
			$nextBtn.bind("click", function() {		
			    index++;
				if (index >= sliderLength - 1) {					
					index = sliderLength - 1;
					$nextBtn.addClass("off");
					$prevBtn.removeClass("off");
				}else{
					$nextBtn.removeClass("off");
					$prevBtn.removeClass("off");
				}		
				
				sliderActive(index);
			});
			/* 上一张事件 */
			$prevBtn.bind("click", function() {
				index--;
				if (index <= 0) {
					index = 0;
					$prevBtn.addClass("off");
					$nextBtn.removeClass("off");
				}else{
					$nextBtn.removeClass("off");
					$prevBtn.removeClass("off");
				}				
				sliderActive(index);
			});

			function sliderActive(n) {
				if (!$bigUl.is(":animated")) {
					$bigUl.stop().animate({
						marginLeft : -sliderWidth * n
					}, 500);
					//$nav.removeClass("on").eq(n).addClass("on");
				}
			}
		});
	};
})(jQuery);
