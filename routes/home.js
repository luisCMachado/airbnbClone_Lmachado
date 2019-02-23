const express = require('express');
const router = express.Router();
const home_controller = require('../controllers/home');

router.get('/rooms/:id', home_controller.renderHome)
router.post('/:location/homes',home_controller.insertHome)

module.exports = router;