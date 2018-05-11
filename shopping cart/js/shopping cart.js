/*
只是一个前端的购物车操作,没有表单提交功能
*/
$(
    function(){
        var $addbtn = $(".addbtn")
        var $table_2 = $("#table_2")
        var $table_2_div = $(".table_2")
        var $sum = $("#sum")
        //"加入购物车按钮调用函数"
        $("#table_1").on("click",".addbtn",
        function(){
            //如果购物车中没有这件商品是的操作
            if($table_2.text().indexOf($(this).parents("tr").children().eq(0).text())==-1)
            {
                $table_2_div.css("display","block")
                $sum.text(Number($sum.text())+Number($(this).parents("tr").children().eq(1).text()))
                $table_2.append('<tr>'+
                '<td>'+ $(this).parents("tr").children().eq(0).text()+'</td>'+
                '<td>'+ $(this).parents("tr").children().eq(1).text()+'</td>'+
                '<td>'+
                    '<input type="button" id="subbtn" value="-">'+
                    '<input type="text" id="num_text" value="1">'+
                    '<input type="button" id="plusbtn" value="+">'+
                '</td>'+
                '<td>'+ $(this).parents("tr").children().eq(1).text()+'</td>'+
                '<td>'+
                    '<input type="button" id="delbtn"value="*">'+
                '</td>'+
            '</tr>')
            }
            //如果购物车中有这件商品时的操作
            else{
                $goodsname = $(this).parent().siblings().eq(0).text();
                for(var i=0;i<$(".table_2 tbody").children().length;i++){
                    console.log($(".table_2 tbody").children().eq(i).children().eq(0).text())
                    if($goodsname==$(".table_2 tbody").children().eq(i).children().eq(0).text())
                    {
                        $(".table_2 tbody").children().eq(i).children().eq(2).children().eq(1).val(Number($(".table_2 tbody").children().eq(i).children().eq(2).children().eq(1).val())+1)
                        $(".table_2 tbody").children().eq(i).children().eq(3).text(Number($(".table_2 tbody").children().eq(i).children().eq(2).children().eq(1).val())*Number($(".table_2 tbody").children().eq(i).children().eq(1).text()))
                        var $unit_price;
                        $sum.text("0");
                        for(var i=0;i<$(".table_2 tbody").children().length;i++){
                            $unit_price = $(".table_2 tbody").children().eq(i).children().eq(3).text()
                            $sum.text(Number($sum.text())+Number($unit_price))
                        }
                    }
                }
            }
        })
        //减少按钮调用函数
        function sub(){
            if(Number($(this).siblings().eq(0).val())>0)
            {
            $(this).siblings().eq(0).val(Number($(this).siblings().eq(0).val()) -1)
            $(this).parent().next().text(Number($(this).siblings().eq(0).val())*Number($(this).parent().prev().text()))
            }
            var $unit_price;
            $sum.text("0");
            for(var i=0;i<$(this).parents("tbody").children().length;i++){
                $unit_price = $(this).parents("tbody").children().eq(i).children().eq(3).text()
                $sum.text(Number($sum.text())+Number($unit_price))
            }
            if(Number($(this).siblings().eq(0).val())==0)
                {
                    $(this).parents("tr").remove();
                    if($("#delbtn").length==0)
                    {   
                        $table_2_div.css("display","none")
                    }}}
        //增加按钮调用函数
        function plus(){
            $(this).siblings().eq(1).val(Number($(this).siblings().eq(1).val()) +1)
            $(this).parent().next().text(Number($(this).siblings().eq(1).val())*Number($(this).parent().prev().text()))
            var $unit_price;
            $sum.text("0");
            for(var i=0;i<$(this).parents("tbody").children().length;i++){
                $unit_price = $(this).parents("tbody").children().eq(i).children().eq(3).text()
                $sum.text(Number($sum.text())+Number($unit_price))
            }
        }
        //删除按钮调用函数
        function del(){
            $(this).parent().prev().text("0");
            var $unit_price;
            $sum.text("0");
            for(var i=0;i<$(this).parents("tbody").children().length;i++){
                $unit_price = $(this).parents("tbody").children().eq(i).children().eq(3).text()
                $sum.text(Number($sum.text())+Number($unit_price))
            }
            $(this).parents("tr").remove();
            if($("#delbtn").length==0)
            {
                $table_2_div.css("display","none")
            }
        }
        //文本框输入数字改变总金额
        function price(){
            $(this).parent().next().text(Number($(this).val())*Number($(this).parent().prev().text()))
            //这部分代码存在每个函数中都有,因为每个函数的$(this)不一样所以不能封装函数,只能每一个都写一遍
            //这部分代码就是表示购物车的总计金额等于每一件商品的总金额之和
            var $unit_price;
            $sum.text("0");
            for(var i=0;i<$(this).parents("tbody").children().length;i++){
                $unit_price = $(this).parents("tbody").children().eq(i).children().eq(3).text()
                $sum.text(Number($sum.text())+Number($unit_price))
            }
            if(Number($(this).val())==0){
                $(this).parents("tr").remove();
                    if($("#delbtn").length==0)
                    {
                        $table_2_div.css("display","none");
                    }
            }
        }
        //给四个按钮绑定点击事件
        $table_2.on("click","#subbtn",sub)
        $table_2.on("click","#plusbtn",plus)
        $table_2.on("click","#delbtn",del)
        $table_2.on("blur","#num_text",price)
    }
)