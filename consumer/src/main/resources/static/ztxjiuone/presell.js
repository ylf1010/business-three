
/**
 * 查询是否预售商品
 */
function presellProduct() {
    // 获取预售信息
    $.ajax({
        type: "GET",
        url: '/pro/presellProduct.htm?t=' + getCurDate(),
        data: {
            'productId': goodsId
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if(data.presellProduct != undefined){
                setPresellInfo(data);
            }else{
                //刷新促销信息
                setProAct();
            }
        }
    });
}

/**
 * 设置预售商品
 */
function setPresellInfo(data) {
    var presellProduct = data.presellProduct;

    // 隐藏套装
    $('.setWrap').hide();
    // 隐藏原价格区域
    $('#price_and_promo').hide();
    // 隐藏商品销量
    $('.comSales').hide();
    $('#inCartForDetail').hide();

    // 显示预售说明
    $('#presaleDescriptionId').show();

    // 显示预售活动提示区域
    $('#presell_activity_title').show();
    // 显示预售销售
    var totalSales = presellProduct.totalSales;
    if(totalSales>0){
        $('#presell_total_sales').text(totalSales+'件已预定');
    }else{
        $('#presell_total_sales').hide();
    }

    // 预售活动广告语
    if(presellProduct.slogan){
        $(".comName").append("<p>"+presellProduct.slogan+"</p>");
    }

    // 预售活动价格
    $('#detail_presell_price').show();
    var presellFirstPrice = presellProduct.presellFirstPrice;
    var presellFirstDeduction =  presellProduct.presellFirstDeduction;
    $('#presell_first_price').text(presellFirstPrice);
    if(presellFirstDeduction == presellFirstPrice){
        $('#presell_first_deduction').hide();
    }
    $('#presell_first_deduction').text('定金可抵'+presellFirstDeduction);
    $('#presell_price').text(presellProduct.presellPrice);

    // 预售活动时间/预计发货时间
    $('#first_start_time').text(presellProduct.firstStartTime+' -');
    $('#first_end_time').text('- '+presellProduct.firstEndTime);
    $('#tail_start_time').text(presellProduct.tailStartTime+' -');
    $('#tail_end_time').text('- '+presellProduct.tailEndTime);
    $('#plan_delivery_time').text(presellProduct.planDeliveryTime);
    var deliveryDate = presellProduct.deliveryDate;
    $("#presell_delivery_date_em").text(deliveryDate);
    $("#presell_delivery_date").show();

    // 预售商品不支持退款提示
    var tilHtml = '<div class="infoItems promptBox"><div class="infoTit">提　示</div><div class="infoCon infoPrompt"><ul class="clearfix"></ul></div></div>';
    $(".infoWrap.comChooseBay").find(".infoItems:last").after(tilHtml);
    jQuery(".infoCon.infoPrompt").find("ul").append('<li class="presaleProm"><i></i><span>预售定金不支持退款</span></li>');
    jQuery(".infoCon.infoPrompt").find("ul").append('<li class="noCOD"><i class="dIcon"></i><span>此商品不支持货到付款</span></li>');
    jQuery(".infoCon.infoPrompt").find("ul").append('<li class="noCoupons"><i class="dIcon"></i><span>此商品不能使用优惠券</span></li>');

    // 预售商品页按钮
    var sales = presellProduct.sales;
    var totalLimit = presellProduct.totalLimit;
    if(sales >= totalLimit){
        $("#btnDetail").html("<a class='buyBtn buyBtn-not' href='javascript:;' id='toOrder_presell'>已抢光</a>");
    }else{
        $("#btnDetail").html("<a class='buyBtn buyBtn-cart' onclick='presellProduct2Order()' href='javascript:;' id='toOrder_presell'>支付定金</a>");
    }

    // 显示预售规则
    $('#yushouguize_title').show();
    var activityDeclareList = presellProduct.activityDeclareList;
    if(activityDeclareList && activityDeclareList.length>0){
        var vhtml = '';
        activityDeclareList.forEach(function(i,m){
            vhtml += '<div class="presaleRuleItem"><i></i><span>'+i+'</span></div>';
        });
        $('#presell_activity_declare').html(vhtml);
    }

    // 剩余时间 秒
    var surplusSecond = presellProduct.surplusSecond;
    $('#presell_surplus_time').attr('time', surplusSecond);
    // 预售商品倒计时
    changeTimeYS();


    var isOnSale = data.isOnSale;
    var goldCoinNumber = data.goldCoinNumber;
    // 下架商品不显示价格
    if (isOnSale != 1) {
        $("#detail_presell_price").hide();
    }
    // 金币
    jQuery(".comGold em").text(goldCoinNumber);

    // 手提袋提示
    handbag();

    // var isCollect = data.isCollect;
    // var isJxSelf = data.isJxSelf;
    // var perLimit = presellProduct.perLimit;
    // $('#presell_per_limit').text('每人每天限购'+presellProduct.perLimit);

}

function presellProduct2Order(){
    var goods_number = $('#_nub').val();
    var goods_id = goodsId;

    // 跳转到订单确认页
    window.location.href = window.jxdomain.order + '/order/confirm.htm?buyNum='+goods_number+'&goodsId='+goods_id;
}

//倒计时
function changeTimeYS() {
    //重复调用的时候需要先停止原来的倒计时
    ysTimeId = setInterval(function () {
        $(".yushouTime").each(function () {
            var time = parseInt($(this).attr("time"));
            //秒杀需要特殊处理，其他促销倒计时逻辑显示不变
            time--;
            if(time <= 0){
                window.location.reload();
            }
            $(this).attr("time", time);
            var handerResult = handerTimeYS(time);
            var d = handerResult["d"];
            var htmlD = $(this).find(".days");
            if(d>0){
                htmlD.text(d);
            }else{
                htmlD.hide();
                $(this).find("#days").hide();
            }
            $(this).find(".hours").text(handerResult["h"]);
            $(this).find(".minus").text(handerResult["m"]);
            $(this).find(".seconds").text(handerResult["s"]);
        });
    }, 1000);
}

function handerTimeYS(time) {
    var d = parseInt(time / (24*3600));
    var h = parseInt((time % (24*3600)) / 3600);
    h = h < 10 ? '0' + h : h;
    var m = parseInt((time % 3600) / 60);
    m = m < 10 ? '0' + m : m;
    var s = parseInt(time % 60);
    s = s < 10 ? '0' + s : s;
    return {
        'd': d,
        'h': h,
        'm': m,
        's': s
    };
}





