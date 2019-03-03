const Location = require('../models/location');
const Homes = require('../models/home');
const User = require('../models/user');
const db = require('../utilities/db/db');
const csrf = require('csurf');


module.exports.register = async (req, res) => {
    await csrf({
        cookie: true
    })
    User.register(new User({
        username: req.body.username
    }), req.body.password, (err, user) => {
        if (err) {
            return res.status(401).send(err);
        }
        req.login(user, (err) => {
            if (err) {
                return res.status(401).send(err);
            }
            res.status(200).send({
                status: "ok",
                redirect: '/profile',
            });
        });
    });
}

module.exports.login = async (req, res) => {
    await csrf({
        cookie: true
    })
    console.log('csrf')
    console.log('Login successo')
    await res.status(200).send({
        status: "ok",
        redirect: '/profile'
    });
}

module.exports.logout = async (req, res) => {
    await req.logout();
    await res.redirect("/");
}