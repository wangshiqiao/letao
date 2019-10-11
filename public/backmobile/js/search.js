$(function () {

    //先加载搜索
    loadLocalStorage();
    //点击搜索
    $(".search_btn").on("click", function () {

        if ($("#searchInput").val() === "") {
            mui.toast('搜索内容不能为空', { duration: 'short', type: 'div' });
        } else {
            var txt = $("#searchInput").val();
            addLocalStorage(txt);
            loadLocalStorage();
            window.location.href = "searchList.html?key=" + txt;
        }
    })
    //全部清除操作
    $(".clearList").on("click", function () {
        clearLocalStorage();
    })
    //单条删除操作
    $(".historyList").on("click", ".btn_delete", function () {
        let txt = $(this).data("txt")
        delOneLocalStorage(txt);
    })

})