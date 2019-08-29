$(function(){
	//礼品专区专题页TAB切换
	$(".navlist").find("li").bind('click',function(){
		var num = $(".navlist").find("li").index($(this))+1;
		$(".navlist").find("li").removeClass("list_1");
		$(this).addClass("list_1")
		//$(".eveprefecture").hide();
		//$(".lpzq_sp"+num).show();	
	})
	//获奖高分专题页TAB切换
	var nextNum = 1
	$(".hjgf_nva").find("div").bind('click',function(){
		var e = nextNum;
		$(this).siblings("div").removeClass("hjgf_nvaon"+e)
		var num = $(".hjgf_nva").find("div").index($(this))+1;
		nextNum = num;
		$(this).siblings("div [class=hjgf_nvaon"+nextNum+"]").removeClass("hjgf_nvaon")
		$(this).addClass("hjgf_nvaon"+num);
		$(".hjgf_banner").find("div").hide();
		$(".hjgf_banner").find("div").eq(num-1).show();
		$(".hjgf_content").children("div").hide();
		$(".hjgf_content").children("div").eq(num-1).show()
	})
    //价格销量按钮变化
	/*
	$(".tl_a").toggle(function(){
		$(this).css('background','url("http://img01.jiuxian.com/wine_new/arr0.gif") no-repeat right center')
	},function(){
		$(this).css('background','url("http://img01.jiuxian.com/wine_new/arr2.gif") no-repeat right center')
	})
	$(".tl_b").toggle(function(){
		$(this).css('background','url("http://img01.jiuxian.com/wine_new/arr2.gif") no-repeat right center')
	},function(){
		$(this).css('background','url("http://img01.jiuxian.com/wine_new/arr0.gif") no-repeat right center')
	})	*/
	//鼠标滑过添加边框
	$(".lpzq_sp_list .sp_box").mouseover(function(){
		var tipLen = $(this).find(".sp_md").text().length;
		if(tipLen>17)
		{
			$(this).find(".sp_md").css('height','auto');	
		}
		$(this).css('border','3px solid #E7E7E2');
		
		}).mouseout(function(){
		$(this).find(".sp_md").css('height','20px');
		$(this).css('border','3px solid #FFFFFF')
		})

	
})