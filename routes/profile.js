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
        .custom(function (value, { req }) {
            return datos.Usuario.findOne({
                where: { email: req.body.email }
            })
                .then(function (user) {
                    // console.log(user);
                    if (user) {
                        let check = bcrypt.compareSync(value, user.contrasenia);
                        // console.log(check);
                        if (!check) {
                            throw new Error("La contraseña no es correcta")
                        }
                    }
                    else {
                        throw new Error("El email no es el de un usuario")
                    }
                })
        })

]
let registerValidations = [
    body('email')
        .notEmpty().withMessage("Debes ingresar un email").bail()
        .isEmail().withMessage("El email no es valido")
        .custom(function (value) {
            return datos.Usuario.findOne({
                where: { email: value },
            })
                .then(function (user) {
                    if (user) {
                        throw new Error('El email ingresado ya existe.');
                    }
                })
        })
    ,
    body('nombre_usuario')
        .notEmpty().withMessage("Debes ingresar un nombre de usuario").bail()
    ,
    body('contrasenia')
        .notEmpty().withMessage('Debes completar la contraseña').bail()
        .isLength({ min: 4 }).withMessage('La contraseña debe tener al menos 4 caracteres')

]

let editValidations = [
    body('email')
        .notEmpty().withMessage("Debes ingresar un email").bail()
        .isEmail().withMessage("El email no es valido")
        .custom(function (value, {req}) {
            return datos.Usuario.findOne({
                where: { email: value },
            })
                .then(function (user) {
                    // console.log(req.session.user);
                    // console.log(user.id);
                    if (user && req.session.user && user.id != req.session.user.id) {
                        throw new Error('El email ingresado ya existe.');
                    }
                })
        })
    ,
    body('nombre_usuario')
        .notEmpty().withMessage("Debes ingresar un nombre de usuario").bail()
    ,
    body('contrasenia')
        .notEmpty().withMessage('Debes completar la contraseña').bail()
        .isLength({ min: 4 }).withMessage('La contraseña debe tener al menos 4 caracteres')

]

router.get('/id/:user_id', profileController.profile)

router.get('/login', profileController.login)
router.post('/login', loginValidations, profileController.processLogin);

router.get('/profileEdit/:userId', profileController.profileEdit)
router.post('/profileEdit/:userId', editValidations, profileController.processProfileEdit)

router.get('/register', profileController.register)
router.post('/register', registerValidations, profileController.processRegister);

router.post('/logout', profileController.logout)

module.exports = router;