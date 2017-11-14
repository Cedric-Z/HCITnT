var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.get('/welcome', function (req, res, next) {
    res.render('welcome', {title: 'welcome',username:req.cookies.username ||""});
});

router.get('/search-what', function (req, res, next) {
    res.render('search-what', {title: 'search-what',username:req.cookies.username ||""});
});

module.exports = router;
