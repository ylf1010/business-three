
//自定义alert弹窗插件
$(function(){
	
	var popr = '<div class="pop-modal"></div><div class="pop-wrap pop-wrap1"><div class="pop-layer"><div class="pop-title"><p class="alertTitle">提示</p><i class="popIcon alertClose"></i></div><div class="pop-main"><i class="popIcon popType success"></i><i class="popIcon popType fail"></i><i class="popIcon popType alarm"></i><i class="popIcon popType confirm"></i><p><span class="alertContent">操作成功</span><em></em></p></div><div class="pop-bottom"><span class="confirm alertSure"><b>确定</b></span><span class="cancel alertCancel"><b>取消</b></span></div></div></div>';
	$("body").append(popr);

	$.extend({
		showAlert:function(option){
			var defaults={
				"target":$(".pop-wrap1"),   //弹窗目标对象		
				"title":"提示",            //弹窗提示title
				"content":"操作成功",        //弹窗提示内容
				"type":"success",                //弹窗类型  成功(success)、失败(fail)、警告(alarm)、对话（confirm）       
				"cancelShow":false,          //是否显示取消按钮  默认不显示
				"callback":null,				//添加回调函数
				"cancelCallback":null,
				"alertSure":"确定",
				"alertCancel":"取消"        //取消关闭后回调函数
				}
			var option = $.extend(defaults,option);
			$(".pop-modal").show();
			option.target.show();
			option.target.find(".popType").hide();;
			option.target.find("."+option.type).show();
			option.target.find(".alertTitle").text(option.title);
			option.target.find(".alertSure b").text(option.alertSure);
			option.target.find(".alertCancel b").text(option.alertCancel);
			option.target.find(".alertContent").text(option.content);
			var hideAlert = function(){
				$(".pop-modal").hide();
				option.target.hide();				
			}

			if(!option.cancelShow)
			{
				option.target.find(".alertCancel").hide();
			}else{
				option.target.find(".alertCancel").show();
			}
			option.target.find(".alertSure").bind("click",function(){
				hideAlert();	
				option.cancelCallback = null;
				if(option.callback&&typeof(option.callback)=="function")
				{									
						option.callback();
						if(option.type=="confirm")
							{
								option.callback = null;
							}
				}
							
			});
			
			      
			$(".alertClose,.alertCancel").bind("click",function(){
				if(option.cancelCallback&&typeof(option.cancelCallback)=="function"){									
						option.cancelCallback();
				}
				option.callback = null;
				option.cancelCallback = null;
				hideAlert();	
				
			});	
			
			$("body").bind("keyup",function(e){
				if(e.which==13){
					option.target.find(".alertSure").trigger("click");									
				}
				if(e.which==27){
					hideAlert();								
				}
				$("body").unbind("keyup");	
			});	

		}
		});
})