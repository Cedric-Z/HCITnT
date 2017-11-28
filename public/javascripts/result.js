/**
 * Created by zhang on 2017/11/21.
 */

function generateTutorElement(tutor) {

    var result = '<div data-username="' + tutor.username + '" class="row result-row-wrapper result-row-wrapper-hover" style="width: 80%; background-color: #ffffff;margin-bottom: 20px">' +
        '<div class="col-lg-12">' +
        '<div class="row">' +
        '<div class="col-lg-3">' +
        '<div style="display: inline-block">' +
        '<img class="img-thumbnail" src="' + ((tutor.info && tutor.info.avatar) || '/images/default.jpg') + '">' +
        '</div>' +
        '</div>' +
        '<div class="col-lg-9">' +
        '<div class="tutor-name">' +
        tutor.firstname + ' ' + tutor.lastname +
        '</div>' +
        '<div class="tutor-info">' + ((tutor.info && tutor.info.info) || "UHHHHHHHHHHHHHHHHHHHH") +


        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="row tutor-info-bottom">' +
        '<div class="col-lg-3">' +
        '<span class="rating-star-wrapper">' +
        '<i class="fa fa-star" aria-hidden="true"></i>' +
        '<i class="fa fa-star" aria-hidden="true"></i>' +
        '<i class="fa fa-star" aria-hidden="true"></i>' +
        '<i class="fa fa-star-half-o" aria-hidden="true"></i>' +
        '<i class="fa fa-star-o" aria-hidden="true"></i>' +
        '</span>' +
        '<span class="rating-score">' + ((tutor.info && tutor.info.rating) || '-') + '</span>' +
        '<span class="rating-number">(' + ((tutor.info && tutor.info.number) || '-') + ')</span>' +
        '</div>' +
        '<div class="col-lg-4">' +
        '<span class="major-wrapper">Major: </span>' +
        '<span class="major-name">Computer Science</span>' +
        '</div>' +
        ' <div class="col-lg-5">' +
        ' <span class="clock-icon-wrapper">' +
        '<i class="fa fa-clock-o" aria-hidden="true"></i>' +
        '</span>' +
        '<span class="week-day-name">MON</span>' +
        '<span class="time-number">10:00-20:00</span>' +
        '</div>' +

        '</div>' +
        '</div>' +


        ' </div>'


    return result
}

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


    var queryObj = getUrlVars();

    $.ajax({
        url: "/api/search",
        method: "POST",
        dataType: "json",
        data: queryObj,
        success: function (result) {


            var _html = ""

            for (var i = 0; i < result.data.length; i++) {
                _html += generateTutorElement(result.data[i])
            }
            $(".result").html(_html)

            console.log(result)

            $(".result-row-wrapper").click(function () {

                var username = $(this).attr("data-username");
                var queryObj = getUrlVars();
                queryObj.tutor = username;
                window.location.href = "/tutor?" + $.param(queryObj)
            })

        }
    })


})
