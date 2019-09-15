$(function() {
  $(".addCategory").on("click",function() {
    $("#form [name='categoryName']").val('');
    $("#form").data("bootstrapValidator").resetForm();
    $("#showModal").modal("show");
  });

  // 当前的页码
  var pageIndex = 1;
  // 每页有多少条数据
  var pageSize = 1000;
  loadUsers();
  function loadUsers() {
    $.ajax({
      type : "get",
      data : {
        page : pageIndex,
        pageSize : pageSize
      },
      dataType : "json",
      url : "/category/queryTopCategoryPaging",
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
    //验证
  validator();

  function validator () {
    //表单校验的方法
    //使用表单校验插件
    $("#form").bootstrapValidator({
      //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
      //不设置的话，所有情况均校验
      excluded: [],

      //2. 指定校验时的图标显示，默认是bootstrap风格
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      //3. 指定校验字段
      fields: {
        //校验用户名，对应name表单的name属性
        categoryName: {
          validators: {
            //不能为空
            notEmpty: {
              message: '分类名不能为空'
            },
            //长度校验
            stringLength: {
              min: 2,
              max: 10,
              message: '一级分类名长度必须在2到10之间'
            }
          }
        }        
      }
    });

    //表单验证成功以后执行的操作
    $("#form").on('success.form.bv', function (e) {
      console.log(e);
      e.preventDefault();
      //使用ajax提交逻辑
      $.ajax({
        url : "/category/addTopCategory",
        type : "post",
        data :  $("#form").serialize(),
        dataType : "json",
        success : function( info ){
          console.log(info);
          if(info.success){
            $("#showModal").modal("hide");
            // 当前的页码
            pageIndex = 1;            
            loadUsers();
          }else {
            console.log(info);
          }          
        }
      });
    });    
  }
});