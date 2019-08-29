var region = {
		returnArrya : function(n, p) {
			for ( var j = 0; j < K.kind_region[n].length; j++) {
				if (K.kind_region[n][j][0] == p) {
					return K.kind_region[n][j]
				}
			}
		},
		addList : function(p, n,obj) {
            obj.find("ul").empty();
			if(p != undefined && typeof (p) != 'undefined'){
                for ( var j = 0; j < p.length; j++) {
                    var op = "<li><a href='javascript:;' pid='"
                        + p[j][0] + "'>" + p[j][1] + "</a></li>";
                    if (p[j][0] != 33 && p[j][0] != 34 && p[j][0] != 35) {
                        obj.find("ul").append(op)
                    }
                }
			}
		}
	};

//选择省份
function selecedProvince(obj){
    region.addList(K.kind_region[obj.attr("pid")], 1,obj.closest(".areaBox").find(".areaList").eq(1));
    outTextTerritory(obj.text(), 0, obj.attr("pid"),obj);
    var areaDetailObj = obj.closest(".areaDetail");
    areaDetailObj.find(".selectedBox .selectCity em").text("请选择市");
    areaDetailObj.find($(".selectedBox .selectCity em")).text("请选择市");
    areaDetailObj.find($(".selectedBox .selectCounty em")).text("请选择县/区");
    areaDetailObj.find($(".areaList")).hide();
    areaDetailObj.find($(".areaList.cityList")).show();
    areaDetailObj.find($(".selectedBox a")).removeClass("on");
    areaDetailObj.find($(".selectedBox a.selectCity")).addClass("on");
    areaDetailObj.find($(".selectedBox .selectProvince em")).text();
}
//选择市
function selecedCity(obj){
    region.addList(K.kind_region[obj.attr("pid")], 2,obj.closest(".areaBox").find(".areaList").eq(2));
    outTextTerritory(obj.text(), 1, obj.attr("pid"),obj);
    var areaDetailObj = obj.closest(".areaDetail");
    areaDetailObj.find(".selectedBox .selectCounty em").text("请选择县/区");
    areaDetailObj.find(".areaList").hide();
    areaDetailObj.find(".areaList.countyList").show();
    areaDetailObj.find(".selectedBox a").removeClass("on");
    areaDetailObj.find(".selectedBox a.selectCounty").addClass("on");
}
//选择区
function selecedArea(obj){
    outTextTerritory(obj.text(), 2, obj.attr("pid"),obj);
    var parentsObj = obj.closest(".areaBox");
    parentsObj.find(".areaDetail").hide();
    parentsObj.find(".areaList").hide();
    parentsObj.find(".selectedBox a").removeClass("on");
    parentsObj.find(".selectArea").removeClass("on");
    parentsObj.find(".selectArea b").each(function(index, element) {
        var value = parentsObj.find(".selectedBox a").eq(index).attr("pid");
        var text =  parentsObj.find(".selectedBox a").eq(index).find("em").text();
        $(this).attr("pid",value).text(text);
    });
    obj.parents('.d-item-right').removeClass('wrong');
    $('#addrAreaPrompt').hide();
}

var outTextTerritory = function(text, index, pid,obj) {
	var parentsObj = obj.closest(".areaBox");
    parentsObj.find(".selectedBox a").eq(index).attr("pid",pid);
    parentsObj.find(".selectedBox a").eq(index).find("em").text(text);
}
//公共透明背景显示
function pubMask(){
	$('.maskLayer').show();
}
//地址弹窗
function addrPop(){
	$('.pop-1').show();
}
//发票弹窗
function invoicePop(){
	$('.pop-2').fadeIn(300);
}
//礼品订单弹窗
function giftPop(){
	$('.pop-3').fadeIn(300,'swing');
}
//删除地址弹窗
function addrDelPop(addressId){
    $(".addrBtn .sure").attr("addressId",addressId);
	$('.pop-4').show();
}

//公共弹窗关闭
function pubPopHide(_this){	
	_this.parents('.pubPop').hide();
	$('.maskLayer').hide();
}
//礼品卡可用金额
var giftCardAvailablePrice=0;
//选择地址
var showAreaList = function(obj){
    var index = obj.parent().find('a').index(obj);
    obj.addClass("on").siblings().removeClass("on");
    obj.parent().parent().find('.areaList').hide().eq(index).show();
    if(index == 0){
        region.addList(K.kind_region[1],0,obj.parent().parent().find('.areaList').eq(0));
    }else{
        var pid = obj.parent().find('a').eq(index).attr("pid");
        if(pid != undefined && typeof (pid) != 'undefined'){
            var parentId = getParentId(pid);
            region.addList(K.kind_region[parentId],index,obj.parent().parent().find('.areaList').eq(index));
        }
    }
}
$(document).on("click",'.selectArea',function(e){
    $(this).addClass("on");
    $(this).next(".areaDetail").show();
    $(this).parent().find(".selectedBox a").removeClass("on");
    $(this).parent().find(".areaList").hide();
    $(this).parent().find(".selectCounty").bind("click");
    e.stopPropagation();

});
$(document).on('click','.selectedBox a',function(e){
    var pid = $(this).attr("pid");
    if(pid == "" || pid == null){
        return false;
    }
    showAreaList($(this));
    e.stopPropagation();
});
$("#addAddressRegion .areaDetail .selectedBox a").on('click',function(e){
    var pid = $(this).attr("pid");
    if(pid == "" || pid == null){
        return false;
    }
    showAreaList($(this));
    e.stopPropagation();
});

//选择省
$(document).on("click",'.provinceList a',function(e){
    selecedProvince($(this));
    e.stopPropagation();
});
//选择省
$('.provinceList').on("click",'a',function(e){
    selecedProvince($(this));
    e.stopPropagation();
});
//选择市
$(document).on("click",".cityList a",function(e){
    selecedCity($(this));
    e.stopPropagation();
});
//选择市
$('.cityList').on("click","a",function(e){
    selecedCity($(this));
    e.stopPropagation();
});
//选择区
$(document).on("click",".countyList a",function(e){
    selecedArea($(this));
});
//选择区
$('.countyList').on("click","a",function(e){
    selecedArea($(this));
});
$(document).click(function(e) {
    $(".areaDetail").hide();
    $(".selectArea").removeClass("on");
    $('.invTitleBox').hide();
    e.stopPropagation();
});
$(".areaDetail,.areaList").click(function(e) {
    e.stopPropagation();
});
//选择地址交互
$("#addressListDiv").on('mouseenter','.addressList li',function(){
    if($(this).hasClass('default')){
        $(this).removeClass('liHover');
        $(this).find('.operatingBtn').show();
        $(this).find('.setDefault').show();
    }else{
        $(this).addClass('liHover');
        $(this).find('.operatingBtn').show();
        $(this).find('.defaultLit').show();
    };
});
$("#addressListDiv").on("mouseleave",'.addressList li',function(){
    if($(this).hasClass('default')){
        $(this).find('.defaultText').show();
        $(this).find('.operatingBtn').hide();
    }else{
        $(this).removeClass('liHover');
        $(this).find('.operatingBtn').hide();
        $(this).find('.defaultText').show();
    };

    var text = $.trim($(this).find('.setDefault').text());
    if(text == '默认地址'){
        $(this).find('.setDefault').show();
    }else{
        $(this).find('.setDefault').hide();
    }
});
//返回购物车移进和移出事件
$("#backCart").on('mouseenter',function(){
    $(this).css("color","#e6393d");
});
$("#backCart").on('mouseleave',function(){
    $(this).css("color","#0066cc");
});
//设为默认地址
$('#addressListDiv').on('click','.defaultLit',function(e){
    var thisObj = $(this);
    if($.trim(thisObj.text()) == '设为默认'){
        var info = thisObj.closest("li");
        var addressId = info.attr("data-addrid");
        $.ajax({
            url:'/order/updateUserDefUserByAddressId.htm',
            type:'get',
            dataType:'json',
            data:{addressId:addressId},
            success:function(data){
                if(data.code == '0' || data.code == 0) {
                    $('.defaultLit').text('设为默认');
                    $('.defaultLit').hide();
                    $('.defaultLit').removeClass('defaultText').addClass('setDefault');
                    thisObj.removeClass('setDefault').addClass('defaultText');
                    thisObj.text('默认地址');
                    thisObj.show();
                }else{
                    alert("操作异常稍后重试!");
                }
            }
        });
    }
    e.stopPropagation();
});
//选择地址
$('#addressListDiv').on('click','.addressList li',function(e){
    var addressId = $(this).attr("data-addrid");
    $("#selectAddressId").val(addressId);
    $("#regionId").val($(this).attr("rgnregionid"))
    if(addressId >0){
        var addressname = $(this).attr("addressname")+$(this).attr("addressmore");
        $("#settlConsigneeInfo").text($(this).attr("addressconsignee"));
        $("#settlMobleInfo").text($(this).attr("addressmobile"));
        $("#settlAddressInfo").text(addressname);
        $("#settlAddress").show();
        $("#settlConsignee").show();
    }else{
        $("#settlAddress").hide();
        $("#settlConsignee").hide();
    }
    $('.addressList li').removeClass('liHover');
    $(this).addClass('default').siblings().removeClass('default');
    $(this).find('.defaultLit').show();

    //设置地址的cookie信息
    setAddressCookie($("#regionId").val(),addressId);

    //加载商品信息
    loadGoods(false);

    e.stopPropagation();
})
//地址新增
$('#addressListDiv').on('click','.addressAdd',function(){
    clearAddressInfo();//清空弹框里信息
    pubMask();
    addrPop();
});
//地址修改事件
$('#addressListDiv').on('click','.addr',function(e){
    var thisObj = $(this).closest("li");
    //获取用户地址详情信息
    $.ajax({
        type:'get',
        url:'/order/getRegionId.htm',
        data:{regionId:$.trim(thisObj.attr("rgnregionid"))},
        dataType:'JSON',
        success:function(data){
            if(data.code == '0'){//成功
                var regionId = data.data;
                //设置区ID
                thisObj.attr("rgnregionid",regionId);
                initAddressInfo(thisObj);
                pubMask();
                addrPop();
            }else if(data.code == '10003'){//跳转登录
                location.href = domain_number + '/login.htm?from='+domain_order+'/order/confirm.htm';
            }else{
                alert(data.msg);
            }
        }
    });
    e.stopPropagation();
});
//弹窗关闭按钮
$('.pubClose,.cancel').bind('click',function(){
     var type = $(this).attr("type");
     //礼品订单取消
     if(type == 'gift'){
        var isGiftOrder = $("#isGiftOrder").val();
        if(isGiftOrder == 0){
            $("#giftOrderInfo label").removeClass('selected').parent().siblings('.redioHidden').hide();
        }
     }else if(type =='invoice'){//发票取消
        if($.trim($("#isInvoice").val()) == '0'){
            $('#invoiceInfo label').removeClass("selected");
        }
     }else if(type=='noStockGift' || type=='stopTypeDelivery' || type=='payPassword' || type=='payPasswordError' || type=='orderError'
           || type=='unableProduct' || type=='stopTypeWeather' || type=='presell'){//无货赠品和运营停发和支付密码
         isSubmit= true;
         $("#submitOrder").css('background','#e43a3d');
         $("#submitOrder").text("提交订单");
     }
    pubPopHide($(this));
});
//地址删除
$('#addressListDiv').on('click','.delete',function(e){
    var parentLi = $(this).closest("li");
    if(parentLi == undefined || typeof (parentLi) == 'undefined'){
        alert("地址异常稍后重试!");
        return;
    }
    addrDelPop(parentLi.attr("data-addrid"));
    pubMask();
    e.stopPropagation();
});
//确定删除地址
$('.pop-4 .sure').bind('click',function(){
    var addressid = $(this).attr("addressid");
    if(addressid == undefined || typeof (addressid) == 'undefined'){
        alert("网络异常,稍后重试!");
        return;
    }
    //判断删除是不是默认的收货地址（如果是重新加载商品和运费信息）
    var isDefault = $("#addressListDiv li[data-addrid="+addressid+"]").hasClass("default");
    var thisObj = $(this);
    $.ajax({
        url:'/order/deleteUserAddress.htm',
        dataType:'json',
        data:{addressId:addressid},
        type:'get',
        success:function(data){
            if(data.code == '0'){
                pubPopHide(thisObj);
                $("li[data-addrID="+addressid+"]").remove();
                autoSelectAddress();
                if($(".addressList li") == undefined || $(".addressList li").length<4){
                    $(".addressMoreBox .addressMore").css("display",'none');
                    isShowAddress = false;
                }
                //等于0重新加地址列表
                if($(".addressList li") == undefined || $(".addressList li").length == 0 || isDefault){
                    loadAddress(false,true);
                }
                //新增显示隐藏
                if($(".addressList li").length<20){
                    $(".addressMoreBox .addressAdd").show();
                }else{
                    $(".addressMoreBox .addressAdd").hide();
                }
            }else{
                alert(data.msg);
            }
        }
    });
});
//优惠券激活确认事件
$('.pop-9 .sure').bind('click',function(){
    pubPopHide($(this));
});
//点击展开更多地址列表
$('#addressListDiv').on('click','.addressMore',function(){
    var flag = $(this).attr('flag');
    if(flag=='off'){
        $(this).attr('flag','on');
        $('.addressList').css('height','auto');
        $(this).find('i').addClass('on');
        $(this).find('span').text('收起收货地址');
        isShowAddress = true;
    }else{
        $(this).attr('flag','off');
        $('.addressList').css('height','180px');
        $(this).find('i').removeClass('on');
        $(this).find('span').text('展开收货地址');
        isShowAddress = false;

        var isDefault = false;
        $(".addressList li .defaultLit").each(function(index,item){
            var defaultText = $.trim($(item).text());
            if(defaultText == '默认地址'){
                $(item).closest("li").insertBefore($(".addressList li").eq(0));
                isDefault = true;
            }
        })

        //移动选择的收货地址到第一位
        var selectAddressId = $("#selectAddressId").val();
        if(selectAddressId != undefined){
            var addressLi = $(".addressList li[data-addrid="+selectAddressId+"]");
            if(isDefault){
                addressLi.insertBefore($(".addressList li").eq(1));
            }else{
                addressLi.insertBefore($(".addressList li").eq(0));
            }
        }

    }
});
//选择支付方式
$('.payMent').find('.item').mouseenter(function(){
    if($(this).hasClass('cur')){
        $(this).removeClass('onHover');
        $(this).find('i').show();

    }else{
        $(this).addClass('onHover');
        $(this).find('i').show();

    }
});
$('.payMent').find('.item').mouseleave(function(){
    $(this).removeClass('onHover');
    $(this).find('i').hide();
});
$('.payMent').find('i').mouseenter(function(){
    $(this).siblings('.payPrompt').show();
})
$('.payMent').find('i').mouseleave(function(){
    $(this).siblings('.payPrompt').hide();
});
$('.payMent .item').on('click',function(){
    if($(this).hasClass('noSelect')){
        return false;
    }else{
        $(this).addClass('cur').siblings().removeClass('cur');
    };
});
var isFristInvoice = true;
//发票信息修改
$('#invoiceInfo').find('label').bind('click',function(){
    if($(this).hasClass("unSelect")){
        return;
    }
    if($(this).hasClass('selected')){
        $("#isInvoice").val(0);
        $(this).removeClass('selected').parent().siblings('.redioHidden').hide();
        $("#invoiceInfoTitle").hide();
    }else{
        //发票类型 1：电子发票 2：纸质发票
        var invoiceKinds = $("#invoiceKinds").val();
        //1:个人 2：公司
        var invoiceType = $("#invoiceType").val();

        //如果没有发票信息直接弹框
        if($.trim(invoiceKinds) == '' || $.trim(invoiceKinds) == '0' || $.trim(invoiceType) == '' || $.trim(invoiceType) == ''){
            if($("#invoiceKindsDiv .item").eq(1).hasClass("cur")){
                var userMobile = $.trim($("#userMobile").val());
                if(isPhoneNum(userMobile)){
                    $("#invoicePhoneNum").val(userMobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'));
                }
            }
            $(this).addClass('selected');
            invoicePop();
            pubMask();
            return false;
        }

        //首次打开 如果全是自营、地址支持电子发票使用电子发票
        if(isFristInvoice && invoiceKinds == 2 && invoiceType == 1){
            var allCheckedIsJxDelivery = $.trim($("#allCheckedIsJxDelivery").val());
            var selectAddressId = $.trim($("#selectAddressId").val());
            var supporteinv = $.trim($(".addressList li[data-addrid="+selectAddressId+"]").attr("supporteinv"));
            if(supporteinv == 'true' && allCheckedIsJxDelivery == 'true'){
                invoiceKinds =1;
                var userMobile = $.trim($("#userMobile").val());
                if(isPhoneNum(userMobile)){
                    $("#invoicePhoneNum").val(userMobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'));
                    $("#invoiceMobile").val(userMobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'));
                }
            }
            isFristInvoice = false;
        }
        $("#isInvoice").val(1);
        if(invoiceKinds == 2){
            $(".invoiceField span").eq(0).text('纸质发票');
        }else{
            $(".invoiceField span").eq(0).text('电子发票');
            $("#invoiceKinds").val(1);
        }
        //1:酒水 2：明细
        var invoiceContext = $("#invoiceContext").val();
        var context = '';
        if(invoiceContext == 2 || invoiceContext == '2'){
            context ='明细';
        }else{
            context = '酒水';
            $("#invoiceContext").val(1);
        }
        if(invoiceType == 2 || invoiceType == '2'){
            context += '-'+$.trim($("#invoiceTop").val());
            if($.trim($("#taxpayerId").val()) == ''){
                $("#invoiceInfoTitle").show();
            }else{
                $("#invoiceInfoTitle").hide();
            }
        }else{
            context += '-个人'
            $("#invoiceType").val(1);
        }
        $(".invoiceField span").eq(1).text(context);
        $(this).addClass('selected').parent().siblings('.redioHidden').show();
    };
});

//发票单位获取焦点
$('.pop-2').on('click','#invoiceUnit',function(e){
    $('.invTitleBox').show();
    e.stopPropagation();
});
$(".invTitleBox li").on('click',function(e){
    var invoicetop = $.trim($(this).attr("invoicetop"));
    $("#invoiceUnit").val(invoicetop);
    var taxpayerid = $.trim($(this).attr("taxpayerid"));
    $("#invoiceTaxesNum").val(taxpayerid);
});

//礼品订单选择事件
$('#giftOrderInfo').find('label').bind('click',function(){
    if($(this).hasClass("unSelect")){
        return false;
    }
    if($(this).hasClass('selected')){
        //设置发票可用
        $("#invoiceInfo label").removeClass("unSelect");
        $(this).removeClass('selected').parent().siblings('.redioHidden').hide();
        $("#isGiftOrder").val(0);
    }else{
        var isGiftOrder = $("#isGiftOrder").val();
        var giftName = $.trim($("#getGiftName").val());
        var giftsName = $.trim($("#giveGiftName").val());
        var giftPhoneNum = $.trim($("#giveGiftMobile").val());
        if(isGiftOrder == 0 && giftName =='' || giftsName == '' || giftPhoneNum ==''){
            $(this).addClass('selected');
            $("#giftName").val('');
            $("#giftsName").val('');
            $("#giftPhoneNum").val('');
            $("#giftMessageInfo").val('');
            giftPop();
            pubMask()
        }else{
            $(".giftField span").eq(0).text("收礼人："+giftName);
            $(".giftField span").eq(1).text("送礼人："+giftsName);
            $(".giftField span").eq(2).text("送礼人电话："+giftPhoneNum);
            $(this).addClass('selected').parent().siblings('.redioHidden').show();
            $("#isGiftOrder").val(1);
            $("#invoiceInfoTitle").hide();
        }
    };
    //刷新支付方式
    refreshPayWayAndInvoice();
});

//发票信息修改弹窗
$('.invBtn').bind('click',function(){
    var invoiceKindsVal = 2;//发票种类【1:电子，2:纸质】
    //是否全是酒仙发货
    var allCheckedIsJxDelivery = $("#allCheckedIsJxDelivery").val();
    if(allCheckedIsJxDelivery == 'false'){//不全是酒仙发货不支持电子发票
        $("#invoiceKindsDiv .item").eq(1).addClass("noSelect");
        $("#invoiceKindsDiv .item").eq(1).removeClass("cur");
        $("#invoiceKindsDiv .item").eq(0).addClass("cur");
    }else{
        //收货地址
        var addressId = $("#selectAddressId").val();
        //没选择收货地址
        if(addressId == undefined || typeof (addressId) == 'undefined'){
            $("#invoiceKindsDiv .item").eq(1).addClass("noSelect");
            $("#invoiceKindsDiv .item").eq(1).removeClass("cur");
            $("#invoiceKindsDiv .item").eq(0).addClass("cur");
        }else{
            //判断地址是否支持电子发票
            var supporteinv = $(".addressList li[data-addrid="+addressId+"]").attr("supporteinv");
            if(supporteinv == 'true'){
                $("#invoiceKindsDiv .item").eq(1).removeClass("noSelect");
                var invoiceKinds = $("#invoiceKinds").val();
                if(invoiceKinds == 1){//电子发票
                    invoiceKindsVal = 1;
                    $("#invoiceKindsDiv .item").eq(0).removeClass("cur");
                    $("#invoiceKindsDiv .item").eq(1).addClass("cur");
                }else{//纸质发票
                    $("#invoiceKindsDiv .item").eq(0).addClass("cur");
                    $("#invoiceKindsDiv .item").eq(1).removeClass("cur");
                }
            }else{
                $("#invoiceKindsDiv .item").eq(1).addClass("noSelect");
                $("#invoiceKindsDiv .item").eq(1).removeClass("cur");
                $("#invoiceKindsDiv .item").eq(0).addClass("cur");
            }
        }
    }
    if(invoiceKindsVal == 1){
        $("#invPhone").show();
        $("#invoicePhoneNum").val($("#invoiceMobile").val().replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'));
    }else{
        $("#invoiceMobile").val('');
        $("#invPhone").hide();
    }
    //发票类型（1个人发票，2公司发票）处理单位名称 纳税人识别号
    var invoiceType = $("#invoiceType").val();
    if(invoiceType == 2 || invoiceType == '2'){
        $("#gr").removeClass("cur");
        $("#dw").addClass("cur");
        $("#unit").show();
        $("#taxesNum").show();
        $("#invoiceUnit").val($("#invoiceTop").val());
        $("#invoiceTaxesNum").val($("#taxpayerId").val());
        $(".warmProp").show();
    }else{
        $("#gr").addClass("cur");
        $("#dw").removeClass("cur");
        $("#unit").hide();
        $("#taxesNum").hide();
        $("#invoiceTop").val("");
        $("#taxpayerId").val("");
        $(".warmProp").hide();
    }

    //1:酒水 2:明细
    var invoiceContext = $("#invoiceContext").val();
    if(invoiceContext == 2){
        $("#contextTypeDiv .item").eq(1).addClass("cur").siblings().removeClass("cur");
    }else{
        $("#contextTypeDiv .item").eq(0).addClass("cur").siblings().removeClass("cur");
    }
    invoicePop();
    pubMask();
});
//礼品订单修改弹窗
$('.giftBtn').bind('click',function(){
    giftPop();
    pubMask()
});
//优惠券展开收起
$('#couponListDiv').on('click','.settlementTitle',function(e){
    if($(this).hasClass('cur')){
        $(this).removeClass('cur').siblings('.giftCardWrap').hide();
        $(this).removeClass('cur').siblings('.messageBox').hide();
    }else{
        $(this).addClass('cur').siblings('.giftCardWrap').show();
        $(this).addClass('cur').siblings('.messageBox').show();
    }
    e.stopPropagation();
});
//优惠券tab
$('#couponListDiv').on('click','.giftCardTitleWrap .giftCardTitle',function () {
    var _this = $(this);
    var _index = _this.index();
    _this.addClass("gctitOn").siblings('.giftCardTitle').removeClass("gctitOn");
    $('.giftCardBox').eq(_index).show().siblings().hide();
});
//实体券显隐
$("#couponListDiv").on('click','.stqBut',function(){
    $('.giftCardStq').toggle();
});
//优惠券超过五条显示展开按钮
$('.giftCardBox').each(function() {
    var redLen = $(this).find('.checkboxA');
    if(redLen.length > 5){
        $(this).find('.open').show()
        $(this).find('.giftCard').css('height','120px')
    }else{
        $(this).find('.open').hide();
        $(this).find('.giftCard').css('height','auto')
    };
    $(this).find('.open').bind('click',function(){
        if($(this).hasClass('packUp')){
            $(this).parents('.giftCardW').siblings('.giftCard').css('height','120px');
            $(this).removeClass('packUp');
            $(this).find('span').text('展开');
        }else{
            $(this).parents('.giftCardW').siblings('.giftCard').css('height','auto');
            $(this).addClass('packUp');
            $(this).find('span').text('收起');
        };
    });
    $('.bonus').bind('click',function(){
        if($(this).is(':checked')){
            $(this).parent('.checkboxA').addClass('cur');
        }else{
            $(this).parent('.checkboxA').removeClass('cur');
        }
    });
});
//运费弹窗
$("#shopFreightInfo").mouseenter(function() {
  $(".freightPad").show();
});
$("#shopFreightInfo").mouseleave(function() {
  $(".freightPad").hide();
});
//发票弹窗内交互
$('.invoiceTab').find('.item').mouseenter(function(){
    if($(this).hasClass('cur')){
        $(this).removeClass('onHover');
        $(this).find('i').hide();
    }else{
        $(this).addClass('onHover');
        if($(this).index() == 1 && $(this).hasClass('noSelect')){
            $(this).find('i').show();
        }
    }
});
$('.invoiceTab').find('.item').mouseleave(function(){
    $(this).removeClass('onHover');
    $(this).find('i').hide();
});
$('.invoiceTab').find('i').mouseenter(function(){
    $(this).siblings('.payPrompt').show();
})
$('.invoiceTab').find('i').mouseleave(function(){
    $(this).siblings('.payPrompt').hide();
});
$('.invoiceTab').find('.item').bind('click',function(){
    if($(this).hasClass('noSelect')){
        return false;
    }else{
        $(this).addClass('cur').siblings().removeClass('cur');
    };
    var zzfp = $('#zzfp');
    var dzfp = $('#dzfp');
    var gr = $('#gr');
    var dw = $('#dw');
    if(zzfp.hasClass('cur') && gr.hasClass('cur')){
        $('#invPhone').hide();
        $('#unit').hide();
        $('#taxesNum').hide();
        $('.warmProp').hide();
    }else if(zzfp.hasClass('cur') && dw.hasClass('cur')){
        $('#invPhone').hide();
        $('#unit').show();
        $('#taxesNum').show();
        $('.warmProp').show();
    }else if(dzfp.hasClass('cur') && gr.hasClass('cur')){
        $('#invPhone').show();
        $('#unit').hide();
        $('#taxesNum').hide();
        $('.warmProp').hide();
    }else if(dzfp.hasClass('cur') && dw.hasClass('cur')){
        $('#invPhone').show();
        $('#unit').show();
        $('#taxesNum').show();
        $('.warmProp').show();
    }
});

//验证手机号格式
function isPhoneNum(phoneNum){
    var pattern=/^(1)[0-9]{10}$/;
    if(!pattern.test(phoneNum)){
        return false;
    };
    return true;
};
//固定电话号格式
function isTelNum(telNum){
    var pattern=/^0[0-9]{2,3}-[0-9]{7,8}$/;
    if(!pattern.test(telNum)){
        return false;
    };
    return true;
};

/**
 * 加密手机号
 * @param mobile
 * @returns {*}
 */
function encryptMobile(mobile){
    if(mobile == undefined || mobile == ''){
        return '';
    }
    return mobile.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2");
}
//纳税人识别号
function isTaxesNum(taxesNum){
    var pattern=/^[0-9a-zA-Z]*$/;
    if(!pattern.test(taxesNum)){
        return false;
    };
    return true;
};
//获取焦点
$('.form-1,.form-2').bind('focus',function(){
    $(this).siblings('.pubPrompt').hide();
    $(this).parents('.d-item-right').removeClass('wrong');
});
$('#phoneNumber,.form-3,.form-4').bind('focus',function(){
    $('#addrPhonePrompt,#addrTelPrompt').hide();
    $('#addrPhonePrompt,#addrTelPrompt').parents('.d-item-right').removeClass('wrong');
});
//提交新增地址验证
$("body").on('click','a[name=saveAddress]',function(e){
    var telVal='';
    var phoneVal = $.trim($("#addressmobile").val()),
    areaVal = $.trim($(".selectArea").find("b").eq(0).text()),
    addrDetailVal = $.trim($("#addrTextarea").val()),
    personNameVal = $.trim($("#addressconsignee").val());
    var addaddressid = $.trim($("#addaddressid").val());
    var addressphonebefor = $.trim($("#addressphone").val());
    var addressPhoneAfter = $.trim($("#addressPhoneAfter").val());
    if(addressphonebefor != undefined && typeof (addressphonebefor) != 'undefined' && addressphonebefor != '' &&
        addressphonebefor != undefined || typeof (addressphonebefor) != 'undefined' && addressphonebefor != ''){
        telVal = addressphonebefor +"-"+addressPhoneAfter;
    }
    //请选择省市区
    if(areaVal=="请选择省市区"){
        $('#addAddressRegion').find('.d-item-right').addClass('wrong');
        $('#addrAreaPrompt').show();
        return false;
    }
    //详细地址
    if(addrDetailVal=="" || getByteLen(addrDetailVal) < 5 ){
        $('#addAddressDetail').find('.d-item-right').addClass('wrong');
        $('#addrDetailPrompt').show();
        $('#addrDetailPrompt span').text("请填写详细地址，不得少于5个字");
        return false;
    }
    if(getByteLen(addrDetailVal) > 52){
        $('#addAddressDetail').find('.d-item-right').addClass('wrong');
        $('#addrDetailPrompt').show();
        $('#addrDetailPrompt span').text("详细地址最多输入52个字符!");
        return false;
    }
    //收货人姓名
    if(personNameVal==""){
        $('#addAddressConsignee').find('.d-item-right').addClass('wrong');
        $('#addrNamePrompt').show();
        return false;
    }
    //手机号
    if(phoneVal==""){
        $('#addAddressMobile').find('.d-item-right').addClass('wrong');
        $('#addrPhonePrompt').show().find("span").text("请填写收货人手机号");
        return false;
    }
    //手机号
    if(phoneVal!=""&&!isPhoneNum(phoneVal)){
        var original = $.trim($("#addressmobile").attr("original"));
        if(original =='' || original != phoneVal){
            $('#addAddressMobile').find('.d-item-right').addClass('wrong');
            $('#addrPhonePrompt').show().find("span").text("请填写正确的手机号码");
            return false;
        }
    }
    //固定电话
    if(telVal!=""&&!isTelNum(telVal)){
        $('#addAddressPhone').parents('.d-item-right').addClass('wrong');
        $('#addrTelPrompt').show().find("span").text("请填写正确的固定电话");
        return false;
    }
    if(addaddressid == undefined || typeof (addaddressid) == 'undefined'){
        addaddressid = '';
    }
    var regionId = $.trim($(".selectArea").find("b").eq(2).attr("pid"));
    if(regionId == undefined || typeof (regionId) == 'undefined'){
        $('#addAddressRegion').find('.d-item-right').addClass('wrong');
        $('#addrAreaPrompt').show();
        return false;
    }
    var cityName = $.trim($(".selectArea").find("b").eq(1).text());
    var areaName =  $.trim($(".selectArea").find("b").eq(2).text());
    var addressName = areaVal+"-"+cityName+"-"+areaName;
    var thisObj = $(this);
    $.ajax({
        url:'/order/updateUserAddress.htm',
        type:'get',
        dataType:'json',
        contentType:'application/x-www-form-urlencoded; charset=utf-8',
        data:{addressId:addaddressid,rgnRegionID:regionId,consignee:personNameVal,addressName:addressName,addressMore:addrDetailVal,mobile:phoneVal,phone:telVal,zipCode:''},
        success:function(data){
            if(data.code == '0'){
                //从新加载地址列表
                pubPopHide(thisObj);
                var selectAddressId = $.trim($("#selectAddressId").val());
                $("#selectAddressId").val(data.data);
                loadAddress(true,true);
            }else{
                alert(data.msg);
            }
        }
    });
    e.stopPropagation();
    return true;
});
$("body").on('keyup','#addrTextarea',function (e) {
    $('#addAddressDetail').find('.d-item-right').removeClass('wrong');
    $('#addrDetailPrompt').hide();
    e.stopPropagation();
});
$("body").on('keyup','#addressconsignee',function (e) {
    $('#addAddressConsignee').find('.d-item-right').removeClass('wrong');
    $('#addrNamePrompt').hide();
    e.stopPropagation();
});
$("body").on('keyup','#addressmobile',function (e) {
    $('#addAddressMobile').find('.d-item-right').removeClass('wrong');
    $('#addrPhonePrompt').hide();
    e.stopPropagation();
});

//修改发票验证
$("#invoiceBtn").on('click',function(){
    //单位名称
    var invoiceUnit = $.trim($("#invoiceUnit").val()),
    invoiceTaxesNum = $.trim($("#invoiceTaxesNum").val()),//纳税人识别号
    invoicePhoneNum = $.trim($("#invoicePhoneNum").val());//联系电话
    //单位名称

    if(!isTaxesNum(invoiceTaxesNum)){
        $('#invoiceTaxesNumPrompt').parents('.d-item-right').addClass('wrong');
        $('#invoiceTaxesNumPrompt').show().find("span").text("只能输入英文或数字");
        return false;
    }
    //电子发票
    var invoiceKindsId = $("#invoiceKindsDiv .cur").attr("id");
    if(invoiceKindsId == 'dzfp'){
        //手机号
        if(invoicePhoneNum==""){
            $('#invoicePhoneNumPrompt').parents('.d-item-right').addClass('wrong');
            $('#invoicePhoneNumPrompt').show();
            return false;
        }
        //手机号
        if(!isPhoneNum(invoicePhoneNum)){
            var userMobile = $.trim($("#userMobile").val());
            userMobile = userMobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
            var invoiceMobile = $.trim($("#invoiceMobile").val());
            invoiceMobile = invoiceMobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
            if(userMobile != invoicePhoneNum && invoiceMobile != invoicePhoneNum){
                $('#invoicePhoneNumPrompt').parents('.d-item-right').addClass('wrong');
                $('#invoicePhoneNumPrompt').show().find("span").text("请填写正确的手机号码");
                return false;
            }
            if(userMobile != invoiceMobile && invoiceMobile !=''){
                invoicePhoneNum = $.trim($("#invoiceMobile").val());
            }
        }
    }

    //设置电子发票或纸质发票
    if(invoiceKindsId == 'dzfp'){
        $("#invoiceKinds").val(1);
        $("#invoiceMobile").val(invoicePhoneNum);
        $(".invoiceField span").eq(0).text('电子发票');
    }else{
        $("#invoiceKinds").val(2);
        $("#invoiceMobile").val('');
        $(".invoiceField span").eq(0).text('纸质发票');
    }

    //发票类型 1个人发票，2公司发票
    var invoiceType = 1;
    if($("#dw").hasClass("cur")){
        invoiceType = 2;
    }
    if(invoiceType == 2){
        if(invoiceUnit==""){
            $('#invoiceUnitPrompt').parents('.d-item-right').addClass('wrong');
            $('#invoiceUnitPrompt').show();
            return false;
        }

        if(invoiceTaxesNum != '' && !isNumberAndLetter(invoiceTaxesNum)){
            $('#invoiceTaxesNumPrompt').parents('.d-item-right').addClass('wrong');
            $('#invoiceTaxesNumPrompt').find("span").text("只能输入英文或数字");
            $('#invoiceTaxesNumPrompt').show();
            return false;
        }
    }
    $("#invoiceType").val(invoiceType);
    if(invoiceType == 2){
        $("#invoiceTop").val($("#invoiceUnit").val());
        $("#taxpayerId").val($("#invoiceTaxesNum").val());
    }else{
        $("#invoiceTop").val('');
        $("#taxpayerId").val('');
    }
    //1:酒水 2:明细
    var invoiceContext = 1;
    if($("#contextTypeDiv .item").eq(1).hasClass("cur")){
        invoiceContext = 2;
    }
    $("#invoiceContext").val(invoiceContext);

    var context = '';
    //1:酒水 2：明细
    var invoiceContext = $("#invoiceContext").val();
    //1:个人 2：公司
    var invoiceType = $("#invoiceType").val();
    var context = '';
    if(invoiceContext == 2 || invoiceContext == '2'){
        context ='明细';
    }else{
        context = '酒水';
    }
    if(invoiceType == 2 || invoiceType == '2'){
        context += '-'+$.trim($("#invoiceUnit").val());
    }else{
        context += '-个人'
    }
    $(".invoiceField span").eq(1).text(context);
    //设置发票信息
    $("#isInvoice").val(1);

    //发票提示语隐藏和显示
    if(invoiceType == 2 && invoiceTaxesNum == '' ){
        $("#invoiceInfoTitle").show();
    }else{
        $("#invoiceInfoTitle").hide();
    }
    pubPopHide($(this));
    //显示发票信息
    $("#invoiceInfo label").addClass('selected').parent().siblings('.redioHidden').show();
    return true;
});
//礼品订单信息修改
$("#giftsBtn").on('click',function(){
    var giftName = $.trim($("#giftName").val()),
    giftsName = $.trim($("#giftsName").val()),
    giftPhoneNum = $.trim($("#giftPhoneNum").val());
    //收礼人
    if(giftName==""){
        $('#giftNamePrompt').parents('.d-item-right').addClass('wrong');
        $('#giftNamePrompt').show();
        return false;
    }
    //送礼人
    if(giftsName==""){
        $('#giftsNamePrompt').parents('.d-item-right').addClass('wrong');
        $('#giftsNamePrompt').show();
        return false;
    }
    //手机号
    if(giftPhoneNum==""){
        $('#giftPhoneNumPrompt').parents('.d-item-right').addClass('wrong');
        $('#giftPhoneNumPrompt').show();
        return false;
    }
    //手机号
    if(!isPhoneNum(giftPhoneNum)){
        $('#giftPhoneNumPrompt').parents('.d-item-right').addClass('wrong');
        $('#giftPhoneNumPrompt').show().find("span").text("请输入正确的11位手机号");
        return false;
    }
    //留言
    var giftMessageInfo = $.trim($("#giftMessageInfo").val());
    $("#isGiftOrder").val(1);
    $("#getGiftName").val(giftName);
    $("#giveGiftName").val(giftsName);
    $("#giveGiftMobile").val(giftPhoneNum);
    $("#giftMessage").val(giftMessageInfo);
    $(".giftField span").eq(0).text("收礼人："+giftName);
    $(".giftField span").eq(1).text("送礼人："+giftsName);
    $(".giftField span").eq(2).text("送礼人电话："+giftPhoneNum);
    $("#giftOrderInfo label").addClass('selected').parent().siblings('.redioHidden').show();
    pubPopHide($(this));
    //设置发票不可用
    $("#invoiceInfo label").removeClass("selected").parent().siblings(".redioHidden").hide();
    $("#invoiceInfo label").addClass("unSelect");
    $("#invoiceInfoTitle").hide();
    $("#isInvoice").val(0);

    //设置支付方式为在线支付
    if(!$(".payMent .item").eq(1).hasClass("noSelect")){
        $(".payMent .item").eq(1).find(".payPrompt").text('所选商品或所在地区或礼品订单不支持货到付款。');
    }
    $(".payMent .item").eq(1).addClass("noSelect").removeClass("cur");
    $(".payMent .item").eq(0).addClass("cur");

    return true;
});

//提交订单弹
$('.submitBtn').bind('click',function(){
    submitOrder();
})

//余额/返现点击事件
$('.uesBalance label').bind('click',function(){
    if($(this).hasClass('unavailable')){
        $(this).unbind();
    }else if($(this).hasClass('selected')){
        $(this).removeClass('selected');
        if($(this).attr("type") == 2){
            $("#cashbackInput").val(0);
            loadCoupons(-1,0);
        }else if($(this).attr("type") == 3){//津贴不可用
            $("#useAllowance").val(0);
            loadCoupons(-1,0);
        }
        //刷新金额
    }else{
        $(this).addClass('selected');
        if($(this).attr("type") == 2){
            $("#cashbackInput").val(10000);
            refreshPrice();
            loadCoupons(-1,0);
        }if($(this).attr("type") == 3){//津贴可用
            $("#useAllowance").val(1);
            loadCoupons(-1,0);
        }
        //刷新金额
    }
});


//返现输入事件
var backTimer;
$("#cashbackInput").bind('keyup',function(){
    var thisObj = $(this);
    clearTimeout(backTimer);
    backTimer = setTimeout(function(){
        var backPrice = thisObj.val();
        if(!isMoney(backPrice)){
            thisObj.val(0);
            backPrice=0;
            return;
        }
        if(!thisObj.parent().siblings('.uesBalance').find('label').hasClass("selected")){
            thisObj.val(0);
            backPrice=0;
            return;
        }
        if(backPrice.toString().indexOf('.')>= 0&& backPrice.split('.')[1].length > 2){
            thisObj.val(parseFloat(backPrice).toFixed(2));
            loadCoupons(-1,0);
        }else{
            thisObj.val(parseFloat(backPrice));
            loadCoupons(-1,0);
        }
        //刷新金额信息
        refreshPrice();
    },500);
});

//添加礼品卡
$("#searchGiftCard").bind('click',function(){
    var account = $.trim($("#lpksn").val());
    if(account == undefined || account == ''){
        $("#giftCardTitle").show();
        $("#giftCardTitle").find('span').text('请输入您的卡号');
        return false;
    }

    //判断是否存在
    var isExist = false;
    $(".gBody .gTr-1 label").each(function(index,item){
        var accountItem = $(item).attr("account");
        if(accountItem == account){
            isExist = true;
            return false;
        }
    });
    if(isExist){
        $("#giftCardTitle").show();
        $("#giftCardTitle").find('span').text('礼品卡已存在');
        return false;
    }
    var password1 = $.trim($("#lpkpw1").val());
    var password2 = $.trim($("#lpkpw2").val());
    var password3 = $.trim($("#lpkpw3").val());
    var password4 = $.trim($("#lpkpw4").val());
    var password = password1+password2+password3+password4;
    if(password == undefined || password == ''){
        $("#giftCardTitle").show();
        $("#giftCardTitle").find('span').text('请输入您的密码');
        return false;
    }
    $.ajax({
        type:'get',
        url:'/order/searchGiftCard.htm',
        data:{account:account,password:password},
        dataType:'json',
        success:function(data){
            $("#giftCardTitle").hide();
            if(data.code == '0'){
                var giftCardInfo = data.data;
                //计算礼品卡已使用的总金额
                var giftCardTotalPrice = 0;
                $(".gBody .gTr-1 label").each(function(index,item){
                    if($(item).hasClass('selected')){
                        giftCardTotalPrice = giftCardTotalPrice + parseFloat($(item).attr("price"));
                    }
                });
                var checked = '';
                if((giftCardAvailablePrice - giftCardTotalPrice) > 0){
                    checked = 'selected';
                }
                var htmlText = '<div class="gTr">'
                        +'<div class="gTr-1"><label class="'+checked+'" account="'+giftCardInfo.account+'" info="'+giftCardInfo.account+'_'+password+'" price="'+parseFloat(giftCardInfo.remaindPrice)+'"><i class="orderIcon"></i><span>'+giftCardInfo.account+'</span></label></div>'
                        +'<div class="gTr-2">'+parseFloat(giftCardInfo.cartPrice).toFixed(2)+'元</div>'
                        +'<div class="gTr-3">￥'+parseFloat(giftCardInfo.remaindPrice).toFixed(2)+'</div>'
                        +'<div class="gTr-4">￥0.00</div>'
                        +'<div class="gTr-5">'+giftCardInfo.blankOutTime+' 到期</div>'
                    +'</div>';
                $("#giftCardInfoBody").append(htmlText);
                //刷新价格
                refreshPrice();
                $("#giftCardInfo").show();
                $(".tabNav a").eq(3).find('i').show();

                //清空输入信息
                $("#lpksn").val('')
                $("#lpkpw1").val('');
                $("#lpkpw2").val('')
                $("#lpkpw3").val('')
                $("#lpkpw4").val('')
            }else{
                $("#giftCardTitle").show();
                $("#giftCardTitle").find('span').text(data.msg);
            }
        }
    });
});

//礼品卡卡号输入事件
$("#lpksn").bind('keyup',function(){
    var account = $.trim($(this).val());
    if(account != '' && account.length >0){
        $("#giftCardTitle").hide();
    }
});
//选择礼品卡事件
$("#giftCardInfoBody").on('click','.gTr-1 label',function(){
    if($(this).hasClass('selected')){
        $(this).removeClass('selected');
    }else{
        var giftCardTotalPrice = 0;
        $("#giftCardInfoBody .gTr-1 label").each(function(index,item){
            if($(item).hasClass('selected')){
                giftCardTotalPrice = giftCardTotalPrice + parseFloat($(item).attr("price"));
            }
        });
        if((giftCardAvailablePrice - giftCardTotalPrice) < 0){
            $("#giftCardInfoBody .gTr-1 label").each(function(index,item){
                if($(item).hasClass('selected')){
                    $(item).removeClass("selected");
                    return false;
                }
            });
        }
        $(this).addClass('selected');
    }
    //刷新价格
    refreshPrice();
});

//礼品卡输出框自动切换
$("#lpkpw1,#lpkpw2,#lpkpw3,#lpkpw4").keyup(function(){
    $(this).val($(this).val().replace(/[\W]/g,''));
    if($(this).val().length==4 && $(this).attr('_di') < 4){
        $("#lpkpw"+(parseInt($(this).attr('_di'))+parseInt(1))).focus();
    }
    $("#giftCardTitle").hide();
});

//运营停发取消事件
$(".pop-6 .redBtn").bind('click',function(){
    isSubmit=true;
    $("#submitOrder").css("background","#e43a3d");
    $("#submitOrder").text("提交订单");
    pubPopHide($(this));
});
//无货赠品继续下单事件
$(".pop-7 .redBtn").bind('click',function(){
    pubPopHide($(this));
    isSkipNoStockGift = true;
    isSubmit= true;
    //继续提交订单
    submitOrder();
});
//快递停发继续下单事件
$(".pop-8  .redBtn").bind('click',function(){
    pubPopHide($(this));
    isSkipStopTypeDelivery = true;
    isSubmit= true;
    //继续提交订单
    submitOrder();
});

//优惠券/礼品卡/余额/返现点击显隐
$('.tabOpen').bind('click',function(){
    if($(this).hasClass('tabUp')){
        $(this).removeClass('tabUp');
        $('.tabWrap').hide();
        $(this).parents('.pubWrap').addClass('mb20');
    }else{
        $(this).addClass('tabUp');
        $('.tabWrap').show();
        $(this).parents('.pubWrap').removeClass('mb20');
    }
});
//优惠券/余额/返现/礼品卡
var tabTitle = $(".tabNav").find('a');
var conBox = $('.tabItem');
tabTitle.bind('click',function(){
    var _this = $(this);
    var _index = _this.index();
    _this.addClass("cur").siblings('a').removeClass("cur");
    conBox.eq(_index).show().siblings().hide();
});

//优惠券tab事件
$('#couponListDiv').on('click','.tabItemNav a',function(e){
    var _this = $(this);
    var _index = _this.index();
    _this.addClass("cur").siblings('a').removeClass("cur");
    $('.tabItemBox').eq(_index).show().siblings().hide();;
    e.stopPropagation();
});

//优惠券超过五条出滚动条
$('.tabItemBox').each(function() {
    var redLen = $(this).find('.item-list');
    if(redLen.length > 5){
        $(this).find('.couponsList').css('height','125px')
    }else{
        $(this).find('.couponsList').css('height','auto')
    };
});
//选择优惠券背景变色
$('#couponListDiv').on('click','.optional',function(e){
    /*if($(this).hasClass('selecte')){//取消
        $(this).removeClass('selecte').parents('.item-list').removeClass('selected');
    }else{
        $(this).addClass('selecte').parents('.item-list').addClass('selected');
        //使用范围 0:全场（跨店铺）,1:自营,2:店铺
        var couponType = $(this).attr("shopscopetype");
        //红包id
        var couponid = $(this).attr("couponid");
        //店铺id
        var shopId = $(this).attr("shopid");
        //遍历选中红包
        $("#availableCoupons .optional").each(function(index,item){
            var itemCouponId= $(item).attr("couponid");
            if(couponType == 0){//全场
                if(couponid != itemCouponId){
                    $(item).removeClass('selecte').parents('.item-list').removeClass('selected');
                }
            }else{//单店
                var itemShopscopetype = $(item).attr("shopscopetype");
                if(itemShopscopetype == 0){
                    $(item).removeClass('selecte').parents('.item-list').removeClass('selected');
                }else{
                    //店铺ID
                    var itemShopId = $(item).attr("shopid");
                    if(shopId == itemShopId){
                        if(itemCouponId != couponid){
                            $(item).removeClass('selecte').parents('.item-list').removeClass('selected');
                        }
                    }
                }
            }
        });
    }
    var couponCount = 0;
    var price = 0;
    var couponIds = '';
    //刷新选择红包数量和金额
    $("#availableCoupons .optional").each(function(index,item){
        //已选择
        if($(item).hasClass('selecte')){
            couponCount++;
            var couponid = $(item).attr("couponid");
            couponIds +=couponid+",";
            var discountprice = $(item).attr("discountprice");
            if(discountprice == undefined || typeof (discountprice) == 'undefined'){
                discountprice = 0;
            }
            price += parseFloat(discountprice);
        }
    });
    if(couponIds.length > 0){
        couponIds = couponIds.substring(0,couponIds.length-1);
    }
    $("#checkCouponIds").val(couponIds);
    $("#couponDisCountPrice").val(parseFloat(parseFloat(price).toFixed(2)));
    $("#couponCount").val(couponCount);
    //刷新价格
    refreshPrice();*/
    var couponid = $(this).attr("couponid");
    var type = 0;
    if($(this).hasClass('selecte')){//取消
        type = 0;
    }else{
        type = 1;
    }
    loadCoupons(couponid,type);
    e.stopPropagation();
});

//激活优惠券输入框事件
$("#couponListDiv").on('keyup','#account',function(){
    $(this).val($(this).val().replace(/[\W]/g,''));
    if($(this).val().length > 0){
        $(".couponsNum .errorPrompt").hide();
    }
});
var isCheckPassword = false;
//校验支付密码
$(".pop-10 .sure").bind('click',function(){
    if(isCheckPassword){
       return false;
    }
    isCheckPassword=true;
    $(".virtualPrompt").hide();
    //支付密码
    var payPassword = $.trim($("#payPassword").val());
    if(payPassword == '' || payPassword == undefined){
        $(".virtualPrompt").show();
        $(".virtualPrompt").find('span').text('请输入支付密码');
        return false;
    }
    var thisObj = $(this);
    $.ajax({
        type:'get',
        url:'/order/checkPayPassword.htm',
        dataType:'json',
        data:{payPassword:payPassword},
        success:function(data){
            isCheckPassword = false;
            if(data.code == '0'){
                isCheckPayPassword = true;
                checkPayPassword = payPassword;
                pubPopHide(thisObj);
                isSubmit= true;
                //提交订单
                submitOrder();
            }else if(data.code == '20002'){
                pubPopHide(thisObj);
                //输入错误超过5次
                pubMask();
                $('.pop-11').show();
            }else{
                $(".virtualPrompt").show();
                $(".virtualPrompt").find('span').text(data.msg);
                isSubmit= true;
            }
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            isCheckPassword = false;
        }
    });
});
//支付密码错误5次提示
$(".pop-11 .sure").bind('click',function(){
    $("#submitOrder").css('background','#e43a3d');
    $("#submitOrder").text("提交订单");
    isSubmit=true;
    pubPopHide($(this));
});

//提交订单错误提示框确定事件
$(".pop-12 .sure").bind('click',function(){
    isSubmit=true;
    $("#submitOrder").css("background","#e43a3d");
    $("#submitOrder").text("提交订单");
    pubPopHide($(this));
});

//预售商品订金不退回弹框 确认事件
$(".pop-13 .sure").bind('click',function(){
    //设置协议选择状态
    $(".presaleAgree").find("label").attr("data-switch","on");
    $(".presaleAgree").find("label").attr("class","cur");
    pubPopHide($(this));
    isSkipPresellAgreement = true;
    isSubmit= true;
    //继续提交订单
    submitOrder();
});
//礼品卡自动粘贴
$("#lpkpw1").bind('paste',function(event){
    var pastedText ='';
    if (window.clipboardData && window.clipboardData.getData) { // IE
        pastedText = window.clipboardData.getData('Text');
    } else {
        pastedText = event.originalEvent.clipboardData.getData('Text');
    }
    pastedText = $.trim(pastedText);
    if(pastedText != '' && pastedText.length == 16){
        $("#lpkpw1").val(pastedText.substring(0,4));
        $("#lpkpw2").val(pastedText.substring(4,8));
        $("#lpkpw3").val(pastedText.substring(8,12));
        $("#lpkpw4").val(pastedText.substring(12,16));
    }
    return true;
})

$("#submitOrder").off('mouseenter');
$("#submitOrder").undelegate('mouseenter');

//支付密码是否校验成功
var isCheckPayPassword = false;
//支付密码是否校验成功
var checkPayPassword = '';

var isShowAddress = false;

/**
 * 加载收货地址列表<br>
 */
function loadAddress(isLoadCoupon,isLoadGoods){
    $.ajax({
        url:'/order/getUserAddress.htm',
        cache:false,
        dataType:'html',
        success:function(data){
            $("#addressListDiv").empty();
            $("#addressListDiv").html(data);
            autoSelectAddress();
            if($(".addressList li").length > 3){
                var thisObj = $("#addressListDiv .addressMore");
                var flag = thisObj.attr('flag');
            	if(isShowAddress){//展示
                    if(flag=='off'){
                        thisObj.attr('flag','on');
                        $('.addressList').css('height','auto');
                        thisObj.find('i').addClass('on');
                        thisObj.find('span').text('收起收货地址');
                        isShowAddress = true;
                    }
				}else{
            		if(flag != 'off'){
                        thisObj.attr('flag','off');
                        $('.addressList').css('height','180px');
                        thisObj.find('i').removeClass('on');
                        thisObj.find('span').text('展开收货地址');
                        isShowAddress = false;
					}else{
                        //移动选择的收货地址到第一位
                        var selectAddressId = $("#selectAddressId").val();
                        if(selectAddressId != undefined){
                            var selectAddres = $(".addressList li[data-addrid="+selectAddressId+"]");
                            var index = selectAddres.index();
                            if(index > 2){
                                var isDefault = selectAddres.attr("defaultaddress");
                                if(isDefault){
                                    selectAddres.insertBefore($(".addressList li").eq(1));
                                }else{
                                    selectAddres.insertBefore($(".addressList li").eq(0));
                                }
                            }
                        }
                    }
				}
			}
			if(isLoadGoods){
                //加载商品信息
                loadGoods(isLoadCoupon);
            }
        }
    });
}
/**
 * 自动选择地址<br>
 */
function autoSelectAddress(){
	var checkAddressId = 0;
	//选择地址id
	var selectAddressId = $("#selectAddressId").val();
    //默认收货地址id
	var defaultaddress = 0;
	//第一个收货地址id
    var fristAddressId = 0;
	$(".addressList li").each(function (index,item) {
        var addressId = $(item).attr("data-addrid");//收货地址id
        if(addressId == selectAddressId){
            checkAddressId = addressId;
            return false;
        }
        if(index == 0){
            fristAddressId = addressId;
        }
        if( $(item).attr("defaultaddress") =='true'){
            defaultaddress = addressId;
		}
    });
    if(checkAddressId == 0){
        checkAddressId = defaultaddress == 0?fristAddressId:defaultaddress;
	}
    $("#selectAddressId").val(checkAddressId);
    var addressItem = $("li[data-addrid="+checkAddressId+"]");

    $("#regionId").val(addressItem.attr("rgnregionid"));
    $("li[data-addrid="+checkAddressId+"]").addClass('default').siblings().removeClass('default');
    if(checkAddressId >0){
        var addressname = addressItem.attr("addressname")+addressItem.attr("addressmore");
        $("#settlConsigneeInfo").text(addressItem.attr("addressconsignee"));
        $("#settlMobleInfo").text(addressItem.attr("addressmobile"));
        $("#settlAddressInfo").text(addressname);
        $("#settlAddress").show();
        $("#settlConsignee").show();
        //设置地址的cookie信息
        setAddressCookie($("#regionId").val(),checkAddressId);
	}else{
        $("#settlAddress").hide();
        $("#settlConsignee").hide();
	}
}

/**
 * 清空编辑地址弹框信息<br>
 */
function clearAddressInfo(){
    $("#addaddressid").val('');
    $("#addrTextarea").val('');
    $("#addressconsignee").val('');
    $("#addressmobile").val('');
    $("#addressphone").val('');
    $("#addressPhoneAfter").val('');
	//设置省信息
	$(".selectArea b").eq(0).attr("pid",'');
	$(".selectArea b").eq(0).text('请选择省市区');
	//设置省信息
	$(".selectArea b").eq(1).attr("pid",'');
	$(".selectArea b").eq(1).text('');
	//设置省信息
	$(".selectArea b").eq(2).attr("pid",'');
	$(".selectArea b").eq(2).text('');
	$(".selectedBox a").eq(0).attr("pid",'1');
	$(".selectedBox em").eq(0).text('请选择省');
	$(".selectedBox a").eq(1).attr("pid",'');
	$(".selectedBox em").eq(1).text('请选择市');
	$(".selectedBox a").eq(2).attr("pid",'');
	$(".selectedBox em").eq(2).text('请选择县/区');
    $("#addressTitleDiv").text("新增收货地址");
}
/**
 * 编辑地址初始化地址信息<br>
 */
function initAddressInfo(thisObj){
	//收货地址id
    $("#addaddressid").val(thisObj.attr("data-addrid"))
    //收货人名称
    var addressConsignee = thisObj.attr("addressconsignee");
    //详细地址
    var addressMore = thisObj.attr("addressMore");
    //手机号
    var addressMobile = thisObj.attr("addressMobile");
    //固定电话
    var addressPhone = $.trim(thisObj.attr("addressPhone"));

    //地址名称
    var addressName = thisObj.attr("addressName");
    $("#addrTextarea").val(addressMore);
    $("#addressconsignee").val(addressConsignee);
    $("#addressmobile").val(addressMobile);
    $("#addressmobile").attr("original",addressMobile);
    if(addressPhone != ''){
        var addressPhones = addressPhone.split("-");
        if(addressPhones.length >1){
            $("#addressphone").val(addressPhones[0]);
            $("#addressPhoneAfter").val(addressPhones[1]);
        }else{
            $("#addressPhoneAfter").val(addressPhone);
        }
    }else{
        $("#addressphone").val('');
        $("#addressPhoneAfter").val('');
    }
    //区域id
    var regionId = thisObj.attr("rgnregionid");
    var cityId = getParentId(regionId);
    var provinceId = getParentId(cityId);

    if(regionId != undefined || regionId != ''){
        var provinceName = getNodeName(provinceId);
        var cityName = getNodeName(cityId);
        var regionName = getNodeName(regionId);
    	//设置省信息
    	$(".selectArea b").eq(0).attr("pid",provinceId);
        $(".selectArea b").eq(0).text(provinceName);
        //设置省信息
        $(".selectArea b").eq(1).attr("pid",cityId);
        $(".selectArea b").eq(1).text(cityName);
        //设置省信息
        $(".selectArea b").eq(2).attr("pid",regionId);
        $(".selectArea b").eq(2).text(regionName);

        $(".selectedBox a").eq(0).attr("pid",provinceId);
        $(".selectedBox em").eq(0).text(provinceName);
        $(".selectedBox a").eq(1).attr("pid",cityId);
        $(".selectedBox em").eq(1).text(cityName);
        $(".selectedBox a").eq(2).attr("pid",regionId);
        $(".selectedBox em").eq(2).text(regionName);
	}
    $("#addressTitleDiv").text("修改收货地址");
}

/**
 * 加载商品<br>
 * @param isLoadCoupon 是否加载优惠券 true：加载 false：否
 */
function loadGoods(isLoadCoupon){
	//区域id
    var regionId = $.trim($("#regionId").val());
    //购物车提示的无货赠品
    var cartStockoutGifts =  $.trim($("#cartStockoutGifts").val());

    var goodsId =  $.trim($("#goodsId").val());
    var count =  $.trim($("#count").val());
    var preSellProduct =  $.trim($("#preSellProduct").val());
	$.ajax({
		url:"/order/loadGoodsList.htm",
		dataType:'json',
		type:'get',
        cache:false,
		data:{regionId:regionId,stockoutGifts:cartStockoutGifts,goodsId:goodsId,goodsCount:count,preSellProduct:preSellProduct},
		success:function(data){
			if(data.code == '0'){//加载成功
                var reData = data.data;

                //渲染店铺中的商品信息
                var shopHtml = renderShopGoods(reData.shopItems);
                $("#shopInfos").empty();
                $("#shopInfos").html(shopHtml);

                //不可用商品渲染
                var unableProducts = reData.unableProducts;
                if(unableProducts != undefined && typeof (unableProducts) != 'undefined'){
                    $(".pop-5 ul").empty();
                    $(".pop-5 ul").html(renderUnableProduct(unableProducts));
                    $("#unableProductCount").val(unableProductCount);
                    //设置标题
                    $(".pop-5 .title1 span").text(reData.unableTitle);
                }

                //运营停发
                var stopTypeWeatherProducts = reData.stopTypeWeatherProducts;
                if(stopTypeWeatherProducts != undefined && typeof (stopTypeWeatherProducts) != 'undefined'){
                    $(".pop-6 ul").empty();
                    $(".pop-6 ul").html(renderStopTypeWeatherProducts(stopTypeWeatherProducts));
                    $("#stopTypeWeatherProductCount").val(topTypeWeatherProductCount);
                    if(reData.stopTypeWeatherTitle != undefined){
                        date = new Date(reData.stopTypeWeatherDate);
					}
					//运营停发标题
                    $(".pop-6 .pubInsideTitle span").html(reData.stopTypeWeatherTitle);
                }

                //赠品无货
                var noStockGifts = reData.noStockGifts;
                if(noStockGifts != undefined && typeof (noStockGifts) != 'undefined'){
                    $(".pop-7 ul").empty();
                    $(".pop-7 ul").html(renderNoStockGifts(noStockGifts));
                    $("#noStockGiftCount").val(noStockGiftsCount);
                    //设置标题
					$(".pop-7 .title1 span").text(reData.noStockGiftsTitle);
                }

                //快递停发
                var stopTypeDeliveryProducts = reData.stopTypeDeliveryProducts;
                if(stopTypeDeliveryProducts != undefined && typeof (stopTypeDeliveryProducts) != 'undefined'){
                    $(".pop-8 ul").empty();
                    $(".pop-8 ul").html(renderStopTypeDeliveryProducts(stopTypeDeliveryProducts));
                    //快递停发标题
                    $(".pop-8 .pubInsideTitle span").html(reData.stopTypeDeliveryTitle);
                    $("#stopTypeDeliveryProductCount").val(stopTypeDeliveryProductsCount);
                }

                $("#allCheckedIsJxDelivery").val(reData.allCheckedIsJxDelivery);
                $("#supportCashOnDelivery").val(reData.supportCashOnDelivery);
                $("#totalPrice").val(reData.totalPrice);
                $("#totalPriceInfo").text("￥"+parseFloat(reData.totalPrice).toFixed(2));
                $("#goodsCountInfo").text(goodsCount);

                var settlementType = $("#settlementType").val();
                if(settlementType == 1){
                    $("#discountPrice").val(0);
                }else{
                    $("#discountPrice").val(reData.discountPrice);
                }
                var discountPrice = 0;
                if($("#discountPrice").val() != undefined && typeof ($("#discountPrice").val()) != 'undefined'){
                    discountPrice = parseFloat($("#discountPrice").val());
                }
                if(discountPrice > 0) {
                    $("#settlDiscountPrice").show();
                    $("#discountPriceInfo").text("-￥"+parseFloat(discountPrice).toFixed(2));
                } else {
                    $("#settlDiscountPrice").hide();
                }

                //刷新支付方式
                refreshPayWayAndInvoice();

                //设置余额和返现是否可用
                var isPayPassword = $.trim($("#isPayPassword").val())
                var allCheckedIsJxDelivery = $.trim($("#allCheckedIsJxDelivery").val());

                if(isPayPassword == 'true' && allCheckedIsJxDelivery == 'true'){
                    $("#cashbackDiv .balanceTitle").hide();
                	//设置返现
                	if($.trim($("#backPrice").val()) != '' && $("#backPrice").val() > 0){
                        $("#cashbackDiv label").removeClass("unavailable");
                        $("#cashbackDiv input").removeAttr("disabled");
                        $(".tabNav a").eq(2).find("i").show();
                        $(".cashbackTitle").hide();
					}else{
                        $("#cashbackDiv label").addClass("unavailable");
                        $("#cashbackDiv input").attr("disabled");
                        $("#cashbackInput").val(0);
                        $(".tabNav a").eq(2).find("i").hide();
                        $("#cashbackDiv .pressSum").hide();
                        $(".cashbackTitle").show();
                        $(".cashbackTitle span").text('当前无返现可用');
					}
				}else{
                	//设置余额和返现不可用
                    $("#cashbackDiv label").addClass("unavailable");
                    $("#cashbackDiv input").attr("disabled");
                    $("#cashbackInput").val(0);
                    $(".tabNav a").eq(2).find("i").hide();
                    $("#cashbackDiv .pressSum").hide();
                    $(".cashbackTitle").show();
                    var cashbackText = '';
                    //返现
                    if($.trim($("#backPrice").val()) == '' || $("#backPrice").val() <=0){
                        cashbackText = '当前无返现可用';
                        $("#cashbackDiv .balanceTitle").hide();
                    }else if(isPayPassword != 'true'){
                        $("#cashbackDiv .balanceTitle").show();
                        $(".cashbackTitle").hide();
                    }else{
                        $("#cashbackDiv .balanceTitle").hide();
                        cashbackText = "非酒仙配送商品不支持使用返现";
                    }
                    $(".cashbackTitle span").text(cashbackText);
				}

				//设置预售信息
                if(reData.orderPresell != undefined){
                    //膨胀总金额
                    var swellingTatolPrice = reData.orderPresell.swellingPrice;
                    //尾款支付总金额
                    var tailTatolPayPrice = reData.orderPresell.tailPayPrice;
                    //订金支付总金额
                    var firstTatolPayPrice = reData.orderPresell.firstPayPrice;
                    $("#swellingTatolPrice").val(swellingTatolPrice);
                    $("#firstPayPrice").val(firstTatolPayPrice);
                    $("#tailTatolPrice").val(tailTatolPayPrice);
                    //设置尾款时间
                    var tailPayStartTime = reData.orderPresell.tailPayStartTime;
                    var tailPayEndTime = reData.orderPresell.tailPayEndTime;
                    if(tailPayStartTime != undefined && tailPayEndTime != undefined){
                        var startTime = new Date(tailPayStartTime).format("MM月dd日 hh:mm");
                        var endTime = new Date(tailPayEndTime).format("MM月dd日 hh:mm");
                        $(".payTailTime").text(startTime +"-"+endTime+"支付尾款");
                    }
                }
                //加载优惠券
                loadCoupons(isFrist?0:-1,0);
				//如果有店铺商品支持礼品卡和礼品订单
                var allCheckedIsJxDelivery = $("#allCheckedIsJxDelivery").val();
				if(allCheckedIsJxDelivery == 'false' || allCheckedIsJxDelivery == false){
				    //处理礼品订单
                    $("#giftOrderInfo label").addClass("unSelect");
                    $("#giftOrderInfo label").parent().siblings(".redioHidden").hide();
                    $("#giftOrderInfo label").parent().siblings(".pubTitle").find(".pubFloat span").text('非酒仙配送商品不支持礼品订单');
                    $("#isGiftOrder").val(0);
                    //处理礼品卡
                    $("#giftCardShow").hide();
                    $("#giftCardHide").show();
                    $("#giftCardInfoBody").empty();//清空礼品卡
                    $(".tabNav a").eq(3).find("i").hide();
                }else{
				    //处理礼品订单
                    $("#giftOrderInfo label").removeClass("unSelect");
                    $("#giftOrderInfo label").parent().siblings(".pubTitle").find(".pubFloat span").text('礼品订单不支持发票、不支持货到付款，商品清单不显示价格');
                    $("#giftCardShow").show();
                    $("#giftCardHide").hide();
                }
			}else if(data.code == '10001'){
                location.href = domain_number + '/login.htm?from='+domain_order+'/order/confirm.htm';
            }else if(data.code == '10002'){
			    location.href ='/error.htm';
			}else{//加载失败
				alert("加载商品信息失败，稍后重试!");
			}
		}
	});
}
/**
 * 渲染店铺信息<br>
 * @param shopGoods
 */
function renderShopGoods(shopItems){
    var htmlText = '';
    goodsCount=0;
    for(var i = 0;i< shopItems.length;i++){
        var shopItem = shopItems[i];
        var shopInfo = shopItem.shop;
        var iconClass = shopInfo.jxself?'jxzy':'shop';
        var shopRul = "";
        if(!shopInfo.jxself){
            shopRul = 'href="http://shop.jiuxian.com/index-'+shopInfo.id+'.htm" target="_blank"';
        }
    	htmlText = htmlText + '<div class="tBody"><div class="shopTitle"><a '+shopRul+'><i class="orderIcon '+iconClass+'"></i><span>'+shopInfo.name+'</span></a></div><div class="tMain">';
        var skus = shopItem.skus;
        for(var j=0; j< skus.length;j++){
            var sku = skus[j];
        	//商品信息
            var productItems = sku.productItemList;
            htmlText += renderGoods(productItems);
            //赠品信息
            var giftList = sku.giftList;
            htmlText += renderGoods(giftList);
		}
        htmlText = htmlText +'</div></div>';
	}
	return htmlText;
}

/**
 * 渲染商品信息
 * @param productItems
 * @returns {string}
 */
var goodsCount = 0;
function renderGoods(productItems){
    var htmlText = '';
    if(productItems == undefined || typeof (productItems) == 'undefined' || productItems =='null'){
    	return htmlText;
	}
	for(var i =0; i < productItems.length; i++){
        goodsCount++;
        var productItem = productItems[i];
		var price = parseFloat(productItem.price).toFixed(2);
        var totalPrice = parseFloat(productItem.totalPrice).toFixed(2);

        //商品标签
        var promoLabel='';
        if(productItem.promoLabel != undefined && typeof (productItem.promoLabel) != 'undefined' && productItem.promoLabel.length >0){
            promoLabel = '【'+productItem.promoLabel+'】';
		}

		//商品是否可用
		var isAvailable = true;
        //状态标签
        var stateLabel = '有货';
        //副标题
        var titleLabel = '';

        if(productItem.stateLabel != '有货'){
            stateLabel = productItem.stateLabel;
            isAvailable = false;
		}else if(!productItem.onSale){
            stateLabel ='已下架';
            isAvailable = false;
        }
        if(productItem.titleLabel == '不支持本端购买'){
            titleLabel ='<div class="unStand"><i class="orderIcon"></i><span>'+productItem.titleLabel+'</span></div>';
            isAvailable = false;
        }else if(productItem.titleLabel != '' && productItem.titleLabel != 'null' && productItem.titleLabel !=null){
            titleLabel ='<div class="unStand"><i class="orderIcon"></i><span>'+productItem.titleLabel+'</span></div>';
		}
		//判断是否禁用优惠券
		if(productItem.disableCoupon=='true' || productItem.disableCoupon == true){
            titleLabel +='<div class="unUsed"><i class="orderIcon"></i><span>此商品不能使用优惠券</span></div>';
        }
        //判断是否甄选商品 true:是
        var zhenxuanLabel = "";
        if(typeof (productItem.jxLabels) != 'undefined' && productItem.jxLabels !='null' && productItem.jxLabels.length >0){
            for(var j =0; j < productItem.jxLabels.length; j++){
                if(productItem.jxLabels[j] == 'SELECTION'){
                    zhenxuanLabel = '<img class="zhenxuan" src="'+domain_misc+'/ordernew/pc/images/zx.jpg">';
                    break;
                }
            }
        }
		var specialClass = isAvailable?'':'special';
		htmlText = htmlText +
			'<div class="oTr">'
				+'<div class="mainProduct '+specialClass+'">'
				  	+'<div class="oTd item-1">'
						+'<div class="img"><a href="'+domain_detail+'/goods-'+productItem.productId+'.html" target="_blank"><img src="'+productItem.imgUrl+'" width="60" height="60" /></a></div>'
						+'<div class="name"><a href="'+domain_detail+'/goods-'+productItem.productId+'.html" target="_blank" style="text-align: left;">'+zhenxuanLabel+promoLabel+productItem.productName+'</a><div class="promptBox">'+titleLabel+'</div></div>'
					+'</div>'
					+'<div class="oTd item-2">￥'+price+'</div>'
					+'<div class="oTd item-3">x'+productItem.totalNum+'</div><div class="oTd item-4">'+stateLabel+'</div><div class="oTd item-5">￥'+totalPrice+'</div>'
                +'</div>'
            +'</div>';
	}
	return htmlText;
}


/**
 * 渲染不可用商品列表<br>
 */
var unableProductCount=0;
function renderUnableProduct(unableProducts){
	var htmlText = '';
	if(unableProducts == undefined || typeof (unableProducts) == 'undefined'){
		return htmlText;
	}
    unableProductCount=0;
	for(var productId in unableProducts){
        unableProductCount++;
        var prodcutInfo = unableProducts[productId];
        var stateLabel = '';
        if($.trim(prodcutInfo.stateLabel) != ''){
            stateLabel = "<span>"+prodcutInfo.stateLabel+"</span>";
		}
        var promoLabel='';
        if(prodcutInfo.promoLabel != undefined && typeof (prodcutInfo.promoLabel) != 'undefined' && prodcutInfo.promoLabel.length >0){
            promoLabel = '【'+prodcutInfo.promoLabel+'】';
        }
        htmlText = htmlText+
			'<li>'
				+'<div class="img"><img src="'+prodcutInfo.imgUrl+'" width="60" height="60" />'+stateLabel+'</div>'
				+'<div class="nameRight">'
					+'<div class="proName"><a href="'+domain_detail+'/goods-'+prodcutInfo.productId+'.html" target="_blank">'+promoLabel+prodcutInfo.productName+'</a></div>'
					+'<div class="proBottom">'+$.trim(prodcutInfo.titleLabel)+'</div>'
				+'</div>'
            +'</li>';
	}
	return htmlText;
}

/**
 * 渲染运营停发商品列表<br>
 */
var topTypeWeatherProductCount = 0;
function renderStopTypeWeatherProducts(stopTypeWeatherProducts){
    var htmlText = '';
    if(stopTypeWeatherProducts == undefined || typeof (stopTypeWeatherProducts) == 'undefined'){
        return htmlText;
    }
    topTypeWeatherProductCount=0
    for(var productId in stopTypeWeatherProducts){
        topTypeWeatherProductCount++;
        var prodcutInfo = stopTypeWeatherProducts[productId];
        var promoLabel='';
        if(prodcutInfo.promoLabel != undefined && typeof (prodcutInfo.promoLabel) != 'undefined' && prodcutInfo.promoLabel.length >0){
            promoLabel = '【'+prodcutInfo.promoLabel+'】';
        }
        htmlText = htmlText+
            '<li>'
				+'<div class="img"><img src="'+prodcutInfo.imgUrl+'" width="60" height="60"/></div>'
				+'<div class="nameRight">'
				+'<div class="proName"><a href="'+domain_detail+'/goods-'+prodcutInfo.productId+'.html" target="_blank">'+promoLabel+prodcutInfo.productName+'</a></div>'
				+'</div>'
			+'</li>';
    }
    return htmlText;
}

/**
 * 渲染无货赠品<br>
 * @param noStockGifts
 */
var noStockGiftsCount = 0;
function renderNoStockGifts(noStockGifts){
    var htmlText = '';
    if(noStockGifts == undefined || typeof (noStockGifts) == 'undefined'){
        return htmlText;
    }
    var stockoutGifts = '';
    noStockGiftsCount=0;
    for(var productId in noStockGifts){
        noStockGiftsCount++;
        var prodcutInfo = noStockGifts[productId];
        if(stockoutGifts != ''){
            stockoutGifts += ',';
		}
        stockoutGifts += prodcutInfo.productId;
        $("#stockoutGifts").val(stockoutGifts);
        var promoLabel='';
        if(prodcutInfo.promoLabel != undefined && typeof (prodcutInfo.promoLabel) != 'undefined' && prodcutInfo.promoLabel.length >0){
            promoLabel = '【'+prodcutInfo.promoLabel+'】';
        }
        htmlText = htmlText+
            '<li>'
				+'<div class="img"><img src="'+prodcutInfo.imgUrl+'" width="60" height="60"/></div>'
					+'<div class="nameRight">'
					+'<div class="proName"><a href="'+domain_detail+'/goods-'+prodcutInfo.productId+'.html" target="_blank">'+promoLabel+prodcutInfo.productName+'</a></div>'
				+'</div>'
			+'</li>';
    }
    return htmlText;
}

/**
 * 渲染快递停发<br>
 * @param noStockGifts
 */
var stopTypeDeliveryProductsCount = 0;
function renderStopTypeDeliveryProducts(stopTypeDeliveryProducts){
    var htmlText = '';
    if(stopTypeDeliveryProducts == undefined || typeof (stopTypeDeliveryProducts) == 'undefined'){
        return htmlText;
    }
    stopTypeDeliveryProductsCount=0;
    for(var productId in stopTypeDeliveryProducts){
        stopTypeDeliveryProductsCount++;
        var prodcutInfo = stopTypeDeliveryProducts[productId];
        var promoLabel='';
        if(prodcutInfo.promoLabel != undefined && typeof (prodcutInfo.promoLabel) != 'undefined' && prodcutInfo.promoLabel.length >0){
            promoLabel = '【'+prodcutInfo.promoLabel+'】';
        }
        htmlText = htmlText+
            '<li>'
				+'<div class="img"><img src="'+prodcutInfo.imgUrl+'" width="60" height="60"/></div>'
					+'<div class="nameRight">'
					+'<div class="proName"><a  href="'+domain_detail+'/goods-'+prodcutInfo.productId+'.html" target="_blank">'+promoLabel+prodcutInfo.productName+'</a></div>'
				+'</div>'
            +'</li>';
    }
    return htmlText;
}

/**
 * 刷新支付方式
 */
function refreshPayWayAndInvoice(){

    //是否礼品订单 1：是
    var isGiftOrder = $.trim($("#isGiftOrder").val());
    //订单类型 0：普通订单 1：预售订单
    var settlementType = $.trim($("#settlementType").val());

    if(settlementType == 1){
        //设置支付方式为在线支付
        $(".payMent .item").eq(1).addClass("noSelect").removeClass("cur");
        $(".payMent .item").eq(0).addClass("cur");
        $(".payMent .item").eq(1).find(".payPrompt").text('预售商品不支持货到付款。');
    }else if(isGiftOrder == '1'){
        //设置发票不可用
        $("#invoiceInfo label").removeClass("selected").parent().siblings(".redioHidden").hide();
        $("#invoiceInfo label").addClass("unSelect");
        $("#isInvoice").val(0);

        //设置支付方式为在线支付
        $(".payMent .item").eq(1).addClass("noSelect").removeClass("cur");
        $(".payMent .item").eq(0).addClass("cur");
        $(".payMent .item").eq(1).find(".payPrompt").text('所选商品或所在地区不支持货到付款。');
    }else{
        //商品是否支持货到付款
        var supportCashOnDelivery = $.trim($("#supportCashOnDelivery").val());
        //判断地区新疆西藏不支持货到付款
        var selectAddressId = $("#selectAddressId").val();
        var regionId = $(".addressList li[data-addrid="+selectAddressId+"]").attr("rgnregionid");
        var isRegionSupport = true;
        if(regionId != undefined){
            var cityId = getParentId(regionId);
            if(cityId != undefined){
                var provinceId = getParentId(cityId);
                if(provinceId == 28 || provinceId == 29){
                    isRegionSupport = false;
                }
            }
        }
        //支持
        if(supportCashOnDelivery == 'true' && isRegionSupport){
            $(".payMent .item").eq(1).removeClass("noSelect");
            $(".payMent .item").eq(1).find(".payPrompt").text('支持送货上门后再付款，使用现金或刷银行卡，免手续费。');
        }else{//不支持
            $(".payMent .item").eq(1).addClass("noSelect").removeClass("cur");
            $(".payMent .item").eq(0).addClass("cur");
            $(".payMent .item").eq(1).find(".payPrompt").text('所选商品或所在地区不支持货到付款。');
        }
        //发票可选
        $("#invoiceInfo label").removeClass("unSelect");
        //是否支持电子发票
        var isSupportEinvoice = true;
        var allCheckedIsJxDelivery = $("#allCheckedIsJxDelivery").val();
        if(allCheckedIsJxDelivery == 'false'){//不全是酒仙发货不支持电子发票
            isSupportEinvoice = false;
        }else{
            //收货地址
            var addressId = $("#selectAddressId").val();
            //没选择收货地址
            if(addressId == undefined || typeof (addressId) == 'undefined'){
                isSupportEinvoice = false;
            }else{
                //判断地址是否支持电子发票
                var supporteinv = $(".addressList li[data-addrid="+addressId+"]").attr("supporteinv");
                if(supporteinv != 'true'){
                    isSupportEinvoice = false;
                }
            }
        }
        //是否已选择发票 0：未选择 1：选择
        var isInvoice = $("#isInvoice").val();
        if(isSupportEinvoice && isInvoice == 0){
            $("#invoiceKindsDiv .item").eq(1).removeClass("noSelect");
            $("#invoiceKindsDiv .item").eq(1).addClass("cur");
            $("#invoiceKindsDiv .item").eq(0).removeClass("cur");
            $("#invPhone").show();
        }else if(!isSupportEinvoice){
            $("#invoiceKindsDiv .item").eq(1).addClass("noSelect");
            $("#invoiceKindsDiv .item").eq(1).removeClass("cur");
            $("#invoiceKindsDiv .item").eq(0).addClass("cur");
            $("#invPhone").hide();
            var invoiceKinds = $("#invoiceKinds").val();
            if(invoiceKinds == 1){
                $("#invoiceKinds").val(2);
                $("#invoiceMobile").val('');
                $(".invoiceField span").eq(0).text('纸质发票');
            }

        }
    }
}
//优惠券滚动条位置
var scrollTop = 0;
/**
 *
 * 加载优惠券列表<br>
 * @param isLoadFreight 是否加载运费
 */
function loadCoupons(selectedId,type){
    scrollTop = $("#availableCoupons").scrollTop();
    //地址ID
    var regionId = 500;
    var selectAddressId = $("#selectAddressId").val();
    if(selectAddressId != undefined && selectAddressId != ''){
        var selectRegionId = $(".addressList li[data-addrid="+selectAddressId+"]").attr("rgnregionid");
        if(selectRegionId != undefined && selectRegionId != ''){
            regionId = selectRegionId;
        }
    }
    var checkCouponIds = $("#checkCouponIds").val();
    //预售订单
    var goodsId = $("#goodsId").val();
    var goodsCount = $("#count").val();
    //是否使用津贴
    var useAllowance = $("#useAllowance").val();
    var preSellProduct = $("#preSellProduct").val();
    $.ajax({
        url:'/order/searchCoupon.htm',
        dataType:'html',
        cache:false,
		data:{regionId:regionId,selectedIds:checkCouponIds,selectedId:selectedId,isCheck:type,useAllowance:useAllowance,goodsId:goodsId,goodsCount:goodsCount,preSellProduct:preSellProduct},
        success:function(data){
            $("#couponListDiv").empty();
            $("#couponListDiv").html(data);
            if(scrollTop == undefined){
                scrollTop = 0;
            }
            $("#availableCoupons").scrollTop(scrollTop);
            var availableCouponCount = $.trim($("#availableCouponCount").val());
            if(availableCouponCount != '' && parseFloat(availableCouponCount) > 0){
            	$(".tabNav a").eq(0).find('i').show();
			}else{
                $(".tabNav a").eq(0).find('i').hide();
			}
            //津贴
            var allAllowanceCount = $("#allAllowanceCount").val();
            if(allAllowanceCount != undefined && parseInt(allAllowanceCount) > 0){
                $(".tabNav a").eq(1).find("i").show();
            }else{
                $(".tabNav a").eq(1).find("i").hide();
            }
            var useAllowanceCount = $("#useAllowanceCount").val();
            if(useAllowanceCount != undefined && parseInt(useAllowanceCount) > 0){
                $("#useAllowance").val(1);
                $("#showJT label").addClass("selected");
            }
			//刷新价格
            refreshPrice();
        }
    });
}

/**
 * 渲染运费<br>
 */
function renderFreight(){
    var freightPrice = $("#totalFreightPrice").val();
    if(freightPrice == undefined){
        freightPrice = 0;
    }
    if(freightPrice == 0){
        $("#settlFreight").removeClass("yf_div");
        $("#shopFreightInfo").removeClass("shopPop");
    }else{
        $("#settlFreight").addClass("yf_div");
        $("#shopFreightInfo").addClass("shopPop");
    }
    $("#freightPriceInfo").text("+￥"+parseFloat(freightPrice).toFixed(2));
}
/**
 * 刷新红包信息<br>
 */
function refreshCouponInfo(){

    //商品优惠券显示
    var couponCount = $("#couponCount").val();
    var price = $("#couponDisCountPrice").val();
    if(couponCount == undefined || price == undefined || couponCount <= 0){
        $("#settlConponPrice").hide();
    }else{
        $("#settlConponPrice").show();
        $("#couponPriceInfo").text("-￥"+parseFloat(price).toFixed(2));
    }
    $("#couponCountShow").empty();
    $("#couponCountShow").html('优惠券'+couponCount+'张，优惠<span  class="yellow">'+parseFloat(price)+'元</span>');
    $("#_discountPriceShow").text(parseFloat(price)+'元');

    //运费优惠券显示
    var lgsCouponCount = $("#lgsCouponCount").val();
    var lgsCouponPrice = $("#lgsCouponPrice").val();
    if(lgsCouponCount == undefined || lgsCouponPrice == undefined || lgsCouponCount <= 0){
        $("#settlLgsCouponPrice").hide();
    }else{
        $("#settlLgsCouponPrice").show();
        $("#lgsPriceInfo").text("-￥"+parseFloat(lgsCouponPrice).toFixed(2));
    }
    $("#lgsCouponShow").empty();
    $("#lgsCouponShow").html('免邮券'+lgsCouponCount+'张，优惠<span  class="yellow">'+parseFloat(lgsCouponPrice)+'元</span>');
    $("#lgsDiscountPriceShow").text(parseFloat(lgsCouponPrice)+'元');

}
//是否第一次刷新
var isFrist = true;
/**
 * 刷新金额信息<br>
 * 包含红包、返现、礼品卡和余额金额
 * 优先计算红包金额（不减运费），计算津贴，再减返现（不减运费）、再减礼品卡（可减运费）、再减余额金额（可减运费）
 */
function refreshPrice(){
	var tmpPrice = 0;
	//商品总金额
	var productTotalPrice = 0;
	if($("#totalPrice").val() != undefined && typeof ($("#totalPrice").val()) != 'undefined'){
		productTotalPrice = parseFloat($("#totalPrice").val());
	}
	//应付金额
	var payablePrice = productTotalPrice;
	//优惠金额
	var discountPrice = 0;
    if($("#discountPrice").val() != undefined && typeof ($("#discountPrice").val()) != 'undefined'){
        discountPrice = parseFloat($("#discountPrice").val());
    }
    tmpPrice = payablePrice;
    //减去优惠金额
    payablePrice = parseFloat(parseFloat(payablePrice - discountPrice).toFixed(2));
    if(payablePrice <0){//如果应付金额小于0 优惠金额等于商品金额
        payablePrice = 0;
        discountPrice = tmpPrice;
	}
	//红包优惠金额
    var couponDisCountPrice = 0;
    //红包运费优惠金额
    var lgsCouponPrice = 0;
    //减红包金额
    if(payablePrice > 0){//设置红包金额
        if($("#couponDisCountPrice").val() != undefined && typeof ($("#couponDisCountPrice").val()) != 'undefined'){
            couponDisCountPrice = parseFloat($("#couponDisCountPrice").val());
		}
        tmpPrice = payablePrice;
        payablePrice = parseFloat(parseFloat(payablePrice - couponDisCountPrice).toFixed(2));
        if(payablePrice < 0){
            payablePrice = 0;
            couponDisCountPrice = tmpPrice;
            $("#couponDisCountPrice").val(couponDisCountPrice);
		}
	}
	//获取运费券优惠金额
    if($("#lgsCouponPrice").val() != undefined && typeof ($("#lgsCouponPrice").val()) != 'undefined'){
        lgsCouponPrice = parseFloat($("#lgsCouponPrice").val());
    }
	if(couponDisCountPrice <= 0){
    	$("#couponCountShow").hide();
	}else{
        $("#couponCountShow").show();
	}
	//运费券文案显示
    if(lgsCouponPrice <= 0){
        $("#lgsCouponShow").hide();
    }else{
        $("#lgsCouponShow").show();
    }
    //刷新红包信息
    refreshCouponInfo();

    /** 使用津贴*/
    // 使用的总数量
    var allAllowanceCount = $("#allAllowanceCount").val();

    //使用津贴金额
    var useJinTePrice = 0;
    //判断津贴是否可用
    if(payablePrice == 0){
        $("#jinteUseShow").hide();
        $("#useAllowance").val(0);
        $("#settlJintiePrice").hide();
        $("#showJT").hide();
        $("#displayJT").show();
        $("#showJT label").removeClass("selected");
        $("#jtUseSpan").hide();

    }else{
        if(allAllowanceCount != undefined && parseInt(allAllowanceCount) > 0){
            $("#displayJT").hide();
            $("#showJT").show();
            $("#jtAllCount").text(allAllowanceCount);
            $("#jtAllPrice").text("￥"+$("#allAllowancePrice").val());

            var useAllowance = $("#useAllowance").val();
            //使用津贴
            if(useAllowance != undefined && parseInt(useAllowance) == 1){
                $("#jtUseCount").text($("#useAllowanceCount").val());
                var useAllowancePrice = $("#useAllowancePrice").val();
                $("#jtUsePrice").text("￥"+useAllowancePrice);
                $("#jtUseSpan").show();

                if((payablePrice - parseFloat(useAllowancePrice)) > 0){
                    useJinTePrice = parseFloat(useAllowancePrice);
                }else{
                    useJinTePrice = payablePrice;
                }
                payablePrice  =  parseFloat(parseFloat(payablePrice - useJinTePrice).toFixed(2));
                $("#jinteUseShow span").text(useJinTePrice + "元");

                var jintieHtml = '津贴'+$("#useAllowanceCount").val()+'张，抵扣金额<span class="yellow">'+parseFloat(useJinTePrice)+'元</span>';
                $("#jinteUseShow").empty();
                $("#jinteUseShow").html(jintieHtml);
                $("#jinteUseShow").show();
                $("#jintiePriceInfo").text("-￥"+parseFloat(useJinTePrice).toFixed(2));
                $("#settlJintiePrice").show();
            }else{//不使用
                $("#jtUseSpan").hide();
                $("#jinteUseShow").hide();
                $("#settlJintiePrice").hide();
                $("#showJT label").removeClass("selected");
                $("#useAllowance").val(0);
            }
        }else{
            $("#displayJT").show();
            $("#showJT").hide();
            $("#jinteUseShow").hide();
            $("#useAllowance").val(0);
            $("#settlJintiePrice").hide();
            $("#jtUseSpan").hide();
        }
    }

	/** 减返现 */
    //剩余返现金额
    var surplusCashBackPrice = 0;
    //使用返现
    var cashbackPrice = 0;
	if(payablePrice == 0){
    	$("#settlBackPrice").hide();
        $("#cashbackInput").val(0);
	}else{
        surplusCashBackPrice = parseFloat($("#backPrice").val())>payablePrice?payablePrice:parseFloat($("#backPrice").val());
        var cashbackInput = $("#cashbackInput").val();
        if(isMoney(cashbackInput)){
        	cashbackPrice = parseFloat(cashbackInput).toFixed(2);
            //返现金额
            var backPrice = parseFloat($("#backPrice").val());
            if(cashbackPrice > backPrice){
                cashbackPrice = backPrice;
                $("#cashbackInput").val(cashbackPrice);
            }
        }
        if(cashbackPrice == 0){
            $("#settlBackPrice").hide();
            $("#cashbackInput").val(0);
		}else{
            tmpPrice = payablePrice;
            payablePrice = parseFloat(parseFloat(payablePrice - parseFloat(cashbackPrice)).toFixed(2));
            if(payablePrice < 0){
                payablePrice = 0;
                cashbackPrice = tmpPrice;
                $("#cashbackInput").val(cashbackPrice);
            }
            $("#backPriceInfo").text("-￥"+parseFloat(cashbackPrice).toFixed(2));
            $("#settlBackPrice").show();
		}
	}
	//设置最大可用返现
	if($("#cashbackDiv .uesBalance label").hasClass('unavailable')){
        $("#surplusCashBackPrice").text("￥0");
	}else{
        $("#surplusCashBackPrice").text("￥"+surplusCashBackPrice);
	}
	if(cashbackPrice <= 0){
		$("#useBackPriceShow").hide();
	}else{
		$("#useBackPrice").text("￥"+parseFloat(cashbackPrice)+"元");
        $("#useBackPriceShow").show();
	}
	/** 加运费*/
    renderFreight();
    var freightPrice = $("#totalFreightPrice").val();
	if(!isMoney(freightPrice)){
        freightPrice = 0;
	}
    payablePrice = parseFloat(parseFloat(payablePrice + parseFloat(freightPrice)).toFixed(2));
    payablePrice = payablePrice - parseFloat(lgsCouponPrice).toFixed(2);
	/** 减礼品卡*/
    giftCardAvailablePrice = payablePrice;
    var totalGiftCardPrice = 0;
    var totalGiftCardCount = 0;
    $("#giftCardInfoBody .gTr-1 label").each(function(index,item){
		var inputItem = $(item);
        var price = inputItem.attr("price");
		if(inputItem.hasClass("selected")){
            if(isMoney(price)){
                price = parseFloat(price);
			}else {
                price = 0;
			}
			var useGiftPrice = 0;//使用金额
			if(payablePrice == 0){
                inputItem.removeClass('selected');
			}else{
                tmpPrice = payablePrice;
                payablePrice = parseFloat(parseFloat(payablePrice - price).toFixed(2));
                if(payablePrice < 0){
                    payablePrice = 0;
                    useGiftPrice =tmpPrice;
				}else{
                    useGiftPrice = price;
				}
                totalGiftCardCount++;
			}
            totalGiftCardPrice = parseFloat(parseFloat(parseFloat(totalGiftCardPrice) + parseFloat(useGiftPrice)).toFixed(2));
            $(item).parent().siblings(".gTr-4").text("￥"+parseFloat(useGiftPrice).toFixed(2)+"元");
		}else{
            $(item).parent().siblings(".gTr-4").text("￥0.00元");
		}
	});
    if(totalGiftCardPrice <=0){
        $("#settlGiftCardPrice").hide();
        $("#giftCardInfoP").hide();
	}else{
        $("#settlGiftCardPrice").show();
        $("#giftCardPriceInfo").text("-￥"+parseFloat(totalGiftCardPrice).toFixed(2));
        $("#giftCardInfoP").show();
        var giftCardInfoP = '<p id="giftCardInfoP">礼品卡'+totalGiftCardCount+'张，金额<span class="yellow">'+parseFloat(totalGiftCardPrice)+'元</span></p>';
        $("#giftCardInfoP").empty();
        $("#giftCardInfoP").html(giftCardInfoP);
	}


	/** 设置抵用金额 */
    var helpPrice = parseFloat(couponDisCountPrice) + parseFloat(useJinTePrice) + parseFloat(lgsCouponPrice) + parseFloat(totalGiftCardPrice) +parseFloat(cashbackPrice);
    $("#discountPriceShow").text("￥"+parseFloat(parseFloat(helpPrice).toFixed(2)));


    //设置预售信息
    if($("#settlementType").val() == 1){
        $(".presaleAgree").show();

        //订金总金额
        var fisrtPrice = $("#firstPayPrice").val();
        //膨胀优惠总金额
        var swellingTatolPrice = $("#swellingTatolPrice").val();
        $("#swellingPriceInfo").text("-￥"+parseFloat(swellingTatolPrice).toFixed(2));
        //尾款总金额
        var tailTatolPrice = $("#tailTatolPrice").val();
        $("#tailPriceInfo").text("￥"+(parseFloat(tailTatolPrice) + parseFloat(freightPrice)).toFixed(2));

        $("#settlTailPrice").show();
        $("#settlSwellingPrice").show();
        $(".presaleAgree").show();
        //订金总金额
        payablePrice = fisrtPrice;
        $(".totleNum").prev().text("应付定金总额：");
        $(".payTailTime").show();
        modifiedGoodsPrice(payablePrice,tailTatolPrice);
    }else{
        $("#settlTailPrice").hide();
        $("#settlSwellingPrice").hide();
        $(".presaleAgree").hide();
        $(".payTailTime").hide();
        $(".presaleAgree").hide();
    }
	/** 设置应付金额*/
	$(".totleNum").text("￥"+parseFloat(payablePrice).toFixed(2));

	//是否有可用的优惠卷、余额、返现，有显示
	if(isFrist){
        isFrist = false;
        var allAllowanceCount = $("#allAllowanceCount").val();
        if($("#availableCouponCount").val() > 0 || !$("#cashbackDiv label").hasClass("unavailable") || (allAllowanceCount != undefined && parseInt(allAllowanceCount) > 0)){
            $("#assets").removeClass("mb20");
            $("#assets > .pubTitle").addClass('tabUp');
            $("#assets > .tabWrap").show();
            if($("#availableCouponCount").val() == 0){
                var useJintie = allAllowanceCount != undefined && parseInt(allAllowanceCount) > 0 ? 1:0;
                if(useJintie == 1){
                    $(".tabCon").children("div").eq(1).siblings().hide();
                    $(".tabCon").children("div").eq(1).show();
                    $(".tabNav a").eq(1).siblings().removeClass("cur")
                    $(".tabNav a").eq(1).addClass("cur");
                }else{
                    $("#cashbackDiv").siblings().hide();
                    $("#cashbackDiv").show();
                    $(".tabNav a").eq(2).siblings().removeClass("cur")
                    $(".tabNav a").eq(2).addClass("cur");
                }

            }
        }
    }
}

/**
 * 设置商品订金和尾款金额<br/>
 * @param firstPrice 订金
 * @param tailPrice 尾款金额
 */
function modifiedGoodsPrice(firstPrice,tailPrice){
    var htmlPrice = '<div class="presaleDeposit"><span>定金</span><em>￥'+parseFloat(firstPrice).toFixed(2)+'</em></div><div class="presaleTail">尾款：¥'+parseFloat(tailPrice).toFixed(2)+'</div>';
    $(".mainProduct").children(".item-5").html(htmlPrice);
}
/**
 * 根据id获取父节点id<br>
 * @param regionId 当前节点id
 * @returns {*}
 */
function getParentId(regionId){
	for(var i in K.kind_region){
        var size = K.kind_region[i].length;
        for(var j = 0; j <size;j++){
            var id = K.kind_region[i][j][0];
            if(id == regionId ){
            	return i;
			}
		}
	}
	return 1;
}

/**
 * 获取节点名称
 * @param regionId
 * @returns {*}
 */
function getNodeName(regionId){
    for(var i in K.kind_region){
        var size = K.kind_region[i].length;
        for(var j = 0; j <size;j++){
            var id = K.kind_region[i][j][0];
            if(id == regionId ){
                return K.kind_region[i][j][1];
            }
        }
    }
    return '';
}

var isSubmit = true;
//是否跳过无货赠品
var isSkipNoStockGift = false;
//是否跳过快递停发
var isSkipStopTypeDelivery = false;
//是否跳过预售协议
var isSkipPresellAgreement = false;
/**
 * 提交订单<br>
 */
function submitOrder(){
    //防止重复提交
    if(!isSubmit){
        return;
    }
    $("#submitOrder").css("background","#dcdde1");
    $("#submitOrder").text("提交中");
    isSubmit = false;

    //运营停发
    if($("#stopTypeWeatherProductCount").val() >0){
        pubMask();
        $('.pop-6').show();
        return;
    }
    //不可用商品信息
    if($("#unableProductCount").val() >0){
        pubMask();
        $('.pop-5').show();
        return;
    }
    //赠品不足
    if(!isSkipNoStockGift && $("#noStockGiftCount").val() > 0){
        pubMask();
        $('.pop-7').show();
        return;
    }
    //快递停发
    if(!isSkipStopTypeDelivery && $("#stopTypeDeliveryProductCount").val() >0){
        pubMask();
        $('.pop-8').show();
        return;
    }
    //使用返现
    var useCashback = $.trim($("#cashbackInput").val());
    //返现使用需要支付密码
	if((useCashback != '' && parseFloat(useCashback)>0) && !isCheckPayPassword){
            $('.maskLayer').show();
			$("#payPassword").val('');
			$(".virtualPrompt").hide();
			$('.pop-10').show();
			return false;
	}

    /** 提交订单信息 */
        //地址ID
    var addressId = $.trim($("#selectAddressId").val());
    if(addressId == ''){
        alert("请选择收货地址");
        isSubmit = true;
        return;
    }
    //支付方式
    var paymentChannel = 101;
    var paymentChannelName = '支付宝';
    if($(".payMent .item").eq(1).hasClass("cur")){
        paymentChannel = 100;
        paymentChannelName = '货到付款';
    }
    //需要发票信息
    var invoiceType; // 发票类型
    var invoiceKinds;// 发票材质{1:电子；2:纸质}
    var taxpayerId;    //纳税人识别号
    var invoiceMobile;// 电子发票-个人：所需的手机号
    var invoiceTitle; // 发票抬头
    var invoiceContent; // 发票内容
    if($.trim($("#isInvoice").val()) == '1'){
        invoiceType = $.trim($("#invoiceType").val());
        invoiceKinds =  $.trim($("#invoiceKinds").val());
        taxpayerId = $.trim($("#taxpayerId").val());
        invoiceMobile = $.trim($("#invoiceMobile").val());
        invoiceTitle = $.trim($("#invoiceTop").val());
        if($.trim($("#invoiceContext").val()) == '2'){
            invoiceContent = '明细';
        }else{
            invoiceContent = '酒水';
        }
        if(invoiceType == '1'){
            invoiceTitle = '个人';
        }
        if(invoiceKinds == 1){//电子发票
            var userMobile = $.trim($("#userMobile").val());
            if(userMobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') == invoiceMobile){
                invoiceMobile = $.trim($("#userMobile").val());
            }
        }else{
            invoiceMobile = '';
        }
    }
    //礼品订单信息
    var giftOrder = false; // 是否是送礼订单
    var getGiftName; // 对收礼人的称呼
    var giveGiftName; // 送礼人
    var giveGiftMobile; // 送礼人手机
    var showPrice = false; // 是否显示商品价格
    var message; // 赠言
    if($.trim($("#isGiftOrder").val()) == '1'){
        giftOrder = true;
        getGiftName = $.trim($("#getGiftName").val());
        giveGiftName = $.trim($("#giveGiftName").val());
        giveGiftMobile = $.trim($("#giveGiftMobile").val());
        message = $.trim($("#giftMessage").val());
    }
    //使用红包id
    var useCoupon = $.trim($("#checkCouponIds").val());

    //礼品卡
    var useGiftCards = '';
    $("#giftCardInfoBody .gTr label").each(function(index,item){
        if($(item).hasClass("selected")){
            useGiftCards += ","+ $.trim($(item).attr("info"));
        }
    });
    //留言信息
    var orderPS = $.trim($("#orderPS").val());
    //剔除赠品商品id
	var noStockoutGifts = $.trim($("#cartStockoutGifts").val());
    var stockoutGifts  = $.trim($("#stockoutGifts").val());
	if(noStockoutGifts == ''){
        noStockoutGifts = stockoutGifts
	}else if(stockoutGifts !=''){
		noStockoutGifts += ','+stockoutGifts;
	}
	//判断是否使用津贴 useAllowance
    var useAllowance = 0;
	var isUseAllowance = $("#useAllowance").val();
	if(isUseAllowance != undefined && parseInt(isUseAllowance) == 1){
        useAllowance = 1;
    }
    //判断预售信息
    var settlementType = $("#settlementType").val();

	//剔除预售商品
    var preSellProduct = $("#preSellProduct").val();
	//提交信息
    var requestData ={};
    if(settlementType == 1){
        //校验手机号
        var noticeMobile = $("#noticeMobile").val();
        if(noticeMobile ==undefined || noticeMobile == ''){
            $(".tailPhoneNum").hide();
            $(".tailPhoneInput").show();
            $(".tailPhoneVerifi").show();
            $(".tailPhoneModify").hide();
            $("#tailPhone").focus();
            $("#submitOrder").css("background","#e43a3d");
            $("#submitOrder").text("提交订单");
            isSubmit = true;
            return;
        }
        var dataSwitch = $(".presaleAgree").find("label").attr("data-switch");
        //预售协议弹框
        if(dataSwitch != 'on' && !isSkipPresellAgreement){
            pubMask();
            $(".pop-13").show();
            isSubmit = true;
            return;
        }
        requestData.productId=$("#goodsId").val();
        requestData.buyNum=$("#count").val();
        requestData.mobile=noticeMobile;
    }
    requestData.payPassWord = checkPayPassword;
    requestData.addressId = addressId;
    requestData.paymentChannel = paymentChannel;
    requestData.paymentChannelName = paymentChannelName;
    requestData.invoiceType = invoiceType;
    requestData.invoiceKinds = invoiceKinds;
    requestData.taxpayerId = taxpayerId;
    requestData.invoiceMobile = invoiceMobile;
    requestData.invoiceTitle = invoiceTitle;
    requestData.invoiceContent = invoiceContent;
    requestData.giftOrder = giftOrder;
    requestData.getGiftName = getGiftName;
    requestData.giveGiftName = giveGiftName;
    requestData.giveGiftMobile = giveGiftMobile;
    requestData.showPrice = showPrice;
    requestData.message = message;
    requestData.useCoupon = useCoupon;
    requestData.useCashback = useCashback;
    requestData.useGiftCards = useGiftCards;
    requestData.orderPS = orderPS;
    requestData.stockoutGifts=noStockoutGifts;
    requestData.useAllowance=useAllowance;
    requestData.preSellProduct=preSellProduct;
    $.ajax({
        url:'/order/beforeSubmit.htm',
        type:'get',
        cache: false,
        dataType:'json',
        data:$.param(requestData),
        success:function(data){
            $(".deliveryPop").hide();
            if(data.code == '0'){//成功
                location.href = '/order/submit.htm?orderSn='+data.data;
            }else if(data.code == '20002'){//用户未登录
                location.href = domain_number + '/login.htm?from='+domain_order+'/order/confirm.htm';
            }else{
                $(".pop-12 .pubText").text(data.msg);
                $(".pop-12").show();
                pubMask();//公共隐层
            }
        }
    });
}
/**
 * 判断是否金额<br>
 * @param s
 * @returns {boolean}
 */
function isMoney(s) {
	if(s == undefined || typeof (s) == 'undefined' || s ==''){
		return false;
	}
    var regu = /^[0-9]*(\.[0-9]{1,8})?$/;
    if (regu.test(s)) {
        return true;
    } else {
        return false;
    }
}

/**
 * 判断是否数组和字母组合
 * @returns {boolean}
 */
function isNumberAndLetter(str){
    var re =  /^[0-9a-zA-Z]*$/g;
    return re.test(str);
}

/**
 * 判断字符长度
 * @param val
 * @returns {number}
 */
function getByteLen(val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
        var a = val.charAt(i);
        if (a.match(/[^\x00-\xff]/ig) != null){
            len += 2;
        }
        else{
            len += 1;
        }
    }
    return len;
}

/**
 * 设置选择地址省市区ID到cookie中
 * @param regionId 选择区ID
 */
function setAddressCookie(regionId,addressId){
    $.ajax({
        type:'get',
        url:'/order/getRegionId.htm',
        data:{regionId:regionId},
        dataType:'JSON',
        async:false,
        cache:false,
        success:function(data){
            if(data.code == '0'){//成功
                var regionId = data.data;
                $("li[data-addrid="+addressId+"]").attr("rgnregionid",regionId);
                $("#regionId").val(regionId);
                var cityId = getParentId(regionId);
                var provinceId = 0;
                if(cityId != undefined){
                    provinceId = getParentId(cityId);
                }
                var value = provinceId + "_"+cityId+"_"+regionId;
                document.cookie="user_province="+value+";path=/;domain=.jiuxian.com";
            }else if(data.code == '10003'){//跳转登录
                location.href = domain_number + '/login.htm?from='+domain_order+'/order/confirm.htm';
            }
        }
    });
}
loadAddress(true,true);



$(function(){
    //页面初始化判断是否有尾款手机号
    isTailPhoneFn() //调用
})
//预售相关函数
function isTailPhoneFn(){
    var noticeMobile = $("#noticeMobile").val();
    if(noticeMobile == undefined || noticeMobile == ''){
        $('#tailPhone').val('');
        $('.tailPhoneInput').show().siblings('.tailPhoneNum').hide();
        $('.tailPhoneModify').hide();
    }else{
        $('.tailPhoneInput').hide();
        $(".tailPhoneNum").show();
        $('.tailPhoneNum').text(encryptMobile(noticeMobile));
        $('.tailPhoneModify').show();
    }
}

//点击修改尾款手机号
$('.tailPhoneModify').bind('click',function(){
    var tailPhoneVal = $('#tailPhone');
    var tailPhoneNum = $('.tailPhoneNum').text();
    $(this).hide();
    $('.tailPhoneInput').show().siblings('.tailPhoneNum').hide();
    //设置输入框为空
    tailPhoneVal.val('');
    $("#tailPhone").focus();
    /*if(tailPhoneNum == ''){
        return;
    }else{
        //通知手机号等会用户手机号这加密
        var noticeMobile = $("#noticeMobile").val();
        tailPhoneVal.val(noticeMobile);
    }*/
});
//失去焦点
$('#tailPhone').bind('blur',function(){
    var noticeMobile = $("#userOriginMobile").val();
    //手机号
    var tailPhone = $.trim($("#tailPhone").val())
    if((tailPhone == undefined || tailPhone == '') || !isPhoneNum(tailPhone) && tailPhone != encryptMobile(noticeMobile)){
        $('#noticeMobile').val('');
        $('.tailPhoneVerifi').show();
        return false;
    }else{
        $('.tailPhoneVerifi').hide();
        $('.tailPhoneModify').show();
        $('.tailPhoneInput').hide().siblings('.tailPhoneNum').show();
        if(tailPhone == encryptMobile(noticeMobile)){
            $("#noticeMobile").val(noticeMobile);
        }else{
            $("#noticeMobile").val(tailPhone);
        }
        $('.tailPhoneNum').text(encryptMobile(tailPhone));
    }
});
$('.presaleAgree label').bind('click',function(){
    var dataAttr = $(this).attr('data-switch');
    if(dataAttr == 'off'){
        $(this).attr('data-switch','on');
        $(this).addClass('cur');
    }else{
        $(this).attr('data-switch','off');
        $(this).removeClass('cur');
    }

})
//时间格式化
Date.prototype.format = function(format){
    //年
    format = format.replace(/yyyy|YYYY/,this.getFullYear());
    format = format.replace(/yy|YY/,this.getFullYear());
    //月
    format=format.replace(/MM/,this.getMonth()>9?this.getMonth()+1:'0' + (this.getMonth()+1));
    format=format.replace(/M/g,this.getMonth()+1);
    //日
    format=format.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());
    format=format.replace(/d|D/g,this.getDate());
    //时
    format=format.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());
    format=format.replace(/h|H/g,this.getHours());
    //分
    format=format.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());
    format=format.replace(/m/g,this.getMinutes());
    //秒
    format=format.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());
    format=format.replace(/s|S/g,this.getSeconds());
    return format;
}