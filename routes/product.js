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
let comentariosValidations = [
    body('comment')
    .notEmpty().withMessage("el campo esta vacio").bail()
    .isLength({min:3}).withMessage("el comentario debe tener al menos 3 caracteres")
  
]

router.get('/id/:productId', productController.detalle)
router.post('/id/:productId', comentariosValidations, productController.processComentario)

router.get('/searchresults', productController.searchresults)
router.get('/todos', productController.todos)

router.get('/add', productController.productAdd)
router.post('/add', productValidations, productController.processProductAdd)

router.get('/edit/:productId', productController.productEdit)
router.post('/edit/:productId',productValidations, productController.processProductEdit)




module.exports = router;