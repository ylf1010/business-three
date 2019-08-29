//左右滑动
var hzspeed = 20, hzmarsize = 176, hzlength = 0, hzMarSum = 0, hzMar;
function hzTo(v,i) { clearInterval(hzMar); hzlength = v; hzsetMar(i); }
function hzMarquee(i) {
	if (hzlength > 0) {
		if (document.getElementById("hzm2"+i).offsetWidth <= document.getElementById("hzm"+i).scrollLeft) { document.getElementById("hzm"+i).scrollLeft -= document.getElementById("hzm1"+i).offsetWidth; }
		else { document.getElementById("hzm"+i).scrollLeft += hzmarsize; }
		hzMarSum += hzmarsize;
		if (hzMarSum > hzlength) {
			clearInterval(hzMar); hzMarSum = 0;
		}
	}
	else {
		if (document.getElementById("hzm"+i).scrollLeft > 0) { document.getElementById("hzm"+i).scrollLeft -= hzmarsize; }
		else { document.getElementById("hzm"+i).scrollLeft += document.getElementById("hzm1"+i).offsetWidth; }
		hzMarSum -= hzmarsize;
		if (hzMarSum < hzlength) {
			clearInterval(hzMar); hzMarSum = 0;
		}
	}
}
function hzsetMar(i) {
	document.getElementById("hzm2"+i).innerHTML = document.getElementById("hzm1"+i).innerHTML;
	hzMar = setInterval(hzMarquee(i), hzspeed);
}

//tab切换
function exTab0(s, v, l) {
	for (var i = 1; i < 4; i++) {
		document.getElementById(s + i).className = s + "g0";
		document.getElementById(s + "m" + i).style.display = "none";
	}
	document.getElementById(s + "0").className = s + "s" + v;
	document.getElementById(s + v).className = s + "g1";
	document.getElementById(s + "m" + v).style.display = "";
}

//加入购物车
/*根据名字获得Cookie值*/  
function getCookie(c_name) {  
    if (document.cookie.length > 0) {  
        c_start = document.cookie.indexOf(c_name + "=")  
        if (c_start != -1) {  
            c_start = c_start + c_name.length + 1  
            c_end = document.cookie.indexOf(";", c_start)  
            if (c_end == -1) c_end = document.cookie.length  
            return unescape(document.cookie.substring(c_start, c_end))  
        }  
    }  
    return ""  
}  
  
/* 设置Cookie的值 */  
function setCookie(c_name, value, expiredays) {  
    var exdate = new Date()  
    exdate.setDate(exdate.getDate() + expiredays)  
    document.cookie = c_name + "=" + escape(value) +  
((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())  +";path=/;domain=jiuxian.com"
}  
  
  
/*jsonHepler*/  
var jsonToString = function(obj) {  
    var THIS = this;
    switch (typeof (obj)) {  
        case 'string':  
            return '"' + obj.replace(/(["\\])/g, '\\$1') + '"';  
        case 'array':  
            return '[' + obj.map(THIS.jsonToString).join(',') + ']';  
        case 'object':  
            if (obj instanceof Array) {  
                var strArr = [];  
                var len = obj.length;  
                for (var i = 0; i < len; i++) {  
                    strArr.push(THIS.jsonToString(obj[i]));  
                }  
                return '[' + strArr.join(',') + ']';  
            }  
            else if (obj == null) {  
                return 'null';  
  
            }  
            else {  
                var string = [];  
                for (var property in obj)  
                    string.push(THIS.jsonToString(property) + ':' + THIS.jsonToString(obj[property]));  
                return '{' + string.join(',') + '}';  
            }  
        case 'number':  
            return obj;  
        case false:  
            return obj;  
    }  
}  
  
var stringToJSON = function(obj)  
{     
	return eval('(' + obj + ')');  
}  

//删除数组元素方法   
function delArray(array, index) 
{  
    if (index < 0)  
        return array;  
    else  
        return array.slice(0, index).concat(array.slice(index + 1, array.length));  
} 
  
    
//添加商品至购物  
function toCart(goodsId,num,rec_type,is_gift) 
{
	url="/web.php?c=cart&m=chk_four_year";
	$.post(url,{gid:goodsId},
	
		function(result){
			if(result.err==1)
			{
				alert(result.msg);
				return false;
			}
			
			var jx_num=CarNumber();
			if(jx_num>30){
				alert("您的购物车已满！");
				return false;
			}
			if(rec_type==1){
				num=document.getElementById("number").value;
			    rec_type=0;
			}else{
				
				if(num==1){
					num=1;	
				}else{
					num=document.getElementById("sltxt0").value;
				}
			}
		
			var cookieValue = getCookie("jxcart");   
			//创建购物车对象   
			var jxcart; 
			//如果购物车为空添加新商品   
			if (cookieValue == "" || cookieValue == "undefined") {  
				//创建新购物车   
				jxcart = new Array();  
				//创建一个商品对象   
				var good = new Object();  
				good.id = goodsId;  
				good.num = num;
				good.rec_type = rec_type;
				good.is_gift = is_gift;
				//给购物车添加商品   
				jxcart[0] = good;  
			}  
			else {  
				//获得购物车对象   
				jxcart = stringToJSON(cookieValue);  
				var index = jxcart.length;  
				//购物车中的商品   
				var i;  
				for (i = 0; i < index; i++) {  
					var good = jxcart[i];  
					//购物车中是否存在要添加的商品   
					if (good.id == goodsId && good.is_gift==is_gift) {  
						//追加数量并求出总金额
						if(parseInt(num)>1){
							good.num = parseInt(good.num) + parseInt(num);  
						}else{
							good.num = parseInt(good.num) + 1;  
						}
						
					   // good.proTatol = good.nowPrice * good.proNumber;  
						break;  
					}  
				}  
				//如果循环未终端，则添加新商品到购物车   
				if (i == index) {  
					//创建一个商品对象   
					var good = new Object();  
					good.id = goodsId;  
					good.num = num; 
					good.rec_type = rec_type;
					good.is_gift = is_gift;
					//给购物车添加商品   
					jxcart[index] = good;  
				}  
			} //alert(jsonToString(jxcart));
			setCookie("jxcart", jsonToString(jxcart), 12);
			chk_cart_free(1); //赠品处理
	
		},'JSON');	
}  
 

//更新购物车数量  
function changeCartnum(goodsId,n) 
{  
	var cookieValue = getCookie("jxcart");      
    var jxcart;     
    if(goodsId){     
        jxcart = stringToJSON(cookieValue);  
        var index = jxcart.length;     
        var i;  
        for (i = 0; i < index; i++) {  
            var good = jxcart[i];   
            if (good.id == goodsId) {  
				good.num = parseInt(n);  
                break;  
            }  
        }  
    }  
    setCookie("jxcart", jsonToString(jxcart), 12);   
	chk_cart_free(1); //赠品处理
} 


//赠品处理
function chk_cart_free(k)
{
  var url="/web.php?c=cart&m=chk_cart_free";
  $.post(url,{key:k},chk_cart_free_Rep,'JSON');
}
function chk_cart_free_Rep(result)
{
 if(result.msg==0){
	 location.href="/web.php?c=cart";  
 }else if(result.msg==1){
	alert("赠品加入失败");
 }
}

//加购赠品处理
function add_jgto_cart(goodId)
{
  var url="/web.php?c=cart&m=add_jgto_cart";
  $.post(url,{goods_id:goodId},add_jgto_cart_Rep,'JSON');
}
function add_jgto_cart_Rep(result)
{
 if(result.err==0){
	 location.href="/web.php?c=cart";  
 }else if(result.err==1){
	alert(result.msg);
 }else if(result.err==2){
	alert(result.msg);
 }
}

//删除加购赠品
function del_jgsp(goodId)
{ 
  var url="/web.php?c=cart&m=del_jgsp";
  $.post(url,{goods_id:goodId},del_jgsp_Rep,'JSON');
}
function del_jgsp_Rep(result)
{
 if(result.err==0){
	 alert(result.msg);
	 location.href="/web.php?c=cart";  
 }
}

//删除一件商品   
function delCartsp(goodsId) {   

   var jx_num=CarNumber();
	if(jx_num<=0){
		alert("您的购物车已为空！");
		setCookie("jxcart", null, -1);  
		chk_cart_free(1); //赠品处理
		return false;
	}
	if(jx_num==1){
		clearCar();
		return false;
	}
	
	var cookieValue = getCookie("jxcart");  
	//获得购物车对象   
	var jxcart = stringToJSON(cookieValue);  
	var index = jxcart.length;  
	if (index > 0)
	{  
		var i;  
		for (i = 0; i < index; i++) 
		{  
			var good = jxcart[i];  
			//购物车中是否存在要添加的商品   
			if (good.id == goodsId) 
			{  
				if (window.confirm("您确定删除此商品吗？")) {  
					jxcart = delArray(jxcart, i);  
					setCookie("jxcart", jsonToString(jxcart), 12);  
					alert("已经将商品移除！"); 
					chk_cart_free(1); //赠品处理				
				}  
				break;  
			}  
		}  
		  
	}  
	else 
	{  
		clearCar();  
		alert("已经将购物车清空！");  				
	}     
}  

//清空购物车方法   
function clearCar()   
{  
    if (window.confirm("您确定要清空购物车吗？"))   
    {  
        var cookieValue = getCookie("jxcart");  
        if (cookieValue != "")   
        {  
            var date = new Date();  
            date.setTime(date.getDate() - 99999);  
            setCookie("jxcart", null, -1);  
			chk_cart_free(1); //赠品处理
        }  
    }
	
}  

//获得购物车中商品的数量   
function CarNumber()   
{  
  
    //debugger;   
    //获得购物车数组   
    var cookieValue = getCookie("jxcart");  
    var jxcart;  
    if (cookieValue == "" || cookieValue == "undefined")  
        return 0; 
    else {  
        jxcart = stringToJSON(cookieValue);  
        return jxcart.length;  
    }  
  
} 

//点击加减
function cartChange(v,n,i)
{	
   	var jx_num=CarNumber();
	if(jx_num<=0){
		alert("您的购物车已为空！");
		setCookie("jxcart", null, -1);  
		chk_cart_free(1); //赠品处理
		return false;
	}
	var kc=n;
	var curv=document.getElementById("ctxt"+i).value;
	var newv=parseInt(curv)+v;	
	if(newv>kc){
		alert("对不起，库存不足，请减少您购物数量！");
		newv=curv; 
		return false;
		}
	if(newv<=1){ var newv=1;}
	document.getElementById("ctxt"+i).value=newv;
	changeCartnum(i,newv);
}

//输入数量
function renum(i,n)
{	
	
	var reg = new RegExp("^[0-9]*$");
	var curv=document.getElementById("ctxt"+i).value;
    if(!reg.test(curv)){
        alert("请输入数字!");
		document.getElementById("ctxt"+i).value=1;
    }else{
			if(curv<=1){ var curv=1;}
			var kc=n;
			if(curv>kc){alert("对不起，库存不足，请减少您购物数量！");curv=1; }
			document.getElementById("ctxt"+i).value=curv;
			changeCartnum(i,curv);
		}
}
 
 //收藏
function save(goodsId)
{
  var uid=document.getCookie("ECS[user_id]");
  if(uid>0){
	  $.post('/web.php?c=goods&m=collect',{id:goodsId,uid:uid},save_rep,'JSON');
	}else{
		alert("您还没有登录，请先登录！");
	}
  
}
function save_rep(result)
{
	if(result.err==1){
        //登录弹出页
		//login_layer();
		location.href="/web.php?c=login"
	}
	else{
		alert(result.msg);
	}
}

//浏览历史
//添加商品至浏览历史 
function viewhis(gid) 
{
	
	var cookieValue = getCookie("viewhis");      
  var viewhis; 
  if (cookieValue == "" || cookieValue == "undefined") {     
      viewhis = new Array();  
      var good = new Object();  
      good.id = gid;
      good.k = 0;  
      viewhis[0] = good;  
  }  
  else {  
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
     		//var mytime =timestamp=new Date().getTime();
     		//good.k = mytime; 
          viewhis[index] = good;  
      }  
  }
	if(i>10){viewhis = delArray(viewhis, 0);}
  setCookie("viewhis", jsonToString(viewhis), 12);

}  
//获得浏览历史的数量   
function HisNumber()   
{  
  var cookieValue = getCookie("viewhis");  
  var viewhis;  
  if (cookieValue == "" || cookieValue == "undefined")  
      return 0; 
  else {  
      viewhis = stringToJSON(cookieValue);  
      return viewhis.length;  
  }  

}

//清空浏览历史
function clearHis()   
{  
  if (window.confirm("您确定要清空浏览历史记录吗？"))   
  {  
      var cookieValue = getCookie("viewhis");  
      if (cookieValue != "")   
      {  
          var date = new Date();  
          date.setTime(date.getDate() - 99999);  
          setCookie("viewhis", null, -1);
      }  
  }
	
}  

(function(){
	//header 手机逛酒仙二维码
	$('.hd-n5').hover(function(){
		$('.erm2015922').show();
	},function(){$('.erm2015922').hide();});
})()
