const express = require('express');
const router = express.Router();
const generalPages_controller = require('../controllers/generalPages');

router.get('/', generalPages_controller.renderHomepage);
router.get('/profile', generalPages_controller.renderProfile);

module.exports = router;