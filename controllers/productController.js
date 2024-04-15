const datos = require('../db/index');

const productController = {
    index: function(req,res){
        return res.render('product',{
            lista: datos,
            mensaje: "Productos"
        })
    },
    todos: function(req,res){
        return res.render('todosproductos',{
            lista: datos
        })
    },
    home: function(req,res){
        return res.render('index',{
            lista: datos
        })
    }
}

module.exports = productController;