$(function(){
	var pathname = window.location.pathname;
	var method = '';
	if(pathname.lastIndexOf("/") > 0 && pathname.indexOf(".htm") > 0){
		if(pathname.indexOf("-") > 0){
			method = pathname.substring(pathname.lastIndexOf("/")+1,pathname.indexOf("-"));
		}else{
			method = pathname.substring(pathname.lastIndexOf("/")+1,pathname.indexOf(".htm"));
		}
	}
	var aList = $(".navList").find("a");
	aList.each(function(){
		var href = '';
		if($(this).attr("href").indexOf("-") > 0){
			href = $(this).attr("href").substring($(this).attr("href").lastIndexOf("/")+1,$(this).attr("href").indexOf("-"));
		}else{
			href = $(this).attr("href").substring($(this).attr("href").lastIndexOf("/")+1,$(this).attr("href").indexOf(".htm"));
		}
		if (href != null &&　href !=　'' && method != null && method != '') {  
			if(href == method){
				$(this).addClass("on");
				return;
			}
        }  
		// 非导航标准链接跳转
		// 我的订单
		if(href=='my_order' && method=='order_detail'){
			$(this).addClass("on");
			return;
		}
		// 我的作品
		if(href=='my_task' && method=='task_detail'){
			$(this).addClass("on");
			return;
		}
		// 我的礼品卡
		if(href=='lpk' && method=='getlpk'){
			$(this).addClass("on");
			return;
		}
		// 账户安全
		if(href=='acc_security' && (method=='change_password' || method=='email_send' || method=='change_email' || method=='verify_phone' || method=='verify_phone_suc' || method=='change_phone' 
			|| method=='changephone_suc' || method=='verify_paypassword' || method=='verify_paypassword_suc' || method=='change_paypassword' || method=='change_paypassword_suc' || method=='verification_email')){
			$(this).addClass("on");
			return;
		}
    });
});