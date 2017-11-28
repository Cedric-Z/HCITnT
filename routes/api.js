/**
 * Created by zhang on 2017/11/14.
 */
var express = require('express');
var router = express.Router();
var crypto = require("crypto");


var User = require("../modules/db").User;
var Appointment = require("../modules/db").Appointment


/* GET home page. */
router.post('/login', function (req, res, next) {
    if (req.body && req.body.username && req.body.password) {

        User.findOne({
            where: {
                username: req.body.username
            }
        }).then(function (u) {
            if (u && u.password == crypto.createHash('md5').update(req.body.password).digest('hex')) {
                res.json({
                    code: 200,
                    username: req.body.username,
                    isTutor: u.isTutor,
                    name: u.firstname + " " + u.lastname
                })
            } else {
                res.json({
                    code: -100,
                    info: "User not exist or wrong password"

                })
            }
        }).catch(function (error) {
            res.json({
                code: -11,
                info: "Server Error. " + error.toString()

            })
        })


    }
    else {
        res.json({
            code: -10,
            info: "Invalid Input"

        })
    }

});
router.post('/register', function (req, res, next) {
    if (req.body && req.body.username && req.body.password) {
        User.findOne({
            where: {
                username: req.body.username
            }
        })
            .then(function (u) {
                if (u) {  // user already exist
                    res.json({
                        code: -201,
                        info: "User Already Exists. Please Try Another Username"
                    })
                } else {
                    User.create({
                        username: req.body.username,
                        password: crypto.createHash('md5').update(req.body.password).digest('hex'),
                        isTutor: req.body.isTutor || false,
                        phone: req.body.phone || "",
                        zip: req.body.zip || "",
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        info: '{"avatar":"/images/default.jpg"}'

                        // fixme 对于Tutor,将其他信息加入info
                    }).then(function (u) {
                        res.json({
                            code: 200,
                            username: req.body.username,
                            isTutor: u.isTutor,
                            name: u.firstname + " " + u.lastname
                        })
                    })
                }
            })
            .catch(function (error) {
                res.json({
                    code: -11,
                    info: "Server Error. " + error.toString()
                })
            })

    } else {
        res.json({
            code: -10,
            info: "Invalid Input"
        })
    }
});

router.post('/search', function (req, res) {

    User.findAll({
        where: {
            isTutor: 1
        }
    }).then(function (result) {
        res.json({
            code: 200,
            data: result
        })
    })


})


router.post('/get-personal-info', function (req, res) {
    if (req.cookies.username) {

        if (req.cookies.isTutor && req.cookies.isTutor == 'true' || req.body.isTutor) {    // the user is tutor
            User.findOne({
                where: {
                    username: req.cookies.username,
                },
                include: [{
                    model: Appointment, as: 'Teaching', include: [{model: User, as: "Tutee"}]

                }]
            }).then(function (result) {
                result = JSON.parse(JSON.stringify(result));

                var _result = {
                    pending: [],
                    success: [],
                    canceled: [],
                    history: []
                };
                for (var i = 0; i < result.Teaching.length; i++) {

                    if (new Date(result.Teaching[i].datetime).getTime() < new Date().getTime()) {
                        _result.history.push(result.Teaching[i])
                    }

                    else if (result.Teaching[i].status == 5) {    // success
                        _result.success.push(result.Teaching[i])
                    } else if (result.Teaching[i].status == 1) {   // waiting for tutor to accept
                        _result.pending.push(result.Teaching[i])
                    } else { // 2: tutor denied, 3: tutor canceled, 4: tutee canceled
                        _result.canceled.push(result.Teaching[i])
                    }
                }
                result.Teaching = _result;

                res.json({code: 255, data: result})

            }).catch(function (error) {
                res.json({
                    code: -11,
                    info: "Server Error. " + error.toString()
                })
            });


            return;

        } else {  // the user is tutee

            User.findOne({
                where: {
                    username: req.cookies.username,
                },
                include: [{
                    model: Appointment, as: 'Learning', include: [{model: User, as: "Tutor"}]

                }]
            }).then(function (result) {
                result = JSON.parse(JSON.stringify(result));

                var _result = {
                    pending: [],
                    success: [],
                    canceled: [],
                    history: []
                };
                for (var i = 0; i < result.Learning.length; i++) {

                    if (new Date(result.Learning[i].datetime).getTime() < new Date().getTime()) {
                        _result.history.push(result.Learning[i])
                    }

                    else if (result.Learning[i].status == 5) {    // success
                        _result.success.push(result.Learning[i])
                    } else if (result.Learning[i].status == 1) {   // waiting for tutor to accept
                        _result.pending.push(result.Learning[i])
                    } else { // 2: tutor denied, 3: tutor canceled, 4: tutee canceled
                        _result.canceled.push(result.Learning[i])
                    }
                }
                result.Learning = _result;

                res.json({code: 255, data: result})

            }).catch(function (error) {
                res.json({
                    code: -11,
                    info: "Server Error. " + error.toString()
                })
            });


            return;

        }

    } else {
        res.json({
            code: -11,
            info: "Please Login"
        })
    }
});


router.post('/make-appointment', function (req, res) {
    Appointment.create({
        tutor: req.body.tutor,
        tutee: req.cookies.username,
        datetime: new Date(req.body.datetime),
        info: {
            place: req.body.place || "Library",
            title: req.body.title
        },
        status: 1
    }).then(function (result) {
        res.json({code: 200})
    }).catch(function (error) {
        res.json({code: -202, info: "Server Error. " + error.toString()})
    })
});

router.post('/change-appointment', function (req, res) {

    if (req.body.appointmentId && req.body.appointmentStatus) {
        Appointment.findOne({
            where: {
                id: req.body.appointmentId
            }
        }).then(function (appointment) {
            if (appointment) {
                appointment.status = req.body.appointmentStatus;
                appointment.save().then(function () {
                    res.json({
                        code: 200
                    })
                })

            } else {
                res.json({
                    code: -301,
                    info: "Reservation Id Does not Exist"
                })
            }
        }).catch(function (error) {
            res.json({
                code: -302,
                info: error.toString()
            })
        })
    } else {
        res.json({
            code: -10,
            info: "Invalid Input"
        })
    }

});

router.post('/tutor', function (req, res) {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(function (result) {
        res.json({
            code: 200,
            data: result
        })

    }).catch(function (error) {
        res.json({code: -202, info: "Server Error. " + error.toString()})

    })


})

module.exports = router;
