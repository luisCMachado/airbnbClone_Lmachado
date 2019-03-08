const express = require('express'),
    router = express.Router(),
    generalPages_controller = require('../controllers/generalPages');

router.get('/', generalPages_controller.renderHomepage);

module.exports = router;