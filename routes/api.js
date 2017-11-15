/**
 * Created by zhang on 2017/11/14.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/login', function (req, res, next) {
    if (req.body && req.body.username && req.body.password) {
        res.json({
            code:200,
            username: req.body.username
        })
    }
    else{
        res.json({
            code:-10,
            info:"Invalid Input"

        })
    }

});
router.get('/register', function (req, res, next) {
    res.json({})
});


module.exports = router;
