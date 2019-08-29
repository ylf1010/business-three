function callbackSc(data){
//	data = eval('('+data+')');
	if (data == null) {
		return null;
	}
	if (data.resultList != "") {
		$("#wineSearchCon").show();
		var keyslistHtml = "";
		var jsonList = data.resultList;
		for (var i = 0; i < jsonList.length; i++) {
			keyslistHtml += '<li class="clearfix"><a href="'+jsonList[i].url+'"><span>'+jsonList[i].word+'</span><em>约<b>'+jsonList[i].count+'</b>件商品</em></a></li>';									
		}												
										
		$("#wineSearchCon ul").empty().append(keyslistHtml);
	} else {
		$("#wineSearchCon").hide();
	}
}
$(document).ready(function(e) {

	$(".yHeaderSearch .search-form").bind("keyup",function(e){
		getSearchResult(e);
	});
	$(".yHeaderSearch .search-form").bind("keydown",function(e){
		navList(e);
		});
	$("#wineSearchCon").delegate("#wineSearchCon li","click mouseenter mouseleave",listHover1);
	
	function getSearchResult(e){
			//en=e||window.event;			
			var keywords=$.trim($("#search-form").val());
			if(keywords==""){
				//$("#wineSearchCon").hide();
				return false;
			}
			if((e.which>=48&&e.which<=57)||(e.which>=96&&e.which<=105)||(e.which>=65&&e.which<=90)||e.which==8||e.which==46||e.which==13||e.which==32)
			{
			 	if(keywords.length>0){	
					
//			 		var domain_list='http://list.jiuxian.com';					
//					var real_url = domain_list + "/associate.htm?wd=" + keywords + "&t=" + new Date().getTime();
					$.support.cors = true;
					$.ajax({
						type: "POST",
						url: window.jxdomain.list + "/associate.htm?t=" + new Date().getTime()+"&callback=callbackSc",
						data: {
							'wd':keywords
						},
						dataType:"jsonp",
						jsonp:"callbackSc",
						async : true,
						success: function(data) {
						}
					});
			 	 }
			}
		}

		function navList(e){
			
				 switch (e.which)
				 {
					 case 38://上一个
					  
					 if($("#wineSearchCon li").hasClass("on"))  
					 	{
						  $("#wineSearchCon li.on").removeClass("on").prev().addClass("on");
						 } 
					  else
						{
				       	  $("#wineSearchCon li:last").addClass("on");
					     }
					// $("#search-form").val($("#wineSearchCon li.on span").text());
					 break;					
					 case 40:    //下一个
					 
					 if($("#wineSearchCon li").hasClass("on"))  
					 	{
						  $("#wineSearchCon li.on").removeClass("on").next().addClass("on");
						 } 
					else
					 	{
						  $("#wineSearchCon li:first").addClass("on");
						}
					// $("#search-form").val($("#wineSearchCon li.on span").text());					
					 break;
					 case 13:   //回车							 
					 if($("#wineSearchCon li.on").length==0){
						 var keywordHc = $.trim($(".search-form").val());
						 var url = window.jxdomain.list+"/search.htm?keys="+keywordHc;
					 }else{
						 $("#search-form").val($("#wineSearchCon li.on span").text());
						 var url= $("#wineSearchCon li.on").find("a").attr("href");			
					 }
					 
					 $("#wineSearchCon ul").empty();
					 $("#wineSearchCon").hide();
					 $("#search-form").focus();					 
					 window.location.href = url;
					 break;
				 }
				
			}
			
	function listHover1(e){		
				if(e.type=="mouseenter")
				{
					
					$("#wineSearchCon li").removeClass("on");
					$(this).addClass("on");
					e.stopPropagation();

				}
				if(e.type=="mouseleave")
				{
					$("#wineSearchCon li").removeClass("on");
					e.stopPropagation();
				}
			    if(e.type=="click")
				{					
					$("#wineSearchCon ul").empty();
					$("#wineSearchCon").hide();
					$("#search-form").focus();
				}
				//$("#search-form").val($("#wineSearchCon li.on span").text());
			
			}
	
	$(".yHeaderSearch .wineSearchCon").bind('mouseleave',function(){
		setTimeout(function(){
			$(".wineSearchCon").hide();	
	    },1000);
	});
	
	$(".wineSearchCon .search-close").bind('click',function(){
		$(this).parents(".wineSearchCon").hide();
	});
	/*搜索框 end*/
});