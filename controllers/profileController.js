// const datos = require('../db/index');

const datos = require("../database/models");
const bcrypt = require('bcryptjs');

const profileController = {
    profile: function(req,res){
        return res.render('profile',{
            lista: datos,
        })
    },
    profileEdit: function(req,res){
        return res.render('profile-edit',{
            lista: datos,
        })
    },
    login: function(req,res){
        return res.render('login', { error: null });
        
    },
    register: function (req, res) {
        datos.Usuario.findAll()
        .then(function (results) {
            return res.render("register", {usuarios: results})
        })
        .catch(function (error) {
            return console.log(error);;
        });
    },

    processRegister: function(req, res) {
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
        .then(function(result) {
            // console.log(result)
            req.session.profile = {
                email: form.email,
                fecha_nacimiento: form.fecha_nacimiento,
                dni: form.dni,
                foto_perfil: form.foto_perfil,
            };
            return res.redirect('/');
        })
        .catch(error=>console.log(error))
    },
    processLogin: function(req, res) {
        let form = req.body;
        // console.log(form);
        datos.Usuario.findOne(
            { 
                where: { email: form.email } 
        })
        .then(function(user) {
            if (user) {
                let check = bcrypt.compareSync(form.contrasenia, user.contrasenia);
                if (check) {
                    req.session.user = {
                        email: user.email,
                        fecha_nacimiento: user.fecha_nacimiento,
                        dni: user.dni,
                        foto_perfil: user.foto_perfil,
                    };
                    // console.log('Estas logueado');
                    return res.redirect('/');
                } else {
                    // console.log('Contraseña incorrecta'); 
                    return res.render('login', { error: 'Contraseña incorrecta' });
                }
            } else {
                // console.log('Email incorrecto'); 
                return res.render('login', { error: 'Email incorrecto' });
            }
        })
        .catch(function (error) {
            return console.log(error);;
        }); 
        }
    };


module.exports = profileController;