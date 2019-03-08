const express = require('express'),
    router = express.Router(),
    passport = require("passport"),
    auth_controller = require('../controllers/auth'),
    generalPages_controller = require('../controllers/generalPages'),
    logged_middleware = require('../middlewares/auth');

router.post('/register', auth_controller.register)
router.post('/login', passport.authenticate('local'), auth_controller.login)
router.get('/logout', logged_middleware.isLoggedIn, auth_controller.logout)
router.get('/profile', logged_middleware.isLoggedIn, generalPages_controller.renderProfile);

module.exports = router;