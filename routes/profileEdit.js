const express = require('express');
const router = express.Router();
const profileEditController = require('../controllers/profileEditController');

router.get('/', profileEditController.index)

module.exports = router;