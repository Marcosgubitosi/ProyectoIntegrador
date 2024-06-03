//const datos = require('../db/index');
const datos = require("../database/models");

const productController = {
    index: function(req,res){
        return res.render('product',{
            lista: datos,
        })
    },
    searchresults: function(req,res){
        return res.render('searchresults',{
            lista: datos
        })
    },
    productAdd: function(req,res){
        return res.render('product-add',{
            lista: datos
        })
    },
    productAdd: function(req,res){
        datos.Producto.findAll()
        .then(function (results){
            return res.render('product-add', {productos: results})
        })
        .catch(function (error) {
            return console.log(error);;
        });
    },
    processProductAdd: function(req, res) {
        let form = req.body;
        const { validationResult } = require('express-validator')
        let errors = validationResult(req);
        if (errors.isEmpty()){
            datos.Producto.create({
                nombre_archivo_producto: form.imagen,
                nombre_producto: form.nombre_producto,
                descripcion_producto: form.descripcion,
            })
            .then(function(result) {
                // console.log(result)
                req.session.product = {
                    // hay que encontrar una manera para mandar el usuario 
                    nombre_archivo_producto: form.imagen,
                    nombre_producto: form.nombre_producto,
                    descripcion_producto: form.descripcion,
                };
                return res.redirect('/');
            })
            .catch(error=>console.log(error))
        }else {
            res.render('product-add', { errors: errors.mapped(), old: req.body });
        }
    },
    todos: function(req,res){
        datos.Producto.findAll({
            include: [
                {association: "usuario"}
            ]
        })
        .then(function (results){
            console.log(results);
            //return res.send(results)      es para probar a ver si se manda
            return res.render('todosproductos', {productos: results})
        })
        .catch(function (error) {
            return console.log(error);;
        });
    }
   
}

module.exports = productController;