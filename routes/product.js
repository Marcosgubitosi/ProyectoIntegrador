const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.index)
router.get('/searchresults', productController.searchresults)
router.get('/todos', productController.todos)
router.get('/add', productController.productAdd)
router.post('/add', productController.processProductAdd)



module.exports = router;