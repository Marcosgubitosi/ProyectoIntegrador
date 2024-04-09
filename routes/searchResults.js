const express = require('express');
const router = express.Router();

const searchResultsController = require('../controllers/searchResultsController');

router.get('/', searchResultsController.index)



module.exports = router;