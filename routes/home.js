const express = require('express'),
    router = express.Router(),
    home_controller = require('../controllers/home');
    logged_middleware = require('../middlewares/auth');

router.get('/rooms/:id', home_controller.renderHome)
router.put('/rooms/:id', home_controller.updateHome)
router.get('/rooms/:id/edit', home_controller.editHome)
router.get('/:location/homes/new',logged_middleware.isLoggedIn, home_controller.insertHome)
router.post('/:location/homes', home_controller.createHome)

module.exports = router;