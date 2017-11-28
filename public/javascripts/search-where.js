/**
 * Created by zhang on 2017/11/27.
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

$(document).ready(function(){
    $("#what_next_button").click(function(){
        var queryObj = getUrlVars();
        window.location.href = "/result?" + $.param(queryObj)
        return false;
    })
    $("#what_previous_button").click(function(){
        var queryObj = getUrlVars();
        window.location.href = "/search-when?" + $.param(queryObj)
        return false;
    })
})