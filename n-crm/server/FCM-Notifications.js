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


    //get access token
    /*function getAccessToken() {
        return new Promise(function(resolve, reject) {
            var key = require('./service-account.json');
            var jwtClient = new google.auth.JWT(
                key.client_email,
                null,
                key.private_key,
                SCOPES,
                null
            );
            jwtClient.authorize(function(err, tokens) {
                if (er
                r) {
                    reject(err);
                    return;
                }
                resolve(tokens.access_token);
            });
        });
    }
//http request
    var json = {
        "message":{
            "token" : "e7nfxKa0fck:APA91bEawrneFWSn7G6y75tjNz2LuasdyyDOs7mcctfc_qH75n-rQvw9m6NHO4kgVL_blIB1Wpqkj7Xib_zDyvvjw2YlqdmomKlP2nJhkXCnZ00Hc_iirhFt0LNZko8TeQjg-wIBiS4K",
            "notification" : {
                "body" : "This is an FCM notification message! ESAM",
                "title" : "FCM Message",
            }
        }
    };

    var options = {
        url: 'https://fcm.googleapis.com/v1/projects/ecrm-fh-kiel/messages:send HTTP/1.1',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization:': 'Bearer AAAAKiLc4Xo:APA91bHKImUbo3yOw-HaRwbZCK_1VC03uJsLppHi4K2GIADRI5sC74hjxb826ggjPGwGEFJHeQhwV3Mh2KyRGwlLV66AJHSda2OjRXbncWS-OoBJuestsfIK7Nd-Oz4GcHfeczofy7jh'
        },
        json: json
    };

    request(options, function(err, res, body) {
        if (res && (res.statusCode === 200 || res.statusCode === 201)) {
            console.log(body);
        }
    });
*/
};