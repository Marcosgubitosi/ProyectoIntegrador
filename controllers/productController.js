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
    }
}

module.exports = productController;