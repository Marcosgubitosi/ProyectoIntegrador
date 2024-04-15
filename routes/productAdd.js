const express = require('express');
const router = express.Router();

const productaddController = require('../controllers/productaddController');

router.get('/', productaddController.index)


module.exports = router;