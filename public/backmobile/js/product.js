$(function () {
    //根据ID来加载商品信息

    loadProduct();



    //号码的点击事件
    $(".lt_main").on("click", ".itemSize", function () {
        $(this).addClass("current").siblings().removeClass("current");
    });

    //添加购物车
    $(".btnAddCar").on("click", function () {
        let itemSize = $(".itemSize.current");
        var count = mui(".mui-numbox").numbox().getValue();
        var productId = $("#productId").val();

        if (itemSize.length == 0) {
            mui.alert("请选择尺码", " ");
        } else if (count <= 0) {
            mui.alert("数量须大于0", " ");
        } else {
            $.ajax({
                url: "/cart/addCart",
                type: "POST",
                data: {
                    productId: productId,
                    num: count,
                    size: itemSize.html()
                },
                datatype: "json",
                success: function (data) {
                    if (data.success) {
                        //提示添加成功，是继续还是到购物车
                        mui.confirm("添加成功", "温馨提示", ["继续浏览", "前往购物车"], function (e) {
                            if (e.index == 1) {
                                window.location.href = "car.html";
                            }
                        })
                    }
                }
            });
        }
    });


    function loadProduct() {
        let id = getUrlParams()["productId"];
        if (id) {
            $.ajax({
                url: "/product/queryProductDetail",
                type: "GET",
                data: {
                    id: id
                },
                datatype: "json",
                success: function (data) {
                    let html = template("tpl", data);
                    $(".tpl").html(html);

                    //mui在mui.init()中会自动初始化基本控件,但是 动态添加的Numbox组件需要手动初始化
                    mui(".mui-numbox").numbox();
                    mui(".mui-numbox").numbox().setValue(1);

                    //获得slider插件对象，动态添加的轮播图（模板添加的），也需要动态初始化
                    var gallery = mui('.mui-slider');
                    gallery.slider({
                        interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
                    });
                }

            });
        }
    }
});