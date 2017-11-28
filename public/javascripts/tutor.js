/**
 * Created by zhang on 2017/11/27.
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
    $.ajax({
        url: "/api/tutor",
        method: "POST",
        dataType: "json",
        data: {
            username: getUrlVars().tutor
        },
        success: function (result) {
            if (result.code > 0) {
                $(".tutor-name").html(result.data.firstname + ' ' + result.data.lastname)
                $(".img-thumbnail").attr('src', (result.data && result.data.info && result.data.info.avatar) || '/images/default.jpg')
            }

        }
    })


    $("#make_appointment_submit_button").click(function () {

        var _date = new Date(parseInt(getUrlVars().date))
        var _dateString = _date.getFullYear() + '/' + (_date.getMonth() + 1) + '/' + _date.getDate() + ' ' + getUrlVars().hour + ":00:00"
        console.log(_dateString)
        var datetime = new Date(_dateString)


        $.ajax({
            url: "/api/make-appointment",
            method: "POST",
            dataType: "json",
            data: {
                tutor: getUrlVars().tutor,
                datetime: datetime,
                title: getUrlVars().what
            },
            success: function (result) {
                if (result.code > 0) {
                    alert("SUCCESS");
                    location.href='/personal-center'
                }

            }
        })
        return false;
    })
})