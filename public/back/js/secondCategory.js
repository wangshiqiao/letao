$(function(){

  $(".addCategory").on("click",function() {    
    $("#form").data("bootstrapValidator").resetForm();
    $("#showModal").modal("show");
  });

  //加载一级分类
  loadDropdown();  
  function loadDropdown() {
    $.ajax({
      type : "get",
      data : {
        page : 1,
        pageSize : 1000
      },
      dataType : "json",
      url : "/category/queryTopCategoryPaging",
      success : function( info ) {
        //绑定dropdown
        var html = template( "tpl1", info );
        $("#form .dropdown-menu").html(html); 
        //绑定隐藏已选择的相和隐藏域
        // $(".dropdownTop").html(info.rows[0].categoryName);
        // $(".hiddenDropdownTop").val(info.rows[0].id);       
      }
    });
  }

  // 当前的页码
  var pageIndex = 1;
  // 每页有多少条数据
  var pageSize = 3;
  loadUsers();
  function loadUsers() {
    $.ajax({
      type : "get",
      data : {
        page : pageIndex,
        pageSize : pageSize
      },
      dataType : "json",
      url : "/category/querySecondCategoryPaging",
      success : function( info ) {
        console.log(info);
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
      onPageClicked:function(event, originalEvent, type,page){
        //为按钮绑定点击事件 page:当前点击的按钮值
        pageIndex = page;
        loadUsers();
      }
    });    
  }

  //为整个表单增加bootstrapvalidator验证

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
        firstCategoryId: {
          validators: {
            //不能为空
            notEmpty: {
              message: '请选择一级分类名'
            }
          }
        },
        categoryName: {
          validators: {
            //不能为空
            notEmpty: {
              message: '二级分类名不能为空'
            },
            //长度校验
            stringLength: {
              min: 2,
              max: 10,
              message: '二级分类名长度必须在2到10之间'
            }
          }
        } ,
        picUrl: {
          validators: {
            //不能为空
            notEmpty: {
              message: '请上传图片'
            }
          }
        }          
      }
    });

  //表单验证成功以后执行的操作
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      url : "/category/addSecondCategory",
      type : "post",
      data :  {
        brandName: $("#form [name=categoryName]").val(),
        categoryId:$("#form [name=firstCategoryId]").val(),
        brandLogo: $("#form [name=picUrl]").val(),
        hot: '是'
      },
      dataType : "json",
      success : function( info ){
        console.log(info);
        return true;
        if(info.success){
          $("#showModal").modal("hide");
          // 当前的页码
          pageIndex = 1;            
          loadUsers();
        }          
      }
    });
  });    
}
  //点击一级分类的时候，在文本框中显示一级分类
  //jQuery 中on 委托时间 第二个参数为childselctor 也就是说 这里面的li是前面选择器的孩子
  $("#form .dropdown-menu").on("click","li",function(){
    $(".dropdownTop").html($(this).text());
    $(".hiddenDropdownTop").val($(this).data("id")); 
    $("#form").data("bootstrapValidator").updateStatus('firstCategoryId','VALID')
  });

  //图片上传
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      $(".picUrl").val(data.result.picAddr);
      $(".picImg")[0].src=data.result.picAddr;
      $("#form").data("bootstrapValidator").updateStatus('picUrl','VALID')
    }
  });


});