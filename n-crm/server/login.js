let Product = require('../model/Product');

module.exports = function(app) {
    // Load Home page
    app.get('/login',function(req,res){
        res.render('login',{user: "Great User",title:"homepage"});
    });

}