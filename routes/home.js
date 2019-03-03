const csrf = require('csurf'),
    express = require('express'),
    router = express.Router(),
    home_controller = require('../controllers/home'),
    logged_middleware = require('../middlewares/auth');

var csrfProtection = csrf({
    cookie: true
})


router.get('/rooms/:id', csrfProtection, home_controller.renderHome)
router.put('/rooms/:id', home_controller.updateHome, csrfProtection)
router.delete('/rooms/:id', home_controller.deleteHome)
router.get('/rooms/:id/edit', csrfProtection, home_controller.editHome)
router.get('/:location/homes/new', csrfProtection, logged_middleware.isLoggedIn, home_controller.insertHome)
router.post('/:location/homes', home_controller.createHome, csrfProtection)

module.exports = router;