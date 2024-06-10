const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const bcrypt = require('bcryptjs');
const datos = require("../database/models");
let { body } = require("express-validator");

let loginValidations = [
    body('email')
    .notEmpty().withMessage("Debes ingresar un email").bail()
    .isEmail().withMessage("El email no es valido")
    ,
    body('contrasenia')
    .notEmpty().withMessage('Debes completar la contraseña').bail()
    .isLength({ min: 5 }).withMessage('La contraseña debe ser más larga')
    .custom(function(value, {req}) {
        return datos.Usuario.findOne({
            where: {email: req.body.email}
        })
        .then(function(user){
            // console.log(user);
            if(user){
                let check = bcrypt.compareSync(value, user.contrasenia);
                // console.log(check);
                if (!check) {  
                    throw new Error("La contraseña no es correcta")
            }}
            else{
                throw new Error("El email no es el de un usuario")
            }
        })
        })
  
]

router.get('/', profileController.profile)
router.get('/login', profileController.login)
router.post('/login', loginValidations, profileController.processLogin);
router.get('/profileEdit', profileController.profileEdit)
router.get('/register', profileController.register)
router.post('/register', profileController.processRegister);
router.post('/logout',profileController.logout)

module.exports = router;