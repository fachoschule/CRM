module.exports = function(app) {
    // Load Home page
    app.get('/',function(req,res){
        res.render('helloword',{user: "Great User",title:"homepage"});
    });
}