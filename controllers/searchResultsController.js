const datos = require('../db/index');

const searchResultsController = {
    index: function(req,res){
        return res.render('search-results',{
            lista: datos
        })
    }
}

module.exports = searchResultsController;