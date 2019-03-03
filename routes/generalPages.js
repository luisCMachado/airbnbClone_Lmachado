const csrf = require('csurf'),
    express = require('express'),
    router = express.Router(),
    generalPages_controller = require('../controllers/generalPages');

var csrfProtection = csrf({
    cookie: true
})
router.get('/', csrfProtection, generalPages_controller.renderHomepage);

module.exports = router;