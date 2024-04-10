const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.get('/', productController.index)
router.get('/todos', productController.todos)




module.exports = router;