/**
 * Created by zhang on 2017/11/21.
 */


function getUrlVars() {


    if (window.location.href.indexOf('?') == -1) {
        return {}
    }


    var vars = {}, hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars[hash[0]] = decodeURIComponent(hash[1]);
    }
    return vars;
}


$(document).ready(function () {

    $(".result-row-wrapper").hover(function () {
            $(this).addClass("result-row-wrapper-hover")
        },
        function () {
            $(this).removeClass("result-row-wrapper-hover")
        });


    $(".result-row-wrapper").click(function () {
        window.location.href = "/tutor"
    })


    var queryObj = getUrlVars();

    $.ajax({
        url: "/api/search",
        method: "POST",
        dataType: "json",
        data: queryObj,
        success: function (result) {
            console.log(result)

        }
    })


})
