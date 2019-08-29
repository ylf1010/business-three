function setPage(pageNo,pageSize,totalPages,totalResults,type){
    var pageNo = parseInt(pageNo);
    var pageSize = parseInt(pageSize);
    var totalPages = parseInt(totalPages);
    var totalResults = parseInt(totalResults);
    var page= '<div class="u-evaluate-page">';
    if(totalPages==1){
        page+='<a class="prve" href="javascript:void(0);" title="上一页">上一页</a>'
            +'<a class="current" >1</a>'
            +'<a class="next" href="javascript:void(0);" title="下一页">下一页</a>';
    }
    var totle=5;
    if(totalPages>1){
        if(pageNo>1){
            page+='<a class="prve" href="javascript:void(0);" title="上一页" onclick="sub('+(pageNo-1)+','+type+',$(this));">上一页</a>';
        }else if(pageNo==1){
            page+='<a class="prve" href="javascript:void(0);" title="上一页">上一页</a>';
        }

        var content='';
        var left='';
        var leftlength=0;
        var right='';
        var rightlength=0;
        var midle='';
        for(var i=pageNo-Math.floor(totle/2);i<pageNo;i++){
            if(i>0){
                left+='<a href="javascript:void(0);" onclick="sub('+i+','+type+',$(this));">'+i+'</a>';
                leftlength++;
            }
        }
        midle='<a class="current" >'+pageNo+'</a>';
        for(var i=pageNo+1;i<=pageNo+Math.floor(totle/2);i++){
            if(i<=totalPages){
                right+='<a href="javascript:void(0);" onclick="sub('+i+','+type+',$(this));"  >'+i+'</a>';
                rightlength++;
            }
        }

        if(leftlength+rightlength < totle-1){
            if(pageNo-leftlength-1>0 || pageNo+rightlength<totalPages){
                while(leftlength+rightlength<totle-1){
                    if(pageNo-leftlength-1>0){
                        leftlength++;
                        left='<a href="javascript:void(0);"  onclick="sub('+(pageNo-leftlength)+','+type+',$(this));"   >'+(pageNo-leftlength)+'</a>'+left;
                    }else if(pageNo+rightlength<totalPages){
                        rightlength++;
                        right+='<a href="javascript:void(0);" onclick="sub('+(pageNo+rightlength)+','+type+',$(this));"     >'+(pageNo+rightlength)+'</a>';
                    }else break;
                }
            }
        }
        content=left+midle+right;

        if(pageNo-leftlength-1 > 1){
            page+='<a href="javascript:void(0);" onclick="sub(1,'+type+',$(this));">1</a><span>...</span>';
        }
        else if(pageNo-leftlength-1 == 1) {
            page+='<a href="javascript:void(0);" onclick="sub(1,'+type+',$(this));">1</a>';
        }
        page+=content;

        if(pageNo+rightlength < totalPages-1){
            page+='<span>...</span><a href="javascript:void(0);" onclick="sub('+totalPages+','+type+',$(this));">'+totalPages+'</a>';
        }
        else if(pageNo+rightlength == totalPages-1){
            page+='<a href="javascript:void(0);" onclick="sub('+totalPages+','+type+',$(this));">'+totalPages+'</a>';
        }

        if(pageNo<totalPages){
            page+='<a class="next" href="javascript:void(0);" title="下一页" onclick="sub('+(pageNo+1)+','+type+',$(this));">下一页</a>';
        }
        else if(pageNo==totalPages){
            page+='<a class="next" href="javascript:void(0);" title="下一页">下一页</a>';
        }
    }
    page+='</div>';
    return page;
}

function sub( pageNum, type, oThis ) {
    var parent = oThis.parents();
    var scrollTop = oThis.parents('.tab-item').offset().top-48;
    if (type == -1) {
        $.getProductComment( null, pageNum );
    }else if(type == -2){
        var uri = window.location.href;
        var pageNumIndex = uri.indexOf("&pageNum=");
        if(pageNumIndex > 0){
            uri = uri.substring(0, pageNumIndex);
        }
        location = uri + "&pageNum=" + pageNum;
    } else {
        initzx(pageNum, type)
    }
    $(window).scrollTop(scrollTop);

}

$(function(){

    var _page_label ;

    //console.log( " Function.. " );

//        $("div[class*=comment-tab],div[class*=tagList]").on("click", "ul[class*=tag-s-sys-event] > li,ul[class*=tag-s-user-event] > li", function() {
//     $("div[class*=comment-tab] > ul[class*=tag-s-sys-event] > li,div[class*=tagList] > ul[class*=tag-s-user-event] > li").bind("click", function () {
    $(document).on("click", "div[class*=comment-tab] > ul[class*=tag-s-sys-event] > li,div[class*=tagList] > ul[class*=tag-s-user-event] > li", function() {

        var _this = $(this);

        if ( _this.parent().attr("class") != null && _this.parent().attr("class") != undefined && _this.parent().attr("class").indexOf("tag-s-user-event") > -1 &&  _this.attr("style").indexOf("background-color") > -1 ) {

            $("div[class*=comment-tab] > ul[class*=tag-s-sys-event] > li").eq(0).click();
            _this.parent().children().css("background-color","");
            _this.parent().children().css("color","#666666");
            return ;
        }

        $.getProductComment( _this );

        //console.log( " 绑定事件.. " );
    });

    /**
     * 获取评论
     * */
    $.getProductComment = function( _this, pageNum ) {

        pageNum = ( pageNum == null || pageNum == 0 || pageNum == undefined || pageNum == "" ) ? 1 : pageNum;

        if( _this == null || _this == undefined || _this == "" ) {
            _this = $("li[labelId="+_page_label+"]");
        }

        // 评论标签id
        var labelId = _this.attr("labelId");

        if( labelId == null || labelId == "" || labelId == undefined ) {
            labelId = _page_label;
        }else {
            _page_label = labelId;
        }

        // 点击标签高亮
        $.definedTagHighlight( _this );

        // 商品id
        var id = $("div[class*=product-comment-tab][p]").attr("p");
        var parentNode = $("div[class*=product-comment-tab-list] > ul");
        var parentNodeLabel = $("div[class*=comment-sys-defautl-tags] > ul");

        $.getJSON("/pro/listProductEvaluate/ajax.htm", {labelId: labelId,id: id, pageNum: pageNum}, function ( data ) {

           // console.log(data);

            var _label_s = "";
            if( data != null && data.sysDefaultLabelList != null ) {

                for( var index=0;index<data.sysDefaultLabelList.length;index++ ) {

                    var defaultLabel = data.sysDefaultLabelList[index];
                   /* if( data.pageParam.labelId == null || data.pageParam.labelId == undefined ) {
                        _label_s += "<li class=\"on\" labelId=\""+defaultLabel.labelId+"\"><span>"+defaultLabel.coment+"</span></li>";
                    }else*/
                   if( data.pageParam.labelId == defaultLabel.labelId ) {
                        _label_s += "<li class=\"on\" labelId=\""+defaultLabel.labelId+"\"><span>"+defaultLabel.coment+"</span></li>";
                    }else {
                        _label_s += "<li labelId=\""+defaultLabel.labelId+"\"><span>"+defaultLabel.coment+"</span></li>";
                    }

                }

                parentNodeLabel.children().remove();
                parentNodeLabel.append($(_label_s)).hide().show();
                // 评论列表删除
                parentNode.children().remove();
            }

            var _li_s = "";
            if( data != null && data.commentList != null ) {

                var comment_len = data.commentList.length;

                var proId = data.proId;

                for ( var index=0;index<comment_len;index++ ) {

                    var comment = data.commentList[index];
                    var userLever = comment.clubUser ? 6 : comment.userLevel;
                    var userImg = comment.userImg == undefined?"http://misc.jiuxian.com/img/usercenter/photo.jpg":comment.userImg;

                    var _li_script = "<li class=\"clearfix\">"
                        + "<div class=\"comment-info\">"
                        + "<div class=\"comment-tx\"><img src=\""+userImg+"\" width=\"60\" height=\"60\" onerror=\"javascript:this.onerror=null;this.src='http://misc.jiuxian.com/img/usercenter/photo.jpg';\"/></div>"
                        + "<p class=\"name\">"+comment.userName+"</p>"
                        + "<i class=\"level-icon level-"+userLever+"\"></i>"
                        + "</div>"
                        + "<div class=\"comment-con\">"
                        + "<div class=\"starBox\">"
                        + "<p class=\"score\"><span class=\"title\">评分：</span><i class=\"dIcon star"+comment.firstComment.comentScore+"\"></i></p>"
                        + "<p class=\"time\">"+comment.createTimeDate+"</p>"
                        + "</div>"
                        + "<div class=\"reviews clearfix\"><span class=\"title\">心得：</span><p>"+comment.firstComment.coment+"</p><div class=\"praise\" style=\"display: none;\"><i class=\"dIcon\"></i><span>赞（<em>12</em>）</span></div></div>";


                    if( comment.firstComment.imgList != null && comment.firstComment.imgList.length > 0 ) {

                        _li_script += "<div class=\"u-evaluate-show\">"
                            +        "<span class=\"title\">晒单：</span>"
                            + "<ul class=\"u-exp-piclist\">";
                        var c = 0;
                        for( var index1=0;index1<comment.firstComment.imgList.length;index1++ ) {

                            var image = comment.firstComment.imgList[index1];
                            if( image.imgUrl == null || image.imgUrl == undefined || image.imgUrl == "" ) {
                                continue;
                            }
                            c ++;
                            var comment_img = image.imgUrl;
                            var image_len = comment_img.lastIndexOf(".");
                            var image_len_1 = image_len - 1;
                            _li_script += "<li><a class=\"image\" rel=\"bigImg\" href=\""+comment_img.substring(0, image_len_1)+comment_img.substring(image_len)+"\"><img width=\"58\" height=\"58\" src=\""+comment_img+"\"></a></li>";
                        }

                        if( c > 0 ) {

                            _li_script += "</ul>"
                                // + "<div class=\"u-exp-total\"><span>共"+comment.firstComment.imgList.length+"张图片</span><a href=\"javascript:pldetail("+comment.firstComment.comentId+","+data.pageParam.id+");\">查看晒单&gt;</a></div>"
                                + "</div>";
                        }
                    }
                    //点赞信息
                    _li_script += "<div class=\"praiseingBox\">";
                    if(comment.firstComment.praiseOfme){
                        _li_script += "<div class=\"praiseing praised\" _proId='"+ proId+"' dd_commentId='"+ comment.firstComment.comentId +"'><i class=\"dIcon\"></i>";
                    }else{
                        _li_script += "<div class=\"praiseing\"  _proId='"+ proId+"' dd_commentId='"+ comment.firstComment.comentId +"'><i class=\"dIcon\"></i>";
                    }
                    if(comment.firstComment.praiseCount == 0){
                        _li_script += "<span dd_count_commentId='"+comment.firstComment.comentId+"'>0</span></div></div>";
                    }else{
                        _li_script += "<span dd_count_commentId='"+comment.firstComment.comentId+"'>"+ comment.firstComment.praiseCount +"</span></div></div>";
                    }


                    var replyTypeStr = "";

                    if(comment.firstComment.responseType != null && comment.firstComment.responseType == 'RESPONSE_CUSTOMER'){
                        replyTypeStr = "<i class=\"dIcon\"></i><span class=\"title\">平台回复：</span>";
                    }else{
                        replyTypeStr = "<i class=\"dIcon sjIcon\"></i><span class=\"title\">商家回复：</span>";
                    }

                    if( comment.firstComment.responseOfServiceDate != null ) {

                        _li_script += "<div class=\"reply clearfix\">"
                            +        replyTypeStr
                            + "<div class=\"reply-r\">";

                        var reply = comment.firstComment.responseOfServiceDate;
                        _li_script += "<p>"+reply.substring(0, reply.lastIndexOf(","))+"</p>"
                            + "<em>"+reply.substring( reply.lastIndexOf(",") + 1 )+"</em>"
                            + "</div>"
                            + "</div>";
                    }

                    if( comment.onceComment != null ) {

                        var _addEvaIntervalStr = "";
                        var day = 0;
                        if( !(comment.oneAndNextEvaulateDays == undefined || comment.oneAndNextEvaulateDays == null || comment.oneAndNextEvaulateDays == "") ) {
                            day = comment.oneAndNextEvaulateDays;
                        }
                        if(day > 0){
                            _addEvaIntervalStr =  "" + day + "天后追加评价："
                        }else{
                            _addEvaIntervalStr =  "当天追加评价："
                        }
                        _li_script += "<div class=\"replyTwe\">"
                            +        "<p class=\"zAddComent\"><span>"+ _addEvaIntervalStr +"</span>"+comment.onceComment.coment+"</p>";

                        if( comment.onceComment.imgList != null && comment.onceComment.imgList.length > 0 ) {

                            _li_script += "<div class=\"u-evaluate-show\">"
                                +        "<span class=\"title\">晒单：</span>"
                                + "<ul class=\"u-exp-piclist\">";

                            var c = 0;
                            for( var index1=0;index1<comment.onceComment.imgList.length;index1++ ) {

                                var image = comment.onceComment.imgList[index1];
                                if( image.imgUrl == null || image.imgUrl == undefined || image.imgUrl == "" ) {
                                    continue;
                                }
                                c ++;
                                var comment_img = image.imgUrl;
                                var image_len = comment_img.lastIndexOf(".");
                                var image_len_1 = image_len - 1;
                                _li_script += "<li><a class=\"image\" rel=\"bigImg\" href=\""+comment_img.substring(0, image_len_1)+comment_img.substring(image_len)+"\"><img width=\"58\" height=\"58\" src=\""+comment_img+"\"></a></li>";
                            }

                            if( c > 0 ) {

                                _li_script += "</ul>"
                                    // + "<div class=\"u-exp-total\"><span>共"+comment.onceComment.imgList.length+"张图片</span><a href=\"javascript:pldetail("+comment.onceComment.comentId+","+data.pageParam.id+");\">查看晒单&gt;</a></div>"
                                    + "</div>";
                            }
                        }
                        //点赞信息
                        _li_script += "<div class=\"praiseingBox\">";
                        if(comment.onceComment.praiseOfme){
                            _li_script += "<div class=\"praiseing praised\"  _proId='"+ proId+"' dd_commentId='"+ comment.onceComment.comentId +"'><i class=\"dIcon\"></i>";
                        }else{
                            _li_script += "<div class=\"praiseing\" _proId='"+ proId+"' dd_commentId='"+ comment.onceComment.comentId +"'><i class=\"dIcon\"></i>";
                        }
                        if(comment.onceComment.praiseCount == 0){
                            _li_script += "<span dd_count_commentId='"+comment.onceComment.comentId+"'>0</span></div></div>";
                        }else{
                            _li_script += "<span dd_count_commentId='"+comment.onceComment.comentId+"'>"+ comment.onceComment.praiseCount +"</span></div></div>";
                        }


                        if( comment.onceComment.responseOfServiceDate != null ) {


                            var replyTypeStr2 = "";
                            if(comment.onceComment.responseType != null && comment.onceComment.responseType == 'RESPONSE_CUSTOMER'){
                                replyTypeStr2 = "<i class=\"dIcon\"></i><span class=\"title\">平台回复：</span>";
                            }else{
                                replyTypeStr2 = "<i class=\"dIcon sjIcon\"></i><span class=\"title\">商家回复：</span>";
                            }

                            _li_script += "<div class=\"reply clearfix\">"
                                +            replyTypeStr2
                                +    "<div class=\"reply-r\">";
                            var reply = comment.onceComment.responseOfServiceDate;
                            _li_script += "<p>"+reply.substring(0, reply.lastIndexOf(","))+"</p>"
                                +    "<em>"+reply.substring( reply.lastIndexOf(",") + 1 )+"</em>"
                                +    "</div>"
                                +    "</div>"
                                +    "</div>";
                        }
                    }
                    _li_script += "</div>"
                        + "</li>";

                    // 添加到页面元素上
                    parentNode.append($(_li_script).hide());

                }

                parentNode.find("li").show();
                $("a[rel=bigImg]").fancybox();
            }

            $("#_detailEvaluatePage").empty().append(setPage(data.pager.pageNum,data.pager.pageSize,data.pager.pageCount,data.pager.recordCount,-1));

        });
    }


    /**
     * 标签高亮显示
     *
     * @param obj
     */
    $.definedTagHighlight = function( obj ) {

        var parent_ul = obj.parent();
        var parent_div = parent_ul.parent();
        if( parent_div.length > 0 && parent_div.attr("class") != undefined && parent_div.attr("class").indexOf("tagList") > -1 ) {
            parent_ul.children().css("background-color","");
            parent_ul.children().css("color","#666666");
            obj.css("background-color", "#cc3333");
            obj.css("color", "#ffffff");
        }

        return;
    }



})


