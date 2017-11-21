//alert("welcome")


var courseList = [ 'Introduction to Programming with Java',
    'Applications Software',
    'Introduction to Computers and the Internet',
    'Introduction to Internet Technology',
    'Introduction to Web Software Development',
    'Introduction to Software Development',
    'Laboratory',
    'Algorithms and Data Structures',
    'Introduction to C Programming',
    'Discrete Structures I',
    'Software Engineering',
    'Discrete Structures II',
    'Discussion',
    'Database Systems and Team Projects',
    'Computer Architecture I',
    'Systems Programming',
    'Laboratory',
    'Big Data & Analytics',
    'Introduction to Big Data and Analytics',
    'Steganopography&ModCryptograph',
    'Blockchain Fundamentals',
    'Research',
    'Principles of Programming Languages',
    'Capstone Design Project II',
    'Cryptography',
    'Computational Linear Algebra and Applications',
    'UNIX System Programming',
    'Artificial Intelligence Algorithms',
    'Artificial Intelligence',
    'Introduction to Computer Vision',
    'Computer Security',
    'Network Security',
    'Concepts and Applications of Computer Graphics',
    'Computer Graphics 1',
    'Introduction to Computer Science Fundamentals',
    'Introduction to Computer Systems',
    'Design and Analysis of Algorithms',
    'Advanced Software Paradigms',
    'Principles of Programming Languages',
    'Software Engineering',
    'Object-Oriented Design',
    'Theory of Computation',
    'Cryptography',
    'Computational Linear Algebra and Applications',
    'Advanced Operating Systems',
    'Database Management Systems',
    'Database Systems II',
    'Data Mining',
    'Introduction to Big Data and Analytics',
    'Big Data & Analytics',
    'Information Retrieval Systems',
    'Computer System Architecture',
    'Artificial Intelligence',
    'Artificial Intelligence Algorithms',
    'Introduction to Computer Vision',
    'Computer Security',
    'Network Security',
    'Computer Network Defense',
    'E-Commerce Security',
    'Computer Graphics II',
    'Design of Interactive Multimedia',
    'Network Defense 2',
    'Cryptography Engineering',
    'Steganopography&ModCryptograph',
    'Blockchain Fundamentals',
    'Research',
    'Thesis Research',
    'Computer Science Research',
    "Math and Art",
    "Mathematics and Politics",
    "Mathematical Ideas II",
    "Calculus with Precalculus I",
    "Recitation",
    "Calculus with Precalculus II",
    "Single-Variable Calculus I",
    "Single-Variable Calculus II",
    "Calculus for the Social and Management Sciences",
    "Sources of Collapse",
    "Joint Math and Physics Seminar",
    "Linear Algebra I","Linear Algebra I",
    "Recitation",
    "Linear Algebra I for Math Majors",
    "Multivariable Calculus",
    "Introduction to Mathematical Reasoning",
    "Elementary Number Theory",
    "Partial Differential Equations",
    "Introduction to Mathematical Modeling",
    "Stochastic Calculus Methods in Finance",
    "Introduction to Graph Theory",
    "Differential Geometry",
    "Real Analysis II",
    "Reading and Research",
    "Algebra I",
    "Dynamical Systems and Chaos",
    "Complex Analysis",
    "Applied Mathematics II",
    "Topics in Applied Mathematics","Stochastic Calculus Methods in Finance",
    "Topics in Numerical Analysis",
    "Topics in Combinatorial Mathematics",
    "Algorithmic Learning Theory",
    "Algebraic Topology",
    "Topics in Knot Theory and Low Dimensional Topology",
    "Graduate Student Experience",
    "Reading and Research",
    "Dissertation Research"]




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


$(document).ready(function(){
    var queryObj = getUrlVars()
    if(queryObj.what){
        $("#what_input").val(queryObj.what)
    }

    $("#what_input").on("input",function(){
        $("#auto_complete").html("")
        var inputValue = $(this).val();
        if(inputValue.length>2){
            console.log("AUTO COMPTELE")
            setTimeout(function(){
                var result = [];
                for(var i = 0;i<courseList.length;i++){
                    if(courseList[i].toLowerCase().indexOf(inputValue.toLowerCase())>0){
                        console.log(courseList[i])
                        result.push(courseList[i])
                    }

                    if(result.length>8){
                        break;
                    }
                }

                var resultHtml = ""
                for(var i = 0;i <result.length;i++){
                    var index = result[i].toLowerCase().indexOf(inputValue.toLowerCase());
                    var s1 = result[i].substr(0,index);
                    var s2 = result[i].substr(index,inputValue.length);
                    var s3 = result[i].substr(index+inputValue.length);


                    resultHtml += ("<div class='auto-complete-item'><span>" + s1 + "</span><span style='color: red'>"+ s2+"</span><span>" +s3 + "</span></div>")
                    console.log(resultHtml)

                }

                $("#auto_complete").html(resultHtml)


            },100)
        }


    })




})


$(document).delegate(".auto-complete-item",'mouseenter',function(){
    $(this).addClass("auto-complete-item-hover")
})


$(document).delegate(".auto-complete-item",'mouseleave',function(){
    $(this).removeClass("auto-complete-item-hover")
})

$(document).delegate(".auto-complete-item",'click',function(){
    // var name = $(this).innerText;
    var name = $(this).text()
    $("#what_input").val(name);
    $("#auto_complete").html("")
})