let Product = require('../model/Product');

module.exports = function(app) {
    // Load Home page
    app.get('/user',function(req,res){
        res.render('user',{user: "Great User",title:"homepage"});
    });

}