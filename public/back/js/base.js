$(function() {
  $(".js-showCategory").on("click",function() {
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
  
});