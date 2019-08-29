
$("div[modulesname='商品'] li div.sComIntro p.sCom-price span").hide();

$(function(){
    var advGoodsIds = getGoodId($(".shopFocusBoxAdverBox"));
    getProductActPrice(advGoodsIds.join(','),'handlePrice');

    var oPice = $('.addAdversePrice');
    oPice.each(function(i){
        var oTxt = oPice.eq(i).text();
        if(oTxt == "#{Price}"){
            oPice.eq(i).text("");
        }
    });

    var msGoodsIds = getMsGoodId($(".shopSeckillBoxAdverBox"));
    getMsProductPrice(msGoodsIds.join(','));

    //设置商品价格
    var priceGoodsIds = $("div[modulesname='商品'] li p.sCom-price em").map(function() {
        return $(this).attr("npgoodid")
    }).get().join(',');
    //getProductActPriceWithCLub(priceGoodsIds,'setGodosModulePrice');
    getProductActPrice(priceGoodsIds,'setGodosModulePrice');
    //设置右上角标签
    setTagZIndex();
})
//设置商品模块的商品价格
function setGodosModulePrice(priceData) {
    var priceData =eval("("+priceData+")");
    for (var proId in priceData) {
        var proPrices = priceData[proId];
        $("div[modulesname='商品'] li p.sCom-price em[npgoodid='"+proId+"']").text(proPrices);
    }
    $("div[modulesname='商品'] li div.sComIntro p.sCom-price span").show();
};
//设置商品模块的商品价格
function setGodosModulePriceWithClub(priceData) {
    var priceData =eval("("+priceData+")");
    for (var proId in priceData) {
       var price= priceData[proId];
        var proPrices = price.promoPrice;
        var clubPrice = price.clubPrice;
        var priceItem = $("div[modulesname='商品'] li p.sCom-price em[npgoodid='"+proId+"']");
        priceItem.text(proPrices);
        if (clubPrice != null &&clubPrice!="null"&& clubPrice != undefined) {
            var clubPriceItem = priceItem.parent().parent().siblings('.sCom-clubPrice');
            clubPriceItem.find('span').text("￥"+clubPrice);
            clubPriceItem.show();
        }
    }
    $("div[modulesname='商品'] li div.sComIntro p.sCom-price span").show();
};

// 加载商品的价格的公共方法
function getProductActPrice(proIds, callback) {
    if(proIds == ""){
        return false;
    }
    if (typeof callback == 'string') {
        var act_request_url = domain_activity + "/price/jsonp/currentPrice";
        jQuery.ajax({
            url : act_request_url + "?ids=" + proIds + "&callback=" + callback,
            dataType : "jsonp",
            jsonp : callback,
            success : function(data) {
            }
        });
    }
}
//带club价格
function getProductActPriceWithCLub(proIds, callback) {
    if(proIds == ""){
        return false;
    }
    if (typeof callback == 'string') {
        var act_request_url = domain_activity + "/price/clubAndPromoPrice";
        jQuery.ajax({
            url : act_request_url + "?ids=" + proIds + "&callback=" + callback,
            dataType : "jsonp",
            jsonp : callback,
            success : function(data) {
            }
        });
    }
}


function handlePrice(priceData) {
    var priceData =eval("("+priceData+")");
    for (var proId in priceData) {
        var proPrices = priceData[proId];
        $(".adverse_nowPrice_" + proId).text("￥" + proPrices);
    }
};



//获取商品id
function getGoodId(obj){
    var goodIdArray = [];
    obj.find(".addAdversePrice[goodsid]").each(function(){
        var goodid = $(this).attr("goodsid");
        goodIdArray.push(goodid);
    });
    return goodIdArray;
}

//获取秒杀商品id
function getMsGoodId(obj){
    var goodIdArray = [];
    obj.find(".addAdverseSeckillPrice[goodsid]").each(function(){
        var goodid = $(this).attr("goodsid");
        goodIdArray.push(goodid);
    });
    return goodIdArray;
}



//获取秒杀商品
function handleMsPrice(priceData) {
    if(priceData == null){return false}
    var priceMS = priceData["miaosha"].length;
    var goodsIdAry = [];
    $('.addAdverseSeckillPrice').hide();
    $('.addAdverseSeckillPrice').each(function(i){
        var goodsId = $(this).attr('goodsId');
        for(var i=0;i<priceMS;i++){
            var pid = priceData["miaosha"][i]["pid"];
            var prices = priceData["miaosha"][i]["msprice"];
            if(goodsId == pid){
                $(this).text("￥" + priceData["miaosha"][i]["msprice"]).show();

            }
        }
    });
};
//加载秒杀商品价格的方法
function getMsProductPrice(proIds) {
    var act_request_url = window.jxdomain.shop+"/getMiaoshaPrice.htm";
    jQuery.ajax({
        url: act_request_url + "?productIds=" + proIds + "&t=" + new Date().getTime(),
        dataType:'json',
        cache:false,
        success : function(data){
            handleMsPrice(data);
        }
    });
}



//秒杀商品
/*获取校验码*/
var time =59;
var i=null;
function getTimer(){
    time--;
    if(time==0){
        clearInterval(i);
        $(".getCode").show();
        $(".phoneTime").hide();
        time=59;
    }
    $(".phoneTime i").text(time);

};
$(function(){
    //秒杀
    var shopSeckillBoxAdverBox = $('.shopSeckillBoxAdverBox').length;
    var htmlMs ='<div class="popupMask" style="display:none"></div>'+
        '<div class="popup" style="display:none">'+
        '<div class="title clearfix">'+
        '<span class="popupClose" target="_self" style="display:block;">X</span>'+
        '</div>'+
        '<div class="popupUserHomeCon">'+
        '<p class="tip">您还没有验证手机，请先验证手机！</p>'+
        '<div class="obtain clearfix">'+
        '<span class="phoneTit">手机号码：</span>'+
        '<input c=0 id="iphone" class="phoneTxt" type="text"/>'+
        '<span class="getCode">获取短信校验码</span>'+
        '<a class="phoneTime" style="display: none;" href="javascript:;"><i></i>秒后重新获取</a>'+
        '</div>'+
        '<div class="falsePrompt clearfix">'+
        '<div class="accNotic clearfix" style="display:none" id="iphoneTS"><i></i><span>请输入手机号码</span></div>'+
        '</div>'+
        '<div class="obtain clearfix"><span class="phoneTit">校验码：</span><input c=0 id="check" class="phoneTxt" type="text"/></div>'+
        '<div class="falsePrompt clearfix">'+
        '<div class="accNotic clearfix" id="checkTS" style="display: none;"><i></i><span>请输入校验码</span></div>'+
        '</div>'+
        '<input class="submit" type="submit" id="save" value="提交"/>'+
        '</div>'+
        '</div>'+
        '<div class="testSuccess" style="display:none">'+
        '<a class="testClose" href="javascript:;"></a><p class="succ succ1">验证手机成功！</p>'+
        '<p class="succ succ2">获得<strong>100个金币</strong></p>'+
        '<p class="fiveSecond"><span>5</span>秒后自动关闭</p>'+
        '<a class="sure" href="javascript:;">确定</a>'+
        '</div>'+
        '<div class="miaoshaBox" style="display:none">'+
        '<p class="miaoshaTiqs">秒杀成功!</p>'+
        '<a href="'+window.jxdomain.cart+'" target="_blank" class="miaoshaZhifu">立即支付</a>'+
        '<a href="javascript:;" target="_self" class="miaoshachoudan">'+
        '<span class="jixugouwu">继续购物</span>'+
        '<span class="quchoudan">去凑单</span>'+
        '</a>'+
        '</div>'+
        '</div>';

    if(shopSeckillBoxAdverBox > 0){
        $('.shopSeckillBoxAdverBox').eq(0).after(htmlMs);
    }
    window.setTimeout(function(){
        $(".popupClose").click(function(e) {
            $(".popupMask").css({"display":"none"});
            $(".popup").css({"display":"none"});
        });
        // 获取短信校验码
        $(".getCode").click(function() {

            window.location.href = jxdomain.member + "/myaccount/change_phone.htm";

            // var flag = /^(13|14|15|18|17)[0-9]{9}$/ ;
            // var value=$.trim($("#iphone").val());
            // if(value==''){
            //     $('#iphoneTS').show();
            //     $('#iphoneTS').find('span').text('请输入手机号码')
            //     $("#iphone").addClass('outBor');
            //
            // }else if(!flag.test(value)){
            //
            //     $('#iphoneTS').css('display','block');
            //     $('#iphoneTS').find('span').text('请输入正确的手机号码')
            //     $("#iphone").addClass('outBor');
            // }else if(isMobileExist(value)){
            //     $("#iphoneTS").find("span").text("手机号已存在");
            //     $("#iphoneTS").show();
            //     return false;
            // }else{
            //
            //     var url_kc= window.jxdomain.member+"/myaccount/send_msm.htm?phone="+value+"&type=4&t="+new Date().getTime();
            //     var proxy_url = "/httpProxyAccess.htm?t="+new Date().toTimeString();
            //
            //     $.ajax({
            //         type:'POST',
            //         url: proxy_url,
            //         data:{target:url_kc},
            //         dataType:"json",
            //         success:function(data){
            //             if(data.action_status == 2){
            //                 alert("验证次数已达当日5次上限!");
            //             }else if(data.action_status == 0){
            //                 alert(data.action_msgs);
            //             }else{
            //                 $("#iphone").removeClass('outBor');
            //                 $('#iphoneTS').hide();
            //                 $("#iphone").attr('c','1');
            //                 $(".getCode").hide();
            //                 $(".phoneTime").show();
            //                 i=setInterval(getTimer,1000);
            //             }
            //         },
            //         error:function(){
            //             $("#iphoneTS").find("span").text("发送失败，或请检查是否已经登录");
            //             $("#iphoneTS").show();
            //         }
            //     })
            // }
        });

        /*验证手机*/
        $('#iphone').bind('blur',function(){       //手机
            var flag = /^(13|14|15|18|17)[0-9]{9}$/ ;
            var value=$(this).val();
            if(value=='')
            {
                $('#iphoneTS').show();
                $('#iphoneTS').find('span').text('请输入手机号码')
                $(this).addClass('outBor');

            }
            else if(!flag.test(value))
            {

                $('#iphoneTS').css('display','block');
                $('#iphoneTS').find('span').text('请输入正确的手机号码')
                $(this).addClass('outBor');
            }
            else
            {

                $(this).removeClass('outBor');
                $('#iphoneTS').hide();
                $(this).attr('c','1');
            }
        });
        $('#check').bind('blur',function(){      //校验码
            if($(this).val()=='')
            {
                $('#checkTS').show();
                $('#checkTS').find('span').text('请输入校验码')
                $(this).addClass('outBor');
            }
            else
            {
                $(this).removeClass('outBor')
                $('#checkTS').hide();
                $(this).attr('c','1');
            }
        });

        $(".testSuccess .sure, .testSuccess .testClose").bind('click',function(e) {
            $(".testSuccess").hide();
            $(".popupMask").hide();
        });

        /*5秒倒计时*/
        var clearfiveSecond;
        function fiveSecond(){
            var time=5;
            clearfiveSecond=setInterval(function(){
                time--;
                $(".testSuccess .fiveSecond").find("span").text(time);
            },1000)
        };

        $('#save').bind('click',function(){   //保存按钮
            $('.popupUserHomeCon input').each(function(){
                if($(this).hasClass('outBor')){
                    $(this).attr('c','0');
                    //return false;
                }else if($(this).val()==''){
                    if($(this).attr('id')){
                        var txt=$(this).attr('id');
                        $('#'+txt+'TS').show();
                        $(this).addClass('outBor');
                        $(this).attr('c','0');
                    }
                }
            })

            if($('#check').attr('c')=='1'&&$('#iphone').attr('c')=='1'){

                var iphoneNum = $("#iphone").val();
                var checkCode = $("#check").val();

                var url_kc=window.jxdomain.cart+"/miaosha/user/checkPhoneCode.htm?code="+checkCode+"&type=4&mobile="+iphoneNum+"&t="+new Date().getTime();

                var proxy_url = "/httpProxyAccess.htm?t="+new Date().toTimeString();

                $.ajax({
                    type:'post',
                    url: proxy_url,
                    data:{target:url_kc},
                    dataType:'json',
                    cache:false,
                    success:function(data){
                        if(data.code == '999'){
                            alert('不能输入敏感字符!');
                            return false;
                        }
                        if(data.action_status == -2){
                            alert("参数错误!");
                        }else if(data.action_status == -1){
                            alert("操作失败!");
                        }else if(data.action_status == 0){
                            alert("校验码错误,请重新输入校验码!");
                        }else if(data.action_status == 2){
                            alert("校验码已过期,请重新获取校验码!");
                        }else if(data.action_status == 3){
                            alert("手机号已存在!");
                        }else if(data.action_status == 5){
                            $(".popup").hide();
                            $(".testSuccess").show();
                            $(".yzHome").find(".res").text("已验证");
                            var phone = iphoneNum.substring(0, 4) + "***" + iphoneNum.substring(7, 11);
                            $(".yzHome").find(".edit").empty().append("<span>" + phone + "</span><a href='"+window.jxdomain.member+"/myaccount/change_phone.htm' title='修改手机'>修改</a>");
                            fiveSecond();
                            setTimeout(function(){
                                $(".testSuccess").hide();
                                $(".popupMask").hide();
                                clearInterval(clearfiveSecond);
                                $(".testSuccess .fiveSecond").find("span").text("5");

                            },5000)
                        }
                    },
                    error:function(){

                    }
                })

            }

        });
    },2000);

})

function popup(){
    var iWidth=parseInt($('.popup').children('div').eq(1).css('width'))+62;
    $('.popup').css('width',iWidth+'px');
    var iLeft=($(window).width()-$('.popup').outerWidth())/2;
    var iTop=($(window).height()-$('.popup').outerHeight())/2;
    $('.popup').css({'top':iTop+'px','left':iLeft+'px'});
    $('.testSuccess').css({'top':iTop+'px','left':iLeft+'px'});
    $('.popupMask').show();
    $('.popup').show();
    $('.popup .accNotic').hide();



    $('.popup .title').css('width',iWidth+'px');
    $(window).bind('resize',function(){

        var iLeft=($(window).width()-$('.popup').outerWidth())/2;
        var iTop=($(window).height()-$('.popup').outerHeight())/2;
        $('.popup').css({'top':iTop+'px','left':iLeft+'px'});
    })
};
function miaosha(productId) {
    if(productId == null || productId == ''){
        alert("参数错误!");
        return;
    }
    var url_kc=window.jxdomain.miaosha+"/miaosha.htm?productId="+$.trim(productId)+"&t="+new Date().getTime();
    var proxy_url = "/httpProxyAccess.htm?t="+new Date().getTime();
    $.ajax({
        type:'post',
        url:proxy_url,
        data:{target:url_kc},
        dataType:'json',
        cache:false,
        success:function(data){
            var status = data.status;
            if(status == '002'){
                if(confirm("您还未登录不能参与该活动，是否现在登录？")){
                    var fromUrl = window.location.href;
                    window.location.href=window.jxdomain.login+"/login.htm?from="+fromUrl;
                }else{
                    return;
                }
            }else if(status == '003'){
                // 未绑定手机
                //popup();
                alert("您还没有验证手机，请先到用户中心绑定手机！");
                return;
            }else if(status == '004'){

                alert("活动即将开始，敬请期待！");
                return;
            }else if(status == '011'){/*状态是011,表示这个用户是黑名单用户，不能参与秒杀*/
                try{
                    window._JX_INFO = window._JX_INFO || [];
                    _JX_INFO.push(["AB","MS-011-productId"]);
                    _JX_INFO.push(["userId",getUserId()]);
                    _JX_INFO.push(["go"]);
                }catch (e) {
                }

                alert("您的操作过于频繁，请稍后再试！");
                return;
            }else {
                alert(data.desc);
                return;
            }
        },
        error:function(){
            alert("系统繁忙，请稍后再试!");
        }
    })
};
function msmCallback(data){

    data= eval("("+data+")");

    if(data.action_status == 2){
        alert("验证次数已达当日5次上限!");
        //$("#send_bt").show();
        //$("#pp01").hide();
    }else if(data.action_status == 0){
        alert(data.action_msgs);
        //$("#send_bt").show();
        //$("#pp01").hide();
    }else{
        $("#iphone").removeClass('outBor');
        $('#iphoneTS').hide();
        $("#iphone").attr('c','1');
        $(".getCode").hide();
        $(".phoneTime").show();
        i=setInterval(getTimer,1000);
    }
};
function isMobileExist(mobile){
    var tf = false;
    var url_kc=window.jxdomain.cart+"/miaosha/user/isMobileExist.htm?type=1&mobile="+mobile+"&t="+new Date().getTime();
    var proxy_url = "/httpProxyAccess.htm?t="+new Date().toTimeString();
    jQuery.ajax({
        type:'post',
        url: proxy_url,
        data:{target:url_kc},
        dataType:'json',
        cache:false,
        async:false,
        success:function(data){
            if(data && data.action_status == 1){
                tf = true;
            }
        },
        error:function(){
        }
    });
    return tf;
};

//设置商品右上角标签
function setTagZIndex() {
    $("p.newTag").css("z-index","10");
}

