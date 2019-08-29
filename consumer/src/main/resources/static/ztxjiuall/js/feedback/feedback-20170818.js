function getCookie(objName) {
	var arrStr = document.cookie.split("; ");
	for ( var i = 0; i < arrStr.length; i++) {
		var temp = arrStr[i].split("=");
		if (temp[0] == objName) {
			return unescape(temp[1])
		}
	}
	return ""
}
function setCookie(c_name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value)
			+ ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
        	+ ";path=/;domain=jiuxian.com";
}
$(document).ready(function(){
	$("input[type=text],textarea").val("");
			//加载时隐藏提示信息
        	$(".itemCon .feedForm").focus(function(){
        		$(this).parents(".itemCon").siblings(".notic").hide();
        	});
        	//焦点触发时验证
        	//可空属性验证
        	$("#phone").focusout(function(){
        		var formVal=jQuery.trim($(this).val());
        		if(formVal.length==0){
        			$(this).parents(".itemCon").siblings(".notic").hide();
        		}else{
        				moblie = /^[1][3-9][0-9]{9}$/;
        				phone = /^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;
        				if(moblie.test(formVal) || phone.test(formVal)){
						    $(this).parents(".itemCon").siblings(".notic").hide();
        					return true;
        				}else{
        					$(this).parents(".itemCon").siblings(".notic").text("您的电话输入格式有误,请重新输入！").show();
						}
        		}
        	});
			
			//非空属性验证
        	$(".itemCon .feedForm").focusout(function(){
        		var formVal=jQuery.trim($(this).val());
        		if(formVal==""){  			
        			if($(this).hasClass("formTitle")){
        				$(this).parents(".itemCon").siblings(".notic").text("请输入您的标题！").show();
        			}
        			if($(this).hasClass("formContent")){
        				$(this).parents(".itemCon").siblings(".notic").text("请输入您反馈的内容！").show();
        			}
        			if($(this).hasClass("formMail")){
        				$(this).parents(".itemCon").siblings(".notic").text("请输入您的邮箱！").show();
        			}
					if($(this).hasClass("formCapcha")){
						$(this).parents(".itemCon").siblings(".notic").text("请输入您的验证码！").show();
        			}
        		}else{
        			if($(this).hasClass("formTitle")){
        				if(jQuery.trim($(this).val()).length<4 || jQuery.trim($(this).val()).length>20){
                			$(this).parents(".itemCon").siblings(".notic").text("请输入4-20个字！").show();
                		}
        			}
        			if($(this).hasClass("formContent")){
        				if($(this).val().length > 500){
        					$(this).parents(".itemCon").siblings(".notic").text("反馈内容的长度不能大于500个字符！").show();
        				}
        			}
        			if($(this).hasClass("formMail")){
        				flag = /^([a-zA-Z0-9\-_\.]+)@([a-zA-Z0-9\-]+\.)+[a-zA-Z0-9]{2,4}$/;
        				if(!flag.test(formVal)){
        					$(this).parents(".itemCon").siblings(".notic").text("您的邮箱输入格式有误,请重新输入！").show();
        				}
						if($(this).val().length > 50){
        					$(this).parents(".itemCon").siblings(".notic").text("最多输入50个字符！").show();
        				}
        			}
					if($(this).hasClass("formCapcha")){
    					if(formVal.length !=0 && formVal.length != 4){
							$(this).parents(".itemCon").siblings(".notic").text("验证码错误或已过期！").show();
    					}
        			}
        		}
        	});
        	
        	
        	//验证后提交表单
        	$(".itemRight .feedForm4").bind('click',function(){
        		$(".itemCon").each(function(){
        			var formVal=$(this).find(".feedForm").val();
        			if(formVal==""){
        				$(this).siblings(".notic").show();
        			}else{
        				if($(this).find(".feedForm").hasClass("formMail")){
        					flag = /^([a-zA-Z0-9\-_\.]+)@([a-zA-Z0-9\-]+\.)+[a-zA-Z0-9]{2,4}$/;
        					if(!flag.test(formVal)){
        						$(this).siblings(".notic").text("您的邮箱输入格式有误,请重新输入！").show();
        					}
        				}
        				if($(this).find(".feedForm").hasClass("formCapcha")){
        					if(formVal.length != 4){
        						$(this).siblings(".notic").text("验证码错误或已过期！").show();
        					}
        				}
        			}
        		});     				
				//ajax提交表单
				tijiao();
        	});   	
			//按enter键提交
		/**	$(document).keypress(function(event){
        		   var code;  
        	   	   if (!event) {  
        	         event = window.event; //针对ie浏览器  
        	         code = event.keyCode;  
        	         if (code == 13) {
        			   tijiao();
        	        }  
        	       }else{  
        	       //针对遵循w3c标准的浏览器，如Firefox  
        	        code = event.keyCode;  
        	        if (code == 13) {  
        			   tijiao();
        	       }  
        	   }  
        	});	*/
			
			//点击“换一张”重新生成验证码
        	$('#_newCaptcha').bind('click',function(){
                var uuid = $("#uuid").val();
        		jQuery("#_captchaImage").attr("src", "/captchaimg.htm?uuid="+uuid+"&timestamp" + (new Date()).valueOf());
        		jQuery("#captcha").val("");
				
        	});
        	//点击图片重新生成验证码
        	$('#_captchaImage').bind('click',function(){
        		var uuid = $("#uuid").val();
        		jQuery("#_captchaImage").attr("src", "/captchaimg.htm?uuid="+uuid+"&timestamp" + (new Date()).valueOf());
				jQuery("#captcha").val("");
        	});
						
	
			//提交前验证
			//反馈类型的验证
			/**function checktype(){
				var s=true;
				$("input[type='radio']").each(function(){
					   var id= $(this).attr("id");
					   if($("#"+id).attr("checked")==undefined || $("#"+id).attr("checked")==null){
						   s=false;
					   }else if($("#"+id).attr("checked")=="checked"){
						   s=true;
						   return false; 
					   }else{
						   s=false;
					   }
			    });
				
			   if(s == false){
				  $(".fklx").text("请选择反馈类型！").show();
				  return false;
			   }else{
				   return true;
			   }			   
			}*/
			
			//标题的验证
			function titleCheck(){
				var title = jQuery.trim($("#title").val());
				if(jQuery.trim(title).length==0){
        			$(this).parents(".itemCon").siblings(".notic").text("请输入您的标题！").show();
					return false;
        		}else if(jQuery.trim(title).length<4 || jQuery.trim(title).length>20){
        			$(this).parents(".itemCon").siblings(".notic").text("请输入4-20个字！").show();
					return false;
        		}else{
					return true;
				}
			}
			
			//反馈内容的校验方法
			function checkcontent(){
				if(jQuery.trim($("#content").val()).length==0){
        			$("#contentnotic").text("请输入您反馈的内容！").show();
					return false;
        		}else if(jQuery.trim($("#content").val()).length > 500){
					$("#contentnotic").text("反馈内容的长度不能大于500个字符！").show();
					return false;
				}else{
					return true;
				}
			}
			//邮箱的校验方法
			function checkemail(){
				var formVal = jQuery.trim($("#email").val());
				if(formVal.length == 0){
					$("#emailnotic").text("请输入您的邮箱！").show();
					return false;
				}
				flag = /^([a-zA-Z0-9\-_\.]+)@([a-zA-Z0-9\-]+\.)+[a-zA-Z0-9]{2,4}$/;
				if(!flag.test(formVal)){
					$("#emailnotic").text("您输入格式有误,请重新输入！").show();
					return false;
				}
				if(formVal.length > 50){
					$("#emailnotic").text("最多输入50个字符！").show();
					return false;
				}
				return true;
			}
			//电话的校验方法
			function checkphone(){
				var formVal=jQuery.trim($("#phone").val());
        		if(formVal.length == 0){
        			$("#phonenotic").hide();
					return true;
        		}else{
        				moblie = /^[1][3-9][0-9]{9}$/;
						phone = /^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;
        				if(moblie.test(formVal) || phone.test(formVal)){
						    $(this).parents(".itemCon").siblings(".notic").hide();
        					return true;
        				}else{
        					$(this).parents(".itemCon").siblings(".notic").text("您的电话输入格式有误,请重新输入！").show();
        					return false;
						}
        		}
			}
			//验证码的校验方法
			function checkcaptcha(){
				var captha = jQuery.trim($("#captcha").val());
				var isok = false;
				if(captha.length == 0){
					$("#captchanotic").text("请输入您的验证码！").show();
					isok = false;
				}
				if(captha.length != 0 && captha.length != 4){
					$("#captchanotic").text("验证码错误或已过期！").show();
					isok = false;
				}
				
				jQuery.ajax({
        				cache: false,
        				type: "POST",
        				url:"/check_valid_code.htm?uuid="+$("#uuid").val(),
        				data:{"param":captha},
        				async: false,
        				contentType: "application/x-www-form-urlencoded; charset=utf-8",
        				dataType: "json",
        		    	error: function(request) {
        		        	alert("提交失败,请重新提交!");
        		        	isok = false;
        		    	},
        		    	//提交成功
        		    	success: function(data) {
            		    	//提交成功
            		    	if(data.status == "y"){	
								isok =  true;	
            		    	}else{
								$("#captchanotic").text("验证码错误或已过期！").show();
								isok = false;
							}
        		        }
        		});
				
				return isok;
			}
			
		    //点击提交按钮进行表单验证
    		function tijiao(){
    			if(titleCheck() && checkcontent() && checkemail() && checkphone() && checkcaptcha()){
        			jQuery.ajax({
        				cache: false,
        				type: "POST",
        				url:"/feedback.htm",
        				data:$('#ajaxForm').serialize(),
        				async: false,
        				contentType: "application/x-www-form-urlencoded; charset=utf-8",
        				dataType: "json",
        		    	error: function(request) {
        		        	alert("提交失败,请重新提交!");
        					return false;
        		    	},
        		    	//提交成功
        		    	success: function(data) {
            		    	//提交成功
            		    	if(data.action_status == 16){	
            		    		//反馈信息已经提交成功的弹窗
								$(".popWrap").show();	
								$(".backIndex,.popBox .close").bind('click',function(){
									$(".popWrap").hide();	
								});
								//重置验证码
								jQuery("#_captchaImage").attr("src", "/captchaimg.htm?timestamp" + (new Date()).valueOf());
								jQuery("#captcha").val("");
								$('#ajaxForm')[0].reset();
								$("#img").attr('src',"");
        						$("#img").css('display',"none");
        						$("#path").val("");
								/**$("#contentnotic").text("不能为空！").hide();
								$("#emailnoice").text("不能为空！").hide();
								$("#captchanotic").text("不能为空！").hide();*/
            		    	}
            		    	//提交失败
            		    	if(data.action_status != 16){
								if(data.action_status == 1 || data.action_status == 2 || data.action_status == 3){
									$("#capchenotic").text(data.action_msgs).show();
									jQuery("#_captchaImage").attr("src", "/captchaimg.htm?timestamp" + (new Date()).valueOf());
									jQuery("#captcha").val("");
									return;
								}else if(data.action_status == 12){
									alert(data.action_msgs);//敏感词
									return;
								}else if(data.action_status == 17){
									alert(data.action_msgs);//敏感词
									return;
								}else if(data.code == 999){
									alert(data.msg);//非法字符
									return;
								}else{
                		    		alert(data.action_msgs);
    								jQuery("#_captchaImage").attr("src", "/captchaimg.htm?timestamp" + (new Date()).valueOf());
    								jQuery("#captcha").val("");
								}
            		    	}
        		        }
        			});
    			}
    		}
    
    		 //图片上传
    	   	function initUploader(){
    		      var uploadPicDomain = 'http://jximage.jxwmanage.com';
    	          var imageUploadUrl = uploadPicDomain+"/upload.htm?category=2&type=yhfk";
    	    	  filecount = 0;
    	          $('#file_upload').uploadify({  	        
    	                'swf'      : '/resources/js/uploadifyFeedback/uploadify.swf',
    	    			'button_image_url' : '/resources/js/uploadifyFeedback/spacer.gif',
    	                'uploader' : "/uploadAvatar.htm?category="+encodeURIComponent(imageUploadUrl)+"&t="+new Date().getTime(),
    	    			'cancelImage': '/resources/js/uploadifyFeedback/uploadify-cancel.jpg',
    	    			'fileSizeLimit':'1024KB',
    	    			'queueSizeLimit' : 1,
    	    		    'buttonText' : '选择图片',
    	    			'fileTypeExts': '*.jpg;*.png',
    	                'fileTypeDesc': 'Image Files (.JPG,.PNG)',
    	                'multi': false,
    	                'width':'100',
    	                'height':'30',
    	    			'auto': true,
    	    			'debug': false,
    	    			'queueID': 'fileQueue',
    	                'onSelect' : function(file) {
    	                   filecount ++; 
    	                },
    	    			'onCancel' : function(file)
    	    			{
    	    			   filecount --; 
    	    			},
    	                //检测FLASH失败调用
    	                'onFallback':function(){
    	                    alert("您未安装FLASH控件，无法上传图片！请安装FLASH控件后再试。");
    	                },    	                
    	    			'onUploadSuccess': function (event, response, status) {
    	    			
    	    			 if(response=='' || response==undefined){
    	    					alert("上传的图片不符合规格！");
    	    					return false;
    	    			 }
    	    				
    	                 var json = eval("("+response+")");//转换为json对象 
    	    			 
    	    			 status = json.status;
	        			 if(status == 1)
	        			 {
	        			    $("#path").val(json.files[0].path);
	    					var imgPath=json.files[0].path;
	    					$("#img").attr('src',"http://img12.jiuxian.com/bill"+imgPath);
	    					$("#img").css('display',"block");
	        			 }
	        			 var pt = hex_md5(hex_md5(json.files[0].path));	        			
	        			 setCookie("signcode",pt,1);
    	                }
    	            });
    	    }

    	    initUploader();		
    		
	//输入提示
	$(".itemRight input,.itemRight textarea").focus(function(e) {
        $(this).siblings("p").hide();
		
    });
	
	$(".itemRight input,.itemRight textarea").blur(function(e) {
        var value=$.trim($(this).val()); 
		if(value=="")
		{
			$(this).siblings("p").show();
		}
    });
	
	$(".itemRight p").click(function(e) {
		$(this).hide();
		$(this).siblings().focus();		
    });  	
});