const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
let { body } = require("express-validator");
let productValidations = [
    body('imagen')
    .notEmpty().withMessage("debes subir una imagen").bail()
    ,
    body('nombre_producto')
    .notEmpty().withMessage("debes completar el nombre del producto").bail()
    ,
    body('descripcion')
    .notEmpty().withMessage("debes ponerle una descripcion al producto").bail()
    .isLength({min:10}).withMessage("la descripcion tiene que ser mas larga que 10 carcteres")
  
]

router.get('/id/:productoID', productController.detalle)
router.get('/searchresults', productController.searchresults)
router.get('/todos', productController.todos)
router.get('/add', productController.productAdd)
router.post('/add', productValidations, productController.processProductAdd)


module.exports = router;