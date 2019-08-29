var toCartCallBack = function(data) {
    var cartNum = data.goods_count;
    $("#alt_num").html(cartNum);
    if (cartNum > 999) {
        $(".jx_car_num").text("999+")
    } else {
        $(".jx_car_num").text(cartNum)
    }
    alert("加入购物车成功。");
};


//$(function() {
//	
//	// 用户中心猜你喜欢加入购物车的方法
//	$(".uc_guess_addToCart").live("click",function(e) {
//        var num = 1;
//        var goodsId = $(this).attr("proId");
//        var goodsName = $(this).attr("proName");
//
//        var fromId = $("#fromUrlId").val();
//        addSkuToCartWithSrc(goodsId, num, "", fromId, toCartCallBack)
//
//    });
//	
//})