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
    //打开模态框
    setModal();
    function setModal() {
      $(".addCategory").on("click",function() {    
        // $("#form").data("bootstrapValidator").resetForm();
        $("#showModal").modal("show");
        //加载二级分类
        loadCategory();
      });
      $(".dropdown-menu").on("click","a",function() {
        $("#form [name=brandId]").val($(this).data("id"));
        $("#form .dropdownTop").text($(this).text());
        $("#form").data("bootstrapValidator").updateStatus('brandId','VALID');
      });
    }
    //加载二级分类
    function loadCategory() {
      $.ajax({
        url: "/category/querySecondCategoryPaging",
        data: {
          page: 1,
          pageSize: 999
        },
        dataType: "get",
        dataType: "json",
        success: function( info ) {
          console.log(info);
          var html =template("tpl1",info);
          $(".dropdown-menu").html( html );
        }
      });
    }
    //验证方法
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
          brandId: {
            validators: {
              //不能为空
              notEmpty: {
                message: '请选择二级分类'
              }
            }
          },
          proName: {
            validators: {
              //不能为空
              notEmpty: {
                message: '商品名称不能为空'
              },
              //长度校验
              stringLength: {
                min: 2,
                max: 10,
                message: '商品名称长度必须在2到10之间'
              }
            }
          } ,
          proDesc: {
            validators: {
              //不能为空
              notEmpty: {
                message: '商品描述不能为空'
              },
              stringLength: {
                min: 2,
                max: 500,
                message: '商品描述不能超过500字'
              }
              
            }
          } ,
          num: {
            validators: {
              //不能为空
              notEmpty: {
                message: '库存不能为空'
              },
              regexp: {
                regexp: /^[1-9]\d*$/,
                message: '商品库存格式, 必须是非零开头的数字'
              }
              
            }
          },
          size: {
            validators: {
              //不能为空
              notEmpty: {
                message: '尺码不能为空'
              },
              regexp: {
                regexp: /^[1-9]\d{0,1}-[1-9]\d{0,1}$/,
                message: '尺码格式34-50'
              }
              
            }
          } ,
          oldPrice: {
            validators: {
              //不能为空
              notEmpty: {
                message: '原价不能为空'
              },
              regexp: {
                regexp: /^[1-9]\d*.\d{2}$/,
                message: '原价格式保留小数点2位，例如 1.00'
              }              
            }
          } ,
          price: {
            validators: {
              //不能为空
              notEmpty: {
                message: '现价不能为空'
              },
              regexp: {
                regexp: /^[1-9]\d*.\d{2}$/,
                message: '现价格式保留小数点2位，例如 1.00'
              }              
            }
          }  
          ,
          picStatus: {
            validators: {
              //不能为空
              notEmpty: {
                message: '请上传3张图片'
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
        url : "/product/addProduct",
        type : "POST",
        data :  $("#form").serialize(),
        dataType : "json",
        success : function( info ){          
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
    //定义一个数组，用于存放上传成功以后图片的对手
    var imgList = [];
    //附件上传的方法
    $("#fileupload").fileupload({
      dataType:"json",
      //e：事件对象
      //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
      done:function (e, data) {
        imgList.unshift(data.result);
        if(imgList.length > 3) {
          imgList.pop();
        }
        if(imgList.length == 3 ) {
          $("#form [name=picStatus]").val("1");
          $("#form").data("bootstrapValidator").updateStatus('picStatus','VALID');
        }else {
          $("#form [name=picStatus]").val("");
        }
        bindImg();
      }
    });
    //绑定图片
    function bindImg() {
      var html = '';
      imgList.forEach(function(v,i) {
        console.log(v);
        html +='<img src="'+ v.picAddr +'" alt="" width="100px" class="picImg">';
        $("#form [name= picName"+(i+1)+"]").val(v.picName);
        $("#form [name= picAddr"+(i+1)+"]").val(v.picAddr);
      });
      $("#imgList").html(html);
    }
});