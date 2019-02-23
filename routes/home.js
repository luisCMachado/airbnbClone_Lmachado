const express = require('express');
const router = express.Router();
const home_controller = require('../controllers/home');
const location_controller = require('../controllers/location');

router.get('/rooms/:id', home_controller.renderHome)
router.get('/:location/homes/new', home_controller.insertHome)
router.post('/:location/homes',home_controller.createHome)

module.exports = router;