const datos = require('../db/index');

const profileController = {
    profile: function(req,res){
        return res.render('profile',{
            lista: datos,
        })
    },
    profileEdit: function(req,res){
        return res.render('profile-edit',{
            lista: datos,
        })
    },
    login: function(req,res){
        return res.render('login',{
            lista: datos,
        })
    },
    register: function(req,res){
        return res.render('register',{
            lista: datos,
        })
    }
}


module.exports = profileController;