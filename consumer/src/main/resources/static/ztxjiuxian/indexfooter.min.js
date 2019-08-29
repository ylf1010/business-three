// 百分点推荐猜你喜欢
function handleSpiritHomePagePrice(priceData) {
    priceData =eval("("+priceData+")");
    priceData =priceData.data;

    for (var proId in priceData) {
        var proPrices = priceData[proId];
        $(".jxIndex_nowPrice_" + proId).text("￥" + proPrices.np.toFixed(2));
        $(".jxIndex_marketPrice_" + proId).text("￥" + proPrices.mp.toFixed(2));
    }
};
function loadprice(){
    var proIds1=[];
    $('.indexTabBox [goodId]').each(function(i){
        var id=$(this).attr("goodId");
        proIds1.push(id);
    });
    getProductActPrice(proIds1.join(','),'handleSpiritHomePagePrice');
}
if(window.loadRecommend){
    // 用百分点推荐替换猜你喜欢和疯狂抢购
    //loadRecommend('index');
}else{
    //loadprice();
}

$(".hotWords").show();

window._JX_INFO = window._JX_INFO || [];
_JX_INFO.push(["home"]);

var _mvq=_mvq||[];_mvq.push(["$setAccount","m-471-1"]);_mvq.push(["$logConversion"]);(function(){var mvl=document.createElement("script");mvl.type="text/javascript";mvl.async=true;mvl.src=("https:"==document.location.protocol?"https://static-ssl.mediav.com/mvl.js":"http://static.mediav.com/mvl.js");var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(mvl,s)})();	<!-- mediav(访客找回) -->