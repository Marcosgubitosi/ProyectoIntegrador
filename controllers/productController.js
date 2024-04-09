const datos = require('../db/index');

const productController = {
    index: function(req,res){
        return res.render('product',{
            lista: datos.productos,
            mensaje: "Productos"
        })
    }
}

module.exports = productController;