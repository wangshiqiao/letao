$(function () {
    //设置登录以后显示的图片和名字电话
    setBindUser();

    function setBindUser() {
        //common 里面判断的是否登录
        //如果登录了 返回登录信息。
        isLogin(function (user) {
            if (user) {
                $(".username").html(user.username);
                $(".userTel").html("电话：" + user.mobile);
            }
        });
    }

    $(".btnOut").on("click", function () {
        $.ajax({
            url: "/user/logout",
            type: "get",
            data: {},
            dataType: "json",
            success: function (data) {
                if (data.success) {
                    window.location.href = "login.html";
                } else {
                    mui.alert("退出失败");
                }
            }
        });
    })
})