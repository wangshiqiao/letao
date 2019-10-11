$(function (params) {

    //先加载搜索
    loadLocalStorage();

    //点击搜索
    $(".search_btn").on("click", function (params) {

        if ($("#searchInput").val() === "") {
            mui.toast('搜索内容不能为空', { duration: 'short', type: 'div' });
        } else {
            var txt = $("#searchInput").val();
            addLocalStorage(txt);
            loadLocalStorage();
            window.location.href = "searchList.html?key="+txt;
        }
    })
    //全部清除操作
    $(".clearList").on("click", function () {
        mui.confirm("确定是否要清空记录？", "清空记录", ["确定", "取消"], function (result) {
            if (result.index == 0) {
                localStorage.removeItem("searchList");
                loadLocalStorage();
            }
        });

    })
    //单条删除操作
    $(".historyList").on("click", ".btn_delete", function () {
        let txt = $(this).data("txt")
        mui.confirm("确定是否要删除此记录？", "删除记录", ["确定", "取消"], function (result) {            
            if (result.index == 0) {
                var arrList = getLocalStorage();
                
                console.log(txt);
                console.log(arrList);
                if (txt) {
                    arrList = arrList.filter(m => m != txt);
                }
                localStorage.searchList = JSON.stringify(arrList);
                loadLocalStorage();
            }
        })
    })
    //添加搜索
    function addLocalStorage(txt) {
        var arrList = getLocalStorage();
        if (txt) {
            arrList = arrList.filter(m => m != txt);
            arrList.unshift(txt);
        }
        if (arrList.length > 3) {
            arrList.pop();
        }
        localStorage.searchList = JSON.stringify(arrList);
    }
    //加载搜索
    function loadLocalStorage() {
        var arrList = getLocalStorage();
        var obj = {
            list: arrList
        }
        var html = template("tpl", obj);
        $(".historyList").html(html);
    }
    //获取localStorage中的数据
    function getLocalStorage() {
        var searchList = localStorage.searchList;
        let arrList = [];
        //如果在localStorage中存在，那么把数据倒出来，然后进行处理
        if (searchList) {
            //转换成数组
            arrList = JSON.parse(searchList);
        }
        return arrList;
    }
})