$(function () {
    $.ajax({
        url: "/user/queryUserMessage",
        type: "get",
        datatype: "json",
        success: function (data) {
            console.log(data);
            if (data.error) {
                window.location.href = "login.html";
            }
        }
    });
})