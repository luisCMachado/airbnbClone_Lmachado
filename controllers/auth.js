const Location = require('../models/location');
const Homes = require('../models/home');
const User = require('../models/user');
const db = require('../utilities/db/db');

module.exports.register = (req, res) => {
    User.register(new User({
            username: req.body.username
        }), req.body.password,
        function (err, user) {
            if (err) {
                return res.status(401).send(err);
            }
            req.login(user, (err) => {
                if (err) {
                    return res.status(401).send(err);
                }
                res.status(200).send({
                    status: "ok",
                    redirect: '/profile'
                });
            });
        });
}

module.exports.login = (req, res) => {
    console.log('success')
    res.status(200).send({
        status: "ok",
        redirect: '/profile'
    });
}