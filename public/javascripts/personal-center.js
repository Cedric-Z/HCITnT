/**
 * Created by zhang on 2017/11/26.
 */
function generateAppointmentElementString(appointment, isTutor) {


    var result = ""
    result += ('<div class="appointment-element-wrapper"><div class="row"><div class="col-lg-2"><img style="border-radius: 40px;width: 80px;height: 80px;" src="');
    // avatar img src
    if (isTutor) {
        result += (appointment.Tutee && appointment.Tutee.info && appointment.Tutee.info.avatar || '/images/default.jpg')
    }
    else {
        result += (appointment.Tutor && appointment.Tutor.info && appointment.Tutor.info.avatar || '/images/default.jpg')
    }
    result += '" alt="user_avatar"></div><div class="col-lg-8">';

    result += ('<div class="appointment-title">' + ((appointment.info && appointment.info.title) || 'An Unnamed Reservation') + '</div>')

    if (appointment.status == 1) {
        if (isTutor) {
            result += '<div class="appointment-info" style="color: orangered"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>' + 'The Reservation is Waiting for You to Accept' + '</div>'
        } else {
            result += '<div class="appointment-info" style="color: orangered"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>' + 'The Reservation is Waiting for the Tutor to Accept' + '</div>'
        }
    }
    else if (appointment.status == 2) {
        if (isTutor) {
            result += '<div class="appointment-info" style="color: orangered"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>' + 'You Rejected the Reservation' + '</div>'
        } else {
            result += '<div class="appointment-info" style="color: orangered"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>' + 'The Tutor Rejected the Reservation' + '</div>'
        }
    } else if (appointment.status == 3) {
        if (isTutor) {
            result += '<div class="appointment-info" style="color: darkslategrey"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>' + 'You Canceled the Reservation' + '</div>'
        } else {
            result += '<div class="appointment-info" style="color: darkslategrey"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>' + 'The Tutor Canceled the Reservation' + '</div>'
        }
    } else if (appointment.status == 4) {
        if (isTutor) {
            result += '<div class="appointment-info" style="color: darkslategrey"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>' + 'The Tutee Canceled the Reservation' + '</div>'
        } else {
            result += '<div class="appointment-info" style="color: darkslategrey"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>' + 'You Canceled the Reservation' + '</div>'
        }
    }

    if (isTutor) {
        result += '<div class="appointment-tutor"><i class="fa fa-user" aria-hidden="true"></i>' + ((appointment.Tutee.firstname || 'Unknown') + ' ' + (appointment.Tutee.lastname || 'Unknown')) + '</div>'
    } else {
        result += '<div class="appointment-tutor"><i class="fa fa-user" aria-hidden="true"></i>' + ((appointment.Tutor.firstname || 'Unknown') + ' ' + (appointment.Tutor.lastname || 'Unknown')) + '</div>'
    }

    result += (('<div class="appointment-time"><i class="fa fa-clock-o" aria-hidden="true"></i>') + (appointment.datetime ? new Date(appointment.datetime).toLocaleString() : 'Unknown') + ' </div>');

    result += ('<div class="appointment-place"><i class="fa fa-map-marker" aria-hidden="true"></i> ' + ((appointment && appointment.info && appointment.info.place) || "Unknown Place") + '</div>')

    result += '</div><div class="col-lg-2">';

    if (appointment.status == 1) {
        if (isTutor) {
            result += ('<button type="button" class="btn btn-success appointment-element-button" data-status="5">Accept</button>')
            result += ('<button type="button" class="btn btn-warning appointment-element-button" data-status="2">Reject</button>')
        } else {
            result += ('<button type="button" class="btn btn-danger appointment-element-button" data-status="4">Cancel</button>')
        }
    }
    else if (appointment.status == 5) {
        if (isTutor) {
            if (new Date(appointment.datetime).getTime() > new Date().getTime()) {
                result += ('<button type="button" class="btn btn-danger appointment-element-button" data-status="3">Cancel</button>')
            }
        } else {
            if (new Date(appointment.datetime).getTime() > new Date().getTime()) {
                result += ('<button type="button" class="btn btn-danger appointment-element-button" data-status="4">Cancel</button>')
            }
            else {
                if (appointment.info && appointment.info.rated) {
                    result += ('<button type="button" class="btn btn-danger appointment-element-button">Rate</button>')
                } else {
                    // todo 显示评分
                }
            }
        }
    }

    result += '</div></div></div>';
    return result
}


$(document).ready(function () {

    $("#appointment_filter_success_button").click(function () {
        if ($(this).hasClass("appointment-filter-button-active")) {
            return
        } else {
            $(".appointment-list").hide();
            $("#success_appointment_list").show();
            $(".appointment-filter-button").removeClass("appointment-filter-button-active")
            $(this).addClass("appointment-filter-button-active")
        }
    });
    $("#appointment_filter_pending_button").click(function () {
        if ($(this).hasClass("appointment-filter-button-active")) {
            return
        } else {
            $(".appointment-list").hide();
            $("#pending_appointment_list").show();
            $(".appointment-filter-button").removeClass("appointment-filter-button-active")
            $(this).addClass("appointment-filter-button-active")
        }
    });
    $("#appointment_filter_canceled_button").click(function () {
        if ($(this).hasClass("appointment-filter-button-active")) {
            return
        } else {
            $(".appointment-list").hide();
            $("#canceled_appointment_list").show();
            $(".appointment-filter-button").removeClass("appointment-filter-button-active")
            $(this).addClass("appointment-filter-button-active")
        }
    });
    $("#appointment_filter_history_button").click(function () {
        if ($(this).hasClass("appointment-filter-button-active")) {
            return
        } else {
            $(".appointment-list").hide();
            $("#history_appointment_list").show();
            $(".appointment-filter-button").removeClass("appointment-filter-button-active")
            $(this).addClass("appointment-filter-button-active")
        }
    });


    $.ajax({
        url: "/api/get-personal-info",
        method: "POST",
        dataType: "json",
        success: function (result) {
            if (result.code > 0) {
                $("#name_span").html((result.data.firstname || "") + " " + (result.data.lastname || ""))
                $("#user_avatar_img").attr("src", (result.data.info && result.data.info.avatar) || "/images/default.jpg")
                $("#phone_span").html(result.data.phone || "N/A");
                $("#email_span").html(result.data.username);

                if (result.data.Learning) {
                    var l = result.data.Learning;
                    if (l.success.length) {
                        var _html = ""
                        for (var i = 0; i < l.success.length; i++) {
                            _html += generateAppointmentElementString(l.success[i],false)
                        }
                        $("#success_appointment_list").html(_html)

                    } else {
                        $("#success_appointment_list").html("No Reservations Here....")
                    }
                    if (l.pending.length) {
                        var _html = ""
                        for (var i = 0; i < l.pending.length; i++) {
                            _html += generateAppointmentElementString(l.pending[i],false)
                        }
                        $("#pending_appointment_list").html(_html)

                    } else {
                        $("#pending_appointment_list").html("No Reservations Here....")
                    }
                    if (l.canceled.length) {
                        var _html = ""
                        for (var i = 0; i < l.canceled.length; i++) {
                            _html += generateAppointmentElementString(l.canceled[i],false)
                        }
                        $("#canceled_appointment_list").html(_html)

                    } else {
                        $("#canceled_appointment_list").html("No Reservations Here....")
                    }
                    if (l.history.length) {
                        var _html = ""
                        for (var i = 0; i < l.history.length; i++) {
                            _html += generateAppointmentElementString(l.history[i],false)
                        }
                        $("#history_appointment_list").html(_html)

                    } else {
                        $("#history_appointment_list").html("No Reservations Here....")
                    }

                } else {
                    var l = result.data.Teaching;
                    if (l.success.length) {
                        var _html = ""
                        for (var i = 0; i < l.success.length; i++) {
                            _html += generateAppointmentElementString(l.success[i],true)
                        }
                        $("#success_appointment_list").html(_html)

                    } else {
                        $("#success_appointment_list").html("No Reservations Here....")
                    }
                    if (l.pending.length) {
                        var _html = ""
                        for (var i = 0; i < l.pending.length; i++) {
                            _html += generateAppointmentElementString(l.pending[i],true)
                        }
                        $("#pending_appointment_list").html(_html)

                    } else {
                        $("#pending_appointment_list").html("No Reservations Here....")
                    }
                    if (l.canceled.length) {
                        var _html = ""
                        for (var i = 0; i < l.canceled.length; i++) {
                            _html += generateAppointmentElementString(l.canceled[i],true)
                        }
                        $("#canceled_appointment_list").html(_html)

                    } else {
                        $("#canceled_appointment_list").html("No Reservations Here....")
                    }
                    if (l.history.length) {
                        var _html = ""
                        for (var i = 0; i < l.history.length; i++) {
                            _html += generateAppointmentElementString(l.history[i],true)
                        }
                        $("#history_appointment_list").html(_html)

                    } else {
                        $("#history_appointment_list").html("No Reservations Here....")
                    }
                }


            } else {

            }

        }
    });


})