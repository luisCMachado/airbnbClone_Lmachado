const express = require('express'),
    router = express.Router(),
    location_controller = require('../controllers/location');


router.get('/s/:location/all', location_controller.searchLocationAll)
router.get('/s/:location/homes', location_controller.searchLocationHomes)

module.exports = router;