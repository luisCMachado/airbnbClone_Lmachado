const express = require('express');
const router = express.Router();
const location_controller = require('../controllers/location');

router.get('/s/:location/all', location_controller.searchLocationAll)
router.get('/s/:location/homes', location_controller.searchLocationHomes)

module.exports = router;