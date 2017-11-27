/**
 * Created by zhang on 2017/11/26.
 */
$(document).ready(function () {


    $.ajax({
        url: "/api/get-personal-info",
        method: "POST",
        dataType: "json",
        success:function(result){
            if(result.code>0){
                $("#name_span").html((result.data.firstname||"") + " " +(result.data.lastname||""))
                $("#user_avatar_img").attr("src",(result.data.info&&result.data.info.avatar)||"/images/default.jpg")
                $("#phone_span").html(result.data.phone || "N/A");
                $("#email_span").html(result.data.username);


            }else{

            }

        }
    });


})