$(function(){
	var hjIds = $("#hjIds").val();
	var gfIds = $("#gfIds").val();
	//调用获取获奖商品价格的公共方法
	if(hjIds){
		getProductActPrice(hjIds, callback1);
	}
	//调用获取高分商品价格的公共方法
	if(gfIds){
		getProductActPrice(gfIds, callback2);	
	}
});

//获奖商品回调函数
var callback1 = function(data){
	
		for(var id in data){ // 设置获奖商品的价格
			var prices = data[id];//data[id]获取一些价格的集合，可以从中取得商品的当前价、酒仙价、市场价
			if(prices['np']){
				$("#hjNowPrice"+id).html(+prices['np']);//取得的当前价
			}
			if(prices['mp']){
				$("#hjMarkPrice"+id).html("市场价:￥"+prices['mp']);//取得的市场价
			}
		}	
}
//高分商品回调函数
var callback2 = function(data){
	
		for(var id in data){ // 设置高分商品的价格
			var prices = data[id];//data[id]获取一些价格的集合，可以从中取得商品的当前价、酒仙价、市场价
			if(prices['np']){
				$("#gfNowPrice"+id).html(+prices['np']);//取得的当前价
			}	
			if(prices['mp']){
				$("#gfMarkPrice"+id).html("市场价:￥"+prices['mp']);//取得的市场价
			}
			
		}	
}

	