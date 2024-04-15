const datos = require('../db/index');

const profileEditController = {
    index: function(req,res){
        return res.render('profile-edit',{
            lista: datos,
            mensaje: "Usuario"
        })
    }
}

module.exports = profileEditController;