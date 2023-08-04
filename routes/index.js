const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/',homeController.home);
router.use('/user',require('./user'));
router.use('/user',require('./post'));

module.exports = router;