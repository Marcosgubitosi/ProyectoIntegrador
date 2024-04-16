const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.get('/', productController.index)
router.get('/todos', productController.todos)
router.get('/product-add', productController.productAdd)
router.get('/searchresults', productController.searchresults)


module.exports = router;