// JavaScript Document
/*无缝轮播插件*/  
/*点选按钮*/  

(function($) {
    $.fn.Slider = function(option) {
        var defaults = {
            speed: 800,
            /*图片切换时间*/
            pausetime: 2500,
            /*图片显示时间*/
            width: $(this).find("ul").eq(0).find("li").width()
         
        }

        var option = $.extend(defaults, option);
        return this.each(function() {
            var $this = $(this);
            var timer;
            var currentNum = 0;
            var $bigUl = $this.find("ul").eq(0);
			var length=$(this).find("ul").eq(0).find("li").length;
            var $smallUl = $(".moreIcon").find("ul");
			var newhtml=$bigUl.html()+$bigUl.html();
			$bigUl.html(newhtml)
            tab();

            function tab() {
                timer = setInterval(function() {
                    currentNum++;
                    if (currentNum == length) {
                           $bigUl.stop().animate({
                            "marginLeft": currentNum * -option.width + "px"
                        },
                        option.speed,function(){
							$bigUl.css({
                            "marginLeft": "0px"
                        });
							});
							
						currentNum = 0;
                    } else {
                        $bigUl.stop().animate({
                            "marginLeft": currentNum * -option.width + "px"
                        },
                        option.speed);
                    }
                    $smallUl.find("span").removeClass("on");
                    $smallUl.find("span").eq(currentNum).addClass("on");
                },
                option.pausetime)
            }

            $this.bind("mouseover", function() {
                clearInterval(timer);
            });
		    $this.bind("mouseout",function() {
                tab();
            });
            $(".smallUl li").live("mouseover",function(e){
                var index = $smallUl.find("span").index($(this));
                $smallUl.find("span").removeClass("on");
                $smallUl.find("span").eq(index).addClass("on");
                $bigUl.stop().animate({
                    "marginLeft": index * -option.width + "px"
                },
                option.speed);
                currentNum = index;

            })

        })

    }

})(jQuery)