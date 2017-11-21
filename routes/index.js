var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

    if(req.cookies.username){
        res.redirect("/personal-center")
    }else{
        res.redirect("/welcome")
    }
    // res.render('index', {title: 'Express'});
});
router.get('/welcome', function (req, res, next) {
    res.render('welcome', {title: 'welcome',username:req.cookies.username ||""});
});

router.get('/search-what', function (req, res, next) {
    res.render('search-what', {title: 'search-what',username:req.cookies.username ||""});
});

router.get('/search-when', function (req, res, next) {
    res.render('search-when', {title: 'search-when',username:req.cookies.username ||""});
});

router.get('/search-where', function (req, res, next) {
    res.render('search-where', {title: 'search-where',username:req.cookies.username ||""});
});

router.get('/result', function (req, res, next) {
    res.render('result', {title: 'result',username:req.cookies.username ||""});
});

router.get('/chat', function (req, res, next) {
    res.render('chat', {title: 'chat',username:req.cookies.username ||""});
});

router.get('/personal-center', function (req, res, next) {
    res.render('personal-center', {title: 'personal-center',username:req.cookies.username ||""});
});

router.get('/register-tutee', function (req, res, next) {
    res.render('register-tutee', {title: 'register-tutee',username:req.cookies.username ||""});
});
//
// router.get("/personal-center",function(req,res){
//
//     if(req.cookies.username){
//         res.render("personal-center",{title:"personal-center",username:req.cookies.username,role:req.cookies.role})
//     }else{
//         res.redirect("/welcome")
//     }
//
//
//
// })


module.exports = router;
