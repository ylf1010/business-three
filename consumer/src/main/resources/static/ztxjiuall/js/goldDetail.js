function getRandomNum(Min, Max) {
	var Range = Max - Min;
	var Rand = Math.random();
	return (Min + Math.round(Rand * Range));
}
function top_cut(){
	var number = jQuery.trim($("#number").val());
	if (number != '1') {
		var num = parseInt(number) - 1;
		$("#number").val(num);
	}
}
function top_plus(){
	var number = jQuery.trim($("#number").val());
	var num = parseInt(number) + 1;
	$("#number").val(num);
	checkProNum(num, 0);
}

function showPayPassInfo(info){
	$(".possTip").show();
	$(".possTip").html(info);
    $(".forgetPassword").show();
}

function hidePayPassInfo(){
	$(".possTip").hide();
    $(".forgetPassword").hide();
}

function hideCfmPay(){
	$(".submit.chk").hide();
    $(".forgetPassword").show();
}

function exchangeCoupon(){
	var payPass = $("#passWordID").val();
	$("#passWordID").val("");
	var number = jQuery.trim($("#number").val());
	var proId = $("#productId").val();
	jQuery.ajax({
		type:'post',
		url:"/couponExchange.htm?pi=" + proId + "&nb=" + number+"&t=" + getRandomNum(1, 100),
		cache : false,
		async : false,
		data : {
			'payPass' : payPass
		},
		success:function(data){
			$('.popBjJinBi,.popJinBox.chk').hide();
			hidePayPassInfo();
			if (data && data.action_status == 1) {
				$(".popLay1").show();
			}else if(data && data.action_status == 10){
				$(".popLay2").show();
			}else if (data && data.action_status == 0) {
				alert("兑换失败!");
			}else if (data && data.action_status == 2) {
				// 商品库存数量不足
				alert("对不起，库存不足！");
			}else if (data && data.action_status == 104) {
				alert("商品库存数量不足!");
			}else if (data && data.action_status == 3) {
				alert("用户金币数量不足!");
			}else if(data && data.action_status == 4){
				alert(data.action_msgs); // 超出每日兑换数量限制
			}else if(data && data.action_status == 5){
				showPayPassInfo("支付密码错误,请重试");
				$('.popBjJinBi,.popJinBox.chk').show();
			}else if(data && data.action_status == 6){
				showPayPassInfo("密码错误已达5次,请次日重试或重置密码");
				hideCfmPay();
				$('.popBjJinBi,.popJinBox.chk').show();
			}
			return;
		}
	});
}

//var btnDown = false;
$(function() {
	//创建支付密码层
	$('.closeBtn.use').bind('click',function(){
		$('.popBjJinBi,.popJinBox.use').hide();
	});
	//验证支付密码层
	$('.closeBtn.chk,.close.chk').bind('click',function(){
		$('.popBjJinBi,.popJinBox.chk').hide();
	});
	//点击提交密码
	$('.submit.chk').bind('click',function(){
		var value = $("#passWordID").val();
		if(value==""){
			$('.possTip').text('*密码不能为空！').show();
			return false;
		}else{
			$('.possTip').hide();
			exchangeCoupon();
			return false;
		}	
	});
	
	// 弹出兑换券层关闭按钮
	$(".popLay .close").click(function() {
		$(".popLay").hide();
		//刷新当前页
		location.reload();
		//btnDown = false;
	});
	// 立即兑换
	$(".duiBtn").click(function() {
		/*if(btnDown){
			return;
		}
		btnDown = true;*/
				var uName = $(".clubMainWrap").attr("loginSession");
				var urlForm = $(".clubMainWrap").attr("urlForm");
				if(uName==null || uName==""){
					location.href = urlForm;
				}else{
					var phoneValid = $("#phoneValid").val();
					var setPayPass = $("#setPayPass").val();
					if(phoneValid !=1){
						$(".frameTest").show();
						return;
					}else if(setPayPass==0){
						//请设置支付密码
						hidePayPassInfo();
						$('.popBjJinBi,.popJinBox.use').show();
						return;
					}else{
						var userId = $("#loginUserId").val();
						jQuery.ajax({
							type : 'post',
							url : '/checkPhone.htm?t=' + getRandomNum(1, 100),
							data : {
								'userId' : userId
							},
							dataType : 'json',
							cache : false,
							async : false,
							success : function(data) {
								if (data && data.code == 2) {
									location.href = domain_passprot+"/login.htm";
								}else if(data && data.code == 1) {
									$(".frameTest").show();
									//btnDown = false;
									return;
								}else if(data && data.code == 0){
									phoneValid = 1;
								}else if(data && data.code == 3){
									//未设置支付密码
									hidePayPassInfo();
									$('.popBjJinBi,.popJinBox.use').show();
									return;
								}
							},
							error : function() {}
						});
					}
					if(phoneValid==1){
						var exchangeType = $("#exchangeType").val();
						// 兑换数量
						var number = jQuery.trim($("#number").val());
						// 商品ID
						var proId = $("#productId").val();
						if (exchangeType == 3 || exchangeType == 4) {
							jQuery.ajax({
									type : 'post',
									url : '/selectRespSals.htm?t=' + getRandomNum(1, 100),
									data : {
										'pi' : proId,
										'nb' : number
									},
									dataType : 'json',
									cache : false,
									async : false,
									success : function(data) {
									
										if (data && data.code == 2) {
											$("#number").val(1).blur();
											alert('亲，不好意思哦，此商品今天已经兑换完啦！');
											//btnDown = false;
											return;
										}
										if (data && data.code == 1) {
											$("#number").val(1).blur();
											alert('对不起，该商品已下架！');
											//btnDown = false;
											return;
										}
									},
									error : function() {}
						  });
							jQuery.ajax({
								type : 'post',
								url : '/checkGoldNum.htm?t=' + getRandomNum(1, 100),
								data : {
									'pi' : proId,
									'nb' : number
								},
								dataType : 'json',
								cache : false,
								async : false,
								success : function(data) {
									//btnDown = false;
									if (data && data.action_status == 1) {
										$("#number").val(1).blur();
										$(".notEnoughFrame").show();
									}
									if (data && data.action_status == 3) {
										alert('select goldMailProduct  error!');
									}
									if (data && data.action_status == 4) {
										alert('select userAccout  error!');
									}
									if (data && data.action_status == 2) {
										location.href = domain_passprot+"/login.htm";
									}
									if (data && data.action_status == 0) {
										// 可以兑换，确认交易密码
										hidePayPassInfo();
										$('.popBjJinBi,.popJinBox.chk').show()
									}else if(data && data.action_status == 6){
										//alert("未设置支付密码");
										hidePayPassInfo();
										$('.popBjJinBi,.popJinBox.use').show();
									}
								},
								error : function() {}
							});
					}else{
							jQuery.ajax({
								type : 'post',
								url : '/checkGoldNum.htm?t=' + getRandomNum(1, 100),
								data : {
									'pi' : proId,
									'nb' : number
								},
								dataType : 'json',
								cache : false,
								async : false,
								success : function(data) {
								if (data && data.action_status == 1) {
									$("#number").val(1).blur();
									$(".notEnoughFrame").show();
									//btnDown = false;
								}
								if (data && data.action_status == 2) {
									location.href = domain_passprot+"/login.htm";
									//btnDown = false;
								}
								if(data && data.action_status == 6){
									//未设置支付密码
									hidePayPassInfo();
									$('.popBjJinBi,.popJinBox.use').show();
								}
								if (data && data.action_status == 0) {
										// 兑换数量 是否超出限制 判断
										jQuery.ajax({
											type : 'post',
											url : "/checkMaxNum.htm?pi=" + proId + "&nb=" + number+"&t=" + getRandomNum(1, 100),
											data : {
												'pi' : proId,
												'nb' : number
											},
											dataType : 'json',
											cache : false,
											async : false,
											success : function(data) {
												if (data && data.action_status == 1) {
													// 跳转登陆
													location.href = "http://login.jiuxian.com/login.htm";
												}else if (data && data.action_status == 2) {
													// 库存不足
													$("#number").val(1).blur();
													alert('对不起，该商品已下架！');
													return ;
												}else if (data && data.action_status == 4) {
													 // 超出限制兑换数量
													alert(data.action_msgs);
													return ;
												}else{
													// 可以兑换
													location.href="/exchange.htm?pi="+proId+"&nb="+number;
												}
											},
											error : function() {}
										});
									}
								},
								error : function() {}
							});
						}
					}
				}
			});		
});
function view(){
	// TODO
	location.href="http://www.jiuxian.com/web.php?c=user&m=bonus";
}
function share() {
	var title = $(".gold_pro_tit").text();
	var txt = "我在酒仙网兑换了【" + title + "】[太开心]小金币大用处，大家一起来攒金币兑好礼吧~~";
	var pic = $("#listImage").attr("src");
	var url = 'http://v.t.sina.com.cn/share/share.php?title=' + txt + '&pic='
			+ pic + '&url=';
	var url = encodeURI(url);
	window.open(url + window.location.href);
}

function gv_renum(obj) {
	var curv = jQuery.trim($(obj).val());
	if (curv == '' || curv == '0') {
		$(obj).val(1);
		return false;
	}
	var reg = new RegExp("^[1-9][0-9]*$");

	if (!reg.test(curv)) {
		$(obj).val(1).blur();
		alert("请输入数字!");
	} else {
		checkProNum(curv, 1);
	}
}
/* 检查库存 */
function checkProNum(num, type) {
	// 商品ID
	var proId = $("#productId").val();
	jQuery.ajax({
		type : 'post',
		url : '/selectRespSals.htm?t=' + getRandomNum(1, 100),
		data : {
			'pi' : proId,
			'nb' : num
		},
		dataType : 'json',
		cache : false,
		async : false,
		success : function(data) {
			if (data && data.code != 0) {
				$("#number").val(1).blur();
				alert('亲，不好意思哦，此商品今天已经兑换完啦！');
			}
		},
		error : function() {

		}
	});
	function cut_str(str, len){
        var char_length = 0;
		var sub_len = 0;
        for (var i = 0; i < str.length; i++){
            var son_str = str.charAt(i);
            encodeURI(son_str).length > 2 ? char_length += 1 : char_length += 0.5;
            if (char_length >= len){
                sub_len = char_length == len ? i+1 : i;
               // return str.substr(0, sub_len);
                break;
            }
        }
		var rstr = str;
		if(sub_len>0){
			rstr = str.substr(0, sub_len);
		}
		return rstr;
    }
}