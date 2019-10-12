$(function () {
    //根据ID来加载商品信息

    loadProduct();

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
                    console.log(data);
                    let html = template("tpl", data);
                    $(".tpl").html(html);
                    mui(".mui-numbox").numbox();
                    //获得slider插件对象
                    var gallery = mui('.mui-slider');
                    gallery.slider({
                        interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
                    });
                }

            });
        }
    }
});