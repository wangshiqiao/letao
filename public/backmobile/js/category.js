$(function(){
    //加载一级品类
    loadCategory();

    //点击一级品类
    $(".ulCategory").on("click","a",function(params) {
        console.log($(this).data("id"));

        $(this).parent().siblings().find("a").removeClass("current")
        $(this).addClass("current");
        loadSecondCategory($(this).data("id"))
        return false;
    })

    function loadCategory(){
        $.ajax({
            url :"/category/queryTopCategory",
            type:"get",
            datatype:"json",
            success:function(data) {                
                let html = template("category",data);
                $(".ulCategory").html(html);
                loadSecondCategory(data.rows[0].id)
            }
        });
    }
    function loadSecondCategory(cid) {
        $.ajax({
            url :"/category/querySecondCategory",
            type:"get",
            data:{
                id : cid || 0
            },
            datatype:"json",
            success:function(data) {
                if(data && data.total !=0 ){
                    let html = template("secondCategory",data);
                    $(".ulSecondCategory").html(html);
                }
                else {
                    $(".ulSecondCategory").html("无更多数据！！！！");
                }
            }
        });
    }
})