// const datos = require('../db/index');

const datos = require("../database/models");
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator')


const profileController = {
    profile: function (req, res) {
        let idd = req.params.user_id;
        let filtrado = {
            include: [
                {
                    association: "producto",
                    include: [{ association: "comentario" }],
                },
                { association: "comentario" }
            ]
        }

        datos.Usuario.findByPk(idd, filtrado)
            .then(function (usuario) {
                //  console.log(usuario);
                // res.send(usuario)
                res.render('profile', { datos: usuario })
            })
            .catch(function (error) {
                return console.log(error);
            });
    },
    profileEdit: function (req, res) {
        let idd = req.params.userId
        if (req.session.user === undefined) {
            //return res.send("tenes que logearte para poder editar tu perfil")
            return res.redirect('/profile/login')
        } else {
            datos.Usuario.findByPk(idd)
                .then(function (user) {
                    // res.send(user)
                    if (req.session.user.id == user.id) {
                        return res.render('profile-edit', { info: user })
                    } else {
                        res.send('No podes editar un perfil ajeno al tuyo')
                    }
                })
                .catch(function (error) {
                    return console.log(error);
                });
        }
    },
    processProfileEdit: function (req, res) {
        let idd = req.params.userId
        let form = req.body;
        let errors = validationResult(req);
        // res.send(errors.errors[0])
        if (errors.isEmpty()) {
            let passencriptada = bcrypt.hashSync(form.contrasenia, 10);
            form.contrasenia = passencriptada
            datos.Usuario.update({
                email: form.email,
                nombre_usuario: form.nombre_usuario,
                contrasenia: form.contrasenia,
                fecha_nacimiento: form.fecha_nacimiento,
                dni: form.dni,
                foto_perfil: form.foto_perfil
            }, {
                where: { id: idd }
            })
                .then(function () {
                    req.session.user = {
                        email: form.email,
                        nombre_usuario: form.nombre_usuario,
                        fecha_nacimiento: form.fecha_nacimiento,
                        dni: form.dni,
                        foto_perfil: form.foto_perfil
                    }
                    return res.redirect(`/profile/id/${idd}`);
                })
                .catch(error => console.log(error))
        } else {
            for (let i = 0; i < errors.errors.length; i++) {
                if (errors.errors[i].path === 'contrasenia'  && errors.errors[i].value === '') {
                    // res.send(errors)
                    datos.Usuario.update({
                        email: form.email,
                        nombre_usuario: form.nombre_usuario,
                        fecha_nacimiento: form.fecha_nacimiento,
                        dni: form.dni,
                        foto_perfil: form.foto_perfil
                    }, {
                        where: { id: idd }
                    })
                        .then(function () {
                            req.session.user = {
                                email: form.email,
                                nombre_usuario: form.nombre_usuario,
                                fecha_nacimiento: form.fecha_nacimiento,
                                dni: form.dni,
                                foto_perfil: form.foto_perfil
                            }
                            return res.redirect(`/profile/id/${idd}`);
                        })
                        .catch(error => console.log(error))
                } else {
                    datos.Usuario.findByPk(idd)
                        .then(function (user) {
                            if (req.session.user.id == user.id) {
                                return res.render('profile-edit', {
                                    info: user,
                                    errors: errors.mapped()
                                })
                            } else {
                                res.send('No podes editar un perfil ajeno al tuyo')
                            }
                        })
                        .catch(function (error) {
                            return console.log(error);
                        });
                }
            }


        }
    },
    login: function (req, res) {
        if (req.session.user === undefined) {
            return res.render('login', { error: null });
        } else {
            return res.redirect('/')
        }
    },
    register: function (req, res) {
        if (req.session.user === undefined) {
            return res.render('register', { error: null });
        } else {
            return res.redirect('/')
        }
    },

    processRegister: function (req, res) {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let form = req.body;
            let passencriptada = bcrypt.hashSync(form.contrasenia, 10);
            form.contrasenia = passencriptada

            datos.Usuario.create({
                email: form.email,
                nombre_usuario: form.nombre_usuario,
                contrasenia: form.contrasenia,
                fecha_nacimiento: form.fecha_nacimiento,
                dni: form.dni,
                foto_perfil: form.foto_perfil,
            })
                .then(function (result) {
                    // console.log(result)
                    req.session.profile = {
                        email: form.email,
                        nombre_usuario: form.nombre_usuario,
                        fecha_nacimiento: form.fecha_nacimiento,
                        dni: form.dni,
                        foto_perfil: form.foto_perfil,
                    };
                    return res.redirect('/');
                })
                .catch(error => console.log(error))
        }
        else {
            //  return res.send(errors.mapped())
            return res.render("register", { errors: errors.mapped(), old: req.body })
        }
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
                        id: user.id,
                        email: user.email,
                        nombre_usuario: user.nombre_usuario,
                        fecha_nacimiento: user.fecha_nacimiento,
                        dni: user.dni,
                        foto_perfil: user.foto_perfil,
                    };
                    if (form.recordarme) {
                        res.cookie('userId', user.id, { maxAge: 30 * 24 * 60 * 60 * 1000 });
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

    },
    logout: function (req, res) {
        req.session.destroy();
        res.clearCookie('userId')
        return res.redirect("/")
    }
};


module.exports = profileController;