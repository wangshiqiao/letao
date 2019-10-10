$(function (params) {
    addLocalStorage();
    $(".search_btn").on("click", function (params) {
        if ($(this).val() === "") {
            alert("搜索内容不能为空")
        } else {
            var txt = $(this).val();
        }
    })

    function addLocalStorage(txt) {
        var searchList = localStorage.searchList;
        if (searchList) {
            //转换成数组
            let arrList = JSON.parse(searchList);
            arrList = arrList.filter(m => m != txt);
            arrList.unshift(txt);
            var obj ={
                list : arrList
            }
            var html =template("tpl",obj);
            $(".historyList").html(html);

        }
    }
})