const datos = require('../db/index');

const prodaddController = {
    index: function(req,res){
        return res.render('productAdd',{
            lista: datos.productos,
            mensaje: "Productos"
        })
    }
}

module.exports = loginController;