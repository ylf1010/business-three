

/**
 * 推荐组合添加购物车
 */
function groupToCart(){
	__ozfaj2("detail_goumaitaozhuang");
	var groupIds = goodsId;
	var fromIds = "6849";
	var prices = _nowPriceStr;
	$("input[name=group]").each(function() {
		if($(this).prop("checked")) {
			 groupIds += "," + $(this).parents(".m-price").attr("goodsid");
			 var url = $(this).parents(".m-price").siblings(".m-name").find("a").attr("href");
			 fromIds += "," + getFromId(url);
			 prices += ","+ $(this).siblings("span:eq(1)").text();
		}
	});

	toCartDetail(1, groupIds, 1, 0, fromIds, null,prices);

}


function toCartDetail(type, goodsId, num, rec_type, fromIds, local, price) {
	if (!num || num == 0) {
		num = $("#_nub").val();
	}
	var isorderbuypro = $("#_isorderbuypro").val();
	var fromId = goodsfrom.getGoodsFromId(goodsId);
	var href = window.location.href;
	var src = getSrc();
	if (src != '') {
		fromId = src;
	}
	if (fromIds != '' && fromIds != '0' && fromIds != null) {
		fromId = fromIds;
	}
	addCartForDetail(type, goodsId, num, '', fromId, local, price);

	setTimeout(function() {
		$(".popMask").hide();
		$("#u-buy-layId").hide();
		$("#u-buy-layId2").hide();
		$('.depict-order,.buyNub-buy').css('z-index', '2');
		return false;
	}, 5000);

}

//添加购物车
function addCartForDetail(type, goods, count, pack, src, local, price) {

	// 5 代表清仓页面过来的，5-代表清仓页面下的每一个坑位
	if (src != null && (src == '5' || (src + '').indexOf("5-") > -1)) {
		pack = "QC";
		if ((src + '').indexOf("5-") > -1) {
			try {
				src = (src + '').split("-")[1];
			} catch (e) {
			}
		}
	}

	$("#u-buy-layId .u-buy-no").css({
		"display" : "none"
	});
	$("#u-buy-layId .u-buy-ok").css({
		"display" : "block"
	});
	$("#u-buy-layId .u-buy-g").css({
		"display" : "inline-block"
	});

	var cart_detail_url = '/cart/addToCart.htm';
	$.ajax({
		type : "POST",
		url : cart_detail_url,
		data : {
			goods : goods,
			count : count
		},
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		dataType : "json",
		success : function(data) {

			// 添加成功
			if (data.status == 1) {
				/*if (data.cart_key) {
					setCookie("cart", data.cart_key, 7);
				}
				if (data.goods_count) {
					setCookie("cart_goods_count", data.goods_count, 7);
				}*/
				if (type == 1) {
					$("#u-buy-layId").fadeIn(100);
				}
				try {
					window._JX_INFO = window._JX_INFO || [];
					var userId = getUserId();
					var jsonarray = [];
					var ids = goods.split(",");
					var priceArray = price.split(",");
					for (var i = 0; i < ids.length; i++) {
						var jsonData = {
							"item" : "",
							"price" : "",
							"quantity" : ""
						};
						jsonData.item = ids[i];
						jsonData.price = priceArray[i];
						jsonData.quantity = count;
						jsonarray.push(jsonData);
					}
					_JX_INFO.push([ "addCartItem", jsonarray ]);
					_JX_INFO.push([ "userId", userId ]);
					_JX_INFO.push([ "go" ]);

                    var cartGoodsCount = getCookie('cart_goods_count');
                    var cartCount = Number(cartGoodsCount) + Number(count);
					setCookie('cart_goods_count',cartCount,7)
                    $('.qty.jx_car_num').text(cartCount);

				} catch (e) {

				}
			} else if (data.status == 2) {
				//购物车已满
                $("#u-buy-layId .u-buy-fail").css({
                    "display" : "block"
                });
                $("#u-buy-layId .u-buy-ok,#u-buy-layId .u-buy-g").css({
                    "display" : "none"
                });
                $("#u-buy-layId .u-buy-no span").html("购物车商品种类已达上限，快去结算吧~");
                $("#u-buy-layId").show();
                iscartfull = 0;
                return;
			} else  {
				//购物车已满
				$("#u-buy-layId .u-buy-no span").html(data.stack);
				$("#u-buy-layId .u-buy-ok").css({
					"display" : "none"
				});
				$("#u-buy-layId .u-buy-no").css({
					"display" : "block"
				});
			}
			$(".popMask").show();
			$("#u-buy-layId").show();

		}

	});

}

// 绑定加入购物车事件
$(function(e) {

	// 加入购物车
	$("#addToCartForDetail,#inCartForDetail").bind('click', function() {
            if ($("#addToCartForDetail").hasClass("buyBtn-not")) {
                return;
            }
            if ("到货通知" == $("#addToCartForDetail").text()) {

                jQuery.ajax({
                    type: 'get',
                    url: '/pro/getsubscriptionemail.htm',
                    dataType: 'json',
                    cache: false,
                    async: true,
                    success: function (data) {
                        // 未登录
                        if (data.code == "1") {
                            window.location.href = window.jxdomain.login
                                + "/login.htm?from=" + window.jxdomain.detail
                                + "/goods-" + goodsId + ".html";
                        } else {
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
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                    }
                });

            } else if ("加入购物车" == $("#addToCartForDetail").text()) {
                // 添加购物车
                toCartDetail(1, goodsId, 0, 0, 0, null, _nowPriceStr.toString());
            } else if ("请到APP购买" == $("#addToCartForDetail").text()) {
            	//人脸识别到APP购买
                $('.popMask').show();
                $('.appToast').show();
            }
        }
	);
});

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
        + ";path=/;domain=jiuxian.com"
}
