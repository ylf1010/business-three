var liNum = 0,
marginLeft = 17,
currentPage = 0,
isAnimate = null;
CouponSearchPcJs = {

    getCouponInfo: function (_couponId) {
        // .coupInfo
        var coupon_search_url = '/coupon/getCouponSummary.htm';
        $.ajax({
            type: "GET",
            url: coupon_search_url,
            data: {
                couponId: _couponId
            },
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.status == 1) {
                    if (result.data != null) {
                        $(".topCoupon").show();
                        $("#couponPrice").html(result.data.couponPrice);
                        $("#couponName").html(result.data.name);
                        if (result.data.qualificationPrice) {
                            $("#qualificationPrice").html("满减券");
                            $("#instructions").html("满" + result.data.qualificationPrice + "元可用");
                        } else {
                            $("#qualificationPrice").html("直减券").css('margin-top','28px');
                            $("#instructions").html("");
                        }
                        if (result.data.validDateDay != null) {
                            if(result.data.validDateDay===1){
                                $("#expirytime").html("领取后当天有效")
                            }else {
                                $("#expirytime").html("领取后"+result.data.validDateDay+"天有效");
                            }
                        }
                        if (result.data.validDateEnd != null && result.data.validDateStart != null) {
                            var today = new Date();
                            if(result.data.validDateEnd<today.getTime()){
                                $(".topCoupon").hide();
                                $(".breadcrumb").hide();
                                $(".order").hide();
                                return
                            }
                            var dateStart = new Date(result.data.validDateStart)
                            var dateEnd = new Date(result.data.validDateEnd)
                            Y = dateStart.getFullYear() + '-';
                            M = (dateStart.getMonth() + 1 < 10 ? '0' + (dateStart.getMonth() + 1) : dateStart.getMonth() + 1) + '-';
                            D = dateStart.getDate() + ' ';
                            Y2 = dateEnd.getFullYear() + '-';
                            M2 = (dateEnd.getMonth() + 1 < 10 ? '0' + (dateEnd.getMonth() + 1) : dateEnd.getMonth() + 1) + '-';
                            D2 = dateEnd.getDate() + ' ';
                            $("#expirytime").html("使用期限:" + Y + M + D + "至" + Y2 + M2 + D2);
                        }
                    } else {
                        $(".topCoupon").hide();
                        $(".breadcrumb").hide();
                        $(".order").hide();
                        return
                    }

                }



            }, error: function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            }

        });
    },
    getCartInfoByCouponId: function (_couponId) {
        // .bSettlement
        if (!_couponId) {
            _couponId = window.jxsearch._couponId;
        }
        var t1=new Date().getTime();
        $.ajax({
            type: "GET",
            url: '/cart/getCouponSatisfaction.htm',
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {
                couponId: _couponId,
                t:t1
            },
            dataType: "json",
            success: function (result) {
                var status = result['status'];
                var data = result['data'];
                if (status === 1) {
                    $("#producList").children("li").remove();
                    $("#cartAmount").html(data.cartPrice.toFixed(2));
                    if (data.cartProducts === null || data.cartProducts.length === 0) {
                        $(".selectedProd").css("display","none");
                        $("#cartTip").html("还未选购商品");
                        $("#arrow").css("display","none");
                        $("#selectCount").html("");
                    } else {
                        $("#arrow").css("display","inline-block");
                        var procount = 0;
                        for (var i = 0; i < data.cartProducts.length; i++) {
                            var imgSrc = data.cartProducts[i].imgUrl;
                            var productId=data.cartProducts[i].productId
                            var producName = data.cartProducts[i].name;
                            var productPrice = data.cartProducts[i].price;
                            var productNum = data.cartProducts[i].num;
                            procount += productNum;
                            $("#producList").append(
                                '<li><a href='+window.jxdomain.detail+'/goods-'+productId+'.html target="_blank"> ' +
                                '<div class="pic"><img src="' + imgSrc + '" width="60" height="60" /></div>' +
                                '<div class="info">' +
                                '<p class="name">' + producName + '</p>' +
                                ' <p class="priNum" style="padding-top: 20px"><span>￥' + productPrice + '</span><em>x' + productNum + '</em></p>' +
                                '</div>' +
                                '</a></li>');
                        }
                        $("#selectCount").html("已选择"+procount+"件商品");
                        couponSlider(data.cartProducts.length);
                        if (!data.qualificationPrice || data.qualificationPrice <= data.cartPrice) {
                            $("#cartTip").html("已满足使用条件，下单用券立省<span>" + (data.couponPrice < data.cartPrice ? data.couponPrice : data.cartPrice) + "元</span>");
                        } else {
                            $("#cartTip").html("再购<span>¥ " + (data.qualificationPrice - data.cartPrice).toFixed(2) + "元</span>即可使用");
                        }
                    }
                } else {
                    // $("#cartInfo").hide();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });

    }

}
$(function(){
    $('.prodNext').bind("click",function(){
        if(!isAnimate)
        {
            if(currentPage < (liNum-4)){
                currentPage++;
                if(currentPage > 0) $('.prodPrev').show();
                if(currentPage >= (liNum-4)) $('.prodNext').hide();
            }else{
                return false;
            }
            marginLeft = 231*currentPage+17;
            $('#producList').stop().animate({"marginLeft":-marginLeft+"px"},500);
        }else
        {
            return false;
        }
    });
    /*下一张事件*/

    /*上一张事件*/
    $('.prodPrev').bind("click",function(){
        if(!isAnimate)
        {
            if(currentPage > 0){
                currentPage--;
                if(currentPage < (liNum-4)) $('.prodNext').show();
                if(currentPage <= 0) $('.prodPrev').hide();
            }else{
                return false;
            }
            marginLeft = 231*currentPage+17;
            $('#producList').stop().animate({"marginLeft":-marginLeft+"px"},500);
        }else
        {
            return false;
        }
    });
})
