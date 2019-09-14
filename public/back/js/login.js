$(function() {
  validator ();

  $(document).ajaxStart(function() {
    //开启进度条
    NProgress.start();
  });
  $(document).ajaxStop(function() {
    //开启进度条
    NProgress.done();
  });


  function validator () {
    //表单校验的方法
    //使用表单校验插件
    $(".js-login").bootstrapValidator({
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
        username: {
          validators: {
            //不能为空
            notEmpty: {
              message: '用户名不能为空'
            },
            //长度校验
            stringLength: {
              min: 4,
              max: 10,
              message: '用户名长度必须在4到10之间'
            },
            callback : {
              message : "用户名不存在"
            }
          }
        },
        password: {
          validators: {
            notEmpty: {
              message: '密码不能为空'
            },
            stringLength: {
              min: 6,
              max: 10,
              message: "密码长度必须在6到10位"
            },
            callback : {
              message : "密码不正确"
            }
          }
        },
      }

    });

    //表单验证成功以后执行的操作
    $(".js-login").on('success.form.bv', function (e) {
      e.preventDefault();
      //使用ajax提交逻辑
      $.ajax({
        url : "/employee/employeeLogin",
        type : "post",
        data : $(this).serialize(),
        dataType : "json",
        success : function( info ){
          if(info.success){
            window.location.href = "index.html";
          }
          if(info.error == 1000) {
            //无效用户名
            $(".js-login").data("bootstrapValidator").updateStatus("username","INVALID","callback");
          }
          if(info.error == 1001) {
            //无效密码
            $(".js-login").data("bootstrapValidator").updateStatus("password","INVALID","callback");
          }
        }
      });
    });
    //重置信息
    $(".btnReset").on("click",function() {      
      $(".js-login").data("bootstrapValidator").resetForm();
    });
    
  }

});