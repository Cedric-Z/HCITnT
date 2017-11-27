/**
 * Created by zhang on 2017/11/26.
 */
var Sequelize = require('sequelize');

var sequelize = new Sequelize('HCI', null, null, {
    dialect: "sqlite",
    storage: './db.sqlite'
});
sequelize
    .authenticate()
    .then(function (err) {
        console.log('Connection has been established successfully.');
    }, function (err) {
        console.log('Unable to connect to the database:', err);
    });


var User = sequelize.define('User', {
    username: {type: Sequelize.STRING, primaryKey: true},   // email
    lastname: Sequelize.STRING,
    firstname: Sequelize.STRING,
    password: Sequelize.STRING,
    isTutor: Sequelize.BOOLEAN,
    phone: Sequelize.STRING,
    zip: Sequelize.STRING,
    info: Sequelize.JSON,        // all other stuff
});

var Appointment = sequelize.define('Appointment', {
    tutor: Sequelize.STRING, // username of the tutor
    tutee: Sequelize.STRING, // username of the tutee
    status: Sequelize.INTEGER,   // status of the appointment
                                 // 1: waiting for tutor to accept
                                 // 2: tutor denied
                                 // 3: tutor canceled
                                 // 4: tutee canceled
                                 // 5: success

    datetime: Sequelize.DATE,
    info: Sequelize.JSON   // all other stuff
});

Appointment.belongsTo(User, {targetKey: 'username', as: "Tutor", foreignKey: "tutor"});
Appointment.belongsTo(User, {targetKey: 'username', as: "Tutee", foreignKey: "tutee"});

User.hasMany(Appointment,{
    as:"Teaching",
    foreignKey:"tutor"
});

User.hasMany(Appointment,{
    as:"Learning",
    foreignKey:"tutee"
});


//  SYNC SCHEMA
sequelize
    .sync({force: false})
    .then(function (err) {
        console.log('DB sync completed');
    }, function (err) {
        console.log('DB sync error:', err);
    });


exports.User = User;
exports.Appointment = Appointment;