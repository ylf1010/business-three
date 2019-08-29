$(function(){
	$("#province").change(function(){
		changeProvince();
	});
	$("#city").change(function(){
		changeCity();
	});
	$("#county").change(function(){
		changeCounty();
	});
	$("#street").change(function(){
		changeStreet();
	});
//获取省市区数据
function getNextRegionList(pId){
      var jsonData = null;
      jQuery.ajax({
		 type:'post',
		 url:'/getNextRegionList.htm',
		 data:{'pId':pId},
		 dataType:'json',
		 cache:false,
		 async:false,
		 success:function(data){
		     jsonData = data;            
		 },
		 error:function(){
			 alert("操作失败,请稍后重试!!!");
		 }
	 });
	 return jsonData;
}
//切换省
function changeProvince(){
   var pId = jQuery.trim($("#province").val());
   if(pId != ''){
        var jsonData  =  getNextRegionList(pId);
		if(jsonData != null && jsonData.list != null && jsonData.list.length > 0){
            var content = [];
			content.push('<option value="">请选择</option>');
			for(var i = 0;i<jsonData.list.length;i++){
			    content.push('<option value="'+jsonData.list[i].ID+'">'+jsonData.list[i].name+'</option>');
			}	
			$("#city").empty().append(content.join(''));
		}
   }else{
	   $("#city").empty().append('<option value="">请选择</option>'); 
   }
   $("#county").empty().append('<option value="">请选择</option>');
   $("#street").empty().append('<option value="">请选择</option>');
   $(".delivery").hide();
}
//切换市
function changeCity(){
       var pId = jQuery.trim($("#city").val());
	   if(pId != ''){
	        var jsonData  =  getNextRegionList(pId);
			if(jsonData != null && jsonData.list != null && jsonData.list.length > 0){
		            var content = [];
					content.push('<option value="">请选择</option>');
					for(var i = 0;i<jsonData.list.length;i++){
					    content.push('<option value="'+jsonData.list[i].ID+'">'+jsonData.list[i].name+'</option>');
					}	 
					$("#county").empty().append(content.join(''));
			}
	   }else{
		   $("#county").empty().append('<option value="">请选择</option>'); 
	   }
   $("#street").empty().append('<option value="">请选择</option>');
   $(".delivery").hide();
}
//切换县
function changeCounty(){
       var pId = jQuery.trim($("#county").val());
	   if(pId != ''){
	        var jsonData  =  getNextRegionList(pId);
			if(jsonData != null && jsonData.list != null && jsonData.list.length > 0){
		            var content = [];
					content.push('<option value="">请选择</option>');
					for(var i = 0;i<jsonData.list.length;i++){
					    content.push('<option value="'+jsonData.list[i].ID+'">'+jsonData.list[i].name+'</option>');
					}	 
					$("#street").empty().append(content.join(''));
			}
	   }else{
		   $("#street").empty().append('<option value="">请选择</option>'); 
	   }
	    $(".delivery").hide();
}
//切换街道
function changeStreet(){
	   var pId = jQuery.trim($("#street").val());
	   if(pId != ''){
	   		var regionId = pId;
	        var jsonData  =  getWarehouseReal(regionId);
			if(jsonData != null && jsonData.list != null && jsonData.list.length > 0){
				var content = [];
				for(var i=0;i<jsonData.list.length;i++){
					content.push('<tr><td>'+jsonData.list[i].wareName+'</td><td>'+jsonData.list[i].deliveryTime+'</td>'+
							'<td>'+jsonData.list[i].isPay+'</td><td>'+jsonData.list[i].isPost+'</td><tr>');
				}
				$("#delivery_tbody").empty().append(content.join(''));
				$(".delivery").show();
			}
	   }
}
//获取街道所对应的仓库时效信息
function getWarehouseReal(regionId){
      var jsonData = null;
      jQuery.ajax({
		 type:'post',
		 url:'/getWarehouseReal.htm',
		 data:{'regionId':regionId},
		 dataType:'json',
		 cache:false,
		 async:false,
		 success:function(data){
		     jsonData = data;            
		 },
		 error:function(){
			 alert("操作失败,请稍后重试!!!");
		 }
	 });
	 return jsonData;
}
})