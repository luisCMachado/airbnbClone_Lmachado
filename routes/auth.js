const csrf = require('csurf'),
    express = require('express'),
    router = express.Router(),
    passport = require("passport"),
    auth_controller = require('../controllers/auth'),
    generalPages_controller = require('../controllers/generalPages'),
    logged_middleware = require('../middlewares/auth');

var csrfProtection = csrf({
    cookie: true
})

router.post('/register', auth_controller.register, csrfProtection)
router.post('/login',  passport.authenticate('local'), auth_controller.login, csrfProtection)
router.get('/logout', logged_middleware.isLoggedIn, auth_controller.logout)
router.get('/profile', logged_middleware.isLoggedIn, csrfProtection, generalPages_controller.renderProfile);

module.exports = router;