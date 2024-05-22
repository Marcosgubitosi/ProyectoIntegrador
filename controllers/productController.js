const datos = require('../db/index');

const productController = {
    index: function(req,res){
        return res.render('product',{
            lista: datos,
        })
    },
    todos: function(req,res){
        return res.render('todosproductos',{
            lista: datos
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
    processProductAdd: function(req, res) {
        let form = req.body;

        datos.Producto.create({
            nombre_archivo_producto: form.imagen,
            nombre_producto: form.nombre_producto,
            descripcion_producto: form.descripcion,
        })
        .then(function(result) {
            // console.log(result)
            req.session.product = {
                nombre_archivo_producto: form.imagen,
                nombre_producto: form.nombre_producto,
                descripcion_producto: form.descripcion,
            };
            return res.redirect('/product');
        })
        .catch(error=>console.log(error))
    },
}

module.exports = productController;