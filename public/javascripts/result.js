/**
 * Created by zhang on 2017/11/21.
 */


$(document).ready(function () {

    $(".result-row-wrapper").hover(function () {
            $(this).addClass("result-row-wrapper-hover")
        },
        function () {
            $(this).removeClass("result-row-wrapper-hover")
        });



    $(".result-row-wrapper").click(function(){
        window.location.href="/tutor"
    })


})
