$(function () {
    let page = 1;
    let pageSize = 100;
    let price = 2;
    let num = 1;

    //第一次加载商品
    var search = getUrlParams();
    $("#searchInput").val(decodeURI(search["key"] || ''));    
    loadProductList();



    /*注册事件*/

    $(".search_btn").on("click", function () {
        if ($("#searchInput").val()) {
            addLocalStorage($("#searchInput").val());
            loadProductList();
        } else {
            //提示搜索空内容不能为空
            mui.toast('搜索内容不能为空', { duration: 'short', type: 'div' });
        }
    });
    //价格排序
    $(".price").on("click", function () {
        $(this).addClass("current").siblings().removeClass("current");
        $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
        if ($(this).find("i").hasClass("fa-angle-down")) {
            price = 2
        } else {
            price = 1;
        }
        loadProductList();
    });
    //库存排序
    $(".num").on("click", function () {
        $(this).addClass("current").siblings().removeClass("current");
        $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
        if ($(this).find("i").hasClass("fa-angle-down")) {
            num = 2
        } else {
            num = 1;
        }
        // console.log(num);
        loadProductList();
    });
    /*函数方法*/

    //加载商品列表
    function loadProductList() {
        
        $(".data_loading").show();
        setTimeout(function () {
            console.log(1);
            $.ajax({
                url: "/product/queryProduct",
                type: "get",
                data: {
                    proName: $("#searchInput").val(),
                    page: page || 1,
                    pageSize: pageSize || 100,
                    price: price || 2,
                    num: num || 1
                },
                dataType: "json",
                success: function (data) {
                    console.log(data.data);
                    if(data.data.length > 0) {
                        let html = template("tpl", data);
                        $(".productList").html(html);
                        
                    }else {
                        $(".productList").html("<p class='mui-text-center'>暂无数据</p>");
                    }
                    $(".data_loading").hide();
                    
                }
            });
        },500);
        
    }
})