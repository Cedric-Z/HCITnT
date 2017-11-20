//alert("welcome")
function getUrlVars() {


    if(window.location.href.indexOf('?')==-1){
        return {}
    }


    var vars = {}, hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars[hash[0]] = hash[1];
    }
    return vars;
}


$(document).delegate("#what_next_button", "click", function () {
    if ($("#what_input").val() == "") {
        alert("Please input Course")
    } else {
        var queryObj = getUrlVars();
        queryObj['what'] = $("#what_input").val();
        console.log(queryObj)
        window.location.href = "/search-when?" + $.param(queryObj)
    }
    return false;
});

setTimeout(function(){
    var queryObj = getUrlVars()
    if(queryObj.what){
        $("#what_input").val(queryObj.what)
    }

},1000);



