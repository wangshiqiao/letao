

$(function () {
    loadPage();


    //删除操作
    $(".dataItem").on("tap", ".btnDel", function () {
        console.log("1");
        $.ajax({
            url: "/cart/deleteCart",
            type: "get",
            data: {
                id: [$(this).data("id")]
            },
            datatype: "json",
            success: function (data) {
                mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
            }
        });
    });

    $(".dataItem").on("tap", ".btnEdit", function () {
        console.log(this.dataset);
        let html = "";
        html = template("tpl1", this.dataset);
        let id = this.dataset.id;
        html = html.replace(/\n/g, "");
        mui.confirm(html, "编辑商品", ["确认", "取消"], function (e) {
            console.log(e);
            if (e.index == 0) {
                // 获取尺码和数量, 进行提交
                var size = $('.lt_size span.current').text();
                var num = $('.mui-numbox-input').val();
                console.log(size);
                console.log(num);
                $.ajax({
                    url: "/cart/updateCart",
                    type: "POST",
                    data: {
                        id: id,
                        size: size,
                        num: num
                    },
                    datatype: "json",
                    success: function (data) {
                        mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                    }
                });

            }
        })
        mui(".mui-numbox").numbox();
    });
    //号码的点击事件
    $("body").on("tap", ".itemSize", function () {
        $(this).addClass("current").siblings().removeClass("current");
    });
    //加载数据
    function loadItem() {
        $.ajax({
            url: "/cart/queryCart",
            type: "get",
            data: {},
            datatype: "json",
            success: function (data) {
                console.log(data);
                var html = template("tpl", { obj: data });
                $(".dataItem").html(html);
            }
        });
    }
    //加载页面
    function loadPage() {
        mui.init({
            pullRefresh: {
                container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
                down: {
                    height: 50,//可选,默认50.触发下拉刷新拖动距离,
                    auto: true,//可选,默认false.首次加载自动下拉刷新一次
                    contentdown: "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                    contentover: "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                    contentrefresh: "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                    callback: function () {
                        console.log("我刷新了当前页面");
                        loadItem();
                        mui('#refreshContainer').pullRefresh().endPulldownToRefresh(true);
                    } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                }
            }
        });
    }
})

// mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
// mui('#pullrefresh').pullRefresh().endPullupToRefresh(true;  //参数为true代表没有更多数据了