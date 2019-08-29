$(function () {
    var sidebar = {
        userId: getUserId(),
        userName: function () {
            var userName = getCookie("jx_user_name");
            if (userName == undefined || userName == '') {
                return "";
            }
            return userName;
        },
        isClubUser: function () {
            var is_club_user = getCookie("isClubUser");
            if(is_club_user=="true"){
                return 1;
            }
            return 0;
        },
        sidebarRun: function (isdetail) {
            if ($(".rightSidebarBox").length > 0) {
                var id = this.userId;
                var name = this.userName();
                if (name == "") {
                    id = "";
                }
                 sid = "jx_1000_1487130563186";
                if (isdetail == '1') {
                    NTKF_PARAM = {
                        siteid: "jx_1000",                    //企业ID，为固定值，必填
                        settingid: xiaoneng_setting_id,   //接待组ID，为固定值，必填
                        uid: id,
                        uname: name,
                        itemid: goodsId,
                        itemparam: "pc",
                        isvip:this.isClubUser()
                    }
                    sid = xiaoneng_setting_id;
                } else {
                    NTKF_PARAM = {
                        siteid: "jx_1000",                    //企业ID，为固定值，必填
                        settingid: "jx_1000_1487130563186",   //接待组ID，为固定值，必填
                        uid: id,
                        uname: name,
                        itemparam: "pc",
                        isvip:this.isClubUser()
                    }
                }
                var xnjs = document.createElement("script");
                xnjs.type = "text/javascript";
                xnjs.async = true;
                xnjs.charset = "utf-8";
                xnjs.src = "http://dljx.jxwmanage.com/js/xn6/ntkfstat.js?siteid=jx_1000";
                document.getElementsByTagName("head")[0].appendChild(xnjs);
                $(".rightSidebarBox").load(window.jxdomain.detail + "/getSideBar.htm", function () {
                });
            }
        }
    }
    var str = window.location + "";
    if (str.indexOf(window.jxdomain.detail + "/goods-") != -1) {
        sidebar.sidebarRun(1);
    } else if (str.indexOf(window.jxdomain.detail + "/") != -1 && str.indexOf(window.jxdomain.detail + "/pro/editAsk.htm") == -1 && str.indexOf(window.jxdomain.detail + "/pro/pldetail.htm") == -1) {
        sidebar.sidebarRun(0);
    } else if (str.indexOf(window.jxdomain.wine + "/") != -1 && str.indexOf(window.jxdomain.wine + "/wine/hjgf.htm") == -1) {
        sidebar.sidebarRun(0);
    } else if (str.indexOf(window.jxdomain.clear + "/") != -1) {
        sidebar.sidebarRun(0);
    } else if (str.indexOf(window.jxdomain.tuan + "/") != -1) {
        sidebar.sidebarRun(0);
    } else if (str.indexOf(window.jxdomain.happy + "/") != -1) {
        sidebar.sidebarRun(0);
    } else if (str.indexOf(window.jxdomain.special + "/qqsfPage.htm") != -1) {
        sidebar.sidebarRun(0);
    } else if (str.indexOf(window.jxdomain.list + "/") != -1) {
        sidebar.sidebarRun(0);
    } else if (str.indexOf(window.jxdomain.special + "/") != -1) {
        sidebar.sidebarRun(0);
    } else if (str.indexOf(window.jxdomain.spirits + "/") != -1) {
        sidebar.sidebarRun(0);
    } else if (str.indexOf(window.jxdomain.home) != -1) {
        sidebar.sidebarRun(0);
    }
    else {
    }

    $(".rightSidebarBox").delegate(".user", "click", function () {
        __ozfaj2("__home_cewo");
    });
    $(".rightSidebarBox").delegate("#kefusidebar", "click", function () {
        __ozfaj2("__home_cefuwu");
    });
    $(".rightSidebarBox").delegate(".collectSidebar", "click", function () {
        __ozfaj2("__home_ceshoucang");
    });
    $(".rightSidebarBox").delegate("#rSidebarCart", 'click', function (event) {
        __ozfaj2("__home_ceche");
    });
    $(".rightSidebarBox").delegate(".feedback", "click", function () {
        __ozfaj2("__home_cefankui");
    });

});
