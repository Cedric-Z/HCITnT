/**
 * Created by zhang on 2017/11/20.
 */
function getUrlVars() {


    if(window.location.href.indexOf('?')==-1){
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
var weekdayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']


$(document).ready(function () {
    var doms = []

    for (var i = 0; i < 7; i++) {
        var date = new Date(new Date().getTime() + i * 24 * 60 * 60 * 1000)
        var str = "<div class='date-picker-button-wrapper'><a class='btn date-picker-btn btn-primary " +
            (i == 0 ? "date-picker-btn-not-selected date-picker-btn-selected " : " date-picker-btn-not-selected") +
            "' >" + date.getMonth() + "/" + (date.getDate() + 1) + " " + weekdayName[date.getDay()] + "</a></div>"
        doms.push(str)
    }
    // console.log()


    $("#date_wrapper").html(doms.join(" "));

    $(".time-button").hover(function () {
        $(this).addClass("time-button-hover")
    }, function () {
        $(this).removeClass("time-button-hover")
    })

    $(".time-button").click(function () {
        if ($(this).hasClass("time-button-chosen")) {
            $(this).removeClass("time-button-chosen")
        }
        else {
            $(this).addClass("time-button-chosen")
        }
    })

    $("#back_button").click(function(){
        var queryObj = getUrlVars();
        window.location.href = "/search-what?" + $.param(queryObj)
    })
});


$(document).delegate(".date-picker-btn", "click", function (ele) {


    $(".date-picker-btn").removeClass("date-picker-btn-selected");
    $(this).addClass("date-picker-btn-selected");


})