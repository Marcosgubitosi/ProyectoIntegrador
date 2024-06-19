//const datos = require('../db/index');
const datos = require("../database/models");
const { Association, where } = require('sequelize')
const { validationResult } = require('express-validator')
const op = datos.Sequelize.Op;

const productController = {
    detalle: function (req, res) {
        let idd = req.params.productId;
        let filtrado = {
            include: [
                { association: "usuario" },
                {
                    association: "comentario",
                    include: [{ association: "usuario" }]
                    
                }
            ]
        }

        datos.Producto.findByPk(idd, filtrado)
            .then(function (producto) {
                // res.send(producto)
                res.render('product', { info: producto })
            })
            .catch(function (error) {
                return console.log(error);
            });
    },
    searchresults: function (req, res) {
        let queryString = req.query.search
        let filtrado = {
            include: [
                { association: "usuario" },
                
                {
                    association: "comentario",
                    include: [{ association: "usuario" }]
                }
            ],
            order: [['createdAt', 'DESC']],
            where: [{ nombre_producto: {[op.like]: `%${queryString}%`}}]
        }
        datos.Producto.findAll(filtrado)
            .then(function (resultado) {
                //res.send(resultado)
                //console.log(resultado)
                return res.render('search-results', { datos: resultado, query: queryString })
               
            })

    },
    productAdd: function (req, res) {
        let filtrado = {
            include: [
                { association: "usuario" },
                {
                    association: "comentario",
                    include: [{ association: "usuario" }]
                }
            ]
        }
        if (req.session.user === undefined) {
            //return res.send("tenes que logearte para poder agregar productos")
            return res.redirect('/profile/login')
        } else {
            datos.Producto.findAll(filtrado)
                .then(function (results) {
                    //return res.send(results)
                    return res.render('product-add', { productos: results })
                })
                .catch(function (error) {
                    return console.log(error);;
                });
        }
    },
    processProductAdd: function (req, res) {
        let form = req.body;
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            datos.Producto.create({
                usuario_id: req.session.user.id,
                nombre_archivo_producto: form.imagen,
                nombre_producto: form.nombre_producto,
                descripcion_producto: form.descripcion,
            })
                .then(function () {
                    return res.redirect('/');
                })
                .catch(error => console.log(error))
        } else {
            res.render('product-add', { errors: errors.mapped(), old: req.body });
        }
    },
    todos: function (req, res) {
        datos.Producto.findAll({
            include: [
                { association: "usuario" },
                { association: "comentario" }
            ]
        })
            .then(function (results) {
                return res.render('todosproductos', { productos: results });
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    // comentario: function(req,res){
    //     if(req.session.user === undefined) {
    //         //return res.send("tenes que logearte para poder agregar comentarios")
    //         return res.redirect('/profile/login')
    //     }else{
    //     datos.Producto.findAll()
    //     .then(function (results){
    //         return res.render('product', {productos: results})
    //     })
    //     .catch(function (error) {
    //         return console.log(error);;
    //     });
    // }
    // },
    processComentario: function (req, res) {
        let idd = req.params.productId
        let form = req.body;
        //res.send(idd)
        let errors = validationResult(req);
        // res.send(errors.mapped())
        if (errors.isEmpty()) {
            datos.Comentario.create({
                producto_id: idd,
                usuario_id: req.session.user.id,
                comentario: form.comment
            })
                .then(function () {
                    return res.redirect(`/product/id/${idd}`)
                })
                .catch(function (error) {
                    return console.log(error);
                });
        } else {
            let filtrado = {
                include: [
                    { association: "usuario" },
                    {
                        association: "comentario",
                        include: [{ association: "usuario" }]
                    }
                ]
            }
            datos.Producto.findByPk(idd, filtrado)
                .then(function (producto) {
                    // res.send(producto)
                    res.render('product', {
                        info: producto,
                        errors: errors.mapped()
                    })
                })
                .catch(function (error) {
                    return console.log(error);
                });
        }

    },
    productEdit: function (req, res) {
        let idd = req.params.productId
        let filtrado = {
            include: [
                { association: "usuario" },
                {
                    association: "comentario",
                    include: [{ association: "usuario" }]
                }
            ]
        }
        if (req.session.user === undefined) {
            return res.redirect('/profile/login')
        } else {
            datos.Producto.findByPk(idd, filtrado)
            .then(function (producto) {
                // res.send(producto)
                if (req.session.user.id == producto.usuario_id) {
                    return res.render('product-edit', {info: producto })
                } else{
                    res.send('No podes editar un producto que no sea tuyo')
                }
            })
            .catch(function (error) {
                return console.log(error);
            });
    }},
    processProductEdit: function (req, res) {
        let idd = req.params.productId
        let form = req.body;
        let errors = validationResult(req);
        let filtrado = {
            include: [
                { association: "usuario" },
                {
                    association: "comentario",
                    include: [{ association: "usuario" }]
                }
            ]
        }
        //res.send(req.session)
        // res.send(errors.mapped())
        //res.send(idd)
        if (errors.isEmpty()) {
            datos.Producto.update({
                usuario_id: req.session.user.id,
                nombre_archivo_producto: form.imagen,
                nombre_producto: form.nombre_producto,
                descripcion_producto: form.descripcion,
            },{
                where:{producto_id: idd}
            })
                .then(function () {
                    return res.redirect(`/product/id/${idd}`);
                })
                .catch(error => console.log(error))
        } else {
            datos.Producto.findByPk(idd, filtrado)
            .then(function (producto) {
                //res.send(producto)
                if (req.session.user.id == producto.usuario_id) {
                    return res.render('product-edit', {
                        info: producto,
                        errors: errors.mapped()
                    })
                } else{
                    res.send('No podes editar un producto que no sea tuyo')
                }
            })
            .catch(function (error) {
                return console.log(error);
            });
        }
    },
    borrarProducto: function (req, res) {
        let idd = req.params.productId
        let filtrado = {
            include: [
                { association: "usuario" },
                {
                    association: "comentario",
                    include: [{ association: "usuario" }]
                }
            ]
        }
        //res.send(datos.Producto.usuario_id)
        datos.Producto.findByPk(idd, filtrado)
        .then(function (producto) {
            if (req.session.user.id == producto.usuario_id) {
                datos.Producto.destroy({
                    where:{producto_id: idd}
                    })
                    .then(function () {
                        return res.redirect(`/profile/id/${producto.usuario_id}`);
                    })
                    .catch(error => console.log(error))
            }else {
                    res.send('No podes borrar un producto que no sea tuyo')
                    }}
        )
        .catch(function (error) {
            return console.log(error);
        })
    }
}
    


module.exports = productController;