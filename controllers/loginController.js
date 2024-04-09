const datos = require('../db/index');

const loginController = {
    index: function(req,res){
        return res.render('login',{
            lista: datos.usuario,
            mensaje: "Usuario"
        })
    }
}

module.exports = loginController;