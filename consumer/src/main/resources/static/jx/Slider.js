// JavaScript Document
/*无缝轮播插件*/  
/*左右按钮*/  

(function($) {
    $.fn.Slider = function(option) {
        var defaults = {
            speed: 500, /*图片切换时间*/
			pageNum:5,   /*商品个数*/     
			width:500    /*轮播宽度*/   
        }

        var option = $.extend(defaults, option);
        return this.each(function() {
            var $this = $(this);
		    var $bigUl=$this.find("ul");
            var currentNum = 0;
            var num=Math.ceil($this.find("li").length/option.pageNum);
			var $prev=$this.prev(".prev");
			var $next=$this.next(".next");
           $prev.click(function(e) {
	            	currentNum--;
	
		     if(currentNum<0)
		     {
			 currentNum++;
			  return false;
			  }
		
		
		    $bigUl.stop().animate({
                    "left": (currentNum * -(option.width))
                },option.speed);   
          });
			
			$next.click(function(e) {
				currentNum++;    
	         	if(currentNum>=num)
	             	{
						currentNum--;
		              	return false;
			        }
			
		        $bigUl.stop().animate({
                    "left": (currentNum * -(option.width))
                },option.speed); 
				//alert(width)
				
            });

        })

    }
	

})(jQuery)


