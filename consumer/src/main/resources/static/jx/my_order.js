
$(document).ready(function() {
	
	$(".os-search em").click(function() {
        $(".os-search input").focus();
		$(".os-search em").hide();	
    });
	
	$(".os-search input").bind("focus",function() {
		$(".os-search em").hide();	
    });

	$(".os-search input").bind("blur",function() {
		if($.trim($(this).val())=="")
		{
			$(".os-search em").show();	
			
			}
    });
	
	
	/*订单跟踪弹层*/
	/*$(".opeTracking .TraBtn span").hover(function(){
		$(this).parent().next(".delivery").show();	
		},function(){
			$(this).parent().next(".delivery").hide();		

			});
	$(".delivery").hover(function(){
		$(this).show();	
		},function(){
			$(this).hide();	
			})
	$(".delivery .close").live("click",function(e) {
        $(this).parents(".delivery").hide();	
    });*/

	
	$('.popupClose,.cancel').bind('click',function(){				
		$('.popupMask').hide();
		$('.popup').hide();			
	});
	
	$(".os-search em").click(function() {
        $(".os-search input").focus();
		$(".os-search em").hide();	
    });
	
	$(".os-search input").bind("focus",function() {
		$(".os-search em").hide();	
    });

	$(".os-search input").bind("blur",function() {
		if($.trim($(this).val())=="")
		{
			$(".os-search em").show();	
			
			}
    });
//删除订单,把订单放入订单回收站（recycle=1）	
$(".recdel").bind('click',function(){
	 var pageNum = $("#pageNum").val();
	 var currRecordSize = $("#currRecordSize").val();
	 var orderKey = $("#orderKey").val();
	 var timeFlag = $("#timeFlag").val();
	 var originFlag = $("#originFlag").val();
	 var status = $("#status").val();
	 var orderId = $(this).attr("orderId");
	 var opt = "deleteOrder";
	 $.showAlert({"content":"您确定要删除该订单吗？删除后，你可以在订单回收站还原订单，也可以永久删除!", "type":"confirm","cancelShow":true, 
	    	"callback":function(){
	    		jQuery.ajax({
					 type:'post',
					 url:'/trademanage/ord_recyle.htm',
					 data:{'orderId':orderId,'opt':opt},
					 dataType:'json',
					 cache:false,
					 async:true,
					 success:function(data){
							if(data.action_status == -4){
								$.showAlert({"content":"用户订单不存在!", "type":"alarm" });
							}else if(data.action_status == -5){
								$.showAlert({"content":"非法操作！", "type":"alarm" });
							}
							else if(data.action_status == -3){
								$.showAlert({"content":"登陆失效，请重新登陆！", "type":"alarm" });
							}else if(data.action_status == -2){
								$.showAlert({"content":"参数错误!", "type":"alarm" });
							}
							else if(data.action_status == -1){
							    $.showAlert({"content":"删除订单失败！", "type":"fail" });
							}else if(data.action_status == 1){
							    $.showAlert({"content":"删除订单成功!", "type":"success",
									"callback":function(){//如果当前页无记录，跳转到前一页
									    if(pageNum > 1 && currRecordSize-1 == 0){
									    	pageNum = pageNum - 1;
									    }
									    location = '/trademanage/my_order-9.htm?pageNum='+pageNum+'&orderKey' + orderKey + '&timeFlag='+ timeFlag + '&originFlag='  + originFlag;					
									} })

							}
					 },
					 error:function(){
						  
					 }
			});
	    }
	 })
	 
	 
 })
 //永久删除订单
  $(".recdelforever").bind('click',function(){
	  var pageNum = $("#pageNum").val();
	  var orderId = $(this).attr("orderId");
	  var opt = "deleteOrderforever";
	  $.showAlert({"content":"您确定要永久删除该订单吗？永久删除后，你将无法对商品进行评价以及售后服务，请谨慎操作！", "type":"confirm","cancelShow":true, 
	    	"callback":function(){
	    		jQuery.ajax({
					 type:'post',
					 url:'/trademanage/ord_recyle.htm',
					 data:{'orderId':orderId,'opt':opt},
					 dataType:'json',
					 cache:false,
					 async:true,
					 success:function(data){
						 if(data.action_status == -4){
								$.showAlert({"content":"用户订单不存在!", "type":"alarm" });
							}else if(data.action_status == -5){
								$.showAlert({"content":"非法操作！", "type":"alarm" });
							}
							else if(data.action_status == -3){
								$.showAlert({"content":"登陆失效，请重新登陆！", "type":"alarm" });
							}else if(data.action_status == -2){
								$.showAlert({"content":"参数错误!", "type":"alarm" });
							}else if(data.action_status == -1){
							    $.showAlert({"content":"删除订单失败！", "type":"fail" });
							}else if(data.action_status == 1){
							    $.showAlert({"content":"删除订单成功!", "type":"success",
									"callback":function(){//如果当前页无记录，跳转到前一页
									    if(pageNum > 1 && currRecordSize-1 == 0){
									    	pageNum = pageNum - 1;
									    }
									    location = '/trademanage/garbageStation.htm?pageNum='+pageNum;					
									} })

							}
					 },
					 error:function(){
						  
					 }
			});
	    }
	 })
	 
 })

});

//把回收站的订单还原到我的订单
function restoreOrder(orderId){
	  var pageNum = $("#pageNum").val();
	  //var orderId = orderId;
	  var opt = "restoreOrder";
	  $.showAlert({"content":"您确定要还原该订单吗？", "type":"confirm","cancelShow":true, 
	    	"callback":function(){
	    		jQuery.ajax({
					 type:'post',
					 url:'/trademanage/ord_recyle.htm',
					 data:{'orderId':orderId,'opt':opt},
					 dataType:'json',
					 cache:false,
					 async:true,
					 success:function(data){
						 	if(data.action_status == -4){
								$.showAlert({"content":"用户订单不存在!", "type":"alarm" });
							}else if(data.action_status == -5){
								$.showAlert({"content":"非法操作！", "type":"alarm" });
							}
							else if(data.action_status == -3){
								$.showAlert({"content":"登陆失效，请重新登陆！", "type":"alarm" });
							}else if(data.action_status == -2){
								$.showAlert({"content":"参数错误!", "type":"alarm" });
							}else if(data.action_status == -1){
							    $.showAlert({"content":"还原订单失败！", "type":"fail" });
							}else if(data.action_status == 1){
							    $.showAlert({"content":"还原订单成功!", "type":"success",
									"callback":function(){//如果当前页无记录，跳转到前一页
									    if(pageNum > 1 && currRecordSize-1 == 0){
									    	pageNum = pageNum - 1;
									    }
									    location = '/trademanage/garbageStation.htm?pageNum='+pageNum;					
									} })

							}
					 },
					 error:function(){
						  
					 }
			});
	    }
	 })
	 
}

function order_trace(orderID){
    
	jQuery.ajax({
             type:'post',
             url:'/trademanage/ord_trackInfo.htm',
             data:{'orderID':orderID},
             dataType:'json',
             cache:false,
             success:function(data){
                 if(data != null){
    				     if(data.status >= 0 && data.status < 5){
						 	$("#trackImg").attr("src","http://img01.jiuxian.com/img/user/order_trace1.jpg")
						 }
						 if(data.status == 5){
						 	$("#trackImg").attr("src","http://img01.jiuxian.com/img/user/order_trace2.jpg")
						 }
						 if(data.status == 6){
						 	$("#trackImg").attr("src","http://img01.jiuxian.com/img/user/order_trace3.jpg")
						 }
						 if(data.status >= 7){
						 	$("#trackImg").attr("src","http://img01.jiuxian.com/img/user/order_trace4.jpg")
						 }
    					         
                        var content=[];
						content.push('<tr style=" background:#f2f2f2;"><th style="width: 135px;">处理时间</th><th>订单跟踪信息</th></tr>');
    					$(data.list).each(function(index,enty){
    						content.push('<tr>');
    						content.push('<td>');
    						content.push('<span>');
    						content.push(enty.createTime);
    						content.push('</span>');
    						content.push('</td>');
    						content.push('<td>');
    						content.push(enty.traceInfo);
    						content.push('</td>');
                            content.push('</tr>');
    					});
    					$(data.logist).each(function(index,enty){
    						content.push('<tr>');
    						content.push('<td>');
    						content.push('<span>');
    						content.push(enty.createTime);
    						content.push('</span>');
    						content.push('</td>');
    						content.push('<td>');
    						content.push(enty.traceInfo);
    						content.push('</td>');
                            content.push('</tr>');
    					});
    				 $("#trackContent").empty().append(content.join(""));
    				 var showHeight = $(document).scrollTop()+($(window).height()-$("#over").height())/2;
    				 $("#over").css("top",showHeight).fadeIn();
    				 $("#fade").css({'width':$(document).width(),'height':$(document).height()}).fadeIn();
    					
				}
             },
             error:function(){
             }
        });
  }


$(document).ready(function() {
$(".opeTracking .TraBtn").hover(function(){
	$(this).next(".delivery").show();	
	var diliveryObj = $(this).next(".delivery");
	var orderID = $(this).parent().find("._orderId").val();
	var content=[];
	jQuery.ajax({
        type:'post',
        url:'/trademanage/ord_trackInfo.htm',
        data:{'orderID':orderID},
        dataType:'json',
        cache:false,
        success:function(data){
            if(data != null){
					content.push('<span class="arrow"></span><div class="headline2 clearfix"><span class="timeD">处理时间</span><span>处理信息</span><a href="javascript:;" class="close"></a></div>');
					content.push('<ul class="infoD">');
					$(data.orderTraceInfo).each(function(index,enty){
						content.push('<li class="clearfix">');
						content.push('<p class="timeD">');
						content.push('<span>');
						content.push(enty.createTime);
						content.push('</span>');
						content.push('</p><p>');
						content.push('<span>');
						content.push(enty.traceInfo);
						content.push('</span>');
						content.push('</p>');
                        content.push('</li>');
					});
				 content.push('</ul>');
				 var htm = $(content.join(""));
				 diliveryObj.empty().append(content.join(""));
			}
        },
        error:function(){
        }
   });
},function(){
	$(this).next(".delivery").hide();		
});

/*$(".ope03").click(function(){
	var proIdList = $(this).parent().parent().parent().find(".proId");
	var proIds = '';
	var count = 0;
	proIdList.each(function() { 
        if ($(this).attr("value") != null &&　$(this).attr("value") !=　'') {  
			if(proIds != ""){
			    proIds += ",";
			}
			proIds += $(this).attr("value"); 
			count ++;
        }  
    });
	//再次购买
	addSkuToCartWithSrcAndNotConsiderStock(proIds,count,"","",toCartCallBack);
});*/

});

//加入购物车的回调函数
var toCartCallBack = function(data){
	if (data.status == 1){
		 window.open("http://cart.jiuxian.com/","_blank"); 
	}
} 

  $("#close").click(function(){
    $("#over").fadeOut();
    $("#fade").fadeOut();
  });
  
  
/*  function popup(){
		var iWidth=parseInt($('.popup').children('div').eq(1).css('width'))+60;
		$('.popup').css('width',iWidth+'px');
		var iLeft=($(window).width()-$('.popup').outerWidth())/2;
		
		var iTop=($(window).height()-$('.popup').outerHeight())/2;
		
		$('.popup').css({'top':iTop+'px','left':iLeft+'px'});
		$('.testSuccess').css({'top':iTop+'px','left':iLeft+'px'});
		
		$('.popupMask').show();
		$('.popup').show();
		$('.popup .accNotic').hide();
		$('.popup .title').css('width',iWidth+'px');
		$(window).bind('resize',function(){
			
			var iLeft=($(window).width()-$('.popup').outerWidth())/2;
			var iTop=($(window).height()-$('.popup').outerHeight())/2;
			$('.popup').css({'top':iTop+'px','left':iLeft+'px'});
		})
	}*/
  function popup($obj){
		var iWidth=parseInt($obj.children('div').eq(1).css('width'))+60;
		$obj.css('width',iWidth+'px');
		var iLeft=($(window).width()-$obj.outerWidth())/2;
		
		var iTop=($(window).height()-$obj.outerHeight())/2;
		
		$obj.css({'top':iTop+'px','left':iLeft+'px'});
		$obj.find('.testSuccess').css({'top':iTop+'px','left':iLeft+'px'});
		
		$('.popupMask').show();
		$obj.show();
		$obj.find('.accNotic').hide();
		$obj.find('.title').css('width',iWidth+'px');
		$(window).bind('resize',function(){
			
			var iLeft=($(window).width()-$obj.outerWidth())/2;
			var iTop=($(window).height()-$obj.outerHeight())/2;
			$obj.css({'top':iTop+'px','left':iLeft+'px'});
		})
	}

  function is_cancel_order(orderID){
	    $('.tp35').hide();
		$('.my_order_yzf').hide();		
		$(".c-reason option[value='1']").attr("selected", "selected");

		jQuery.ajax({
			 type:'post',
			 url:'/trademanage/is_useCoupon.htm',
			 data:{'orderID':orderID},
			 dataType:'json',
			 cache:false,
			 success:function(data){
			     //提示：订单成功取消后无法恢复，该订单已付金额将返至原银行卡，原订单所用优惠券已拆分暂时无法返还，请联系客服处理。

				 if( data.order.jxOnly != null && data.order.jxOnly == 0 && data.order.isPayed == 2 ) {
					 $(".btnNotic").hide();
					 $(".btnNoticSj").show();
				 }else {
					 $(".btnNotic").show();
					 $(".btnNoticSj").hide();
				 }

			     if(data.order.isPayed == 2){				   
			    	 popup($(".cancleMoney"));
				     $("#rc_cancel_order").val(orderID);
				 }else{
					 //正常操作
					 /*if(confirm("确定要取消订单吗?")){
						 cancel_order(orderID);
					 }*/
					 popup($(".cancleOrder"));
					 $("#rc_cancel_order").val(orderID);
				 }
			 }
		});
  }
//取消订单  
  function cancel_order(t){	    
	    var yzf = $(t).parent().hasClass('yzf');	    
	    var wzf = $(t).parent().hasClass('wzf');
	   
		var orderCancelCause = $(t).parent().siblings('.c-reason').find('option:selected').text();
		if(orderCancelCause=='请选择'){
			var a = $(t).parent().siblings('.c-reason').find('.tp35').text();
			var b = $(t).parent().siblings('.c-reason').find('.my_order_yzf').text();
			if(a=='' || a=='undefined'){				
			}else{
				$('.tp35').show();
			}
			if(b=='' || b=='undefined'){				
			}else{
				$('.my_order_yzf').show();
			}
			if(yzf==true){
				$('.cancleMoney').show();	
			}
			if(wzf==true){
		    	$('.cancleOrder').show();	
		    }
			$('.popupMask').show();
			return;
		}else{
			if(yzf==true){
		    	$('.cancleMoney').css("display","none");	
		    }
			
			if(wzf==true){
		    	$('.cancleOrder').css("display","none");	
		    }
			
			$('.popupMask').css("display","none");
		}

	  	var orderID = $("#rc_cancel_order").val();	  	
	  		  	
		jQuery.ajax({
			 type:'post',
			 url:'/trademanage/cancel_order.htm',
			 data:{'orderID':orderID,'orderCancelCause':orderCancelCause},
			 dataType:'json',
			 cache:false,
			 success:function(data){
				if(data.action_status== -6){
				   alert('订单id存在异常!');
				}else if(data.action_status== -5){
				   alert('订单id不能为空!');
				}else if(data.action_status== -4){
				   alert('订单已操作!');
				}else if(data.action_status== -3){
					if(data.action_msgs && data.action_msgs != ''){
						alert(data.action_msgs);
					}else{
						alert("操作失败,请重试!");
					}
				}else if(data.action_status== -2){
				    alert('用户订单不存在!');
				}else if(data.action_status==1){

					$("div[class*=Prompt-pop] div[class*='Prompt-title'] > strong").text(data.action_msgs);

					popup($(".cancleSucess"));
				}else if(data.action_status==-7){
					alert('请选择正确的取消订单来源！');
				}else if(data.action_status==-8){
					alert('请选择取消订单来源！');
				}else if(data.action_status==-9){
					alert('私人订制订单付款后不能取消，如有问题请联系客服！');
				}else{
					alert("操作失败");
				}
				 
			 }
		});
		
  }
  
  function cancleSucess(){
	  $('.popupMask').hide();
	  $('.popup').hide();	
      var status = $("#status").val();
	  if(status != '' && status != null){
	      location = '/trademanage/my_order-'+status+'.htm';
	  }else{
		  location = '/trademanage/my_order-9.htm';
	  }
  }

  function receipt_good(orderID){  
  
		if(confirm("确定要确认收货吗?")){
			 
			jQuery.ajax({
					 type:'post',
					 url:'/trademanage/receipt_good.htm',
					 data:{'orderId':orderID},
					 dataType:'json',
					 cache:false,
					 success:function(data){
						 if(data){
							    if(data.action_status==-5){
									alert('订单已操作!');
								}else if(data.action_status==-4){
									if(data.action_msgs && data.action_msgs != '')
										alert(data.action_msgs);
									else
										alert("操作失败,请重试!");
								}else if(data.action_status==-3){
									alert('订单不存在!');
								}else if(data.action_status==-2){
									alert('参数错误!');
								}else if(data.action_status==-1){
									alert('操作失败!');
								}else if(data.action_status==0){
									 alert("确认收货成功!");
									 location = '/trademanage/my_order-9.htm';
								}
						 }
					 }
					
				});
		}  
 
  }
  
//去付款 
  function gopay(orderID){
	  jQuery.ajax({
			 type:'post',
			 url:'/check_gopay.htm',
			 data:{'orderID':orderID},
			 dataType:'json',
			 cache:false,
			 success:function(data){
				if(data.action_status== -5){
				   alert('订单id不能为空!');
				}else if(data.action_status== -4){
				   alert('已逾期不可支付!');
				}else if(data.action_status==1){
				   location = 'https://pay.jiuxian.com/gopay.htm?orderId='+orderID;
				}else{
					alert("操作失败");
				}
				 
			 }
			
		});
  }
  
  function changeStatus(){
	  var status = $("#status").val();
	  var orderKey = $("#orderKey").val();
	  var timeFlag = $("#timeFlag").val();
	  var originFlag = $("#originFlag").val();
	  location = "/trademanage/my_order-"+status+".htm?status="+status+"&orderKey="+orderKey+"&timeFlag="+timeFlag+"&originFlag="+originFlag;
  }
  function changeTimeFlag() {
      var timeFlag = $("#timeFlag").val();
      location = "/trademanage/my_order-9.htm?timeFlag="+timeFlag;
  }
  
  function queryOrderForm(){
	  var orderKey = $("#orderKey").val();
	  var reg = /^[^`~!@#$%^&*()+=|\\\][\]\{\}:;'\,.<>/?]{1}[^`~!@$%^&()+=|\\\][\]\{\}:;'\,.<>?]{0,30}$/;
	  if(orderKey != '' && !reg.test(orderKey)){
		  alert("非法输入，请重新输入");
		  return false;
	  }
	  document.getElementById("orderForm").submit();
  }
