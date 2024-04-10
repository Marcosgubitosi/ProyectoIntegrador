const datos = require('../db/index');

const profileEditController = {
    index: function(req,res){
        return res.render('profile-edit',{
            lista: datos.usuario,
            mensaje: "Usuario"
        })
    }
}

module.exports = profileEditController;