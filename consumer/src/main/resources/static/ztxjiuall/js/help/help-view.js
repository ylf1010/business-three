//第一个展开
//可以指定展开
//其他关闭
//var iShow=0;//展开第几个

//if($!navId != ''){
//  iShow = $!navId
//}
var isShow=false;//
$(function(){
	$('.nav_2ji').hide();
	$('.nav_2ji').eq(iShow).show();
	$('.nav_1ji').eq(iShow).find("p").css('background-position','13px -79px');
	$('.nav_1ji').eq(iShow).find("p").css('background-position-x','13px');
	$('.nav_1ji').eq(iShow).find("p").css('background-position-y','-79px');
	$('.nav_1ji').eq(iShow).find("p").css('background-repeat','no-repeat');
	var bStop=true;
	$('.nav_1ji').click(function(eV){
		$('.nav_2ji').hide();//隐藏所有内容
		$('.nav_1ji').find("p").css('background-position-x','13px');
		$('.nav_1ji').find("p").css('background-position-y','-103px');
		$('.nav_1ji').find("p").css('background-position','13px -103px');
		$('.nav_1ji').find("p").css('background-repeat','no-repeat');
		var dom=$(eV.currentTarget);
		var sDom=dom.parent().children("div").eq(1);//下拉框
		isShow=sDom.filter(":hidden").length==1?true:false;//子元素是否显示
		if(isShow)
		{
			sDom.show();//stop().animate({'height':'97px'});
			dom.find("p").css('background-position-x','13px');
            dom.find("p").css('background-position-y','-79px');
			dom.find("p").css('background-position','13px -79px');
			dom.find("p").css('background-repeat','no-repeat');
			
		}
		else
		{
	        sDom.hide();//stop().animate({'height':'97px'});
		    dom.find("p").css('background-position-x','13px');
            dom.find("p").css('background-position-y','-103px');
			dom.find("p").css('background-position','13px -103px');
			dom.find("p").css('background-repeat','no-repeat');
		}
		
	})
	
	

	
	
})