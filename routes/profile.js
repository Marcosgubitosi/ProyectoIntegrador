const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/', profileController.profile)
router.get('/login', profileController.login)
router.post('/login', profileController.processLogin);
router.get('/profileEdit', profileController.profileEdit)
router.get('/register', profileController.register)
router.post('/register', profileController.processRegister);

module.exports = router;