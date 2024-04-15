const datos = require('../db/index');

const prodaddController = {
    index: function(req,res){
        return res.render('product-add',{
            lista: datos,
        })
    }
}

module.exports = prodaddController;