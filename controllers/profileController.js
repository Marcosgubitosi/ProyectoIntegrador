// const datos = require('../db/index');

const datos = require("../database/models");
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator')


const profileController = {
    profile: function (req, res) {
        if (req.cookies.userEmail && !req.session.user) {
            datos.Usuario.findOne({
                where: { email: req.cookies.userEmail }
            })
                .then(function (user) {
                    req.session.user = {
                        email: user.email,
                        fecha_nacimiento: user.fecha_nacimiento,
                        dni: user.dni,
                        foto_perfil: user.foto_perfil,
                    }
                })
                .catch(function (error) {
                    return console.log(error);
                });
        }
    },
    profileEdit: function (req, res) {
        return res.render('profile-edit', {
            lista: datos,
        })
    },
    login: function (req, res) {
        return res.render('login', { error: null });

    },
    register: function (req, res) {
        datos.Usuario.findAll()
            .then(function (results) {
                return res.render("register", { usuarios: results })
            })
            .catch(function (error) {
                return console.log(error);;
            });
    },

    processRegister: function (req, res) {
        let form = req.body;
        let passencriptada = bcrypt.hashSync(form.contrasenia, 10);
        form.contrasenia = passencriptada

        datos.Usuario.create({
            email: form.email,
            contrasenia: form.contrasenia,
            fecha_nacimiento: form.fecha_nacimiento,
            dni: form.dni,
            foto_perfil: form.foto_perfil,
        })
            .then(function (result) {
                // console.log(result)
                req.session.profile = {
                    email: form.email,
                    fecha_nacimiento: form.fecha_nacimiento,
                    dni: form.dni,
                    foto_perfil: form.foto_perfil,
                };
                return res.redirect('/');
            })
            .catch(error => console.log(error))
    },
    processLogin: function (req, res) {
        let form = req.body;
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            // console.log(form);
            datos.Usuario.findOne(
                {
                    where: { email: form.email }
                })
                .then(function (user) {
                    // console.log(user);
                    req.session.user = {
                        email: user.email,
                        fecha_nacimiento: user.fecha_nacimiento,
                        dni: user.dni,
                        foto_perfil: user.foto_perfil,
                    };
                    if (form.recordarme) {
                        res.cookie('userEmail', user.email, { maxAge: 30 * 24 * 60 * 60 * 1000 });
                    }
                    return res.redirect('/');

                })
                .catch(function (error) {
                    return console.log(error);
                });
        } else {
            //  return res.send(errors.mapped())
            return res.render("login", { errors: errors.mapped(), old: req.body })
        }
    }
};


module.exports = profileController;