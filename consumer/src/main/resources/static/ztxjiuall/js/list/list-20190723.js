String.prototype.replaceAll = function(s1,s2){return this.replace(new RegExp(s1,"gm"),s2);}

function addProductToCart(goods, count, pack, src, callback) {
	var cart_list_url = '/cart/addToCart.htm';
	$.ajax({
		type : "POST",
		url : cart_list_url,
		data : {
            proId : goods,
			count : count
		},
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		dataType : "json",
		success : function(data) {
			if (data.status == 1) {
				var cartNum = getCookie("cart_goods_count");
				if(cartNum=='' || cartNum==null || cartNum==undefined){
					cartNum = 0;
				}
				cartNum = parseInt(cartNum)+parseInt(count);
				setCookie("cart_goods_count", cartNum, 7);
				
				callback(data)
			} else {
				if(data.stack.indexOf("快递停发") >-1){
					var alertstrtpm = data.stack;
					var eint = alertstrtpm.indexOf("]");
					alertstr=alertstrtpm.substring(eint+1,alertstrtpm.length);
					var startTime = alertstr.split(",")[0].split("-")[0];
					var endTime = alertstr.split(",")[0].split("-")[1];
					$(".start").html(startTime);
					$(".end").html(endTime);
					if(window.confirm('该地区于'+startTime+'至'+endTime+'快递停发，您可以继续下单，我们将会在年后第一时间给您发货!')){
						setCookie("knowStopDelivery","true",1);
		            }else{}
				}else{
					alert(data.stack)
				}
			}
		}
	});
}

function changeNum(n, i) {
    var num = document.getElementById("InputNum" + i).value;
    var reg = new RegExp("^[0-9]*$");
    if (!reg.test(num)) {
        alert("请输入正确的数字!");
        document.getElementById("InputNum" + i).value = 1
    } else {
        var n2 = parseInt(num) >= 1 ? parseInt(num) : 1;
        document.getElementById("InputNum" + i).value = n2
    }
}

$(function() {
    if ($(".cpp .brandv").find("ul").eq(0).height() > 80) {
        $(".cpp .brandv").find("ul").eq(0).css({
            "overflow": "hidden",
            "height": "70px"
        });
        $(".cpp .brandv").find("ul").eq(0).attr("str", "b")
    } else {
        $(".cpp .brandv").find("ul").eq(0).css({
            "overflow": "",
            "height": ""
        });
        $(".cppr_all .brd_more").hide();
        $(".cpp .brandv").find("ul").eq(0).attr("str", "t")
    }
    $(".cpp .brandv").find("ul").eq(0).show();
    var lzTipNum, lzTipWidth;
    var mWidth = $(window).width();
    if (mWidth < 1200) {
        lzTipWidth = 777
    } else {
        lzTipWidth = 984
    }
    $roundDiv = $(".hot_buy_pr_list ul");
    $("#lzTip span").mouseover(function() {
        lzTipNum = $("#lzTip span").index($(this));
        if (mWidth < 1200) {
            $roundDiv.stop(true, false).animate({
                left: -($(this).index()) * lzTipWidth
            },
            300)
        } else {
            $roundDiv.stop(true, false).animate({
                left: -($(this).index()) * lzTipWidth
            },
            300)
        }
        $("#lzTip span").removeClass("hota");
        $("#lzTip span").eq(lzTipNum).addClass("hota")
    });
    
    $(window).bind("resize", function() {
        var num = $("#lzTip span").index($("#lzTip .hota"));
        var mWidth = $(window).width();
        if (mWidth < 1200) {
            lzTipWidth = 777;
            lzTipNum = 0;
            $("#lzTip span").removeClass("hota");
            $("#lzTip span").eq(lzTipNum).addClass("hota");
            $roundDiv.css("left", -num * lzTipWidth + "px")
        } else {
            lzTipWidth = 984;
            lzTipNum = 0;
            $("#lzTip span").removeClass("hota");
            $("#lzTip span").eq(lzTipNum).addClass("hota");
            $roundDiv.css("left", -num * lzTipWidth + "px")
        }
        $("#lzTip span").mouseover(function() {
            if (mWidth < 1200) {
                $roundDiv.stop(true, false).animate({
                    left: -($(this).index()) * lzTipWidth
                },
                300)
            } else {
                $roundDiv.stop(true, false).animate({
                    left: -($(this).index()) * lzTipWidth
                },
                300)
            }
        })
    });
    
    $(".cppr_all a").mousemove(function() {
        var num = $(".cppr_all a").index($(this));
        var state = $(this).parents("ul").siblings("div").find("i").attr("class");
        $(".cppr_all a").attr("class", "");
        $(this).attr("class", "cppron");
        if ($(this).text() == "全部品牌") {
            if (state == "more2") {
                $(".cpp .brandv").find("ul").eq(0).css({
                    "overflow": "",
                    "height": ""
                })
            } else {
                if ($(".cpp .brandv").find("ul").eq(0).attr("str") == "b") {
                    $(".cpp .brandv").find("ul").eq(0).css({
                        "overflow": "hidden",
                        "height": "70px"
                    })
                }
            }
            if ($(".cpp .brandv").find("ul").eq(0).attr("str") == "b") {
                $(".cppr_all .brd_more").show()
            } else {
                $(".cppr_all .brd_more").hide()
            }
        }
        $(".brandv ul").hide();
        $(".brandv ul").eq(num).show();
        $(".brd_more.brd_more01").hide();
        if (num == 0 && $(".cpp .brandv").find("ul").eq(0).attr("str") == "b") {
            $(".brd_more.brd_more01").show()
        }
    });
    
    $(".brd_nav_cd").css({
        "overflow": "hidden",
        "height": "24px"
    });
    
    $(".brd_nav").css({
        "overflow": "hidden",
        "height": "24px"
    });
    
    $(".brd_more.brd_more01").click(function() {
        if ($(this).find("i").attr("class") == "more1") {
            $(this).find("i").attr("class", "more2");
            $(this).find("span").text("收起");
            $(".brandv ul").eq(0).css({
                "overflow": "",
                "height": ""
            })
        } else {
            $(this).find("i").attr("class", "more1");
            $(this).find("span").text("更多");
            $(".brandv ul").eq(0).css({
                "overflow": "hidden",
                "height": "70px"
            })
        }
    });
    
    $(".brd_more[more=0]").click(function() {
        if ($(this).find("i").attr("class") == "more1") {
            $(this).find("i").attr("class", "more2");
            $(this).find("span").text("收起");
            $(this).parent(".brd_nav").css({
                "overflow": "",
                "height": ""
            });
            $(this).parent(".brd_nav_cd").css({
                "overflow": "",
                "height": ""
            })
        } else {
            $(this).find("i").attr("class", "more1");
            $(this).find("span").text("更多");
            $(this).parent(".brd_nav").css({
                "overflow": "hidden",
                "height": "24px"
            });
            $(this).parent(".brd_nav_cd").css({
                "overflow": "hidden",
                "height": "24px"
            })
        }
    });
    
    $(window).bind("scroll",function() {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if ($("#slb").offset()) {
        	var a = $("#slb").offset().top;
        	if ($("#slb").attr("class") == "slb") {
                a = $("#slb").offset().top
            }
            if (scrollTop >= a) {
                $("#slb").attr("class", "scroll");
                $(".slb1").show()
            } else {
                $("#slb").attr("class", "slb");
                $(".slb1").hide()
            }
        }
    })
    
    $("#link .brd_nav_zd ul").css({
        "overflow": "",
        "height": ""
    });
    
    $("#link .brd_more").hide();
    if (parseInt($("#link .brd_nav_zd ul").css("height")) > "72") {
        $("#link .brd_more").show();
        $("#link .brd_nav_zd ul").css({
            "overflow": "hidden",
            "height": "72px"
        })
    }
    
    $("#link .brd_more[more1=0]").click(function() {
        if ($(this).find("i").attr("class") == "more1") {
            $(this).find("i").attr("class", "more2");
            $(this).find("span").text("收起");
            $(this).siblings("ul").css({
                "overflow": "",
                "height": ""
            })
        } else {
            $(this).find("i").attr("class", "more1");
            $(this).find("span").text("更多");
            $(this).siblings("ul").css({
                "overflow": "hidden",
                "height": "72px"
            })
        }
    });
    
    $("#link1 .brd_nav_zd ul").css({
        "overflow": "",
        "height": ""
    });
    
    $("#link1 .brd_more").hide();
    if (parseInt($("#link1 .brd_nav_zd ul").css("height")) > "72") {
        $("#link1 .brd_more").show();
        $("#link1 .brd_nav_zd ul").css({
            "overflow": "hidden",
            "height": "72px"
        })
    }
    $("#link1 .brd_more[more1=0]").click(function() {
        if ($(this).find("i").attr("class") == "more1") {
            $(this).find("i").attr("class", "more2");
            $(this).find("span").text("收起");
            $(this).siblings("ul").css({
                "overflow": "",
                "height": ""
            })
        } else {
            $(this).find("i").attr("class", "more1");
            $(this).find("span").text("更多");
            $(this).siblings("ul").css({
                "overflow": "hidden",
                "height": "72px"
            })
        }
    });
    
    if ($(".brd_nav_cd ul").height() <= 30) {
        $(".brd_nav_cd .brd_more").hide()
    }
    if ($(".brd_nav ul").height() <= 30) {
        $(".brd_nav .brd_more").hide()
    }
    $(".prtlt_add").live("click", function() {
        var num = $(this).siblings(".prtlt_txt").val();
        num++;
        $(this).siblings(".prtlt_txt").val(num);
        $(this).siblings(".prtlt_next").removeClass("prtlt_on")
    });
    
    $(".prtlt_next").live("click", function() {
        var num = $(this).siblings(".prtlt_txt").val();
        num--;
        if (num <= 1) {
            num = 1;
            $(this).siblings(".prtlt_txt").val(num);
            $(this).addClass("prtlt_on");
            return
        } else {
            $(this).siblings(".prtlt_txt").val(num)
        }
    });
    
    var timer = null;
    $(".prtlt_btn2").live("click", function(e) {
        clearTimeout(timer);
        if ($.browser.version == "6.0" || $.browser.version == "7.0") {
            $(".alt_succ").hide()
        } else {
            $(".alt_succ").fadeOut(1)
        }
        var divCart = $(this).siblings("div");
        var num = divCart.find("input").val();
        var goodsId = divCart.find("input").attr("gid");
        var goodsName = divCart.find("input").attr("gname");
        var fromId = divCart.find("input").attr("src");
        var pri = $(this).parents("li").find(".price").text();
        var goodsPri = pri.slice(1);
        
        addProductToCart(goodsId, num, "", fromId, function(data) {
        	var cartNum = getCookie("cart_goods_count");
			if(cartNum=='' || cartNum==null || cartNum==undefined){
				cartNum = 0;
			}
            $("#alt_num").html(cartNum);
            if (cartNum > 999) {
                $(".jx_car_num").text("999+")
            } else {
                $(".jx_car_num").text(cartNum)
            }
            setTimeout(function() {
                timer
            }, 500);
            var sc = $(document).scrollTop() + ($(window).height() / 2) - 110;
            $(".alt_succ").css({
                "top": sc
            });
            $(".alt_succ").show();
            timer = setTimeout(function() {
                if ($.browser.version == "6.0" || $.browser.version == "7.0") {
                    $(".alt_succ").hide()
                } else {
                    $(".alt_succ").fadeOut(600)
                }
                clearTimeout(timer)
            },
            5000);
            
            try{
                window._JX_INFO = window._JX_INFO || [];
        		var userId = getUserId();
                var jsonarray = [];
        		var jsonData = {"item":goodsId,"price":goodsPri,"quantity":num};
        		jsonarray.push(jsonData);
        		_JX_INFO.push(["addCartItem",jsonarray]);
        		_JX_INFO.push(["go"]);
        		_JX_INFO.push(["userId",userId]);
            }catch(e){
        		
        	}
            CouponSearchPcJs.getCartInfoByCouponId( window.jxsearch._couponId);
        });
        
    });
    
    $(".succ_close,.contgo").live("click", function() {
        $(this).parents(".alt_succ").hide()
    });
    
});

$(function() {

	$(".search input").focus(function(e) {
    	if( $.trim($(this).val()) == "在结果中查找"){
    		$(this).val("");
    	}
    });
    $(".search input").blur(function(e) {
    	if( $.trim($(this).val()) == ""){
        	$(this).val("在结果中查找");
    	}
    });

    $(".buyArea input").attr('value', 1);
    $(".buyArea input").live('blur',function() { //手动输入数量
        var num = parseInt($(this).val());
        if (num == 99) {
            $(this).next(".increase").addClass('off');
            $(this).prev(".decrease").removeClass('off');
        }else if (num > 99) {
            $(this).next(".increase").addClass('off');
            $(this).prev(".decrease").removeClass('off');
            $(this).attr('value',99);
            alert("该商品限99件！")
        }else if (num <= 1) {
        	$(this).next(".increase").removeClass('off');
        	$(this).prev(".decrease").addClass('off');
        	$(this).attr('value', 1);
        } else {
        	$(this).next(".increase").removeClass('off');
        	$(this).prev(".decrease").removeClass('off');
        }

    });

    //增加数量
    $(".increase").live("click", function() { 
    	var numPut = $(this).siblings("input");
        var num = parseInt(numPut.val());
        // 1: num=1 der.removeclass -> off
        // 2: n=98 this.addclass -> off
        if (num == 1) {
        	$(this).parent().find('.decrease').removeClass('off');
        } else if (num == 98) {
        	$(this).addClass('off');
        } else if (num == 99) {
        	alert("该商品限购99件！");
        	return;
        }
        numPut.attr('value', num + 1);
    });
    
    //减少数量
    $(".decrease").live("click",function() { 
    	var numPut = $(this).siblings("input");
        var num = parseInt(numPut.val());
        if (num == 99) {
        	$(this).parent().find('.increase').removeClass('off');
        } else if (num == 2) {
        	$(this).addClass('off');
        } else if (num == 1) {
        	return;
        }
        numPut.attr('value', num - 1);
    });

    /**
     * 预售收藏改版
     */
    $(".collect_box").hover(function() {
        $(this).find('.collect').show();
        var proObj = $(this).find('img');
        var goodsId = proObj.attr("proImgId");
        checkCollect(goodsId, $(this));
    },function() {
        $(this).find('.collect').hide();
    });

    /**
     * 点击收藏
     */
    $(".collect").click(function() {
        var collected = $(this).attr('data-collect');
        var goodsId = $(this).attr('proImgId');
        if(collected == 'off'){
            saveCollect(goodsId, $(this));
        }else{
            cancelCollect(goodsId, $(this));
        }
    });

    function onCollect(_this) {
        _this.attr('data-collect','on');
        _this.addClass('collect1');
    }

    function offCollect(_this) {
        _this.attr('data-collect','off');
        _this.removeClass('collect1');
    }

    function checkCollect(goodsId, _this){
        if(goodsId && goodsId > 0){
            $.getJSON("/checkCollect.htm?t="+new Date().getTime(),{'proId':goodsId},function(data){
                if(data){
                    if(data.code == 0){
                        offCollect(_this.find('.collect'));
                    }else if(data.code == 1){
                        onCollect(_this.find('.collect'));
                    }
                }
            });
        }
    }

    function saveCollect(goodsId, _this){
        $.getJSON("/saveCollect.htm?t="+new Date().getTime(),{'proId':goodsId},function(data){
            if(data){
                if(data.code == -1){
                    alert('收藏失败!');
                    return;
                }else if(data.code == 0){
                    onCollect(_this);
                    alert('收藏成功!');
                    return;
                }else if(data.code == 1){
                    window.location.href=window.jxdomain.login+'/login.htm?from='+window.location.href;
                    return;
                }else if(data.code == 2){
                    alert("您已经收藏过此商品了！");
                    return;
                }
            }
        });
    }

    function cancelCollect(goodsId, _this){
        $.getJSON("/cancelCollect.htm?t="+new Date().getTime(),{'proId':goodsId},function(data){
            if(data){
                if(data.code == -1){
                    alert("参数错误！");
                    return;
                }else if(data.code == 0){
                    window.location.href=window.jxdomain.login+'/login.htm?from='+window.location.href;
                    return;
                }else if(data.code == 1){
                    offCollect(_this);
                    alert("取消收藏成功。");
                    return;
                }else if(data.code == 2){
                    alert("您没有收藏该商品。");
                    return;
                }
            }
        })
    }
    
    $(".get").click(function() {
		 var CouponId = $(this).attr("id").split("_")[1];
		 $.getJSON("/saveCoupon.htm",{'CouponId':CouponId},function(data){
			if(data){
				if(data.code == -1){
					alert('领取失败!');
					return false;
				}else if(data.code == 8){
					alert('领取成功!');
					return false;
				}else if(data.code == 1){
					//alert("您还没有登录，请先登录！");
					window.location.href=window.jxdomain.login+'/login.htm';
					return false;
				}else if(data.code == 2){
					alert("红包不存在了！");
					return false;
				}else if(data.code == 3){
					alert("您领取红包太频繁了！");
					return false;
				}
			}
		 });
    });
    
    $(".letterS li a").click(function(e) {
        return false;	
		
    });
	
    $('.letterS li').bind('mouseenter',function(){
		var let = $(this).text();
		$(this).find("a").addClass('on');
		$(this).siblings().find("a").removeClass('on');
		$('#brandAll').show()
		if(let=="全部品牌"){
			$('#brandAll li').show();
		}else{
			$('#brandAll li').each(function(){
    			var ch = $(this).attr('c');
    			if(ch==let){
    				$(this).show();
    			}else{
    				$(this).hide();
    			}
			});
		};
		
	});
	
	var itop;

    $(".open").live("click",
    function() { //搜索区域  展开/收起切换
        var flag = $(this).text();
        if (flag == "收起") {
            $(".letterS").hide();
            $(".brandAll").css({
                "height": "84px",
                "overflow": "hidden"
            });
            $(".showHide").css({
           	 "height": "84px",
             "overflow": "hidden"     	
           });
            $(this).html("展开<i></i>");
            $(".open i").css({
                "background-position": "-71px -53px"
            });
            $(".brandAll").hide();
    		$("#brandAll").show();
    		itop = $('#order').offset().top;
            return false;
        }else {
            $(".letterS").show();
            $(".letterS").css({
                "height": "30px"
            });
            $(".brandAll").css({
                "height": "165px",
                "overflow": "auto"  
                
            });     
            $(".showHide").css({
            	 "height": "auto",
                 "overflow": "visible"            	
            })
            $(this).html("收起<i></i>");
            $(".open i").css({
                "background-position": "-55px -53px"
            });
            itop = $('#order').offset().top;
            return false;
        }
    });

    var divHeight = $(".showHide").height()
    var ulHeight = $(".showHide ul").height()
	if(ulHeight>=divHeight){
		 
		 $(".open").show();
		 $(".showHide").css({"height":"84px","overflow":"hidden"});
	} else {
		 $(".open").hide();
		 $(".showHide").css("height","auto");
	}

    $(".innerSearch input").keyup(function() { //品牌搜索
        var brand = $(this).val();
        if (brand != "") {
            var num = $(".brandAll li").size();
            var nonshow_ = true;
            for (var i = 0; i < num; i++) {
                if ($(".brandAll li").eq(i).find("a").text().indexOf(brand) > -1) {
	                if(nonshow_){
	                	nonshow_ = false;
	                	$(".brandAll li").hide();
	                }
                    $(".brandAll li").eq(i).show();
                }

            }
        } else {
            $(".brandAll li").show();
            return false;
        }
    });
    
    
    $(".choose").hover(function() { //   显示更多选项box
        $(this).next(".box").show();
    }, function() {
        $(this).next(".box").hide();
    });
    $(".box").hover(function() { //   选项列表
        $(this).show();
    }, function() {
        $(this).hide();
    });
    
  //一周销量排行榜
    $('.board .list li').live('mouseover', function() {
        $(this).addClass('on');
        $(this).find('.listBig').show();
        $(this).find('.name_s').hide();
        $(this).siblings('li').find('.name_s').show();
        $(this).siblings('li').find('.listBig').hide();
        $(this).siblings('li').removeClass('on');
    });
    
    $('.board .tab span').bind('click', function() {
    	var ind = $(this).index();
        $(this).addClass('on');
        $(this).siblings().removeClass('on');
        $(this).parents('.board').find('.list').eq(ind).show().siblings('.list').hide();
    });

    //产品搜索导航
    itop = $('#order').offset().top;

    $(window).bind('scroll', function() {
    	var scrollTop = $(window).scrollTop();
        if (scrollTop > itop) {

            $("#order").attr('class', 'order_fixed');
            $('.order_div').css('display', 'block');
        } else {
            $("#order").attr('class', 'order');
            $('.order_div').css('display', 'none');
        }
        
        if($('.bSettlementWrap').offset()){
        	var bSettlementTop = $('.bSettlementWrap').offset().top - $(window).height() + $('.bSettlementWrap').height();
    		if(scrollTop >= bSettlementTop){
    			$('.bSettlement').css('position','absolute');
    		}else{
    			$('.bSettlement').css('position','fixed');
    		}
        }
    });
    
    
  //商品价格搜索确定按钮的显隐
    $("#order .ok").click(function(e) { //验证输入的价格区间
        var value1 = parseInt($("#order").find("input").eq(0).val());
        var value2 = parseInt($("#order").find("input").eq(1).val());
        if( isNaN(value1) && isNaN(value2) ){
        	location.reload();
        }
        
        if( value1 <0 || value2<0 ){
        	 value1=0;
        	 value2=0;
        }
        
        if( !isNaN(value2) && !isNaN(value1) && value1 > value2){        	
        	var temValue = value2;
        	value2 = value1;
        	value1 = temValue;
        }
        if( isNaN(value1)){   
        	value1 = 0;
        }
        if( isNaN(value2)){
        	value2 = 0;
        }
        
        var nowUrl =decodeURI(location.href);
        nowUrl = nowUrl.replaceAll("#v2","");
        var targetUrl = "";
        if(nowUrl.indexOf("search.htm") >= 0){
        	// 搜索页
        	var params = nowUrl.split('&');
        	var flag = false;
        	for(var i=0;i<params.length;i++){
        		if(params[i].indexOf("pr=")>=0){
        			flag = true;
        			targetUrl += "pr="+value1+"|"+value2+"&";
        		}else{
        			targetUrl += params[i]+"&";
        		}
        	}
        	if(!flag){
        		targetUrl += "pr="+value1+"|"+value2;
        	}
        }else{
        	// 列表页
        	var params = nowUrl.split('-');
        	for(var i=0;i<params.length;i++){
        		if(i==6){
        			targetUrl += value1+"|"+value2+"-";
        		}else if(i==params.length-1){
        			targetUrl += params[i];
        		}else{
        			targetUrl += params[i]+"-";
        		}
        	}
        }
        window.location.href=targetUrl;
        return;

    });
    
    $(".proListSearch li").hover(function() { //移入商品显示外层
        $(this).find('.presaleBox').css({'width':'100%','left':'0'});
        $(this).css({
            "z-index": "18"
        });
        $(this).find("div").eq(0).show();

    },
    function() {
        $(this).find('.presaleBox').css({'width':'90%','left':'5%'});
        $(this).find("div").eq(0).hide();
        $(this).css({
            "z-index": "15"
        });
    });
    
    $("body").delegate('.hotList li','mouseover',function() { //移入商品显示外层
        $(this).css({
            "z-index": "18"
        });
        $(this).find("div").eq(0).show();
    });
    $("body").delegate('.hotList li','mouseleave',function() { //移入商品显示外层
    	$(this).find("div").eq(0).hide();
        $(this).css({
            "z-index": "15"
        });
    });
    
    $(".searchBottomBtn").click(function(e) {
		$(this).parent().submit();
	});

});

/**配送地址**/
var region = {
		returnArrya : function(n, p) {
			for ( var j = 0; j < K.kind_region[n].length; j++) {
				if (K.kind_region[n][j][0] == p) {
					return K.kind_region[n][j]
				}
			}
		},
		addList : function(p, n) {
			if(p!=null && p!=undefined){
				$(".dptctdrp_list").eq(n).empty();
				for ( var j = 0; j < p.length; j++) {
					var op = "<li style='padding:0px 0px;'><a href='javascript:;' pid='"
						+ p[j][0] + "'>" + p[j][1] + "</a></li>";
					if (p[j][0] != 33 && p[j][0] != 34 && p[j][0] != 35) {
						$(".dptctdrp_list").eq(n).append(op)
					}
				}
			}
		}
	};
	
	function bind1() {
		$(".dptctdrp_list").eq(1).find("a").unbind("click");
		$(".dptctdrp_list").eq(1).find("a").bind("click", function(e) {
			outTextTerritory($(this).text(), 1, $(this).attr("pid"));
			$(".h5_dptctdrp a").eq(2).html('<em>请选择县/区</em><i></i>');
			$(".dptctdrp_list").hide();
			$(".dptctdrp_list").eq(2).show();
			$(".h5_dptctdrp a").removeClass("h5_dptdrp_on");
			$(".h5_dptctdrp a").eq(2).addClass("h5_dptdrp_on");
			region.addList(K.kind_region[$(this).attr("pid")], 2);
			bind2();
			bindH5();
		});
	}
	function bind2() {
		$(".dptctdrp_list").eq(2).find("a").unbind("click");
		$(".dptctdrp_list").eq(2).find("a").bind(
				"click",
				function(e) {
					outTextTerritory($(this).text(), 2, $(this).attr("pid"));
					$(".depit_citydrp").hide();
					$(".dOrder-city-sel").removeClass("dOrder_city_on");
					$(".h5_dptctdrp a").removeClass("h5_dptdrp_on");
					for ( var i = 0; i < $(".dOrder-city-sel b").length; i++) {
						$(".dOrder-city-sel b").eq(i).text(
								$(".h5_dptctdrp a").eq(i).text()).attr("pid",
								$(".h5_dptctdrp a").eq(i).attr("pid"));
					}
					setCookie("user_province", $(".h5_dptctdrp a").eq(0)
							.attr("pid")
							+ "_"
							+ $(".h5_dptctdrp a").eq(1).attr("pid")
							+ "_"
							+ $(".h5_dptctdrp a").eq(2).attr("pid"), 12);
					$(".ajax_deli_city").text($(".h5_dptctdrp a").eq(0).text());
					var wareId = $(".h5_dptctdrp a").eq(0).attr("pid");
//					var proId = $("#comment_goodsid").val();
//					initRespal(wareId, proId, -1);
					initRespal();
				});
	}
	function bindH5() {
		$(".h5_dptctdrp a").unbind("click");
		$(".h5_dptctdrp a").bind("click", function(e) {
			var ind = $(".h5_dptctdrp a").index($(this));
			$(".h5_dptctdrp a").removeClass("h5_dptdrp_on");
			$(this).addClass("h5_dptdrp_on");
			$(".dptctdrp_list").hide();
			$(".dptctdrp_list").eq(ind).show()
		});
	}
	function outTextTerritory(text, index, pid) {
		$(".h5_dptctdrp a").eq(index).html('<em>' + text + '</em><i></i>').attr(
				"pid", pid)
	}

	var initAdressCount = 0;
	function initAdress(){
		if(userArray[0] != ""){
			var sa1 = region.returnArrya(1, userArray[0]);
			$(".dOrder-city-sel b").eq(0).text(sa1[1]).attr("pid", sa1[0]);
			$(".h5_dptctdrp a").eq(0).html('<em>' + sa1[1] + '</em><i></i>').attr(
					"pid", sa1[0]);
			if (userArray[1] != "" && userArray[1] != undefined) {
				var sa = region.returnArrya(userArray[0], userArray[1]);
				$(".dOrder-city-sel b").eq(1).text(sa[1]).attr("pid", sa[0]);
				$(".h5_dptctdrp a").eq(1).html('<em>' + sa[1] + '</em><i></i>')
						.attr("pid", sa[0]);
				if (userArray[2] != "" && userArray[2] != undefined) {
					var sa = region.returnArrya(userArray[1], userArray[2]);
					$(".dOrder-city-sel b").eq(2).text(sa[1]).attr("pid", sa[0]);
					$(".h5_dptctdrp a").eq(2).html('<em>' + sa[1] + '</em><i></i>')
							.attr("pid", sa[0]);
				}
			}
		}else{
			initAdressCount +=1;
			if(initAdressCount<=10){
				setTimeout("initAdress()",200);
			}
		}
		if(initAdressCount >10){
			$(".dOrder-city-sel b").eq(0).text("北京").attr("pid", 2);
			$(".h5_dptctdrp a").eq(0).html('<em>北京</em><i></i>').attr("pid", 2);
			userArray[0] = 2;
		}
		// 初始化送货地址
		/*
		if (userArray[0] != "") {
			var sa1 = region.returnArrya(1, userArray[0]);
			$(".dOrder-city-sel b").eq(0).text(sa1[1]).attr("pid", sa1[0]);
			$(".h5_dptctdrp a").eq(0).html('<em>' + sa1[1] + '</em><i></i>').attr(
					"pid", sa1[0]);
			if (userArray[1] != "" && userArray[1] != undefined) {
				var sa = region.returnArrya(userArray[0], userArray[1]);
				$(".dOrder-city-sel b").eq(1).text(sa[1]).attr("pid", sa[0]);
				$(".h5_dptctdrp a").eq(1).html('<em>' + sa[1] + '</em><i></i>')
						.attr("pid", sa[0]);
				if (userArray[2] != "" && userArray[2] != undefined) {
					var sa = region.returnArrya(userArray[1], userArray[2]);
					$(".dOrder-city-sel b").eq(2).text(sa[1]).attr("pid", sa[0]);
					$(".h5_dptctdrp a").eq(2).html('<em>' + sa[1] + '</em><i></i>')
							.attr("pid", sa[0]);
				}
			}
		} else {
			$(".dOrder-city-sel b").eq(0).text("北京").attr("pid", 2);
			$(".h5_dptctdrp a").eq(0).html('<em>北京</em><i></i>').attr("pid", 2);
			userArray[0] = 2;
		}
		*/
		if (!userArray[1]) {
			$(".h5_dptctdrp a").eq(1).html('<em>请选择市</em><i></i>');
			$(".h5_dptctdrp a").eq(2).html('<em>请选择县/区</em><i></i>');
		}
	}

	$(function() {
		initAdress();

		region.addList(K.kind_region[1], 0);
		region.addList(K.kind_region[userArray[0]], 1);
		bindH5();
		$(".h5_dptctdrp a").eq(2).unbind("click");
		if (userArray[1] != undefined && userArray[1] != ""
				&& userArray[1] != "undefined") {
			region.addList(K.kind_region[userArray[0]], 1);
			bindH5();
			$(".h5_dptctdrp a").eq(2).unbind("click");
		}
		if (userArray[2] != undefined && userArray[2] != ""
				&& userArray[2] != "undefined" && userArray[1] != undefined
				&& userArray[1] != "" && userArray[1] != "undefined") {
			region.addList(K.kind_region[userArray[1]], 2);
			bindH5();
		}
		bind1();
		bind2();
		$(".dOrder-city-sel").click(function(e) {
			$(".dOrder-city-sel").addClass("dOrder_city_on");
			$(".depit_citydrp").show();
			$(".h5_dptctdrp a").removeClass("h5_dptdrp_on");
			$(".dptctdrp_list").hide();
			e.stopPropagation();
		});
		$("body").click(function(e) {
			$(".depit_citydrp").hide();
			$(".dOrder-city-sel").removeClass("dOrder_city_on");
		});
		$(".dptctdrp_list,.depit_citydrp").click(function(e) {
			e.stopPropagation();
		});
		$(".dptctdrp_list").eq(0).find("a").bind("click", function(e) {
			outTextTerritory($(this).text(), 0, $(this).attr("pid"));
			$(".h5_dptctdrp a").eq(1).html('<em>请选择市</em><i></i>');
			$(".h5_dptctdrp a").eq(2).html('<em>请选择县/区</em><i></i>');
			$(".dptctdrp_list").hide();
			$(".dptctdrp_list").eq(1).show();
			$(".h5_dptctdrp a").removeClass("h5_dptdrp_on");
			$(".h5_dptctdrp a").eq(1).addClass("h5_dptdrp_on");
			region.addList(K.kind_region[$(this).attr("pid")], 1);
			$(".h5_dptctdrp a").eq(2).unbind("click");
			bind1();
		});
	    
		if(userArray[1] ==undefined || userArray[1] =="undefined" || userArray[1] == ""){
			var ppid  = $(".dptctdrp_list").eq(1).find("a").first().attr("pid");
			var pptext = $(".dptctdrp_list").eq(1).find("a").first().text();
			outTextTerritory(pptext, 1, ppid);
			$(".h5_dptctdrp a").eq(2).html('<em>请选择县/区</em><i></i>');
			$(".dptctdrp_list").hide();
			$(".dptctdrp_list").eq(2).show();
			$(".h5_dptctdrp a").removeClass("h5_dptdrp_on");
			$(".h5_dptctdrp a").eq(2).addClass("h5_dptdrp_on");
			
			region.addList(K.kind_region[ppid], 2);
			
			
			var pppid  = $(".dptctdrp_list").eq(2).find("a").first().attr("pid");
			var ppptext = $(".dptctdrp_list").eq(2).find("a").first().text();
			outTextTerritory(ppptext, 2, pppid);
			
			$(".depit_citydrp").hide();
			$(".dOrder-city-sel").removeClass("dOrder_city_on");
			$(".h5_dptctdrp a").removeClass("h5_dptdrp_on");
			
			for ( var i = 0; i < $(".dOrder-city-sel b").length; i++) {
				$(".dOrder-city-sel b").eq(i).text(
						$(".h5_dptctdrp a").eq(i).text()).attr("pid",
						$(".h5_dptctdrp a").eq(i).attr("pid"));
			}
			
			setCookie("user_province", $(".h5_dptctdrp a").eq(0)
					.attr("pid")
					+ "_"
					+ $(".h5_dptctdrp a").eq(1).attr("pid")
					+ "_"
					+ $(".h5_dptctdrp a").eq(2).attr("pid"), 12);
			$(".ajax_deli_city").text($(".h5_dptctdrp a").eq(0).text());
	//		var wareId = $(".h5_dptctdrp a").eq(0).attr("pid");
		}
});
	
	
$(function() {
	
	//获取当前网址，如： http://localhost:8083/XXX/XXX/XXX.htm
	var proxy_url = "/httpProxyAccess.htm?t="+new Date().getTime();
	
	// 到貨通知開始
	$(".notify-popMask").css('height',$(window).height());
	$(window).resize(function(){
		$(".notify-popMask").css('height',$(window).height());
	})
	var notifyValue = null;
	
	/*到货通知失去焦点验证邮箱*/
	$(".send-int .notify-form").bind("blur",function(){
		var flag =/^([a-zA-Z0-9]+[-|\_|\_|\.]?)+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		var value = $.trim($(this).val());
		var $parents = $(this).parents(".notify-popBox");
		
		if(value == ""){
			$parents.find(".item_1 span").text("您还未填写邮件地址，请填写！");
			$parents.find(".item_1").show();
		}
		else if(!flag.test(value))
		{
			$parents.find(".item_1 span").text("您输入格式有误，请重新输入！");
			$parents.find(".item_1").show();
		}
		else{
			$parents.find(".item_1").hide();
		}
		$parents.find(".item_2").hide();
	});
	
	/**保存到货通知 */
	$("#notify-sure").bind('click',function(){
		var flag =/^([a-zA-Z0-9]+[-|\_|\_|\.]?)+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		notifyValue = $.trim($(".notify-form").val());
		if(notifyValue == ""){
			$(this).siblings(".notify-bind-box").find("#itemPro").children("span").text("您还未填写邮件地址，请填写！");
			$(this).siblings(".notify-bind-box").find("#itemPro").show();
		}
		else if(!flag.test(notifyValue))
		{
			$(this).siblings(".notify-bind-box").find("#itemPro").children("span").text("您输入格式有误，请重新输入！");
			$(this).siblings(".notify-bind-box").find("#itemPro").show();
		}
		else
		{
			var pid =  $("a[flag='on']").attr("pidflag");
			
			var email = $(".notify-form").val();
			var userID = $("#userID").val();
			var	regionID = $(".h5_dptctdrp a").eq(0).attr("pid");
			
			// 保存邮件
			jQuery.ajax({
                type:'post',
	            url:'/saveEmail.htm',
	            data:{"uid":userID,"email":email,"pid":pid,"regionid":regionID},
                dataType:'json',
                cache:false,
                async:true,
                success:function(data){
                	
		                if(data.code=="1"){
	                	// 保存成功
	     				$("#notify-popBox").hide();
	     				$("#notify-popSuc").show();
	                }else if(data.code=="2"){
	                	 //已订阅过此商品  
	                	$("#notify-popBox").show();
	                	$("#notify-popBox").find(".item_2").show();
	                }else if(data.code=="3"){
	                	//参数错误
	                	alert("输入参数有误！");
	                }else{
	                	// 保存失败
	                	$("#notify-popBox").hide();
	                	$("#notify-popFai").show();
	                }
                	
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){}
            })
            
		}
	})
	
	/*弹出编辑框  关闭按钮*/
	$(".notify-pop-close").bind("click",function(){
		var $parents=$(this).parents(".notify-popBox");
		$parents.hide();
		$(".notify-popMask").hide();
		$parents.find(".item_1").hide();
		$parents.find(".item_2").hide();
		$("a[flag='on']").attr("flag","");	//标记置空
	});
	
	/*弹出成功和失败提示  关闭按钮*/
	$("#notify-popSuc-sure,#notify-popFai-sure").bind("click",function(){
		$(this).parents(".notify-popBox").hide();
		$(".notify-popMask").hide();	
		$("a[flag='on']").attr("flag","");	//标记置空
	});

	
	
	//获取当前网址，如： http://localhost:8083/XXX/XXX/XXX.htm
    var wwwPath=window.document.location.href;
    //获取主机地址之后的目录，如： xxx/xxx/xxx.htm
    var pathName=window.document.location.pathname;
    var pos=wwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var hostPaht=wwwPath.substring(0,pos);
	$("a[name='_buyover']").click(function(){
		$(this).attr("flag","on");
		jQuery.ajax({
            type:'post',
            url:'getSubscriptionEmail.htm',
            dataType:'json',
            cache:false,
            async:true,
            success:function(data){
                if(data.code=="1"){//未登录
                    window.location.href=domain_passprot+"/login.htm?from="+wwwPath;
                }else{
                	notifyValue = data.email;
                	$("#notify-popBox").show();
                	$(".notify-popMask").show();
                	$(".notify-form").val(notifyValue);
                	$("#userID").val(data.userId);
                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){}
        });
	
	});
	// 到貨通知结束
	
	/*猜你喜欢切换*/
	var currentPage_1 = 0;
	$(".recommenBox .recRefresh").bind('click',function(e) {
		recommNextPage($(this));
    });
	
	function recommNextPage(_this){

		var $bigUl = _this.parents('.recommenBox').find('ul');
		var $li = $bigUl.find("li");
		var pages = Math.ceil($li.length/5);
		var pageWidth = $li.width()*5;
        currentPage_1++;

		if(currentPage_1 <= pages-1 ){
			$bigUl.css({"marginLeft": (-currentPage_1 * pageWidth) + "px"}); 
		}else if(currentPage_1 > pages-1){
			currentPage_1=0;
			$bigUl.css({"marginLeft": "0px"});
			return false;
		}
	}
	
});


