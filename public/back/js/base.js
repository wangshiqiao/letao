$(function() {
  $(".js-showCategory").on("click",function() {
    console.log("123");
    $(".category-chlid").slideToggle("0.5");
  });
  $(".show-toggle").on("click",function(){
    if($(".lt_aside").hasClass("js-hide")) {
      $(".lt_aside").removeClass("js-hide");
      $(".lt_content").removeClass("js-hide");
      $(".banner").removeClass("js-hide");
    }else {
      $(".lt_aside").addClass("js-hide");
      $(".lt_content").addClass("js-hide");
      $(".banner").addClass("js-hide");
    }    
  })

  //ajax请求的时候开始和结束进度条
  $(document).ajaxStart(function() {
    //开启进度条
    NProgress.start();
  });
  $(document).ajaxStop(function() {
    //开启进度条
    NProgress.done();
  });
  //判断是否登录，如果没有登录，进行登录拦截
  validataLogin();
  function validataLogin() {
    $.ajax({
      url:"/employee/checkRootLogin",
      type:"get",
      success: function(info){
        if(!info.success) {
          window.location.href ="login.html";
        }
      }
    });
  }

  //退出登录
  $(".glyphicon.glyphicon-log-out").on("click",function() {
    $.ajax({
      url: "/employee/employeeLogout",
      dataType: "json",
      success: function(info){
        if(info.success) {
          window.location.href = './login.html'
        }
      } 
    });
  });
});