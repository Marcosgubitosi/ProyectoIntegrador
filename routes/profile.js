const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/', profileController.profile)
router.get('/login', profileController.login)
router.get('/profileEdit', profileController.profileEdit)
router.get('/register', profileController.register)

module.exports = router;