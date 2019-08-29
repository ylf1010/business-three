// JavaScript Document
//放大镜
//选择地区方法
var region = {
	returnArrya : function(n, p) {
		for ( var j = 0; j < K.kind_region[n].length; j++) {
			if (K.kind_region[n][j][0] == p) {
				return K.kind_region[n][j]
			}
		}
	},
	addList : function(p, n) {
		$(".dptctdrp_list").eq(n).empty();
		for ( var j = 0; j < p.length; j++) {
			var op = "<li style='padding:0px 0px;'><a href='javascript:;' pid='"
					+ p[j][0] + "'>" + p[j][1] + "</a></li>";
			if (p[j][0] != 33 && p[j][0] != 34 && p[j][0] != 35) {
				$(".dptctdrp_list").eq(n).append(op)
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
				var proId = goodsId;
				initRespal(wareId, proId, -1);
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


//Name: 飞入特效
(function () {
  var lastTime = 0;
  var vendors = ['webkit', 'moz'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame =
      window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame){
    window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {
          callback(currTime + timeToCall);
        },
        timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }
  if (!window.cancelAnimationFrame){
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  }
}());
 
!function(a) {
    a.fly = function(b, c) {
        var d = {
            version: "1.0.0",
            autoPlay: !0,
            vertex_Rtop:180,
            speed: 1.0,
            start: {},
            end: {},
            onEnd: a.noop
        },
        e = this,
        f = a(b);
        e.init = function(a) {
            this.setOptions(a),
            !!this.settings.autoPlay && this.play()
        },
        e.setOptions = function(b) {
            this.settings = a.extend(!0, {},
            d, b);
            var c = this.settings,
            e = c.start,
            g = c.end;
            f.css({
                marginTop: "0px",
                marginLeft: "0px",
                position: "fixed"
            }).appendTo("body"),
            null != g.width && null != g.height && a.extend(!0, e, {
                width: f.width(),
                height: f.height()
            });
            var h = Math.min(e.top, g.top) - Math.abs(e.left - g.left) / 3;
            h < c.vertex_Rtop && (h = Math.min(c.vertex_Rtop, Math.min(e.top, g.top)));
            var i = Math.sqrt(Math.pow(e.top - g.top, 2) + Math.pow(e.left - g.left, 2)),
            j = Math.ceil(Math.min(Math.max(Math.log(i) / .05 - 75, 30), 100) / c.speed),
            k = e.top == h ? 0 : -Math.sqrt((g.top - h) / (e.top - h)),
            l = (k * e.left - g.left) / (k - 1),
            m = g.left == l ? 0 : (g.top - h) / Math.pow(g.left - l, 2);
            a.extend(!0, c, {
                count: -1,
                steps: j,
                vertex_left: l,
                vertex_top: h,
                curvature: m
            })
        },
        e.play = function() {
            this.move()
        },
        e.move = function() {
            var b = this.settings,
            c = b.start,
            d = b.count,
            e = b.steps,
            g = b.end,
            h = c.left + (g.left - c.left) * d / e,
            i = 0 == b.curvature ? c.top + (g.top - c.top) * d / e: b.curvature * Math.pow(h - b.vertex_left, 2) + b.vertex_top;
            if (null != g.width && null != g.height) {
                var j = e / 2,
                k = g.width - (g.width - c.width) * Math.cos(j > d ? 0 : (d - j) / (e - j) * Math.PI / 2),
                l = g.height - (g.height - c.height) * Math.cos(j > d ? 0 : (d - j) / (e - j) * Math.PI / 2);
                f.css({
                    width: k + "px",
                    height: l + "px",
                    "font-size": Math.min(k, l) + "px"
                })
            }
            f.css({
                left: h - a(window).scrollLeft() + "px",
                top: i - a(window).scrollTop() + "px"
            }),
            b.count++;
            var m = window.requestAnimationFrame(a.proxy(this.move, this));
            d == e && (window.cancelAnimationFrame(m), b.onEnd.apply(this))
        },
        e.destory = function() {
            f.remove()
        },
        e.init(c)
    },
    a.fn.fly = function(b) {
        return this.each(function() {
            void 0 == a(this).data("fly") && a(this).data("fly", new a.fly(this, b))
        })
    }
} (jQuery);


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
		userArray[0] = 2;
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
	if (!userArray[1]) {
		$(".h5_dptctdrp a").eq(1).html('<em>请选择市</em><i></i>');
		$(".h5_dptctdrp a").eq(2).html('<em>请选择县/区</em><i></i>');
	}
}


/**处理多买多优惠*/
function changeNum($item,buySum){

    for ( var i = 1; i <= $item.length; i++) {
        var minNum = parseInt($item.eq(0).find(".num").eq(0).attr("num"));
        var maxNum = parseInt($item.eq($item.length-1).find(".num").eq(0).attr("num"));
        var preNum = parseInt($item.eq(i-1).find(".num").eq(0).attr("num"));
        var thisNum = parseInt($item.eq(i).find(".num").eq(0).attr("num"));

        if(buySum < minNum){
            $item.removeClass("on");
            $("#nowPrice strong").html(window.initPrice);
            if(window.initClubDisCountTip){
                $(".clubDisc").find("span").text(window.initClubDisCountTip);
			}else{
                $(".clubDisc").find("span").text("");
			}
            return;
        }
        if(buySum >= maxNum){
            $item.removeClass("on");
            $item.eq($item.length-1).addClass("on");
            var choosePrice = $item.eq($item.length-1).find("p").eq(0).attr("pirce");
            var clubDiscountTip = $item.eq($item.length-1).attr("_zyclubtip");
            $("#nowPrice strong").html(choosePrice);
            if(clubDiscountTip){
                $(".clubDisc").find("span").text(clubDiscountTip);
            }
            return;
        }
        if(buySum >= preNum && buySum < thisNum){
            $item.removeClass("on");
            $item.eq(i-1).addClass("on");
            var choosePrice = $item.eq(i-1).find("p").eq(0).attr("pirce");
            var clubDiscountTip = $item.eq(i-1).attr("_zyclubtip");
            $("#nowPrice strong").html(choosePrice);
            if(clubDiscountTip){
                $(".clubDisc").find("span").text(clubDiscountTip);
            }
            return;
        }
    }
}

function gv_renum(){
	var buySum = $('#_nub').val();
	var reg=new RegExp("^[1-9][0-9]*$");
	if (!reg.test(buySum)) {
		buySum = 1;
	}
	if(buySum>99){
		buySum=1;
	}
	$("#_nub").val(buySum);

	var $item = $(".chooseNumBox .choItem");
	if ($item.length > 0) {
        changeNum($item,buySum)
	}
	
}



$(function(e){
	
	//选择商品
	$(".comChooseBay").delegate(".choItem",'click',function(e){
		$(this).addClass('on');
		$(this).siblings().removeClass('on');
		
	})
	
	$('.comChooseBay').delegate(".infoChooseNum .choItem",'click',function(e){
		$('#_nub').val($(this).find(".num").attr("num"));
		$("#nowPrice strong").text($(this).find(".pr").attr("pirce"));
        var clubDiscountTip = $(this).attr("_zyclubtip");
        if(clubDiscountTip){
            $(".clubDisc").find("span").text(clubDiscountTip);
        }
	})
	
	$('.comChooseBay').delegate(".infoChooseNum .choItem",'mouseenter',function(e){
		$(this).addClass('foc');
	});
	$('.comChooseBay').delegate(".infoChooseNum .choItem",'mouseleave',function(e){
		$(this).removeClass('foc');
	});
	
	//促销-去手机购买
	$(".introInfo").delegate('.mpCode','mouseenter',function(){
		$(this).addClass('hov');
	});
	$(".introInfo").delegate('.mpCode','mouseleave',function(){
		$(this).removeClass('hov');
	});
	
	
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
	
	// 购物数量加减
	$(".buyNum-add").bind(
			'click',
			function() {
				var buySum = $('#_nub').val();
				buySum = parseInt(buySum);
				var reg = new RegExp("^[1-9][0-9]*$");
				if (!reg.test(buySum) || buySum > 99999) {
					buySum = 1;
				} else {
					buySum++;
				}
				if (buySum >= 99) {
					buySum = 99;
				} 
				
				$("#_nub").val(buySum);
				var $item = $(".chooseNumBox .choItem");
				if ($item.length > 0) {
                    changeNum($item,buySum);
				}
			});
	$(".buyNum-reduce")
			.bind(
					'click',
					function() {
						var buySum = $('#_nub').val();
						buySum = parseInt(buySum);
						var reg = new RegExp("^[1-9][0-9]*$");
						if (!reg.test(buySum)) {
							buySum = 1;
						} else {
							buySum--;
						}

						if (buySum >= 99) {
							buySum = 99;
						} 
						if (buySum <= 1) {
							buySum = 1;
						}
						$("#_nub").val(buySum);
						var $item = $(".chooseNumBox .choItem");
						if ($item.length > 0) {
                            changeNum($item,buySum);
						}

			});
	// 收藏商品
	$(".showCollect a").bind(
			'click',
			function() {
				__ozfaj2("detail_shoucang");
				jQuery.ajax({
					type : 'post',
					url : '/pro/selectLoginSession.htm?t=' + getCurDate(),
					data : {},
					dataType : 'json',
					async : true,
					success : function(data) {
						if (data && data.code == 0 && data.loginUser) {
							$.getJSON("/pro/saveCollect.htm?t=" + getCurDate(), {
								'proId' : goodsId
							}, function(data) {
								if (data) {
									if (data.code == -1) {
										alert('收藏失败!');
										return false;
									} else if (data.code == 0) {
										alert('收藏成功!');
										ga('send', 'event', 'store', 'button',
												'goods-' + goodsId);
										return false;
									} else if (data.code == 1) {
										// alert("您还没有登录，请先登录！");
										window.location.href = domain_passprot
												+ '/login.htm';
										return false;
									} else if (data.code == 2) {
										alert("您已经收藏过此商品了！");
										return false;
									}
								}
							});
						} else {
							window.location.href = domain_passprot
									+ '/login.htm';
							return false;
						}
					}
				});

			})
	
	//加入购物车
	/*$('.buyBtn-cart').on('click', addProduct);
	function addProduct(event) {
		//var imgUrl = Img;
		var imgUrl = $('.show-list-con li').eq(0).find('img').attr('src');
		//console.log(imgUrl)
		var offset = $('.introSaf').offset(), flyer = $('<img class="cartAnimate" src="'+imgUrl+'"/>');
		flyer.fly({
			start: {
				left: event.pageX,
				top: event.pageY
			},
			end: {
				left: offset.left,
				top: offset.top,
				width: 20,
				height: 20
			},
			onEnd:function(){
				flyer.remove()
				
			}
		});
	}*/
	//关闭提示弹窗
	$('.u-buy-g,.u-buy-close').bind('click',function(){
		$('#u-buy-layId,.popMask').hide();
	});
	
	//套装TAB
	$('.setWrap').delegate('.setTab .item','click',function(e){
		var t = $(this).index();
		$(this).addClass("cur").siblings().removeClass("cur");
		$(".setCon").hide();
		$(".setCon").eq(t).show();
	});
	
	$('#suitNav a').on('click',function(){
		var index = $('#suitNav a').index($(this));
		$(this).addClass('on').siblings().removeClass('on');
		$('#suitList .vice').eq(index).show().siblings().hide();
	});
	$("#mixNav a").on('click',function(){
		var index = $('#mixNav a').index($(this));
		$(this).addClass('on').siblings().removeClass('on');
	});
	//白酒排行榜
	$(".topTenTab").find("li").bind('click',function(){
		var t = $(this).index();
		$(this).addClass("cur").siblings().removeClass("cur");
		$(".topTenList").eq(t).show().siblings().hide();
	});
	//下载客户端 鼠标移入二维码
	$(".detailCode").mouseenter(function(){
		$(this).addClass("on");
		$(".detailCode-t").show();
	});
	$(".detailCode").mouseleave(function(){
		$(this).removeClass("on");
		$(".detailCode-t").hide();
	});
	
	// 商品介绍
	var porLs, porLss;
	var fals = true;
	var answerTop = $(".d-right").offset().top + 246;
	$(".d-right .d-tab li").bind('click', function() {
		var index = $(this).index();
		$(this).addClass('on').siblings().removeClass('on');
		$('.tab-item').eq(index).show().siblings().hide();
		if (index == 0){
			__ozfaj2("detail_shangpinxiangqing");
			$('.tab-item').eq(2).show().css('margin-top','10px');
			$('.tab-item').eq(3).show().css('margin-top','20px');
		}else if (index == 1) {
			__ozfaj2("detail_guigecanshu");
			$(".tab-item").eq(index).append($(".i-box"));
			$('.tab-item').eq(2).show().css('margin-top','10px');
			$('.tab-item').eq(3).show().css('margin-top','20px');
		}else if (index == 2) {
			__ozfaj2("detail_leijipingjia");
			var plnubs = $(".d-tab li:eq(2) span").text();
			initpl(plnubs);
			$('.tab-item').eq(2).css('margin-top','0');
			$('.tab-item').eq(3).hide();
		} else if (index == 3) {
			__ozfaj2("detail_shangpinzixun");
			if(!isEvaluate){
				initzx(1,0);
				getCountConsultContent();
			}
			$('.tab-item').eq(2).hide();
			$('.tab-item').eq(3).css('margin-top','0');
		} else if (index == 4) {
			var pid =$(".d-tab li").eq(index).attr("proid");  
			if(pid != undefined){
				initHYinfo(pid);
			}
			$('.tab-item').eq(2).hide();
			$('.tab-item').eq(3).hide();
		}
		if($(this).parents().hasClass('d-header-fix')){
			$(window).scrollTop(answerTop);
		}
	});
	
	//评价晒单
	// $(".t").delegate("#_detailEvaluateContent .comment-tab li",'click',function(e){
	// 	var index = $(this).index();
	// 	$(this).addClass('on').siblings().removeClass('on');
	// 	getEvaluateContent();
	// });
	
	//咨询
	$(".t").delegate("#_detailConsultContent .comment-tab li",'click',function(e){
		var index = $(this).index();
		initzx(1,index);
		$(this).addClass('on').siblings().removeClass('on');

	});
	
	$("a[rel=bigImg]").fancybox();
	
	$("#_detailEvaluateContent").delegate(".praise","click",function(e){
		var This = $(this);
		var plid = This.parents(".u-tag").attr("plid");
		//addpldz(This,plid);
	});
	
	// 固定定位跟随条
	$(window).bind('scroll', function() {
		if ($(document).scrollTop() >= answerTop) {
			$(".d-header").addClass('d-header-fix');
		} else {
			$(".d-header").removeClass('d-header-fix');
		}

	})
	
	// 加入购物车
	$("#addToCart,.inCart").bind('click', function() {
		if($("#addToCart").hasClass("buyBtn-not")){
			return;
		}
		if("到货通知" == $("#addToCart").text()){
			jQuery.ajax({
	            type:'get',
	            url:'/pro/getsubscriptionemail.htm',
	            dataType:'json',
	            cache:false,
	            async:true,
	            success:function(data){
	                if(data.code=="1"){//未登录
	                    window.location.href=domain_passprot+"/login.htm?from="+domain_detail+"/goods-"+goodsId+".html";
	                }else{
	                	var regionText = "北京";
	                	regionText = $(".h5_dptctdrp a").eq(0).text();
	        			$(".notify-popBox .item.notify-title").find("em").text(regionText);
	                	notifyValue = data.email;
	                	$("#notify-popBox").show();
	                	$(".notify-popMask").show();
	                	$(".notify-form").val(notifyValue);
	                	$("#userID").val(data.userId);
	                }
	            },
	            error:function(XMLHttpRequest, textStatus, errorThrown){}
	        })
		}else{
			toCart(1, goodsId, 0, 0, 0, null,_nowPriceStr.toString());
			setTimeout(function() {
				$(".popMask").hide();
				$("#u-buy-layId").hide();
				$("#u-buy-layId2").hide();
				$('.depict-order,.buyNub-buy').css('z-index', '2');
				return false;
			}, 5000);
		}
		
	});
	//最佳组合
	$(".group").delegate("input[name=group]","click",function(e){
		var nowPrice = parseFloat($("#nowPrice .pri strong").text());
		var count = 0;
		//var href = "http://cart.jiuxian.com/buynow.htm?goods="+goodsId;
		$("input[name=group]").each(function(){
			 if($(this).prop("checked")) {
				 count++;
				 nowPrice = nowPrice + parseFloat($(this).siblings("span").eq(1).text());
				// href = href + "," + $(this).parents(".m-price").attr("goodsid");
			 }
		})
		$(".group .accBox p strong").text("￥"+nowPrice.toFixed(2));
		$(".group .accBox .total strong").text(count);
		//$(".setWrap .group .accBox").find("a").attr("href",href);
	})

	//新加js
	var tabListLi = $('.J-tagList li');
	tabListLi.bind('click',function(){
		var i = $(this).index();
		var index = $(this).attr('index');
		if(index == 'hide'){
			tabListLi.eq(i).addClass('clickLi').attr('index','show');
		}
		if(index == 'show'){
			tabListLi.eq(i).removeClass('clickLi').attr('index','hide');
		}
	})
});
function get_history() {
    var proIds = [];
    //获取商品当前价
    $('.price').find("p[goodId]").each(function(){
        var id=$(this).attr("goodId")
        proIds.push(id);
    });
    getProductActClubPrice(proIds.join(","), "viewpricecallbackForHistory");

}
//浏览历史 价格回调
function viewpricecallbackForHistory (data) {
    data = eval("(" + data + ")");
    //var data = data.data;
    for (var id in data) {
        var prices = data[id];
        jQuery('.price').find("p[goodId='" + id + "']").html('￥' + parseFloat(prices.promoPrice).toFixed(2));
        // if (prices.clubPrice != undefined && prices.clubPrice != null && prices.clubPrice != 'null') {
        //     jQuery('.price').find("p[goodId='" + id + "']").siblings('span').find('em').html('￥' + parseFloat(prices.clubPrice).toFixed(2));
        //     jQuery('.price').find("p[goodId='" + id + "']").siblings('span').css('display', 'inline-block');
        // }

    }
}