const datos = require('../db/index');

const profileController = {
    index: function(req,res){
        return res.render('profile',{
            lista: datos,
            mensaje: "Usuario"
        })
    }
}


module.exports = profileController;