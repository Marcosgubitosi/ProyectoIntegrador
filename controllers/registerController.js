const datos = require('../db/index');

const registerController = {
    index: function(req,res){
        return res.render('register',{
            lista: datos,
            mensaje: "Usuario"
        })
    }
}

module.exports = registerController;