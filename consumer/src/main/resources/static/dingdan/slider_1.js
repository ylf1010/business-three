;(function($) {
	$.fn.slider_1 = function(option) {
		var option = $.extend(option);
		return this.each(function() {
			var $nav = jQuery(this).find(".recNavBox").find("span");
			var $prevBtn = jQuery(this).find(".recLeft");
			var $nextBtn = jQuery(this).find(".recRight");
			var $bigUl = jQuery(this).find("ul");
			var sliderLength = Math.ceil($bigUl.find("li").length / 4);
			var sliderWidth = ($bigUl.find("li").width() + 9) * 4;
			var index = 0;
			var width = sliderWidth * sliderLength;
			$bigUl.css('width', width);
			$nav.css('display', 'none');
			for (var i = 0; i < sliderLength; i++) {
				$nav.eq(i).css('display', 'inline-block');
			}
			if (sliderLength > 1)
				$nextBtn.removeClass("off");
			/* 翻页事件 */
			$nav.on("click", function() {
				index = jQuer(this).index();
				sliderActive(index);
			});
			/* 下一张事件 */
			$nextBtn.on("click", function() {
				index++;
				if (index >= sliderLength - 1) {
					index = sliderLength - 1;
					$nextBtn.addClass("off");
				}
				sliderActive(index);
				$prevBtn.removeClass("off");
			});
			/* 上一张事件 */
			$prevBtn.on("click", function() {
				index--;
				if (index <= 0) {
					index = 0;
					$prevBtn.addClass("off");
				}
				sliderActive(index);
				$nextBtn.removeClass("off");
			});

			function sliderActive(n) {
				if (!$bigUl.is(":animated")) {
					$bigUl.stop().animate({
						marginLeft : -sliderWidth * n
					}, 500);
					$nav.removeClass("on").eq(n).addClass("on");
				}
			}
		});
	};
})(jQuery);