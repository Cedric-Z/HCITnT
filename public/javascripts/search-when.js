/**
 * Created by zhang on 2017/11/20.
 */

var weekdayName=['Sun','Mon','Tue', 'Wed','Thu','Fri','Sat']


$(document).ready(function(){
    var doms = []

    for(var i = 0;i < 7;i++){
        var date = new Date( new Date().getTime()+i*24*60*60*1000 )
        var str = "<div class='date-picker-button-wrapper'><a class='btn date-picker-btn btn-primary " +
            (i==0?"date-picker-btn-not-selected date-picker-btn-selected ":" date-picker-btn-not-selected")+
                "' >"+ date.getMonth()+"/"+ (date.getDate()+1) +" " +weekdayName[date.getDay()]   +"</a></div>"
        doms.push(str)
    }
    // console.log()


    $("#date_wrapper").html(doms.join(" "))
})


$(document).delegate(".date-picker-btn","click",function(ele){


    $(".date-picker-btn").removeClass("date-picker-btn-selected");
    $(this).addClass("date-picker-btn-selected");


})