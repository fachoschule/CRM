const request=require('request');
var admin = require("firebase-admin");
var serviceAccount = require("../service-account.json");
let sess;

module.exports = function(app) {
    app.get('/firebase', function (req ,res) {
        sess = req.session;
        res.render('firebase-clientview', {session:sess});
        //console.log(tokenToServer);
    });
    app.post('/send-token-to-server',function (req, res) {
        var currentToken = req.param('currentToken');
        console.log(currentToken);
        sess = req.session;
        res.render('firebase-clientview',{session:sess});

    });
    
};