$(function() {
    // 当前的页码
    var pageIndex = 1;
    // 每页有多少条数据
    var pageSize = 1;
    loadUsers();
    function loadUsers() {
      $.ajax({
        type : "get",
        data : {
          page : pageIndex,
          pageSize : pageSize
        },
        dataType : "json",
        url : "/product/queryProductDetailList",
        success : function( info ) {
          var html = template( "tpl2", info );
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
        itemTexts: function(type, page, current) {
          switch(type) {
            case "page":
              return page;
            case "next":
              return "下一页";
            case "last":
              return "最后一页";
            case "first":
              return "第一页";
            case "prev":
                return "上一页";        
          }
        },
        tooltipTitles: function(type, page, current) {
          switch(type) {
            case "page":
              return "前往第"+page+"页";
            case "next":
              return "下一页";
            case "last":
              return "最后一页";
            case "first":
              return "第一页";
            case "prev":
                return "上一页";        
          }
        },
        useBootstrapTooltip: true,
        onPageClicked:function(event, originalEvent, type,page){
          //为按钮绑定点击事件 page:当前点击的按钮值
          pageIndex = page;
          loadUsers();
        }
      });    
    }
});