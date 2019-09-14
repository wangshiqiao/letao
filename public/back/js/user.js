$(function() {
  // 当年的页码
  var pageIndex = 1;
  // 每页有多少条数据
  var pageSize = 5;
  loadUsers();
  function loadUsers() {
    $.ajax({
      type : "get",
      data : {
        page : pageIndex,
        pageSize : pageSize
      },
      dataType : "json",
      url : "/user/queryUser",
      success : function( info ) {
        var html = template( "tpl", info );
        $("table.table-bordered tbody").html(html);
        var pageTotal = Math.ceil( info.total / info.size );
        setpagintor(pageTotal);
      }
    });
  }
  //设置分页
  function setpagintor(totalPages) {
    $("#pagintor").bootstrapPaginator({
      bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
      currentPage : pageIndex,//当前页
      totalPages : totalPages || 0,//总页数
      size:"small",//设置控件的大小，mini, small, normal,large
      onPageClicked:function(event, originalEvent, type,page){
        //为按钮绑定点击事件 page:当前点击的按钮值
        pageIndex = page;
        loadUsers();
      }
    });    
  }


  //模态框的设置
  $("table.table-bordered tbody").on("click",".btnClick",function() {
    $("#modalConfir").modal("show");
   
    $("table.table-bordered tbody").data("id",$(this).data("id"));
    $("table.table-bordered tbody").data("isdelete",$(this).data("isdelete"));
    
  });
  $(".btnOK").on("click",function(){
    setUpdateUser();
  });
  function setUpdateUser() {
    $.ajax({
      url : "/user/updateUser",
      type : "post",
      data : {
        id : $("table.table-bordered tbody").data("id"),
        isDelete : $("table.table-bordered tbody").data("isdelete") =="1" ? "0" : "1"
      },
      dataType : "json",
      success : function( info ) {        
        loadUsers();
        $("#modalConfir").modal("hide");
      }
    });
  }
});