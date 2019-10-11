$(function () {
    $(".btn_ok").on("click", function () {
        let check = true;
        mui("#form input").each(function () {
            //若当前input为空，则alert提醒 
            if (!this.value || this.value.trim() == "") {
                var label = this.previousElementSibling;
                mui.alert(label.innerText + "不允许为空");
                check = false;
                return false;
            }
        }); //校验通过，继续执行业务逻辑 
        if (check) {
            $.ajax({
                url: "/user/login",
                type: "post",
                data: $("#form").serialize(),
                datatype: "json",
                success: function (data) {                    
                    if(data.error=="403") {
                        mui.alert("账号或密码错误");
                    }else if(data.success) {
                        window.location.href = getUrlParams()["returnUrl"] || "user.html";
                    }else {
                        mui.alert("网络错误");
                    }
                }
            });
        }
    });
})