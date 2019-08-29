SearchPcJs = {
		
	getProductIds: function(o){
		if(!o){
			o = $.find('li[product-box]');
		}
		
		var ids = '';
        $(o).each(function (index, element) {
            var productId = element.getAttribute('product-box');
            ids = ids + productId + ',';
        });
        ids = ids.substring(0, ids.length - 1);
        return ids;
	},
	
    getPrices: function() {
        var productBoxes = $.find('li[product-box]');
        if(productBoxes) {
            var ids = SearchPcJs.getProductIds(productBoxes);
            if(ids==''){
        		return;
        	}
            $.ajax({
            	type: 'GET',
            	url: '/act/selectPriceByProIds.htm',
            	data: {
            		ids: ids
            	},
            	contentType : "application/x-www-form-urlencoded; charset=utf-8",
            	dataType : "json",
            	success: function (result) {
            		if(result['status'] == 1) {
            			var prices = result['data'];
            			
            			if(prices){
            				for(var pid in prices) {
            					var price = prices[pid];
            					$('p[id=product_'+pid+']').find("span").text(price);
            				}
            			}
            		}
            	},
            	error: function(jqXHR, textStatus, errorThrown) {
            		//alert(errorThrown);
            	}
            });
        }
    },
    
    getPriceAndClubPrice: function() {
        var productBoxes = $.find('li[product-box]');
        if(productBoxes) {
        	var ids = SearchPcJs.getProductIds(productBoxes);
        	if(ids==''){
        		return;
        	}
            $.ajax({
                type: 'GET',
                url: '/act/selectPriceAndClubPriceByProIds.htm',
                data: {
                    ids: ids
                },
                contentType : "application/x-www-form-urlencoded; charset=utf-8",
        		dataType : "json",
                success: function (result) {
                    if(result['status'] == 1) {
                        var prices = result['data'];
                        if(prices){
                        	var s_clubProduct = $('#clubProduct');
                    		var selectedClub = false;
                    		if(s_clubProduct.length > 0){
                    			selectedClub = s_clubProduct[0].checked;
                    		}
                            for(var i in prices) {
                            	var o = prices[i];
                            	if(o!=undefined && o!=null){
                            		var pid = o.productId;
                            		var price = o.price;
                            		$('p[id=product_'+pid+']').find("span").text(price);
                            		var shopPro = $('#shopProId_'+pid).text();
                            		if(selectedClub || shopPro){
                            			var clubPrice = o.clubPrice;
                            			if(clubPrice!=undefined && clubPrice!=null && clubPrice!="" && clubPrice!="0"){
                            				$('p[id=product_clubPrice_'+pid+']').find("span").text("￥"+clubPrice);
                            				$('p[id=product_clubPrice_'+pid+']').append("<i></i>");
                            			}
                            		}
                            	}
                            }
                        }
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                	//alert(errorThrown);
                }
            });
        }
    },
    
    getProductComments: function() {
        var productBoxes = $.find('li[product-box]');
        if(productBoxes) {
        	var ids = SearchPcJs.getProductIds(productBoxes);
        	if(ids==''){
        		return;
        	}
            $.ajax({
                type: 'GET',
                url: '/getProductComments.htm',
                data: {
                    ids: ids
                },
                contentType : "application/x-www-form-urlencoded; charset=utf-8",
        		dataType : "json",
                success: function (data) {
                	var idsArray = ids.split(",");
    				for(var i=0;i<idsArray.length;i++){
    					if(data[idsArray[i]]!=null && data[idsArray[i]]!=""){
    						$("#comments_"+idsArray[i]).text(data[idsArray[i]]);
    					}else{
    						$("#comments_"+idsArray[i]).text("0");
    					}
    				}
                },
                error: function(jqXHR, textStatus, errorThrown) {
                	//alert(errorThrown);
                }
            });
        }
    },
    
    getProductPromos: function() {
        var productBoxes = $.find('li[product-box]');
        if(productBoxes) {
        	var ids = SearchPcJs.getProductIds(productBoxes);
        	if(ids==''){
        		return;
        	}
            $.ajax({
                type: 'GET',
                url: '/getPromoInfosByProIds.htm',
                data: {
                    ids: ids
                },
                contentType : "application/x-www-form-urlencoded; charset=utf-8",
        		dataType : "json",
                success: function (data) {
                	var idsArray = ids.split(",");
    				for(var i=0;i<idsArray.length;i++){
    					var pid = idsArray[i];
    					var activitys = data[pid];
    					if(activitys!=null && activitys.length>0){
    						for(var j in activitys){
    							var color = activitys[j].actColor;
    							var name = activitys[j].actName;
    							// 促销标签
    							$("#activity_"+pid).append("<span class=\"yh\">"+name+"</span>");
    							
    							// 促销广告语
    							var promoAds = activitys[j].promoAds;
    							if(promoAds){
    								$('#promote_'+pid).text(promoAds);
    							}
    						}
    					}
    				}
                },
                error: function(jqXHR, textStatus, errorThrown) {
                	//alert(errorThrown);
                }
            });
        }
    },
    
    getProductStocks: function() {
        var productBoxes = $.find('li[product-box]');
        if(productBoxes) {
        	var ids = SearchPcJs.getProductIds(productBoxes);
        	if(ids==''){
        		return;
        	}
            $.ajax({
                type: 'GET',
                url: '/getProductStocksByProIds.htm',
                data: {
                    ids: ids
                },
                contentType : "application/x-www-form-urlencoded; charset=utf-8",
        		dataType : "json",
                success: function (data) {
                	if(data!=null && data!=undefined){
                		var idsArray = ids.split(",");
                		for(var i=0;i<idsArray.length;i++){
                			var pid = idsArray[i];
                			var stock = data[pid];
                			if(stock>0){
                				$("#addcart_"+pid).show();
                			}else{
                				$("#buyover_"+pid).show();
                			}
                		}
                	}
                },
                error: function(jqXHR, textStatus, errorThrown) {
                	//alert(errorThrown);
                }
            });
        }
    },
    
    getSearchAdv : function(){
    	jQuery.ajax({
    		type:"GET",
    		url:"/getAdv.htm?t="+new Date().getTime(),
    		data:{"advId":150033},
    		dataType:"json",
    		success:function(data){
    			var advStr = "";
    			if(data != null){
    				for(var i=0;i<data.length;i++){
    					advStr +='<li> <a class="img" href="'+data[i].Url+'" target="_blank"><img src="${property.getProperty("pc.domain.img10")}/bill'+data[i].Pic+'" alt="" /></a> </li>';
    				}
    				$("#adv").html(advStr);
    			}
    		}
    	});
    },
    
    getProductMarks : function(){
    	var productBoxes = $.find('li[product-box]');
        if(productBoxes) {
        	var ids = SearchPcJs.getProductIds(productBoxes);
        	if(ids==''){
        		return;
        	}
        	jQuery.ajax({
        		type:"GET",
        		url:"/getProductMarks.htm?t="+new Date().getTime(),
        		data:{"ids":ids},
        		dataType:"json",
        		success:function(data){
        			for(var obj in data){
        				if(data[obj]!=""){
        					SearchPcJs.setMark(obj,data[obj]);
        				}
        			}
        		}
        	});
        }
    },

    setMark : function(id,type){
    	if(type == '1'){
    		//直降
    		$("#mark_"+id).html("直降");
    		$("#mark_"+id).show();
    	}else if(type == '2'){
    		//人气
    		$("#mark_"+id).html("人气");
    		$("#mark_"+id).show();
    	}else if(type == '3'){
    		//高性价
    		$("#mark_"+id).html("高性价");
    		$("#mark_"+id).show();
    	}else if(type == '4'){
    		//疯抢
    		$("#mark_"+id).html("疯抢");
    		$("#mark_"+id).show();
    	}else if(type == '5'){
    		//限量
    		$("#mark_"+id).html("限量");
    		$("#mark_"+id).show();
    	}else if(type == '6'){
    		//新品
    		$("#mark_"+id).html("新品");
    		$("#mark_"+id).show();
    	}else if(type == '7'){
    		//AOC
    		$("#mark_"+id).html("AOC");
    		$("#mark_"+id).show();
    	}else if(type == '8'){
    		//热卖
    		$("#mark_"+id).html("热卖");
    		$("#mark_"+id).show();
    	}else if(type == '9'){
    		//爆款
    		$("#mark_"+id).html("爆款");
    		$("#mark_"+id).show();
    	}else if(type == '10'){
    		//特价
    		$("#mark_"+id).html("特价");
    		$("#mark_"+id).show();
    	}else if(type == '11'){
    		//赠品
    		$("#mark_"+id).html("赠品");
    		$("#mark_"+id).show();
    	}else if(type == '12'){
    		//秒杀
    		$("#mark_"+id).html("秒杀");
    		$("#mark_"+id).show();
    	}else if(type == '13'){
    		//DOC
    		$("#mark_"+id).html("DOC");
    		$("#mark_"+id).show();
    	}else if(type == '14'){
    		//限时抢购
    		$("#mark_"+id).html("限时抢购");
    		$("#mark_"+id).show();
    	}else if(type == '15'){
    		//惊爆价
    		$("#mark_"+id).html("惊爆价");
    		$("#mark_"+id).show();
    	}else if(type == '16'){
    		//好评
    		$("#mark_"+id).html("好评");
    		$("#mark_"+id).show();
    	}else if(type == '17'){
    		//送礼
    		$("#mark_"+id).html("送礼");
    		$("#mark_"+id).show();
    	}else if(type == '18'){
    		//已售完
    		$("#mark_"+id).html("已售完");
    		$("#mark_"+id).show();
    	}
    },
    
    getPopRecommendProducts : function(){
    	jQuery.ajax({
    		type:"GET",
    		url:"/getPopRecommendProducts.htm",
    		dataType:"json",
    		success:function(data){
    			var popStr = "";
    			if(data != null){
    				for(var i=0;i<data.length;i++){
    					var item = data[i];
    					var itemId = item.id;
    					var itemName = item.name;
    					var itemUrl = window.jxdomain.detail+'/goods-'+itemId+'.html';
    					var listImg = item.listImagePath;
    					if(i==0){
    						popStr += '<li class=" on first clearfix"><span class=" num top3">1</span><span class="name_s" style="display:none;">'+itemName+'</span>'
    						       + '<div class="listBig" style="display:block;"><a class="img" href="'+itemUrl+'" title="'+itemName+'" target="_blank"><img src="'+listImg+'" alt="'+itemName+'" /></a>'
    						       + '<div class="info"><a class="name" title="'+itemName+'" href="'+itemUrl+'" target="_blank">'+itemName+'</a><p class="price" id="pop_'+itemId+'"></p></div></div>'
    						       +'</li>';
    					}else{
    						var vtop='';
    						if(i<3){
    							vtop = 'top3';
    						}
    						popStr += '<li><span class="num '+vtop+'">'+(i+1)+'</span><span class="name_s" >'+itemName+'</span>'
    							   + '<div class="listBig" style="display:none;"><a class="img" href="'+itemUrl+'" title="'+itemName+'" target="_blank"><img src="'+listImg+'" alt="'+itemName+'" /></a>'
    							   + '<div class="info"> <a class="name" title="'+itemName+'" href="'+itemUrl+'" target="_blank">'+itemName+'</a><p class="price" id="pop_'+itemId+'"></p></div></div>'
    							   + '</li>';
    					}
    				}
    				$("#ulPopProducts").html(popStr);
    				//$("#popProduct").show();
    				setTimeout("$('#popProduct').show();",3000);
    			}else{
    				$("#popProduct").hide();
    			}
    		}
    	});
    }
    
    
}