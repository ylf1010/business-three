// JavaScript Document
$(document).ready(function(e) {
    var width=$(window).width();
	var ohead1 = document.getElementById("newLink");
	if(width>1200)
	{
		
		ohead1.href="http://misc.jiuxian.com/css/clubCss/club_1200.css";
	}
	else
		{
			
			ohead1.href=""
		}
	$(window).bind("resize",function() {
		var resizewidth=$(window).width();
		if(resizewidth>1200)
		{
		    ohead1.href="http://misc.jiuxian.com/css/clubCss/club_1200.css";
		}
		else
		{
			ohead1.href=""
		}
	
    });
		
		

	
	
});