const datos = require('../db/index');

const profileController = {
    index: function(req,res){
        return res.render('profile.ejs',{
            lista: datos.usuario,
        })
    }
}

module.exports = profileController;