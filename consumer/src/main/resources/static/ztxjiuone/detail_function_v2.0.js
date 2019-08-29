var isEvaluate = false;
var isInitPl = false;
var isInitZx = false;
var isGroup = false;
function showCartButton(storeDetail,productExpressOutagePo) {
    jQuery("#buyNow").hide();
    if (storeDetail.code == 3) {
        jQuery("#addToCartForDetail").text("暂不销售");
        jQuery(".citySelect strong").text("");
        switchCartHighGray("gray");
    } else if (storeDetail.code == 2) {
        jQuery("#addToCartForDetail").text("商品下架了");
        jQuery(".citySelect strong").text("");
        switchCartHighGray("gray");
    } else if (storeDetail.code == 1) {
        jQuery("#addToCartForDetail").text("加入购物车");
        //jQuery(".citySelect strong").text("有货");
        if(productExpressOutagePo && productExpressOutagePo.text){
            jQuery(".citySelect strong").text(productExpressOutagePo.text);
        }else{
            jQuery(".citySelect strong").text("有货！");
        }
        switchCartHighGray("high");
    } else if (storeDetail.code == 6) {
        jQuery("#addToCartForDetail").text("商品不支持配送");
        if(productExpressOutagePo && productExpressOutagePo.text){
            jQuery(".citySelect strong").text(productExpressOutagePo.text);
        }else{
            jQuery(".citySelect strong").text("该地区因天气原因暂不支持配送！");
        }

        switchCartHighGray("gray");
    } else if (storeDetail.code == 5) {
        jQuery("#addToCartForDetail").text("已抢光");
        jQuery(".citySelect strong").text("无货");
        switchCartHighGray("gray");
    } else if (storeDetail.code == 4) {
        jQuery("#addToCartForDetail").text("到货通知");
        jQuery(".citySelect strong").text("无货");
        switchCartHighGray("pink");
    } else if(storeDetail.code == 8){
        jQuery("#addToCartForDetail").text("请到APP购买");
        jQuery(".citySelect strong").text("");
        switchCartHighGray("high");
    }else{
        jQuery("#addToCartForDetail").text("加入购物车");
        switchCartHighGray("high");
    }
}

function switchCartHighGray(state) {
    $("#addToCartForDetail").removeAttr("class");
    if ("high" == state) {
        $("#addToCartForDetail").attr("class", "buyBtn buyBtn-cart");
    } else if ("pink" == state) {
        $("#addToCartForDetail").attr("class", "buyBtn buyBtn-bay");
    } else {
        $("#addToCartForDetail").attr("class", "buyBtn buyBtn-not");
    }
}

function showDispatchTime(dispatchTime) {
    $(".citySelect .deliveryTime").remove();
    $(".infoCity .yunfei").remove();
    if ($.trim($(".citySelect strong").text()) == "有货" && dispatchTime != undefined && dispatchTime != "") {
        $(".citySelect strong").after('<span class="deliveryTime"><i class="dIcon"></i><em>' + dispatchTime + '</em></span>');
    }
}

function showShopDelivery(shopDeliveryInfo) {
    $(".citySelect .deliveryTime").remove();
    $(".infoCity .yunfei").remove();
    $(".depit_citydrp").after('<span class="yunfei"><i class="dIcon"></i><em>' + shopDeliveryInfo + '</em></span>');
}

function showDmdyh(morepricestr, _nowPriceStr) {
    var dmdyh = "";
    //var morepricearr = morepricestr.split(",");
    //morepricearr = morepricearr.sort();
    if (morepricestr != undefined && morepricestr.length > 0) {
        dmdyh = '<div class="infoItems chooseNumBox"><div class="infoTit" id="dmdyh_choose" date-onprice="' + _nowPriceStr + '">选　择</div><div class="infoCon infoChooseNum"><ul>';
        for (var i = 0; i < morepricestr.length; i++) {
            //var tmppricearr = morepricearr[i].split("#");
            var zyclubtip = morepricestr[i].clubDiscountTip;
            if(!zyclubtip){
                zyclubtip = "";
            }
            if ("1" == morepricestr[i].suitNubs) {
                dmdyh += '<li class="choItem on" _zyclubtip="'+ zyclubtip +'"><p class="pr" pirce="' + morepricestr[i].signlePrice + '"><em>￥</em>' + morepricestr[i].signlePrice + '/件</p><p class="num" num="' + morepricestr[i].suitNubs + '">满' + morepricestr[i].suitNubs + '件</p><i class="dIcon"></i></li>';
            } else {
                dmdyh += '<li class="choItem" _zyclubtip="'+ zyclubtip +'"><p class="pr" pirce="' + morepricestr[i].signlePrice + '"><em>￥</em>' + morepricestr[i].signlePrice + '/件</p><p class="num" num="' + morepricestr[i].suitNubs + '">满' + morepricestr[i].suitNubs + '件</p><i class="dIcon"></i></li>';
            }
        }
        dmdyh += "</ul></div></div>";
        $(".infoItems.bayNumBox").before(dmdyh);
    }
}

function handbag() {
    if (goodsSn.indexOf("tz") < 0 && cname.indexOf("酒具周边") < 0 && cname.indexOf("会员礼品") < 0) {
        if (isHandbag == 1) {
            if (handbagType == 1) {
                if (guige.indexOf("礼盒") >= 0) {
                    $(".buyPro").text("每购买1套，即赠送原厂手提袋1个").show();
                } else {
                    $(".buyPro").text("每购买1瓶，即赠送原厂手提袋1个").show();
                }
            }
            if (handbagType == 2) {
                if (guige.indexOf("礼盒") >= 0) {
                    $(".buyPro").text("每购买2套，即赠送原厂手提袋1个").show();
                } else {
                    $(".buyPro").text("每购买2瓶，即赠送原厂手提袋1个").show();
                }
            }

        } else if (isHandbag == 0) {
            $(".buyPro").text("此商品无原厂手提袋 ").show();
        }
    }
}


function getCurDate() {
    return new Date().getTime().toString();
}

//添加商品至浏览历史 
function viewhis(gid) {
    var cookieValue = getCookie("viewhis");
    var viewhis;
    if (cookieValue == "" || cookieValue == "undefined") {
        viewhis = new Array();
        var good = new Object();
        good.id = gid;
        good.k = 0;
        viewhis[0] = good;
    } else {
        viewhis = stringToJSON(cookieValue);
        var index = viewhis.length;
        var i;
        for (i = 0; i < index; i++) {
            var good = viewhis[i];
            if (good.id == gid) {
                break;
            }
        }
        if (i == index) {
            var good = new Object();
            good.id = gid;
            viewhis[index] = good;
        }
    }
    if (i > 5) {
        viewhis = delArray(viewhis, 0);
    }
    setCookie("viewhis", jsonToString(viewhis), 12);
}
var stringToJSON = function (obj) {
    return eval('(' + obj + ')');
};
//删除数组元素方法   
function delArray(array, index) {
    if (index < 0)
        return array;
    else
        return array.slice(0, index).concat(array.slice(index + 1, array.length));
}


function initRespal(wareId, proId, proNum0) {
    jQuery.ajax({
        type: 'GET',
        url: '/pro/selectRespSals.htm?t=' + getCurDate(),
        data: {'proId': proId, 'resId': wareId, 'proNum0': proNum0},
        dataType: 'json',
        cache: false,
        async: true,
        success: function (data, textStatus) {

            $("#xjzq_tip_jump").hide();
            if (data.data) {
                if(data.data.jumpProId){
                    var jumpProId = data.data.jumpProId;
                    if(jumpProId != undefined && jumpProId != null && jumpProId != ''){
                        window.location = window.jxdomain.detail+ "/goods-" +jumpProId + ".html";
                    }
                }  //
                if(data.data.zqInfoBo && data.data.zqInfoBo.zqLink){
                    var jumpLink = data.data.zqInfoBo.zqLink;
                    $("#xjzq_tip_jump").show();
                    $("#xjzq_tip_jump_link").attr("href",jumpLink);

                }
            }


            var shopDeliveryInfo = data.data.shopDeliveryFeeInfo;
            showCartButton(data.data.storeDetail,data.data.productExpressOutagePo);
            if (shopType == "2" && shopDeliveryInfo != "" && shopDeliveryInfo != undefined) {
                showShopDelivery(shopDeliveryInfo);
            } else if (shopType == "1") {
                showDispatchTime(data.data.arriveTime);
            }
            try { //调整页头页尾的搜索列表页area参数,以及详情页面包屑
                changeUrlForDetail();
            } catch (e) {
            }
        }
    });
}

/**
 * 优惠套装
 */
function inittz(proids, goodsId, packageprice, actId) {
    jQuery(".setConWrap .tz").load('/pro/selecttz.htm?goodsId=' + goodsId + '&proids=' + proids + '&packageprice=' + packageprice + '&actId=' + actId + '&t=' + getCurDate(),
        {},
        function () {
            if ($(".setTab").find("div").length > 0) {
                $(".setWrap .setTab").empty().append('<div class="item cur"><span>优惠套装</span></div><div class="item"><span>推荐组合</span></div>');
            } else {
                $(".setWrap .setTab").empty().append('<div class="item cur"><span>优惠套装</span></div>');
            }
            var listWid = parseInt(proids.split(",").length) * 200;
            $('.vice:first').find('ul').css('width', listWid + 'px');
        }
    ).show();
    //展示优惠套装，隐藏推荐组合
    $(".setConWrap .group .setCon").hide();
}


function initpl(plnubs) {
    if (0 == plnubs) {
        jQuery('#_nopl').show();
    } else {
        if (!isEvaluate) {
            isEvaluate = true;
            getEvaluateContent(1);
        }

    }
}

//滚动加载评论咨询
var contHig = $('.d-right').height();
$(window).bind("scroll", function () {
    var scrollTopHeight = $(window).scrollTop();
    if (scrollTopHeight > 768) {
        if (!isEvaluate) {
            isEvaluate = true;
            getEvaluateContent(1);
            initzx(1, 0);
            if ($(".d-tab li.on").index() == "0") {
                $('.tab-item').eq(2).show();
                $('.tab-item').eq(3).show();
            }
        }
    }
});


//评论加载
function getEvaluateContent(pageNum) {

    console.log(" eva ... ");

    var onlyImg = false;
    var onIndex = $('#_detailEvaluateContent .commentHeader').find("li.on").index();
    if (onIndex == "1") {
        onlyImg = true;
    }
    jQuery.ajax({
        type: 'GET',
        url: '/pro/listProductEvaluate.htm',
        data: {"id": goodsId,
            "pageNum": pageNum,
            "onlyImg": onlyImg},
        success: function (data, textStatus) {
            $("#_detailEvaluateContent").html(data)
        }
    });

}

function initzx(pageNum, type) {
    getConsultContent(pageNum, type);
    getCountConsultContent();
}

function getConsultContent(pageNum, type) {
    jQuery.ajax({
        type: "GET",
        url: "/pro/selectProConsult.htm?t=" + getCurDate(),
        data: {
            "proId": goodsId,
            "type": type,
            "pageNum": pageNum
        },
        dataType: "html",
        async: false,
        success: function (data) {
            $("#_detailConsultContent").html(data);
        }
    });
}

function getCountConsultContent() {
    jQuery.ajax({
        type: "GET",
        url: "/pro/selectCountProConsult.htm?t=" + getCurDate(),
        data: {"proId": goodsId},
        dataType: "json",
        async: false,
        success: function (data) {
            if (data && data.code == 0 && data.countmap) {
                $("#_zx1").text(data.countmap['a1']);
                $("#_zx2").text(data.countmap['a2']);
                $("#_zx3").text(data.countmap['a3']);
                $("#_zx4").text(data.countmap['a4']);
            } else {
                $("#_zx1").text(0);
                $("#_zx2").text(0);
                $("#_zx3").text(0);
                $("#_zx4").text(0);
            }
        }
    });
}

//防伪加载
function initHYinfo(proId) {
    $("#antifakeinfo").load(
        "/pro/antifakeInfo-" + proId + ".htm",
        {
            "origin": "1"
        },
        function () {
        }).show();

}

function setPage(pageNo, pageSize, totalPages, totalResults, type) {
    var pageNo = parseInt(pageNo);
    var pageSize = parseInt(pageSize);
    var totalPages = parseInt(totalPages);
    var totalResults = parseInt(totalResults);
    var page = '<div class="u-evaluate-page">';
    if (totalPages == 1) {
        page += '<a class="prve" href="javascript:void(0);" title="上一页">上一页</a>'
            + '<a class="current" >1</a>'
            + '<a class="next" href="javascript:void(0);" title="下一页">下一页</a>';
    }
    var totle = 5;
    if (totalPages > 1) {
        if (pageNo > 1) {
            page += '<a class="prve" href="javascript:void(0);" title="上一页" onclick="sub(' + (pageNo - 1) + ',' + type + ',$(this));">上一页</a>';
        } else if (pageNo == 1) {
            page += '<a class="prve" href="javascript:void(0);" title="上一页">上一页</a>';
        }

        var content = '';
        var left = '';
        var leftlength = 0;
        var right = '';
        var rightlength = 0;
        var midle = '';
        for (var i = pageNo - Math.floor(totle / 2); i < pageNo; i++) {
            if (i > 0) {
                left += '<a href="javascript:void(0);" onclick="sub(' + i + ',' + type + ',$(this));">' + i + '</a>';
                leftlength++;
            }
        }
        midle = '<a class="current" >' + pageNo + '</a>';
        for (var i = pageNo + 1; i <= pageNo + Math.floor(totle / 2); i++) {
            if (i <= totalPages) {
                right += '<a href="javascript:void(0);" onclick="sub(' + i + ',' + type + ',$(this));"  >' + i + '</a>';
                rightlength++;
            }
        }

        if (leftlength + rightlength < totle - 1) {
            if (pageNo - leftlength - 1 > 0 || pageNo + rightlength < totalPages) {
                while (leftlength + rightlength < totle - 1) {
                    if (pageNo - leftlength - 1 > 0) {
                        leftlength++;
                        left = '<a href="javascript:void(0);"  onclick="sub(' + (pageNo - leftlength) + ',' + type + ',$(this));"   >' + (pageNo - leftlength) + '</a>' + left;
                    } else if (pageNo + rightlength < totalPages) {
                        rightlength++;
                        right += '<a href="javascript:void(0);" onclick="sub(' + (pageNo + rightlength) + ',' + type + ',$(this));"     >' + (pageNo + rightlength) + '</a>';
                    } else break;
                }
            }
        }
        content = left + midle + right;

        if (pageNo - leftlength - 1 > 1) {
            page += '<a href="javascript:void(0);" onclick="sub(1,' + type + ',$(this));">1</a><span>...</span>';
        }
        else if (pageNo - leftlength - 1 == 1) {
            page += '<a href="javascript:void(0);" onclick="sub(1,' + type + ',$(this));">1</a>';
        }
        page += content;

        if (pageNo + rightlength < totalPages - 1) {
            page += '<span>...</span><a href="javascript:void(0);" onclick="sub(' + totalPages + ',' + type + ',$(this));">' + totalPages + '</a>';
        }
        else if (pageNo + rightlength == totalPages - 1) {
            page += '<a href="javascript:void(0);" onclick="sub(' + totalPages + ',' + type + ',$(this));">' + totalPages + '</a>';
        }

        if (pageNo < totalPages) {
            page += '<a class="next" href="javascript:void(0);" title="下一页" onclick="sub(' + (pageNo + 1) + ',' + type + ',$(this));">下一页</a>';
        }
        else if (pageNo == totalPages) {
            page += '<a class="next" href="javascript:void(0);" title="下一页">下一页</a>';
        }
    }
    page += '</div>';
    return page;
}

/**
 * 分页
 */

function sub(pageNum, type, oThis) {
    var parent = oThis.parents();
    var scrollTop = oThis.parents('.tab-item').offset().top - 48;
    if (type == -1) {
        getEvaluateContent(pageNum);
    } else if (type == -2) {
        var uri = window.location.href;
        var pageNumIndex = uri.indexOf("&pageNum=");
        if (pageNumIndex > 0) {
            uri = uri.substring(0, pageNumIndex);
        }
        location = uri + "&pageNum=" + pageNum;
    } else {
        initzx(pageNum, type)
    }
    $(window).scrollTop(scrollTop);

}

/*百分点数据回传*/


$(function () {
    //取消
    $(".pop-wrap .alertCancel, .pop-wrap .alertClose").click(function () {
        $(".pop-wrap,.pop-modal").hide();
    });


    //继续下单
    $(".pop-wrap .alertSure").click(function () {
        $(".pop-wrap,.pop-modal").hide();
        setCookie("knowStopDelivery", "true", 1);
    });

    // 到貨通知開始
    $(".notify-popMask").css('height', $(window).height());
    $(window).resize(function () {
        $(".notify-popMask").css('height', $(window).height());
    })
    var notifyValue = null;

    /*到货通知失去焦点验证邮箱*/
    $(".send-int .notify-form").bind("blur", function () {
        var flag = /^([a-zA-Z0-9]+[-|\_|\_|\.]?)+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        var value = $.trim($(this).val());
        var $parents = $(this).parents(".notify-popBox");

        if (value == "") {
            $parents.find(".item_1 span").text("您还未填写邮件地址，请填写！");
            $parents.find(".item_1").show();
        }
        else if (!flag.test(value)) {
            $parents.find(".item_1 span").text("您输入格式有误，请重新输入！");
            $parents.find(".item_1").show();
        }
        else {
            $parents.find(".item_1").hide();
        }
        $parents.find(".item_2").hide();
    });

    /**保存到货通知 */
    $("#notify-sure").bind('click', function () {
        var flag = /^([a-zA-Z0-9]+[-|\_|\_|\.]?)+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        notifyValue = $.trim($(".notify-form").val());
        if (notifyValue == "") {
            $(this).siblings(".notify-bind-box").find("#itemPro").children("span").text("您还未填写邮件地址，请填写！");
            $(this).siblings(".notify-bind-box").find("#itemPro").show();
        }
        else if (!flag.test(notifyValue)) {
            $(this).siblings(".notify-bind-box").find("#itemPro").children("span").text("您输入格式有误，请重新输入！");
            $(this).siblings(".notify-bind-box").find("#itemPro").show();
        }
        else {
            var pid = goodsId;
            var email = $(".notify-form").val();
            var userID = $("#userID").val();
            var regionID = "2";
            regionID = $(".h5_dptctdrp a").eq(0).attr("pid");


            // 保存邮件
            jQuery.ajax({
                type: 'GET',
                url: '/pro/saveemail.htm',
                data: {'pid': pid, 'email': email, 'uid': userID, 'regionid': regionID},
                dataType: 'json',
                cache: false,
                async: true,
                success: function (data) {

                    if (data.code == "1") {
                        // 保存成功
                        $("#notify-popBox").hide();
                        $("#notify-popSuc").show();
                    } else if (data.code == "2") {
                        //已订阅过此商品
                        $("#notify-popBox").show();
                        $("#notify-popBox").find(".item_2").show();
                    } else if (data.code == "3") {
                        //参数错误
                        alert("输入参数有误！");
                    } else {
                        // 保存失败
                        $("#notify-popBox").hide();
                        $("#notify-popFai").show();
                    }

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                }
            })

        }
    })

    /*弹出编辑框  关闭按钮*/
    $(".notify-pop-close").bind("click", function () {
        var $parents = $(this).parents(".notify-popBox");
        $parents.hide();
        $(".notify-popMask").hide();
        $parents.find(".item_1").hide();
        $parents.find(".item_2").hide();

    });

    /*弹出成功和失败提示  关闭按钮*/
    $("#notify-popSuc-sure,#notify-popFai-sure").bind("click", function () {
        $(this).parents(".notify-popBox").hide();
        $(".notify-popMask").hide();
    });
    try {
        //loadRecommend("detail");
        // 查询是否预售商品
        presellProduct();
    } catch (e) {

    }
    viewhis(goodsId);
    $("#viewhis").load("/pro/getViewHisInfo.htm?t=" + getCurDate(), {},
        function () {
        });

})

function toCart(type, goodsId, num, rec_type, fromIds, local, price) {
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
    addSkuToCartWithSrcForDetail(type, goodsId, num, '', fromId, local, price);
}

function addSkuToCartWithSrcForDetail(type, goods, count, pack, src, local, price) {
    var proxy_url = "/httpProxyAccess.htm?t=" + (new Date()).getTime();
    var shop_cart_request_url = domain_cart + "/addToCart.htm";
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

    $("#u-buy-layId .u-buy-no").css({"display": "none"});
    $("#u-buy-layId .u-buy-ok").css({"display": "block"});
    $("#u-buy-layId .u-buy-g").css({"display": "inline-block"});
    jQuery.post(proxy_url, {
        target: shop_cart_request_url,
        "pack": pack,
        "count": count,
        "goods": goods,
        "src": src
    }, function (data) {
        if (data.status == 1) {
            if (data.cart_key) {
                setCookie("cart", data.cart_key, 7);
            }
            if (data.goods_count) {
                setCookie("cart_goods_count", data.goods_count, 7);
            }
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
                    var jsonData = {"item": "", "price": "", "quantity": ""};
                    jsonData.item = ids[i];
                    jsonData.price = priceArray[i];
                    jsonData.quantity = count;
                    jsonarray.push(jsonData);
                }
                _JX_INFO.push(["addCartItem", jsonarray]);
                _JX_INFO.push(["userId", userId]);
                _JX_INFO.push(["go"]);
            } catch (e) {

            }
        } else if (data.status == 2) {
            $("#u-buy-layId .u-buy-no span").html(data.stack);
            $("#u-buy-layId .u-buy-ok").css({"display": "none"});
            $("#u-buy-layId .u-buy-no").css({"display": "block"});
        } else {
            var isorderbuypros = 0;
            var iscartfull = 0; //购物车是否满标志  1：满   0：未满
            var alertstr = "";
            if (data.stack.indexOf("]") > 0) {
                isorderbuypros = 1;
                var alertstrtpm = data.stack;
                var eint = alertstrtpm.indexOf("]");
                alertstr = alertstrtpm.substring(eint + 1, alertstrtpm.length);
                if (alertstr.indexOf("快递停发") > -1) {
                    var startTime = alertstr.split(",")[0].split("-")[0];
                    var endTime = alertstr.split(",")[0].split("-")[1];
                    $(".start").html(startTime);
                    $(".end").html(endTime);
                    $(".pop-wrap,.pop-modal").show();
                    return;
                }
                alertstr = "此商品" + alertstr;
                $("#u-buy-layId .u-buy-no span").html(alertstr);
            }
            if (data.stack.indexOf("购物车已满") >= 0) {
                iscartfull = 1;
            }
            //购物车已满，弹层控制
            if (iscartfull == 1) {
                $("#u-buy-layId .u-buy-fail").css({"display": "block"});
                $("#u-buy-layId .u-buy-ok,#u-buy-layId .u-buy-g").css({"display": "none"});
                $("#u-buy-layId .u-buy-no span").html("购物车商品种类已达上限，快去结算吧~");
                $("#u-buy-layId").show();
                iscartfull = 0;
                return;
            }
            $("#u-buy-layId .u-buy-ok").css({"display": "none"});
            $("#u-buy-layId .u-buy-no").css({"display": "block"});
        }
        $(".popMask").show();
        $("#u-buy-layId").show();
    }, 'JSON');
}

function addConsultation() {
    jQuery.ajax({
            type: "GET",
            url: "/pro/selectLoginSession.htm?t=" + getCurDate(),
            data: {},
            dataType: "json",
            async: true,
            success: function (data) {
                if (data && data.code == 0 && data.loginUser) {
                    var con = jQuery.trim($("#_ComContent1").val());
                    if (con == "") {
                        alert("请输入相关内容！");
                        return false;
                    }
                    if (con == "请输入您的咨询内容...") {
                        alert("请输入您的咨询内容...");
                        return false;
                    }
                    var aa = /[//<>@]+/;
                    if (aa.test(con)) {
                        alert("包含非法字符,请重新输入！");
                        return;
                    }
                    var zxtype = $("input[name='zxRadioType']:checked ").val();
                    jQuery.ajax({
                            type: "post",
                            url: "/pro/saveConsultation.htm?t=" + getCurDate(),
                            data: {"proId": goodsId, "type": zxtype, "content": con},
                            dataType: "json",
                            contentType: "application/x-www-form-urlencoded;charset=utf-8",
                            success: function (data) {
                                if (data) {
                                    if (data.code == -1) {
                                        alert("提交失败 ! ");
                                        return false;
                                    } else if (data.code == 0) {
                                        alert("提交成功 ! ");
                                        $("#_ComContent1").val("");
                                        return false;
                                    } else if (data.code == 1) {
                                        window.location.href = domain_passprot + '/login.htm';
                                        return false;
                                    } else if (data.code == 3) {
                                        alert("您操作频繁，请稍后再试！");
                                        return false;
                                    } else if (data.code == 999) {
                                        alert("输入非法字符！");
                                        return false;
                                    }
                                }
                            }
                        }
                    );
                } else {
                    window.location.href = domain_passprot + '/login.htm';
                    return false;
                }
            }
        }
    )
}


function getSrc() {
    var url = window.location.search;
    if (url.indexOf("?") != -1) {
        var str = url.substr(1)
        strs = str.split("&");
        for (i = 0; i < strs.length; i++) {
            if (strs[i].split("=")[0] == 'src') {
                return strs[i].split("=")[1];
            }
        }
    }
    return '';
}

function getFromId(url) {
    if (url.indexOf("?") != -1) {
        var strs = url.split("?")[1];
        strs = strs.split("&");
        for (i = 0; i < strs.length; i++) {
            if (strs[i].split("=")[0] == 'src') {
                return strs[i].split("=")[1];
            }
        }
    }
    return '';
}

/** 倒计时start*/
function timeChange(time) {
    if (isNaN(time)) {
        return;
    }
    var handerResult1 = handerTime(time);
    $(".infoItems.priceBox .tim").find(".hours").text(handerResult1["h"]);
    $(".infoItems.priceBox .tim").find(".minutes").text(handerResult1["m"]);
    $(".infoItems.priceBox .tim").find(".seconds").text(handerResult1["s"]);
    $(".infoItems.priceBox .tim").show();
    setInterval(function () {
        time--;
        if (time < 0 || isNaN(time)) {
            $(".infoItems.priceBox .tim").hide();
            $(".infoItems.priceBox .tim").find("b").text("00");
            $(".infoItems.priceBox .tim").hide();
        }
        else {
            var handerResult = handerTime(time);
            $(".infoItems.priceBox .tim").find(".hours").text(handerResult["h"]);
            $(".infoItems.priceBox .tim").find(".minutes").text(handerResult["m"]);
            $(".infoItems.priceBox .tim").find(".seconds").text(handerResult["s"]);
        }
    }, 1000);
}
function handerTime(time) {
    var h = parseInt(time / 3600);
    h = h < 10 ? '0' + h : h;
    var m = parseInt((time % 3600) / 60);
    m = m < 10 ? '0' + m : m;
    var s = parseInt(time % 60);
    s = s < 10 ? '0' + s : s;
    return {
        'h': h,
        'm': m,
        's': s
    }
}
/** 倒计时end*/




