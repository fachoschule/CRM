let Product = require('../model/Product');

module.exports = function(app) {
    // Load Home page
    app.get('/emp-manage',function(req,res){
        res.render('emp-manage',{user: "Great User",title:"homepage"});
    });

}