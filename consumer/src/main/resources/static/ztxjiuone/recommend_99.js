//var recommend_99_Args = {'pageName':'detail','productIds':['2']}; //pageName:页面，ids：推荐主产品ID(数组)

$(".hotWords").show();

var recommendFlag = true;
if("undefined" == typeof recommend_99_Args) recommendFlag=false;
console.log(recommendFlag)
var rec_div=new Array();	//每种推荐对应页面位置的id
rec_div[1]="recomm_direct_1";
rec_div[2]="recomm_direct_2";
rec_div[3]="recomm_direct_3";
rec_div[4]="recomm_direct_4";
rec_div[201]="recomm_direct_201";
rec_div[202]="recomm_direct_202";
rec_div[101]="recomm_direct_101";

var recObject = new Object();	//rec对象,名称不能更改
if(recommendFlag) var _ozitem_id = recommend_99_Args.productIds;	//设置主题产品ID，产品ID可以填写多个，一般为1个
var _oznumber = new Object();	// 推荐产品返回个数，目前支持20个

if(recommendFlag){
    if(recommend_99_Args.pageName == 'index'){
        //首页 暂无
    }else if(recommend_99_Args.pageName == 'detail'){

        //详情页
        //_ozitem_id = ['10','67944'];

        _oznumber.ozbab = 10;	//recType:1 -- 位置:买了又买，展示数量:5
        _oznumber.ozvav = 10;	//recType:2 -- 位置:酒友推荐，展示数量:5
        //_oznumber.ozbav = 24;	//recType:3 -- 无
        _oznumber.ozvab = 10;	//recType:4 -- 位置:猜你喜欢，展示数量:5
        _oznumber.ozcst = 8;	//recType:201 -- 位置:加入购物车，展示数量:4
        //_oznumber.oznew = 8;	//recType:202 -- 无
        _oznumber.ozind = 20;	//recType:101 -- 位置:推荐组合，展示数量:10

    }else if(recommend_99_Args.pageName == 'search'){

        //搜索列表页(优惠券页面不展示推荐)
        if(recommend_99_Args.count<10 && !recommend_99_Args.couponFlag) _oznumber.ozcst = 100;	//recType:201 -- 热销产品（少/无结果），展示数量:10
        if(!recommend_99_Args.couponFlag){ _oznumber.ozind = 100;}else{ $('.recommenBox').hide();}  //recType:101 -- 猜您喜欢，展示数量:20

    }else if(recommend_99_Args.pageName == 'cart'){

        //购物车
        _oznumber.ozind = 40;	//recType:101 -- 猜您喜欢，展示数量:20
        _oznumber.oznew = 20;	//recType:202 -- 新品推荐，展示数量:10

    }else if(recommend_99_Args.pageName == 'userIndex'){

        //用户中心主页
        _oznumber.ozind = 40;	//recType:101 -- 为您推荐，展示数量:20

    }else if(recommend_99_Args.pageName == 'userBottom'){

        //用户中心其他页
        _oznumber.ozind = 40;	//recType:101 -- 猜您喜欢，展示数量:20

    }
}

/*
 1. 买了还买了(1)，看了还看了(2)，看了最终买了(3)，买了还看了(4)，入篮排行(201)，个性化推荐(101)，是系统目前支持的六种推荐类型，
 2. 1,2,3,4,201,101是六种推荐类型对应的Type编码，不可修改
 3. 六种推荐类型可以使用各自的_ozitem_id和_oznumber
 4. 对象recObject的属性“ozbab(买了还买了)、ozvav（看了还看了）、ozbav（看了最终买了）、ozvab（买了还看了）、ozcst（入篮排行）、oznew（新品推荐）、ozind（个性化推荐）”不是保留字，可以自定义，只要确保不重复就可以
 5. 自定义对象_oznumber中属性意义分别为“ozbab(买了还买了)、ozvav（看了还看了）、ozbav（看了最终买了）、ozvab（买了还看了）、ozcst（入篮排行）、oznew（新品推荐）、ozind（个性化推荐）”
 6. 对于个性化推荐（101），_ozitem_id可以设置为空，,即设置为var _ozitem_id = new Array("-")。(为了更好的推荐，最好设置当前页面相关产品id)
 */

//var _ozuid = "";	//对于101类型的推荐，可以设置 _ozuid 参数，获得更好推荐，非必须（页面尾部已定义）

if(_oznumber.ozbab) recObject.ozbab = new Array(_ozitem_id, _oznumber.ozbab, 1);	//买了还买了
if(_oznumber.ozvav) recObject.ozvav = new Array(_ozitem_id, _oznumber.ozvav, 2);	//看了还看了
if(_oznumber.ozbav) recObject.ozbav = new Array(_ozitem_id, _oznumber.ozbav, 3);	//看了最终买了
if(_oznumber.ozvab) recObject.ozvab = new Array(_ozitem_id, _oznumber.ozvab, 4);	//买了还看了
if(_oznumber.ozcst) recObject.ozcst = new Array(_ozitem_id, _oznumber.ozcst, 201);	//入篮排行
if(_oznumber.oznew) recObject.oznew = new Array(_ozitem_id, _oznumber.oznew, 202);	//新品推荐
if(_oznumber.ozind) recObject.ozind = new Array(_ozitem_id, _oznumber.ozind, 101);	//个性化推荐

/* 从此行开始，除推荐内容展示函数oz_recommend函数名不可更改外，其他内容可根据实际情况自行组织编写，此部分内容仅供参考*/

/*
 推荐内容展示函数,具体内容需用户依据实际情况编写，参数rec_result为p_code.js的返回值，返回值结构请参考下文p_code返回值部分。
 */
function oz_recommend(rec_result)
{
    //var div_con;
    var ind=0;
    var oadz_status = rec_result.s;

    if(oadz_status!=0)
    {
        var res_s=rec_result.res_s;
        if(res_s==1)
        {
            ind=rec_result.res_t;
            getRecProducts(rec_result.res_v,ind);
        }
    }
}

/* 获取商品信息*/
var getRecProducts = function(productIdArr,type){
    var pid = _ozitem_id;	//主商品id
    var rel_pid = [];	//推荐商品id
    for(var i=0; pid_rec_Arr=productIdArr[i]; i++)
    {
        rel_pid = rel_pid.concat(pid_rec_Arr[1]);
    }
    if(recommend_99_Args.pageName=='detail' && type==101) rel_pid.unshift(pid[0]);	//若是详情页推荐组合，则在前面加上主商品
    var size = rel_pid.length;	//推荐显示商品数量
    $.ajax({
        url: window.jxdomain.detail+'/recommend/productOfRecommend.htm',
        data:{
            productIds: rel_pid,
            size: size
        },
        type: 'POST',
        dataType: "jsonp",
        async: false,
        success:function(res){
            //console.log(res);
            var resData = eval('(' + res + ')'),
                data = resData.data;
            if(recommend_99_Args.pageName == 'index'){
                //首页
            }else if(recommend_99_Args.pageName == 'detail'){
                //详情页
                if(type==101){
                    // 详情页推荐组合
                    divCon_detailGroup(data,type,pid,size);
                }else if(type==201){
                    // 详情页加入购物车弹窗
                    divCon_detailCart(data,type,pid,size);
                }else{
                    //详情页其他（买了又买、酒友推荐、加入购物车、猜你喜欢）
                    divCon_public(data,type,pid,size);
                }
            }else if(recommend_99_Args.pageName == 'search'){
                //搜索列表页
                if(type==101){
                    // 详情页推荐组合
                    divCon_searchLike(data,type,pid,size);
                }else if(type==201){
                    // 详情页加入购物车弹窗
                    divCon_searchHot(data,type,pid,size);
                }
            }else if(recommend_99_Args.pageName == 'cart'){
                //购物车
                listCon = divCon_cart(data,type,pid,size);
            }else if(recommend_99_Args.pageName == 'userIndex'){
                //用户中心主页为您推荐
                divCon_userIndex(data,type,pid,size);
            }else if(recommend_99_Args.pageName == 'userBottom'){
                //用户中心底部猜您喜欢
                divCon_userBottom(data,type,pid,size);
            }

        }
    })
}

/* 公共推荐样式 */
function divCon_public(pro_data,r_type,proId,num){
    var flag = pro_data!=undefined && pro_data!=null && pro_data!='';
    if(!flag){	//若没有返回数据，则隐藏当前推荐位
        $('#'+rec_div[r_type]).parents('.recommend_wrap').hide();
        return false;
    }
    var c_div_con = '<ul class="clearfix" id="div_'+r_type+'_'+proId+'">';
    for(var n=0; pd=pro_data[n]; n++)
    {
        var attr= pd.productId+","+r_type+","+proId;
        var promoPrice = pd.promoPrice.toFixed(2);
        var plub_con = pd.clubPrice?'<span><em>'+pd.clubPrice+'</em><i></i></span>':'';
        var con='<li><div class="pic"><a target="_blank" href="'+window.jxdomain.detail+'/goods-'+pd.productId+'.html" title="'+pd.name+'" ozrec="'+attr+'" name="'+attr+'"><img alt="'+pd.name+'" src="'+pd.imgUrl+'"></a></div><div class="name"><a target="_blank" href="'+window.jxdomain.detail+'/goods-'+pd.productId+'.html" title="'+pd.name+'" ozrec="'+attr+'" name="'+attr+'">'+pd.name+'</a></div><div class="price"><p goodid="'+pd.productId+'">￥'+promoPrice+'</p>'+plub_con+'</div></li>';
        c_div_con += con;
        if(n>=(num/2-1)) break;
    }

    c_div_con += '</ul>'
    if(document.getElementById(rec_div[r_type])) document.getElementById(rec_div[r_type]).innerHTML = c_div_con;
}

/* 详情页 加入购物车弹窗 */
function divCon_detailCart(pro_data,r_type,proId,num){
    var flag = pro_data!=undefined && pro_data!=null && pro_data!='';
    if(!flag){	//若没有返回数据，则隐藏当前推荐位
        $('#'+rec_div[r_type]).parents('.recommend_wrap').hide();
        $('.u-buy-lay').css('height','142px');
        $('.u-buy-con').css('height','92px');
        return false;
    }
    var c_div_con = '<ul class="clearfix" id="div_'+r_type+'_'+proId+'">';
    for(var n=0; pd=pro_data[n]; n++)
    {
        var attr= pd.productId+","+r_type+","+proId;
        var promoPrice = pd.promoPrice.toFixed(2);
        var con='<li><div class="u-notice-pic"><a href="'+window.jxdomain.detail+'/goods-'+pd.productId+'.html" target="_blank" title="'+pd.name+'" ozrec="'+attr+'" name="'+attr+'"><img alt="'+pd.name+'" src="'+pd.imgUrl+'" width="80" height="80"></a></div><div class="u-notice-name"><a href="'+window.jxdomain.detail+'/goods-'+pd.productId+'.html" target="_blank" title="'+pd.name+'" ozrec="'+attr+'" name="'+attr+'">'+pd.name+'</a></div><div class="u-notice-price" goodid="'+pd.productId+'">￥'+promoPrice+'</div></li>';
        c_div_con += con;
        if(n>=(num/2-1)) break;
    }

    c_div_con += '</ul>'
    if(document.getElementById(rec_div[r_type])) document.getElementById(rec_div[r_type]).innerHTML = c_div_con;
}

/* 详情页 推荐组合 */
function divCon_detailGroup(pro_data,r_type,proId,num){
    var flag = pro_data!=undefined && pro_data!=null && pro_data!='';
    if(!flag || (flag && pro_data.length <=1)){	//若没有返回数据，则隐藏当前推荐位
        if($(".setTab").find("div").length <= 0){
            $(".setWrap").hide();
        }
        return false;
    }
    var setTablen=$(".setTab").find("div").length;

        $(".setWrap .setTab").empty().append('<div class="item cur"><span>推荐组合</span></div>');


    var dataLength = pro_data.length-1;
    //主商品
    var promoPrice_zsp = pro_data[0].promoPrice.toFixed(2);
    var c_div_con = '<div class="setCon"><div class="setBox"><div class="combBox"><div class="master"><i class="dIcon"></i><div class="m-img"><a href="'+window.jxdomain.detail+'/goods-'+pro_data[0].productId+'.html" target="_blank"><img src="'+pro_data[0].imgUrl+'" alt="'+pro_data[0].name+'" width="106" height="106"></a></div><div class="m-name"><a href="'+window.jxdomain.detail+'/goods-'+pro_data[0].productId+'.html" target="_blank" title="'+pro_data[0].name+'">'+pro_data[0].name+'</a></div></div>';

    //推荐商品
    c_div_con += '<div class="vice"><div class="item"><ul class="clearfix" id="div_'+r_type+'_'+proId+'" style="width: 1000px;">';
    for(var n=1; pd=pro_data[n]; n++)
    {
        var attr= pd.productId+","+r_type+","+proId;
        var promoPrice = pd.promoPrice.toFixed(2);
        var con ='<li><div class="m-img"><a target="_blank" href="'+window.jxdomain.detail+'/goods-'+pd.productId+'.html" title="'+pd.name+'" ozrec="'+attr+'" name="'+attr+'"><img alt="'+pd.name+'" src="'+pd.imgUrl+'" width="106" height="106" /></a></div><div class="m-name"><a target="_blank" pid="'+pd.productId+'" href="'+window.jxdomain.detail+'/goods-'+pd.productId+'.html" title="'+pd.name+'" ozrec="'+attr+'" name="'+attr+'">'+pd.name+'</a></div><div class="m-price" goodsId="'+pd.productId+'"><label><input name="group" type="checkbox" value=""><span>￥</span><span>'+promoPrice+'</span></label></div></li>';
        c_div_con += con;
        if(n>=((num-1)/2)){ dataLength=(num-1)/2; break;}
    }
    c_div_con += '</ul></div></div></div></div>'
    c_div_con += '<div class="accBox"><div class="total">已选择<strong>0</strong>个商品</div><p><span>搭配价：</span><strong>'+promoPrice_zsp+'</strong></p>'+
        '<a href="javascript:void(0);" class="setBuy" onclick="javascript:groupToCart();">购买套装</a></div></div>';

    if(document.getElementById(rec_div[r_type])) document.getElementById(rec_div[r_type]).innerHTML = c_div_con;

    var listWid = dataLength*200;
    $('.vice:last').find('ul').css('width',listWid+'px');
    $(".setWrap .setTab .item:eq(0)").addClass("cur");
    //$(".setConWrap .group").hide();
    //if(setTablen > 0){$(".setWrap .setConWrap .tz").siblings("div").find('.setCon').hide();}
    $(".setWrap").show();
}

/* 搜素页 热销产品 */
function divCon_searchHot(pro_data,r_type,proId,num){
    var flag = pro_data!=undefined && pro_data!=null && pro_data!='';
    if(!flag){	//若没有返回数据，则隐藏当前推荐位
        $('#'+rec_div[r_type]).parents('.hotList').hide();
        return false;
    }else{
        $('#'+rec_div[r_type]).parents('.hotList').show();
    }
    var c_div_con = '<ul class="clearfix" id="div_'+r_type+'_'+proId+'">';
    var rec_proIds = '';
    for(var n=0; pd=pro_data[n]; n++)
    {
        var attr= pd.productId+","+r_type+","+proId;
        var promoPrice = pd.promoPrice.toFixed(2);

        var jxzx_con = pd.isSelection?'<i class="zhenxuan"></i>':'',	//酒仙甄选
            plub_con = pd.clubPrice?'<p class="clubPrice"><span>￥'+pd.clubPrice+'</span><i></i></p>':'',	//club价
            //shop_icon = pd.pclogo?'<img alt="${item.shopName}" src="'+pd.pclogo+'">':'<i class="sIcon"></i>',
            shop_con = !pd.self?'<a href="'+pd.pcShopUrl+'" target="_blank"><i class="sIcon"></i><span>'+pd.shopName+'</span></a>':'',	//店铺
            jx_con = pd.self?'<i class="projx sIcon"></i>':'',	//自营
            czy_con = pd.factoryDirectSale?'<i class="smoldIcon"></i>':'';	//厂直营
        //jxps_con = pd.clubPrice?'<span class="jxps">酒仙配送</span>':'';	//酒仙配送

        var div_html = '';
        var presell = pd.presell;
        var b_html='';
        if(presell){
            div_html = '<div class="presaleBox"><div class="presaing"><i></i><span>预售中</span></div></div>'
            b_html = '<a class="presaleBtn" href="'+window.jxdomain.detail+'/goods-'+pd.productId+'.html" target="_blank"><i></i><span>立即参与</span></a>';
        }else{
            b_html = '<div class="edit"><a class="decrease off" href="javascript:;">-</a><input type="text" gid="'+pd.productId+'" gname="'+pd.name+'" id="InputNum'+pd.productId+'" onkeyup="changeNum(this.value,'+pd.productId+')" value="1"><a class="increase" href="javascript:;">+</a></div><a class="cart sIcon prtlt_btn2" href="javascript:;">加入购物车</a>';
        }

        var con='<li product-box="'+pd.productId+'"><div class="frameA"></div><div class="content clearfix"><div class="collect_box">'
            + div_html
            +'<a class="img clearfix" href="'+window.jxdomain.detail+'/goods-'+pd.productId+'.html" title="'+pd.name+'" ozrec="'+attr+'" name="'+attr+'" target="_blank"><img proImgId="'+pd.productId+'" src="'+pd.imgUrl+'" alt="'+pd.name+'" title="'+pd.name+'" /></a></div><div class="priceArea clearfix"><p class="price">&yen;<span>'+promoPrice+'</span></p>'+plub_con+'</div><div class="proName"><a href="'+window.jxdomain.detail+'/goods-'+pd.productId+'.html" title="'+pd.name+'" ozrec="'+attr+'" name="'+attr+'" target="_blank">'+jxzx_con+pd.name+'<span id="rec_promote_'+pd.productId+'" class="slogan"></span></a></div><div class="judgeAdv clearfix"><a class="judge" href="'+window.jxdomain.detail+'/goods-'+pd.productId+'.html#answerArea" title="" target="_blank"><span>'+pd.commentCount+'</span>评价</a></div>'
            +'<div class="seller">'+shop_con+'</div><div id="rec_activity_'+pd.productId+'" class="cuxiao">'+jx_con + czy_con+'</div>'
            +'<div class="buyArea clearfix" id="addcart_'+pd.productId+'">'
            + b_html
            + '</div></div></li>';

        c_div_con += con;
        rec_proIds += (','+pd.productId);
        if(n>=(num/2-1)) break;
    }

    c_div_con += '</ul>'
    if(document.getElementById(rec_div[r_type])) document.getElementById(rec_div[r_type]).innerHTML = c_div_con;
    rec_proIds = rec_proIds.substring(1);
    getRecProductsPromo(rec_proIds);
}

/* 获取商品信息*/
var getRecProductsPromo = function(proIds){
    $.ajax({
        url: window.jxdomain.list+'/getPromoInfosByProIds.htm',
        data:{
            ids: proIds
        },
        type: 'GET',
        dataType: "json",
        async: false,
        success:function(res){
            //console.log(res);
            //var resData = eval('(' + res + ')');
            var idsArray = proIds.split(",");
            for(var i=0;i<idsArray.length;i++){
                var pid = idsArray[i];
                var activitys = res[pid];
                if(activitys!=null && activitys.length>0){
                    for(var j in activitys){
                        var name = activitys[j].actName;
                        // 促销标签
                        $("#rec_activity_"+pid).append("<span class=\"yh\">"+name+"</span>");

                        // 促销广告语
                        var promoAds = activitys[j].promoAds;
                        if(promoAds) $('#rec_promote_'+pid).text(promoAds);
                    }
                }
            }
        }
    })
}

/* 搜素页 猜您喜欢 */
function divCon_searchLike(pro_data,r_type,proId,num){
    var flag = pro_data!=undefined && pro_data!=null && pro_data!='';
    if(!flag){	//若没有返回数据，则隐藏当前推荐位
        $('#'+rec_div[r_type]).parents('.recommenBox').hide();
        return false;
    }else{
        $('#'+rec_div[r_type]).parents('.recommenBox').show();
    }
    var c_div_con = '<ul class="clearfix" id="div_'+r_type+'_'+proId+'">';
    for(var n=0; pd=pro_data[n]; n++)
    {
        var attr= pd.productId+","+r_type+","+proId;
        var promoPrice = pd.promoPrice.toFixed(2);
        var plub_con = pd.clubPrice?'<span><em>'+pd.clubPrice+'</em><i></i></span>':'';
        var div_html = '';
        var presell = pd.presell;
        if(presell){
            div_html = '<div class="buyArea clearfix" id="addcart_'+pd.productId+'"><a class="detail" href="'+window.jxdomain.detail+'/goods-'+pd.productId+'.html" target="_blank">预售中</a></div>';
        }else{
            div_html = '<div class="buyArea clearfix" id="addcart_'+pd.productId+'"><div class="edit"><a class="decrease off" href="javascript:;">-</a><input type="text" gid="'+pd.productId+'" gname="'+pd.name+'" id="InputNum'+pd.productId+'" onkeyup="changeNum(this.value,'+pd.productId+')" value="1" name=""><a class="increase" href="javascript:;">+</a></div><a class="cart sIcon prtlt_btn2" href="javascript:;">加入购物车</a></div>';
        }

        var con='<li><div class="con"><div class="imgBox"><a class="img" href="'+window.jxdomain.detail+'/goods-'+pd.productId+'.html" title="'+pd.name+'" ozrec="'+attr+'" name="'+attr+'" target="_blank"><img src="'+pd.imgUrl+'" alt="'+pd.name+'" width="130" height="130"></a></div><div class="goodInfo"><div class="goodName"> <a class="name" href="'+window.jxdomain.detail+'/goods-'+pd.productId+'.html" title="'+pd.name+'" ozrec="'+attr+'" name="'+attr+'" target="_blank">'+pd.name+'</a></div><div class="goodPrice"><b id="buy_59235">￥'+promoPrice+'</b>'+plub_con+'</div><div class="judgeAdv clearfix"><a class="judge" href="'+window.jxdomain.detail+'/goods-'+pd.productId+'.html#answerArea" title="" target="_blank"><span>'+pd.commentCount+'</span>评价</a></div>'
            + div_html
            + '</div></div></li>';

        c_div_con += con;
        if(n>=(num/2-1)) break;
    }

    c_div_con += '</ul>'
    if(document.getElementById(rec_div[r_type])) document.getElementById(rec_div[r_type]).innerHTML = c_div_con;
}

/* 购物车 猜您喜欢/新品推荐 */
function divCon_cart(pro_data,r_type,proId,num){
    var flag = pro_data!=undefined && pro_data!=null && pro_data!='';
    if(!flag){	//若没有返回数据，则隐藏当前推荐位
        $('#'+rec_div[r_type]).parents('.recommend-info').hide();
        if(r_type==101){	//是猜您喜欢or新品推荐
            $(".recommend-head").find("span:first").removeClass('cur').hide();
            $(".recommend-head").find("span:eq(1)").addClass('cur').show();
            $('.recommend-info:eq(1)').show();
        }else{
            $(".recommend-head").find("span:last").hide();
        }
        return false;
    }

    var c_div_con = '<ul class="bigUl clearfix" id="div_'+r_type+'_'+proId+'">';
    for(var n=0; pd=pro_data[n]; n++)
    {
        var attr= pd.productId+","+r_type+","+proId;
        //var comment= r_type==101 ? '<div class="recommend-comment" id="comment_'+pd.productId+'">'+pd.commentCount+'人已评价</div>' : '';
        var promoPrice = pd.promoPrice.toFixed(2);

        var bt_html='';
        var presell = pd.presell;
        if(presell){
            bt_html = '<a href="'+window.jxdomain.detail+'/goods-'+pd.productId+'.html" target="_blank" name="detail_btn" _proid="'+pd.productId+'" _src="'+pd.productId+'"><span>预售中</span></a>';
        }else{
            bt_html = '<a href="javascript:;" name="add_to_cart_btn" _proid="'+pd.productId+'" _src="'+pd.productId+'"><i class="cartIcon"></i><span>加入购物车</span></a>';
        }

        var con='<li><div class="recommend-img"><a target="_blank" href="'+window.jxdomain.detail+'/goods-'+pd.productId+'.html" title="'+pd.name+'" ozrec="'+attr+'" name="'+attr+'"><img src="'+pd.imgUrl+'" width="160" height="160" alt="'+pd.name+'"></a></div><div class="recommend-name"><a target="_blank" href="'+window.jxdomain.detail+'/goods-'+pd.productId+'.html" title="'+pd.name+'" ozrec="'+attr+'" name="'+attr+'">'+pd.name+'</a></div><div class="recommend-price"><span class="jx-price" _data="price" _proid="'+pd.productId+'" id="cartpri_'+pd.productId+'">￥'+promoPrice+'</span><span class="club-price" id="cartclubpri_'+pd.productId+'"></span></div><div class="recommend-comment" id="comment_'+pd.productId+'">'+pd.commentCount+'人已评价</div><div class="cart-btn">'
            + bt_html
            + '</div></li>';
        c_div_con += con;
        if(n>=(num/2-1)) break;
    }

    c_div_con += '</ul>'
    if(document.getElementById(rec_div[r_type])) document.getElementById(rec_div[r_type]).innerHTML = c_div_con;
    $('.recommend-info').slider();
}

/* 用户中心 主页为您推荐 */
function divCon_userIndex(pro_data,r_type,proId,num){
    //pro_data=undefined;
    var flag = pro_data!=undefined && pro_data!=null && pro_data!='';
    if(!flag){	//若没有返回数据，则隐藏当前推荐位
        $('#'+rec_div[r_type]).parents('.colList').hide();
        var colListEmpty = '<div class="colListEmpty emptyFrame clearfix"><span style="margin-left: 155px;">暂无商品</span></div>';
        $('#'+rec_div[r_type]).parents('.middle').append(colListEmpty);
        return false;
    }
    var c_div_con = '<ul class="clearfix" id="div_'+r_type+'_'+proId+'">';
    for(var n=0; pd=pro_data[n]; n++)
    {
        var attr= pd.productId+","+r_type+","+proId;
        var promoPrice = pd.promoPrice.toFixed(2);
        var con='<li><a target="_blank" href="'+window.jxdomain.detail+'/goods-'+pd.productId+'.html" title="'+pd.name+'" ozrec="'+attr+'" name="'+attr+'"><img src="'+pd.imgUrl+'" width="96px;" height="96px;" alt="'+pd.name+'"></a><a class="name" href="'+window.jxdomain.detail+'/goods-'+pd.productId+'.html" title="'+pd.name+'" ozrec="'+attr+'" name="'+attr+'" target="_blank">'+pd.name+'</a><p class="price userCenter_nowPrice_17624">￥'+promoPrice+'</p></li>';
        c_div_con += con;
        if(n>=(num/2-1)) break;
    }

    c_div_con += '</ul>'
    if(document.getElementById(rec_div[r_type])) document.getElementById(rec_div[r_type]).innerHTML = c_div_con;
    var pageNum,sliderWidth,newWidth = $(window).width();
    if(newWidth>1200){pageNum=5;sliderWidth=640;}else{pageNum=4;sliderWidth=500;}
    $(".reco .colFrame").Slider({"pageNum":pageNum,"width":sliderWidth});
}

/* 用户中心 底部猜您喜欢 */
function divCon_userBottom(pro_data,r_type,proId,num){
    var flag = pro_data!=undefined && pro_data!=null && pro_data!='';
    if(!flag){	//若没有返回数据，则隐藏当前推荐位
        $('#'+rec_div[r_type]).parents('.userBotW').hide();
        return false;
    }
    var c_div_con = '<ul class="clearfix" id="div_'+r_type+'_'+proId+'">';
    for(var n=0; pd=pro_data[n]; n++)
    {
        var attr= pd.productId+","+r_type+","+proId;
        var promoPrice = pd.promoPrice.toFixed(2);
        var bt_html='';
        var presell = pd.presell;
        if(presell){
            bt_html = '<a href="'+window.jxdomain.detail+'/goods-'+pd.productId+'.html" target="_blank" proid="'+pd.productId+'" proname="'+pd.name+'">预售中</a>';
        }else{
            bt_html = '<a href="javascript:;" class="uc_guess_addToCart" proid="'+pd.productId+'" proname="'+pd.name+'">加入购物车</a>';
        }
        var con='<li><div class="ubRemPic"><a target="_blank" href="'+window.jxdomain.detail+'/goods-'+pd.productId+'.html" title="'+pd.name+'" ozrec="'+attr+'" name="'+attr+'"><img alt="'+pd.name+'" src="'+pd.imgUrl+'" width="100" height="100"></a></div><div class="ubRemInter"><p class="ubRem-name"><a target="_blank" href="'+window.jxdomain.detail+'/goods-'+pd.productId+'.html" title="'+pd.name+'" ozrec="'+attr+'" name="'+attr+'">'+pd.name+'</a></p><p class="ubRem-price userCenter_nowPrice_'+pd.productId+'">'+promoPrice+'</p><p class="ubRem-bay">'
            + bt_html
            + '</p></div></li>';
        c_div_con += con;
        if(n>=(num/2-1)) break;
    }

    c_div_con += '</ul>'
    if(document.getElementById(rec_div[r_type])) document.getElementById(rec_div[r_type]).innerHTML = c_div_con;
    var pageNum,sliderWidth,newW=$(window).width();
    if(newW>1200){pageNum=5;sliderWidth=900;}else{pageNum=4;sliderWidth=700;}
    $(".ubRemList").Slider({"pageNum":pageNum,"width":sliderWidth});
    $(".uc_guess_addToCart").click(function(e){
        var num=1,goodsId=$(this).attr("proId"),goodsName=$(this).attr("proName"),fromId=$("#fromUrlId").val();
        addcart(goodsId);
    });
}
