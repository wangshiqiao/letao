var gallery = mui('.mui-slider');
gallery.slider({
    interval: 0//自动轮播周期，若为0则不自动播放，默认为0；
});
mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators: false, //是否显示滚动条
});
function getUrlParams() {
    let search = decodeURI(location.search).split("?");
    let result = {};
    if (search.length > 1) {
        search = search[1]
        let arr = search.split("&");
        arr.forEach(el => {
            var els = el.split("=");
            result[els[0]] = els[1];
        });
    }
    return result;
}

/*搜索历史记录开始*/
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
//删除单挑记录
function delOneLocalStorage(txt) {
    mui.confirm("确定是否要删除此记录？", "删除记录", ["确定", "取消"], function (result) {
        if (result.index == 0) {
            var arrList = getLocalStorage();
            if (txt) {
                arrList = arrList.filter(m => m != txt);
            }
            localStorage.searchList = JSON.stringify(arrList);
            loadLocalStorage();
        }
    })
}
function clearLocalStorage() {
    mui.confirm("确定是否要清空记录？", "清空记录", ["确定", "取消"], function (result) {
        if (result.index == 0) {
            localStorage.removeItem("searchList");
            loadLocalStorage();
        }
    });
}
/*搜索历史记录结束*/
