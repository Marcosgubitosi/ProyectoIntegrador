//const datos = require('../db/index');
const datos = require("../database/models");
const {Association} = require('sequelize')
const { validationResult } = require('express-validator')

const productController = {
    detalle: function(req,res){
       let idd = req.params.productoID;
       let filtrado ={
        include: [
            {association: "usuario"},
            {association: "comentario",  
            include: [{association: "usuario"}]
        }
        ]}
    
       datos.Producto.findByPk(idd, filtrado)
            .then(function (producto) {
                // res.send(producto)
                res.render('product', {info: producto})
            })
            .catch(function (error) {
                return console.log(error);
            });
    },
    searchresults: function(req,res){
        let queryString = req.query.search
        let filtrado = {
            include: [
                {association: "usuario"},
                {association: "comentario",  
                include: [{association: "usuario"}]
            }
            ],
            where: [{nombre_producto: queryString}]
        }
        datos.Producto.findOne(filtrado)
        .then(function(resultado){
            //console.log(resultado)
            if (resultado != undefined){
                return res.render('search-results', {datos: resultado})
            }else {
                return res.send("no hay resultados para su criterio de busqueda")
            }
        })

    },
    productAdd: function(req,res){
        let filtrado ={
            include: [
                {association: "usuario"},
                {association: "comentario",  
                include: [{association: "usuario"}]
            }
            ]}
        if(req.session.user === undefined) {
            //return res.send("tenes que logearte para poder agregar productos")
            return res.redirect('/profile/login')
        }else{
        datos.Producto.findAll(filtrado)
        .then(function (results){
            return res.render('product-add', {productos: results})
        })
        .catch(function (error) {
            return console.log(error);;
        });
    }},
    processProductAdd: function(req, res) {
        let form = req.body;
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
                {association: "usuario"},
                {association: "comentario"}
            ]
        })
        .then(function (results){
            //console.log(results);
            // return res.send(results) 
            return res.render('todosproductos', {productos: results})
        })
        .catch(function (error) {
            return console.log(error);;
        });
    },
    comentario: function(req,res){
        if(req.session.user === undefined) {
            //return res.send("tenes que logearte para poder agregar comentarios")
            return res.redirect('/profile/login')
        }else{
        datos.Producto.findAll()
        .then(function (results){
            return res.render('product', {productos: results})
        })
        .catch(function (error) {
            return console.log(error);;
        });
    }
    },
    processComentario: function(req,res){
        let form = req.body;
        let errors = validationResult(req);
        if (errors.isEmpty()){
            datos.Comentario.create({
                comentario: form.comentario
            })
        }

    }
   
}

module.exports = productController;