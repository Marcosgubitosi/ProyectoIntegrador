const datos = require('../db/index');

const productController = {
    index: function(req,res){
        return res.render('product',{
            lista: datos.productos,
            mensaje: "Productos"
        })
    },
    todos: function(req,res){
        return res.render('todosproductos',{
            lista: datos.productos
        })
    }
}

module.exports = productController;