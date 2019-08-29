$(function(){
	//底部结算悬浮
	var cartJx = {
			scroolTop : 0,
			reloadCart : function() {
				$("#cart_container").load("/load.htm?"+new Date().getTime(), function() {
					cartJx.loadInit();
				});
			},
			addItem : function(proId, src, mainItemId, promoId, step) {
				cartJx.postJsonMethod("/add.htm", {
					"goodsId" : proId,
					"src" : src,
					"mainItemId" :mainItemId,
					"promoId" : promoId,
					"step" : step
				});
			},
			delItem : function(itemId) {
				cartJx.postJsonMethod("/remove.htm", {skuId:itemId});
			},
			updCount : function(itemId, count) {
				cartJx.postJsonMethod("/update.htm", {
					"skuId" : itemId,
					"count" : count
				});
			},
			updChecked : function(itemId, checked) {
				cartJx.postJsonMethod("/toggle.htm", {
					"skuId" : itemId,
					"checked" : checked
				});
			},
			collect : function(itemId, proId) {
				cartJx.delItem(itemId);
				cartJx.postJsonMethod("/siftUserCollectedProIds.htm",{'ids':proId},function(){
				});
			},
			init : function() {
				cartJx.loadInit();
				cartJx.loadHis();
			        cartJx.loadUserCollect();
			},
			loadInit : function() {
				areaJx.init();
				if ($(".cart-gopay-bottom").offset()) {
					cartJx.scroolTop = $(".cart-gopay-bottom").offset().top;
				}
				$(window).bind("scroll",cartJx.bottomScrool);
				cartJx.bottomScrool();
			},
			bottomScrool : function(){
				var divTop=$(window).scrollTop()+$(window).height()-62;
				if(divTop<cartJx.scroolTop){
					$(".cart-gopay-bottom").addClass("cart-gopay-bottom-fixed");
				}else{
				  $(".cart-gopay-bottom").removeClass("cart-gopay-bottom-fixed");

				}
			},
			loadHis : function() {
				$.getJSON("/getViewHis.htm",function(data){
					if (data.suc) {
						data = data.body;
                     	var cartHtml = '<ul class="bigUl clearfix">';
     		            for(var i=0;i<data.length;i++){
     		            	var club = "";
                            if(data[i].clubPrice&&data[i].clubPrice!='null'){
                            	club = '￥'+ data[i].clubPrice+'<i class="cartIcon club-icon"></i>'
							}
							zhenxuan = '';
							if(data[i].isSelection){
								zhenxuan = '<img class="zhenxuan" src="'+window.jxdomain.misc+'/image/zhenxuan.jpg">';
							}
							var addCartBtn = "";
								if (data[i].preSell) {
									addCartBtn = '<a href="'+domain_detail+'/goods-'+data[i].id+'.html"><span>预售中</span></a>';
								} else {
									addCartBtn = '<a href="javascript:;" name="add_to_cart_btn" _proid="'+data[i].id+'"><i class="cartIcon"></i><span>加入购物车</span></a>';

								}
     		            	cartHtml += '<li><div class="recommend-img"><a title="'+data[i].name+'" target="_blank" href="'+domain_detail+'/goods-'+data[i].id+'.html"><img src="'+data[i].imgUrl+'" width="160" height="160"></a></div><div class="recommend-name"><a title="'+data[i].name+'" target="_blank" href="'+domain_detail+'/goods-'+data[i].id+'.html">'+zhenxuan+data[i].name+'</a></div><div class="recommend-price"><span class="jx-price" _data="price" _proid="'+data[i].id+'">￥'+data[i].promoPrice+'</span><span class="club-price">'+club+'</span></div><div class="recommend-comment">'+data[i].commentCount+'人已评价</div><div class="cart-btn">'+addCartBtn+'</div></li>';
     		            }

    					if (data.length > 0) {
    						$("#ul_viewhis").parents(".recommend-info").find(".recommend-vain").hide();
    						$("#ul_viewhis").parents(".recommend-info").find(".recommend-vain").next().show();
    					}
     		            cartHtml += '</ul>';
    					$("#ul_viewhis").html(cartHtml);
					}
				});
			},
			loadUserCollect : function(){
				if($("#isLogin").val()=='true') {
					$.getJSON("/getUserCollect.htm",function(data){
						if (data.suc) {
							data = data.body;
	                     	var cartHtml = '<ul class="bigUl clearfix">';
	     		            for(var i=0;i<data.length;i++){
	     		            	var club = "";
	                            if(data[i].clubPrice&&data[i].clubPrice!='null'){
	                            	club = '￥'+ data[i].clubPrice+'<i class="cartIcon club-icon"></i>'
	                            }
								zhenxuan = '';
								if(data[i].isSelection){
									zhenxuan = '<img class="zhenxuan" src="'+window.jxdomain.misc+'/image/zhenxuan.jpg">';
								}
								var addCartBtn = "";
								if (data[i].preSell) {
									addCartBtn = '<a href="'+domain_detail+'/goods-'+data[i].id+'.html"><span>预售中</span></a>';
								} else {
									addCartBtn = '<a href="javascript:;" name="add_to_cart_btn" _proid="'+data[i].id+'"><i class="cartIcon"></i><span>加入购物车</span></a>';

								}
	     		            	cartHtml += '<li><div class="recommend-img"><a title="'+data[i].name+'" target="_blank" href="'+domain_detail+'/goods-'+data[i].id+'.html"><img src="'+data[i].imgUrl+'" width="160" height="160"></a></div><div class="recommend-name"><a title="'+data[i].name+'" target="_blank" href="'+domain_detail+'/goods-'+data[i].id+'.html">'+zhenxuan+data[i].name+'</a></div><div class="recommend-price"><span class="jx-price" _data="price" _proid="'+data[i].id+'">￥'+data[i].promoPrice+'</span><span class="club-price">'+club+'</span></div><div class="recommend-comment">'+data[i].commentCount+'人已评价</div><div class="cart-btn">'+addCartBtn+'</div></li>';
	     		            }
	
	    					if (data.length > 0) {
	    						$("#user_collect").parents(".recommend-info").find(".recommend-vain").hide();
	    						$("#user_collect").parents(".recommend-info").find(".recommend-vain").next().show();
	    					}
	     		            cartHtml += '</ul>';
	    					$("#user_collect").html(cartHtml);
						}
					});
				}
			},
			postJsonMethod : function(url, data, success) {
				$.ajax({
					type : "post",
					url : url,
					data : data,
					dataType : "json",
					success : function(data) {
						if (success) {
							success(data);
						} else {
							cartJx.reloadCart();
						}
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						cartJx.reloadCart();
					}
				});
			},
			checkStopDelivery : function(){
				var causes = $('[data-type="stopDeliveryD"]');
				if(causes == undefined || causes == typeof ('undefined') || causes.size() ==0){
					return true;
				}
				var info = "";
				var ids = new Array();
				causes.each(function(index,item){
					var productImg = $(item).find(".goods-img").find("a").find("img").attr("src");
					var productHref = $(item).find(".goods-img").find("a").attr("href");
					var productName = $(item).find(".goods-name").find("a").text();
					var prid = $(item).attr("prid");
					if ($.inArray(prid, ids) == -1) {
						ids.push(prid);
						info += "<div class='cart-confirm-sub'><div class='cart-sub-img'><a href='"+productHref+"' target='_blank'><img src='"+productImg+"' width='38' height='38'></a></div><div class='cart-sub-name'><a href='"+productHref+"' target='_blank'>"+productName+"</a></div></div>"
					}
				});
				$(".cart-confirm-deliver").find(".cart-confirm-vice").html(info);
				$(".cart-confirm-deliver").find(".cart-confirm-Btn").html("<a href='javascript:;' class='btn-red'>确定</a>");
				$(".cart-confirm-deliver").show();
				return false;
			},
			checkForbidSubmit : function() {
				var causes = $('[data-type="forbidSubmitD"]');
				if(causes == undefined || causes == typeof ('undefined') || causes.size() ==0){
					return true;
				}
				var info = "";
				var ids = new Array();
				causes.each(function(index,item){
					var productImg = $(item).find(".goods-img").find("a").find("img").attr("src");
					var productHref = $(item).find(".goods-img").find("a").attr("href");
					var productName = $(item).find(".goods-name").find("a").text();
					var forbidType =  $(item).attr("forbid-type");
					var prid = $(item).attr("prid");
					if ($.inArray(prid, ids) == -1) {
						ids.push(prid);
						info += "<div class='cart-confirm-sub'><div class='cart-sub-img'><a href='"+productHref+"' target='_blank'><img src='"+productImg+"' width='38' height='38'></a></div><div class='cart-sub-box'><div class='cart-sub-name'><a href='"+productHref+"' target='_blank'>"+productName+"</a></div><div class='cart-sub-prom'>"+forbidType+"</div></div></div>"
					}
				});
				$(".cart-confirm-deliver").find(".deliver-text").find("p").text("以下商品暂时无法下单，请修改购物车后结算");
				$(".cart-confirm-deliver").find(".cart-confirm-vice").html(info);
				$(".cart-confirm-deliver").find(".cart-confirm-Btn").html("<a href='javascript:;' class='btn-red'>确定</a>");
				$(".cart-confirm-deliver").show();
				return false;
            },
			checkGiftStockOut : function() {
				var causes = $('[data-type="noStockGiftD"]');
				if(causes == undefined || causes == typeof ('undefined') || causes.size() ==0){
					return true;
				}
				var info = "";
				var ids = new Array();
				causes.each(function(index,item){
					var productImg = $(item).find(".goods-img").find("a").find("img").attr("src");
					var productHref = $(item).find(".goods-img").find("a").attr("href");
					var productName = $(item).find(".goods-name").find("a").text();
					var prid = $(item).attr("prid");
					if ($.inArray(prid, ids) == -1) {
						ids.push(prid);
						info += "<div class='cart-confirm-sub'><div class='cart-sub-img'><a href='"+productHref+"' target='_blank'><img src='"+productImg+"' width='38' height='38'></a></div><div class='cart-sub-name'><a href='"+productHref+"' target='_blank'>"+productName+"</a></div></div>"
					}
				});
				$(".cart-confirm-deliver").find(".deliver-text").find("p").text("以下赠品数量不足，以实际下单为准，是否继续购买？");
				$(".cart-confirm-deliver").find(".cart-confirm-vice").html(info);
				$(".cart-confirm-deliver").find(".cart-confirm-Btn").html("<a href='javascript:;' class='btn-red btn-back'>修改购物车</a><a href='javascript:;' class='btn-grey'>继续购买</a>");
				$(".cart-confirm-deliver").show();
				return false;
			},
			getPreSellProId : function() {
	            var forbidSubmits = $('[data-type="preSellD"]');
	            var ids = new Array();
	            if(forbidSubmits == undefined || forbidSubmits == typeof ('undefined') || forbidSubmits.size() ==0){
	                return true;
	            }
	            forbidSubmits.each(function(index,item){
	                var proid = $(item).attr("prid");
	                ids.push(proid);
	            });
	            return ids;
			},
			checkPreSell : function() {
				var causes = $('[data-type="preSellD"]');
				if(causes == undefined || causes == typeof ('undefined') || causes.size() ==0){
					return true;
				}
				var info = "";
				var ids = new Array();
				var isReturn = false;
				causes.each(function(index,item){
					var productImg = $(item).find(".goods-img").find("a").find("img").attr("src");
					var productHref = $(item).find(".goods-img").find("a").attr("href");
					var productName = $(item).find(".goods-name").find("a").text();
					var productPrice = $(item).parents(".cart-list").find(".goods-price").text();
					var productNum = $(item).parents(".cart-list").find(".goods-num").find("input").val();
					var stock = "";
					if($(item).find(".stock-status").length == 1) {
						stock = '<p class="stock-status">' + $(item).find(".stock-status").html() +'</p>';
					}
					var prid = $(item).attr("prid");
					if ($.inArray(prid, ids) == -1) {
						ids.push(prid);
						info += '<div class="cart-list" proId="'+prid+'" num="'+productNum+'"><div class="clearfix"><div class="cTab-tr cart-goods"><div class="goods-info"><div class="goods-img"><a href="'+productHref+'" target="_blank"><img src="'+productImg+'" width="80" height="80"></a>'+stock+'</div><div class="goods-right"><div class="goods-name"><a href="'+productHref+'" target="_blank">'+productName+'</a></div><div class="cart-tag" style="display:none;"><span>团购</span></div></div></div></div><div class="cTab-tr cart-price"><div class="goods-price">定金：'+productPrice+'</div></div><div class="cTab-tr cart-gold"><div class="goods-gold">X'+productNum+'</div></div><div class="cTab-tr cart-quantity"></div><div class="cTab-tr cart-subtotal"></div><div class="cTab-tr cart-operating"><div class="gopay-btn">去结算</div></div></div></div>'
					
					}
					if (causes.size() == 1) {
	                    if($('[data-type="normalD"]') == undefined || $('[data-type="normalD"]') == typeof ('undefined') || $('[data-type="normalD"]').size() == 0){
	                        location.href = window.jxdomain.order+"/order/confirm.htm?goodsId=" + prid +"&buyNum=" + productNum;
	                        isReturn = true;
	                    }
					}
				});
				if (isReturn) {
				return false;
			}
				$(".cart-gopay-pop").find(".yushou-info").html(info);

				var causes = $('[data-type="normalD"]');
				if(causes == undefined || causes == typeof ('undefined') || causes.size() ==0){
					$(".cart-gopay-pop").show();
					return false;
				}
				var info = "";
				var ids = new Array();
				causes.each(function(index,item){
					var productImg = $(item).find(".goods-img").find("a").find("img").attr("src");
					var productHref = $(item).find(".goods-img").find("a").attr("href");
					var productName = $(item).find(".goods-name").find("a").text();
					var prid = $(item).attr("prid");
					if ($.inArray(prid, ids) == -1) {
						ids.push(prid);
						info += '<li><a href="'+productHref+'" target="_blank"><img src="'+productImg+'" width="80" height="80"></a></li>'
					
					}
				});
				$(".cart-gopay-pop").find(".order-info-box").find("ul").html(info);
				$(".cart-gopay-pop").find(".yushou-title").eq(1).show();
				$(".cart-gopay-pop").find(".order-info-box").show();
				$(".silderBar").slider_1();
				$(".cart-gopay-pop").show();
				return false;
			},
			loadChangeOptions : function(obj){
				obj.load("/changeBuyOptions.htm?skuId="+obj.attr("mainitemid")+"&promoId="+obj.attr("promoId")+"&satisfyStep="+obj.attr("satisfyStep"));
			},
			loadGifts : function(obj){
				obj.load("/giftList.htm?promoId="+obj.attr("promoId"));
			},
			loadCoupons : function(obj){
				obj.load("/coupon/couponList.htm?productIds="+obj.attr("productIds"));
			},
	};
	var cookieJx = {
			getCookie: function(objName) {
				var arrStr = document.cookie.split("; ");
				for (var i = 0; i < arrStr.length; i++) {
			        var temp = arrStr[i].split("=");
			    	if (temp[0] == objName) { return unescape(temp[1]) }
				}
				return ""
			},
			setCookie: function(c_name, value, expiredays) {
			      var exdate = new Date();
			      exdate.setDate(exdate.getDate() + expiredays);
			      document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/;domain=jiuxian.com"
			}
	};
	var areaJx = {
			init : function() {
				var userArray =  cookieJx.getCookie("user_province").split("_");
				if (userArray[0] == undefined || userArray[0] == "") {
					userArray[0] = "2";// 初始化送货地址
				}
			    region.addList(K.kind_region[1], 0);
			    region.addList(K.kind_region[userArray[0]], 1);
				var sa1 = region.returnArrya(1, userArray[0]);
				$(".selectArea b").eq(0).text(sa1[1]).attr("pid", sa1[0]);
				$(".selectedBox a").eq(0).attr("pid", sa1[0]).find("em").text(sa1[1]);
				if (userArray[1] != "" && userArray[1] != undefined) {
				    region.addList(K.kind_region[userArray[1]], 2);
					var sa = region.returnArrya(userArray[0], userArray[1]);
					if (sa != undefined && sa != "") {
						 $(".selectArea b").eq(1).text(sa[1]).attr("pid", sa[0]);
						 $(".selectedBox a").eq(1).attr("pid", sa[0]).find("em").text(sa[1]);
						 if (userArray[2] != "" && userArray[2] != undefined) {
							 sa = region.returnArrya(userArray[1], userArray[2]);
							 $(".selectArea b").eq(2).text(sa[1]).attr("pid", sa[0]);
							 $(".selectedBox a").eq(2).attr("pid", sa[0]).find("em").text(sa[1]);
						 }
					}
				}
			}
	};
	var region = {
		returnArrya : function(n, p) {
			for ( var j = 0; j < K.kind_region[n].length; j++) {
				if (K.kind_region[n][j][0] == p) {
					return K.kind_region[n][j]
				}
			}
		},
		addList : function(p, n) {
			$(".areaList").eq(n).find("ul").empty();
			for ( var j = 0; j < p.length; j++) {
				var op = "<li><a href='javascript:;' pid='"
						+ p[j][0] + "'>" + p[j][1] + "</a></li>";
				if (p[j][0] != 33 && p[j][0] != 34 && p[j][0] != 35) {
					$(".areaList").eq(n).find("ul").append(op)
				}
			}
		}
	};
	
	var  outTextTerritory = function(text, index, pid) {
		$(".selectedBox a").eq(index).attr("pid",pid);
		$(".selectedBox a").eq(index).find("em").text(text);		
	}
	
	//选择地址
	var showAreaList = function(obj){
		var index = $(".areaDetail .selectedBox a").index(obj);
        obj.addClass("on").siblings().removeClass("on");
		$(".areaDetail .areaList").hide().eq(index).show();		
	}
	
	$(".selectArea").live("click",function(e) {
		$(this).addClass("on");
        $(this).next(".areaDetail").show();
		$(".selectedBox a").removeClass("on");
		$(".areaList").hide();
		$(".selectCounty").bind("click")
    });
	
	$(".selectedBox a").live("click",function(e) {
		var pid = $(this).attr("pid")
		if(pid == "" || pid == null){
			return false;
		}
		var $this = $(this);
		showAreaList($this);
    });
	
	//选择省
	$(".provinceList a").live("click",function(){		
		region.addList(K.kind_region[$(this).attr("pid")], 1);
		outTextTerritory($(this).text(), 0, $(this).attr("pid"));
		$(".selectedBox .selectCity em").text("请选择市");
		$(".selectedBox .selectCounty em").text("请选择县/区");
		$(".areaList").hide();
		$(".areaList.cityList").show();
		$(".selectedBox a").removeClass("on");
		$(".selectedBox a.selectCity").addClass("on");
		$(".selectedBox .selectProvince em").text();
	});
	
	//选择市
	$(".cityList a").live("click",function(){
		region.addList(K.kind_region[$(this).attr("pid")], 2);
		outTextTerritory($(this).text(), 1, $(this).attr("pid"));
		$(".selectedBox .selectCounty em").text("请选择县/区");
		$(".areaList").hide();
		$(".areaList.countyList").show();
		$(".selectedBox a").removeClass("on");
		$(".selectedBox a.selectCounty").addClass("on");
	});
	
	//选择区
	$(".countyList a").live("click",function(){
		outTextTerritory($(this).text(), 2, $(this).attr("pid"));
		$(".areaDetail").hide();
		$(".areaList").hide();
		$(".selectedBox a").removeClass("on");
		$(".selectArea").removeClass("on");
		$(".selectArea b").each(function(index, element) {
			var value = $(".selectedBox a").eq(index).attr("pid");
			var text =  $(".selectedBox a").eq(index).find("em").text();
            $(this).attr("pid",value).text(text);
        });
		cookieJx.setCookie("user_province", $(".selectedBox a").eq(0).attr("pid") + "_" + $(".selectedBox a").eq(1).attr("pid") + "_" + $(".selectedBox a").eq(2).attr("pid"), 12);
		cartJx.reloadCart();
	});
	/*购物车搜索*/
	$(".cart-search input").click(function(e) {
		$(".cart-search input").focus();
		$(".cart-search p").hide();	
	});
	
	$(".cart-search input").bind("blur",function(){
		if($(this).val()==''){
			$(".cart-search p").show();
		}else{
			$(".cart-search p").hide();
		}
	});
	$('body').delegate('.regNow', 'click', function() {
		$("#loginPopCon").load("/view/login.htm",function(){
			$(".loginBox,.cart-model").show();
			$('#regID').click();
		});
      });
	$('#closeBtn').live("click", function(){
		location.reload();
	});
	//弹出登录框
	$(".login-btn,.loginNow,.save-cart-info a").live('click',function(){
		//$(".cart-model,.cart-login-pop").show();
		$("#loginPopCon").load("/view/login.htm",function(){
			$(".loginBox,.cart-model").show();
			$(".loginTitle li").first().addClass("cur").next().removeClass("cur");
			$(".loginMain > div").first().show().next().hide();
		});
	});
	$('#closeBtn').live('click', function() {
	      $('.loginBox, .cart-model').hide();
	});
	$('.loginReset').bind('click', function() {
	      $('.jx-ewmLoginLink').show();
	      $('.jx-pcLoginLink').hide();
	      $('.ewmCon').hide();
	      $('.loginCon').show();
	      $('.userLogin').click();
	});
	$(".close-pop").live('click',function(){
		$(this).parents('.cart-login-pop').hide();
		$(".cart-model").hide();
	});
	
	$("body").delegate(".cart-offer","mouseenter",function(){
		$(this).find(".cart-tips").show();	
	})
	$("body").delegate(".cart-offer","mouseleave",function(){
		$(this).find(".cart-tips").hide();
	})
	//换购弹窗
	$("body").delegate(".chenga-go-buy",'click',function(){
		$('.cart-pub-pop').hide();
		$(".gifts-btn").css("z-index","20");
		$(".cart-chenga-go").css("z-index","20");
		$(this).parents(".cart-chenga-go").css("z-index","30");
		var box = $(this).siblings(".cart-pub-pop");
		cartJx.loadChangeOptions(box);
		box.show();
	});
	$("body").bind('click',function(e){
		var e = e || window.event;
		var elem = e.target || e.srcElement;
		while (elem) {
			if ($(elem).hasClass('cart-chenga-go') || $(elem).hasClass('gifts-btn') ||elem.id=='_shdz') {
				return;
			}
			elem = elem.parentNode;
		}
		$(".cart-pub-pop").hide();
		$(".cart-chenga-go").css("z-index","20");
		$(".gifts-btn").css("z-index","20");

		$(".areaDetail").hide();
		$(".areaList").hide();
		$(".selectedBox a").removeClass("on");
		$(".selectArea").removeClass("on");
	});
	$("body").delegate(".hg-close,.cart-pop-cancel",'click',function(){
		$(this).parents(".cart-pub-pop").hide();
		$(this).parents(".cart-chenga-go").css("z-index","20");
		$(this).parents(".gifts-btn").css("z-index","20");
	});
	$("body").delegate(".gifts-btn-box",'click',function(){
		$('.cart-pub-pop').hide();
		$(".gifts-btn").css("z-index","20");
		$(".cart-chenga-go").css("z-index","20");
		var box = $(this).siblings(".cart-pub-pop");
		if(box.hasClass("cart-change-pop")){
			cartJx.loadChangeOptions(box);
		}else if(box.hasClass("cart-gifts-pop")){
			cartJx.loadGifts(box);
		}
		box.show();
		$(this).parents(".gifts-btn").css("z-index","30");
	});
	$("body").delegate(".voucher-btn-wrap",'click',function(){
		if($("#isLogin").val()=='true') {
			$('.cart-pub-pop').hide();
			$(".gifts-btn").css("z-index","20");
			$(".cart-chenga-go").css("z-index","20");
			var box = $(this).siblings(".cart-pub-pop");
			cartJx.loadCoupons(box);
			box.show();
			$(this).parents(".gifts-btn").css("z-index","30");
		}else{
			$(".loginNow").click();
		}
	});
	$("body").delegate(".voucher-btn",'click',function(){
		if($(this).hasClass('voucher-btn-on')){
			$(this).removeClass('voucher-btn-on');
			$(this).siblings('.voucher-product').hide();
		}else{
			$(this).addClass('voucher-btn-on');
			$(this).siblings('.voucher-product').show();
		}		
	});
	$("body").delegate(".voucher-receive a:not(.gray)",'click',function(){
		var _this = $(this);
		var actId = $(_this).attr('actId');
		var couponId = $(_this).attr('couponId');
		cartJx.postJsonMethod("/coupon/pickCoupon.htm", {'actId':actId,'couponId':couponId}, function(data) {
			if(data.suc) {
				if(data.body){
					_this.hide().siblings('span').css('display', 'block');
					setTimeout(function(){_this.show().siblings('span').css('display', 'none');}, 800);
				} else {
					_this.parent().html('<span class="voucher-receive-grey">已领取</span>');
				}
			} else{
				if(data.message == 'NO_MORE_COUPON') {
					_this.parent().html('<span class="voucher-receive-grey">抢光啦</span>');
				} else {
					confirm.alert("提示", data.body, "");
				}
			}
		});
	});
	$("body").delegate(".cart-pop-submit",'click', function(){
		$(this).parents(".cart-pub-pop").hide();
		$(this).parents(".cart-chenga-go").css("z-index","20");
		$(this).parents(".gifts-btn").css("z-index","20");
		var item = $(this).parents(".cart-pub-pop").find(".checkbox-checked");
		if(item.length == 0){
			cartJx.delItem($(this).parents(".cart-pub-pop").find(".cart-pop-body label[itemId]").attr("itemId"));
		}else{
			var proid = item.attr("proid");
			var step = item.attr("step");
			var mainItemId = $(this).parents(".cart-pub-pop").attr("mainitemid");
			var promoid = $(this).parents(".cart-pub-pop").attr("promoid");
			cartJx.addItem(proid, '', mainItemId, promoid, step);
		}
	});
	//删除
	$("body").delegate(".list-del",'click',function() {
		var $this = $(this);
		confirm.alert("删除", "确定要删除该商品吗？", "", function() {
			var itemId = $this.parents("[itemid]").attr("itemid");
			cartJx.delItem(itemId);
		});
	});
	
	$(".cart-close").live('click',function(){
		$(".cart-model").hide();
		$(this).parents(".cart-confirm-del").hide();
	})
	$('body').delegate("a[name='add_to_cart_btn']", 'click', function() {
		cartJx.addItem($(this).attr("_proid"), $(this).attr("_src"));
	});
	// 移入收藏
	$(".move-collect").live('click',function(){
		var $this = $(this);
		if($("#isLogin").val()=='true') {
			var item = $this.parents("[itemid]");
			confirm.alert("收藏", "确定将商品移入收藏？", "移入收藏后，商品将不在购物车展示", function() {
				var itemId = item.attr("itemid");
				var proId = item.attr("proid");
				cartJx.collect(itemId, proId);
			});
		}else{
			$(".loginNow").click();
		}
	})
	$(".cart-close").live('click',function(){
		$(".cart-model").hide();
		$(this).parents(".cart-confirm-collect").hide();
	});	
	//购物车勾选商品
	$("body").delegate(".click-checkbox:not(.checkbox-disable)",'click',function(){
		var $this = $(this);
		var checked = !$this.hasClass('checkbox-checked');
		if(checked){
			$this.addClass('checkbox-checked')	
		}else{
			$this.removeClass('checkbox-checked')
		};
		var itemId = $this.parents("[itemid]").attr("itemid");
		cartJx.updChecked(itemId, checked);
		return false;
	});
	$("body").delegate(".check-all",'click',function(){
		var $this = $(this);
		var checked = !$this.hasClass('checkbox-checked');
		if(checked){
			$this.addClass('checkbox-checked')	
		}else{
			$this.removeClass('checkbox-checked')
		};
		var items = new Array();
		var parent = $this.parents(".cart-tbody");
		if (parent.length==0) {
			parent = $this.parents("#cart_container");
		}
		parent.find("[itemid]").each(function(){
			items.push($(this).attr("itemid"));
		});
		cartJx.updChecked(items.join(','), checked);
		return false;
	});
	$("body").delegate("#delChecked",'click',function(){
		var $this = $(this);
		var items = new Array();
		var parent = $this.parents("#cart_container");
		parent.find(".select-bg[itemid]").each(function(){
			items.push($(this).attr("itemid"));
		});
		if (items.length==0) {
			return;
		}
		confirm.alert("删除", "确定将商品删除？","", function() {
			cartJx.delItem(items.join(','));
		});
	});
	$("body").delegate("#delFail",'click',function(){
		var items = new Array();
		$("#sx").find('[itemid]').each(function(){
			items.push($(this).attr("itemid"));
		});
		if (items.length > 0) {
			cartJx.delItem(items.join(','));
		}
	});
	$("body").delegate("#delToCollect",'click',function() {
		var _this = $(this);
		if($("#isLogin").val()=='true') {
			confirm.alert("删除", "确定将商品移入收藏？","移入收藏后，商品将不在购物车展示", function() {
				var items = new Array();
				var proids = new Array();
				$(".cart-list-wrap .checkbox-checked").each(function(){
					items.push($(this).parents("[itemid]").attr("itemid"));
					proids.push($(this).parents("[proid]").attr("proid"));
				});
				if (items.length > 0) {
					cartJx.collect(items.join(','), proids.join(','));
				}
			});
		}else{
			$(".loginNow").click();
		}
	});
	$("body").delegate(".yushou-info .gopay-btn", "click", function(){
			location.href = window.jxdomain.order+"/order/confirm.htm?goodsId=" + $(this).parents(".cart-list").attr("proid") +"&buyNum=" + $(this).parents(".cart-list").attr("num");
	});
	$("body").delegate(".order-info-box .gopay-btn",'click',function(){
		if($("#isLogin").val()=='true') {
			if (!cartJx.checkStopDelivery()) {
				return;
			}
            if (!cartJx.checkForbidSubmit()) {
                return;
            }
			if (!cartJx.checkGiftStockOut()) {// 赠品无货
				return;
			}
			var url = window.jxdomain.order+"/order/confirm.htm?stockoutGifts=";
			var preSellProIds = cartJx.getPreSellProId();
			if (preSellProIds.length > 0) {
                url = url + "&preSellProduct=" + preSellProIds.join(",");
			}
			location.href = url;
		}else{
			$(".loginNow").click();
		}
	});
	$("body").delegate(".cart-gopay-btn .done",'click',function(){
		if($("#isLogin").val()=='true') {
			if (!cartJx.checkPreSell()) {
				return;
			}
			if (!cartJx.checkStopDelivery()) {
				return;
			}
            if (!cartJx.checkForbidSubmit()) {
                return;
            }
			if (!cartJx.checkGiftStockOut()) {// 赠品无货
				return;
			}
			location.href = window.jxdomain.order+"/order/confirm.htm?stockoutGifts=";
		}else{
			$(".loginNow").click();
		}
	});
	//其它结算插件调用
	$("body").delegate('.pay-title-close', 'click',function(){
		$(".cart-gopay-pop").find(".yushou-title").eq(1).hide();
		$(".cart-gopay-pop").find(".order-info-box").hide();
		$(this).parents('.cart-gopay-pop').hide();
	})
	//换购弹窗勾选商品
	$("body").delegate(".cart-pop-item:not(.sold-out) .cart-pop-checkbox label",'click',function(){
		var $this = $(this);
		if($this.hasClass('checkbox-checked')){
			$this.removeClass('checkbox-checked');
			$this.parents(".cart-pub-pop").find(".cur-num").text("0");
		}else{
			$(".cart-pop-checkbox label").removeClass("checkbox-checked");
			$this.addClass('checkbox-checked');
			$this.parents(".cart-pub-pop").find(".cur-num").text("1");
		};
		return false;
	});
	$('.failure-bg .add').unbind('click');
	//购物车商品数量加减
	$("body").delegate('.cart-list:not(.failure-bg) .goods-num .add,.promotion-type .add','click',function(){
		var $this = $(this);
		var inputVal = $this.parent().siblings('.num').val();
		var inputNum = parseInt(inputVal)+1;		
		if(inputNum < 99){
			$this.removeClass('max');
			$this.parent().siblings('p').find('i').removeClass('min');
		}else if( inputNum == 99){
			$this.addClass('max');
			$this.parent().siblings('p').find('i').removeClass('min');
		}else{
			$this.addClass('max');
			alert("最多购买99件！");
			return false;	
		};
		$this.parent().siblings('.num').val(inputNum);
		var itemId = $this.parents("[itemid]").attr("itemid");
		cartJx.updCount(itemId, inputNum);
	});
	$("body").delegate('.cart-list:not(.failure-bg) .goods-num .cut,.promotion-type .cut','click',function(){
		var $this = $(this);
		var inputVal = $this.parent().siblings('.num').val();
		var inputNum = parseInt(inputVal)-1;
		if(inputNum > 1){
			$this.parent().siblings('p').find('i').removeClass('max');		
		}else if(inputNum == 1){			
			$this.addClass('min');
			$this.parent().siblings('p').find('i').removeClass('max');
		}else{
			return false;
		};
		$this.parent().siblings('.num').val(inputNum);
		var itemId = $this.parents("[itemid]").attr("itemid");
		cartJx.updCount(itemId, inputNum);
	})
	//输入购买数量
	$("body").delegate(".goods-num .num","change", function(){
		var itemId = $(this).parents("[itemid]").attr("itemid");
		var goodNumber = parseInt($.trim($(this).val()));
		var flag = /^\d+$/;
		if(!flag.test(goodNumber)){
			$(this).val(1);			
		} else if(goodNumber > 99){
			alert("最多只能购买99件!");
			$(this).val(99);
		} else if(goodNumber <= 1){ 
			$(this).val(1);
		}
		cartJx.updCount(itemId, $(this).val());
	});
	//无效商品去掉点击事件
	$('.failure-bg .add,.failure-bg .cut').unbind('click');
	//扫码登录切换
	$('.scan-login,.pc-login,.pc-login1').bind('click',function(){
		$(this).parents('.cart-login-tab').hide().siblings('.cart-login-tab').show();	
	});
	//登录方式切换
	var span1 = $(".login-tab").find('span:first');
	var span2 = $(".login-tab").find('span:last');
	var tabConLen = $('.login-form');
	span1.bind('click',function(){
		var $this = $(this);
		var d = $this.index();
		$this.addClass("cur").siblings('span').removeClass("cur");
		tabConLen.eq(0).show().siblings().hide();
	});
	span2.bind('click',function(){
		var $this = $(this);
		var d = $this.index();
		$this.addClass("cur").siblings('span').removeClass("cur");
		tabConLen.eq(1).show().siblings().hide();
	});
	//自动登录模拟checkbox
	$('.auto-login').find('i').live('click',function(){
		if($(this).hasClass('cur')){
			$(this).removeClass('cur');
		}else{
			$(this).addClass('cur');
		}
	})
	//二维码鼠标移入效果
	$('.cart-code-box').mouseenter(function(){
		$(this).find('.cart-code').stop().animate({left:"-90px"},500,function(){
			$('.sm').show();
		});		
	})
	$('.cart-code-box').mouseleave(function(){
		$('.sm').hide();
		$(this).find('.cart-code').stop().animate({left:"0"},500);		
	})
	//登录注册切换
	$('.cart-reg').find('a').bind('click',function(){
		var verifiy = $(this).parents('.cart-login-box');
		if(verifiy.index()=="0"){
			$(this).parents('.cart-login-pop').addClass('reg-wrap');
			
			
		}else if(verifiy.index()=="1"){
			$(this).parents('.cart-login-pop').removeClass('reg-wrap');
	
		}
		$(this).parents('.cart-login-box').hide().siblings().show();
	});
	$('.cart-reg1').bind('click',function(){
		var verifiy = $(this).parents('.cart-login-box');
		if(verifiy.index()=="0"){
			$(this).parents('.cart-login-pop').addClass('reg-wrap');
			
			
		}else if(verifiy.index()=="1"){
			$(this).parents('.cart-login-pop').removeClass('reg-wrap');
	
		}
		$(this).parents('.cart-login-box').hide().siblings().show();
	});
	//文本框鼠标焦点效果
	$('.form-1').focus(function(){
		$(this).siblings('.login-item-icon').css("background-color","#e9e9e9");
		$(this).siblings(".float-prompt").hide();
		$(this).siblings(".error-prompt").hide();
		$(this).parents(".login-item").removeClass("item-error");
	});
	$('.form-1').blur(function(){
		$(this).siblings('.login-item-icon').css("background-color","#f3f3f3");
		$(this).siblings('.float-prompt').show();
	});
	//清空input值
	$('.clear-icon').bind('click',function(e){
		$(this).siblings('.form-1').val('');
		$(this).siblings('.float-prompt').show();
		$(this).siblings('.error-prompt').hide();
		$(this).parents(".login-item").removeClass("item-error");
		e.stopPropagation()
	})
	
  	//用户名为空验证
	$(".userId").bind('focus',function(){
		$(this).siblings(".float-prompt").hide();
	});
	$(".userId").bind('blur',function(){
		userNameFn($(this));
	});	
	function userNameFn(obj){
		if(obj.val()=='')
		{
			obj.parents(".login-item").removeClass("item-error");
			obj.siblings(".clear-icon").css("display","none");
			return false;
		}else{
			obj.siblings(".float-prompt").hide();
			obj.siblings(".clear-icon").css("display","block");
			obj.parents(".login-item").removeClass("item-error");
			obj.siblings(".error-prompt").hide();
			return true;		
		}
	};	
	//密码
	$(".passWord").bind('focus',function(){
		$(this).siblings(".float-prompt").hide();
	});
	$(".passWord").bind('blur',function(){
		passWordFn($(this));
	});	
	function passWordFn(obj){
		if(obj.val()=='')
		{
			obj.parents(".login-item").removeClass("item-error");
			obj.siblings(".clear-icon").css("display","none");
			return false;
		}else{
			obj.siblings(".float-prompt").hide();
			obj.siblings(".clear-icon").css("display","block");
			obj.parents(".login-item").removeClass("item-error");
			obj.siblings(".error-prompt").hide();
			return true;		
		}
	}
	//图形验证码为空验证
	$(".imgCode").bind('focus',function(){
		$(this).siblings(".float-prompt").hide();
	});
	$(".imgCode").bind('blur',function(){
		imgCodeFn($(this));
	});
	function imgCodeFn(obj){
		if(obj.val()=='')
		{
			obj.parents(".login-item").removeClass("item-error");
			return false;
		}else{
			obj.siblings(".float-prompt").hide();
			obj.parents(".login-item").removeClass("item-error");
			obj.siblings(".error-prompt").hide();
			return true;		
		}
	}
	
	//登录按钮验证
	$(".form-2").bind('click',function(){
		if(!userNameFn($(".userId"))){
			$(".userId").siblings(".float-prompt").show();
			$(".userId").parents(".login-item").addClass("item-error");
			$(".userId").siblings(".error-prompt").show();
			return false;
		}
		if(!passWordFn($(".passWord"))){			
			$(".passWord").siblings(".float-prompt").show();
			$(".passWord").parents(".login-item").addClass("item-error");
			$(".passWord").siblings(".error-prompt").show();
			return false;	
		}
		if(!imgCodeFn($(".imgCode"))){
			$(".imgCode").siblings(".float-prompt").show();
			$(".imgCode").parents(".login-item").addClass("item-error");
			$(".imgCode").siblings(".error-prompt").show();
			return false;
		}
		return true;
	});	
	//手机动态码登录
	//手机号验证
	$(".phoneNum").bind('focus',function(){
		$(this).siblings(".float-prompt").hide();
	});
	$(".phoneNum").bind('blur',function(){
		phoneNumFn($(this));
	});
	function phoneNumFn(obj){
		var phoneNum = $.trim($(".phoneNum").val());
		var pattern=/^(13|14|15|18|17)[0-9]{9}$/;
		if(phoneNum == ""){
			obj.siblings(".float-prompt").show();
			obj.parents(".login-item").removeClass("item-error");
			obj.siblings(".error-prompt").hide();
			obj.siblings(".clear-icon").css("display","none");
			return false;
		}else{
			if(pattern.test(phoneNum)){
				obj.siblings(".float-prompt").hide();
				obj.parents(".login-item").removeClass("item-error");
				obj.siblings(".error-prompt").hide();
				obj.siblings(".clear-icon").css("display","block");
				return true;
			}else{
				obj.siblings(".float-prompt").hide();
				obj.parents(".login-item").addClass("item-error");
				obj.siblings(".error-prompt").show();
				obj.siblings(".clear-icon").css("display","block");
				return false;
			};				
		};
	}
	//图形验证码2验证
	$(".imgCode2").bind('focus',function(){
		$(this).siblings(".float-prompt").hide();
	});
	$(".imgCode2").bind('blur',function(){
		phoneImgCodeFn($(this));
	});
	function phoneImgCodeFn(obj){
		if(obj.val()=='')
		{
			obj.parents(".login-item").removeClass("item-error");
			return false;
		}else{
			obj.siblings(".float-prompt").hide();
			obj.parents(".login-item").removeClass("item-error");
			obj.siblings(".error-prompt").hide();
			return true;		
		}
	}
	//短信验证码为空验证
	$(".phoneCode").bind('focus',function(){
		$(this).siblings(".float-prompt").hide();
	});
	$(".phoneCode").bind('blur',function(){
		phoneCodeFn($(this));
	});
	function phoneCodeFn(obj){
		var phoneNum = $.trim($(".phoneCode").val());
		if(obj.val()=='')
		{
			obj.siblings(".float-prompt").show();
			obj.parents(".login-item").removeClass("item-error");
			obj.siblings(".error-prompt").hide();
			return false;
		}else{
			obj.siblings(".float-prompt").hide();
			obj.parents(".login-item").removeClass("item-error");
			obj.siblings(".error-prompt").hide();	
			return true;		
		}
	};
	/*获取验证码*/
	var time =59;
	var i=null;
	function getTimer(){
		time--;
		if(time==0){
			clearInterval(i);
			$(".getCode").show();
			$(".getTime").hide();
			time=59;
		}
		$(".getTime").find("em").text(time);		
	}	
	$(".getCode").click(function() {
		var value = $.trim($(".phoneNum").val());
		if(value == "")
		{
			 $(this).parents(".login-item").prev().prev().addClass("item-error");
			 $(this).parents(".login-item").prev().prev().find(".float-prompt").show();
			 $(this).parents(".login-item").prev().prev().find(".error-prompt").show();
			 return false;
		}
		else{
			var phoneNum = $.trim($(".phoneNum").val());
			var pattern=/^(13|14|15|18|17)[0-9]{9}$/;
			if(pattern.test(phoneNum)){
				$(this).hide();
				$(".getTime").show();
				i=setInterval(getTimer,1000);
			}else{
				$(this).parents(".login-item").prev().prev().addClass("item-error");
			 	$(this).parents(".login-item").prev().prev().find(".float-prompt").hide();
				$(this).parents(".login-item").prev().prev().find(".error-prompt").show();
			}
			
		}
    });
	//手机动态密码登录按钮验证
	$(".form-3").bind('click',function(){
		if(!phoneNumFn($(".phoneNum"))){
			if($(".phoneNum").val() == ""){
				$(".phoneNum").siblings(".float-prompt").show();
				$(".phoneNum").parents(".login-item").addClass("item-error");
				$(".phoneNum").siblings(".error-prompt").show();
			}
			return false;
		}
		if(!phoneImgCodeFn($(".imgCode2"))){
			$(".imgCode2").siblings(".float-prompt").show();
			$(".imgCode2").parents(".login-item").addClass("item-error");
			$(".imgCode2").siblings(".error-prompt").show();
			return false;
		}
		if(!phoneCodeFn($(".phoneCode"))){
			$(".phoneCode").siblings(".float-prompt").show();
			$(".phoneCode").parents(".login-item").addClass("item-error");
			$(".phoneCode").siblings(".error-prompt").show();
			return false;
		}
		return true;
	});	
	//注册
	//手机号验证
	$(".regPhoneNum").bind('focus',function(){
		$(this).siblings(".float-prompt").hide();
	});
	$(".regPhoneNum").bind('blur',function(){
		regPhoneNumFn($(this));
	});
	function regPhoneNumFn(obj){
		var phoneNum = $.trim($(".regPhoneNum").val());
		var pattern=/^(13|14|15|18|17)[0-9]{9}$/;
		if(phoneNum == ""){
			obj.siblings(".float-prompt").show();
			obj.parents(".login-item").removeClass("item-error");
			obj.siblings(".error-prompt").hide();
			obj.siblings(".clear-icon").css("display","none");
			return false;
		}else{
			if(pattern.test(phoneNum)){
				obj.siblings(".float-prompt").hide();
				obj.parents(".login-item").removeClass("item-error");
				obj.siblings(".error-prompt").hide();
				obj.siblings(".clear-icon").css("display","block");
				return true;
			}else{
				obj.siblings(".float-prompt").hide();
				obj.parents(".login-item").addClass("item-error");
				obj.siblings(".clear-icon").css("display","block");
				obj.siblings(".error-prompt").show();
				return false;
			};				
		};
	}
	//注册图形验证码
	$(".regImgCode").bind('focus',function(){
		$(this).siblings(".float-prompt").hide();
	});
	$(".regImgCode").bind('blur',function(){
		regImgCodeFn($(this));
	});
	function regImgCodeFn(obj){
		if(obj.val()=='')
		{
			obj.parents(".login-item").removeClass("item-error");
			return false;
		}else{
			obj.siblings(".float-prompt").hide();
			obj.parents(".login-item").removeClass("item-error");
			obj.siblings(".error-prompt").hide();
			return true;		
		}
	};
	//注册短信验证码
	$(".regPhoneCode").bind('focus',function(){
		$(this).siblings(".float-prompt").hide();
	});
	$(".regPhoneCode").bind('blur',function(){
		regPhoneCodeFn($(this));
	});
	function regPhoneCodeFn(obj){
		var phoneNum = $.trim($(".regPhoneCode").val());
		if(obj.val()=='')
		{
			obj.siblings(".float-prompt").show();
			obj.parents(".login-item").removeClass("item-error");
			obj.siblings(".error-prompt").hide();
			return false;
		}else{
			obj.siblings(".float-prompt").hide();
			obj.parents(".login-item").removeClass("item-error");
			obj.siblings(".error-prompt").hide();	
			return true;		
		}
	};
	/*注册获取验证码*/
	function regGetTimer(){
		time--;
		if(time==0){
			clearInterval(i);
			$(".regGetCode").show();
			$(".regGetTime").hide();
			time=59;
		}
		$(".regGetTime").find("em").text(time);		
	}	
	$(".regGetCode").click(function() {
		var value = $.trim($(".regPhoneNum").val());
		if(value == "")
		{
			 $(this).parents(".login-item").prev().prev().addClass("item-error");
			 $(this).parents(".login-item").prev().prev().find(".float-prompt").show();
			 $(this).parents(".login-item").prev().prev().find(".error-prompt").show();
			 return false;
		}
		else{
			var phoneNum = $.trim($(".regPhoneNum").val());
			var pattern=/^(13|14|15|18|17)[0-9]{9}$/;
			if(pattern.test(phoneNum)){
				$(this).hide();
				$(".regGetTime").show();
				i=setInterval(regGetTimer,1000);
			}else{
				$(this).parents(".login-item").prev().prev().addClass("item-error");
			 	$(this).parents(".login-item").prev().prev().find(".float-prompt").hide();
				$(this).parents(".login-item").prev().prev().find(".error-prompt").show();
			}
			
		}
    });
	//密码1
	$(".regPassword1").bind('focus',function(){
		$(this).siblings(".float-prompt").hide();
		$(this).siblings(".error-prompt").hide();
		$(this).parents(".login-item").removeClass("item-error");
	});
	$(".regPassword1").bind('blur',function(){
		regPassWordFn1($(this));
	});	
	function regPassWordFn1(obj){
		if(obj.val()=='')
		{
			obj.parents(".login-item").removeClass("item-error");
			obj.siblings(".clear-icon").css("display","none");
			return false;
		}else{
			obj.siblings(".float-prompt").hide();
			obj.siblings(".clear-icon").css("display","block");
			obj.parents(".login-item").removeClass("item-error");
			obj.siblings(".error-prompt").hide();
			return true;		
		}
	};
	//密码2
	$(".regPassword2").bind('focus',function(){
		$(this).siblings(".float-prompt").hide();
		$(this).siblings(".error-prompt").hide();
		$(this).parents(".login-item").removeClass("item-error");
	});
	$(".regPassword2").bind('blur',function(){
		regPassWordFn2($(this));
	});	
	function regPassWordFn2(obj){
		var pwd1 = $(".regPassword1").val();
		var pwd2 = $(".regPassword2").val();
		if(obj.val()=='')
		{
			obj.parents(".login-item").removeClass("item-error");
			obj.siblings(".clear-icon").css("display","none");
			return false;
		}else{
			if(pwd1 == pwd2){
				obj.siblings(".float-prompt").hide();
				obj.siblings(".clear-icon").css("display","block");
				obj.parents(".login-item").removeClass("item-error");
				obj.siblings(".error-prompt").hide();
				return true;
			}else{
				obj.siblings(".float-prompt").hide();
				obj.siblings(".clear-icon").css("display","block");
				obj.parents(".login-item").addClass("item-error");
				obj.siblings(".error-prompt").show();
				return false;
			}
				
		}
	};
	
	//注册提交验证
	$(".regSubmit").bind('click',function(){
		if(!regPhoneNumFn($(".regPhoneNum"))){
			if($(".regPhoneNum").val() == ""){
				$(".regPhoneNum").siblings(".float-prompt").show();
				$(".regPhoneNum").parents(".login-item").addClass("item-error");
				$(".regPhoneNum").siblings(".error-prompt").show();
			}
			return false;
		}
		if(!regImgCodeFn($(".regImgCode"))){
			$(".regImgCode").siblings(".float-prompt").show();
			$(".regImgCode").parents(".login-item").addClass("item-error");
			$(".regImgCode").siblings(".error-prompt").show();
			return false;
		}
		if(!regPhoneCodeFn($(".regPhoneCode"))){
			$(".regPhoneCode").siblings(".float-prompt").show();
			$(".regPhoneCode").parents(".login-item").addClass("item-error");
			$(".regPhoneCode").siblings(".error-prompt").show();
			return false;
		}
		if(!regPassWordFn1($(".regPassword1"))){			
			$(".regPassword1").siblings(".float-prompt").show();
			$(".regPassword1").parents(".login-item").addClass("item-error");
			$(".regPassword1").siblings(".error-prompt").show();
			return false;	
		}
		if(!regPassWordFn2($(".regPassword2"))){			
			$(".regPassword2").siblings(".float-prompt").show();
			$(".regPassword2").parents(".login-item").addClass("item-error");
			$(".regPassword2").siblings(".error-prompt").show();
			return false;	
		}
		return true;
	});	
	/*猜你喜欢tab切换*/
	$(".recommend-head span").hover(function(e) {
		var $parents=$(this).parents(".recommend-wrap")
		var index=$(".recommend-head span").index($(this));
		$(".recommend-head span").removeClass("cur");
		$(".recommend-head span").eq(index).addClass("cur");
		$parents.find(".recommend-info").hide();
        $parents.find(".recommend-info").eq(index).show();
//		$(".recommend-list ul").css("margin-left","0");
    });
	//鼠标移入显示按钮
	$('.recommend-info').mouseenter(function(){
		if ($(this).find(".bigUl li").length>4) {
			$(this).find('.pageBtn').css("display","block");	
		}
	});
	$('.recommend-info').mouseleave(function(){
		$(this).find('.pageBtn').css("display","none");
	});
	$('.recommend-info').slider();

	var confirm = {
			alert : function(title, content, tit, sure, cancel) {
				$(".cart-confirm .cart-confirm-tit p").text(title);
				$(".cart-confirm .cart-confirm-prompt span").text(content);
				$(".cart-confirm .cart-confirm-text").text(tit);
				$(".cart-model").show();
				$(".cart-confirm-collect").show();
				$(".cart-confirm .cancel, .cart-confirm .cart-close").bind("click", function(){
					if(cancel) {
						cancel();
					} else {
						$(".cart-model").hide();
						$(".cart-confirm-collect").hide();
					}
				});
				$(".cart-confirm .sure").bind("click", function(){
					if(sure) {
						sure();
					} 
					$(".cart-model").hide();
					$(".cart-confirm-collect").hide();
				});
			}
	};
	cartJx.init();
	var delivery = {
		init : function() {
			$("body").delegate(".cart-confirm-bg .btn-red,.cart-confirm-bg .cart-close", "click", function() {
				$(this).parents(".cart-confirm-bg").hide();
			});
			$("body").delegate(".cart-confirm-bg .btn-grey", "click", function() {
				location.href = window.jxdomain.order+"/order/confirm.htm?stockoutGifts=" + $("#noStockGiftsIds").val();
			});
		}
	};
	delivery.init();
});
function cut_str(str, len) {
	var char_length = 0;
	var sub_len = 0;
	for (var i = 0; i < str.length; i++) {
		var son_str = str.charAt(i);
		encodeURI(son_str).length > 2 ? char_length += 1 : char_length += 0.5;
		if (char_length >= len) {
			sub_len = char_length == len ? i + 1 : i;
			break
		}
	}
	var rstr = str;
	if (sub_len > 0) {
		rstr = str.substr(0, sub_len)
	}
	return rstr
}

