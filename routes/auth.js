const express = require('express'),
    router = express.Router(),
    passport = require("passport"),
    home_controller = require('../controllers/home'),
    location_controller = require('../controllers/location'),
    auth_controller = require('../controllers/auth');

router.post('/register', auth_controller.register)
router.post('/login', passport.authenticate('local'), auth_controller.login)

module.exports = router;