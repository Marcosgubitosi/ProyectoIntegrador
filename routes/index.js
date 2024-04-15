var express = require('express');
var router = express.Router();

/* GET home page. */
const productController = require('../controllers/productController');

router.get('/', productController.home)

module.exports = router;
