var express = require('express');
var router = express.Router();

/* GET home page. */
const indexController = require('../controllers/indexController');

router.get('/', indexController.home)

module.exports = router;
