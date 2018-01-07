const request=require('request');
var admin = require("firebase-admin");
var serviceAccount = require("../service-account.json");
let sess;

module.exports = function(app) {
    app.get('/firebase', function (req ,res) {
        sess = req.session;
        if (sess.name) {
        res.render('firebase-clientview', {session:sess});
        //console.log(tokenToServer);
        }
        else
        {
            res.render('login', {title: 'Login Page'});
        }
    })
    app.post('/send-token-to-server',function (req, res) {
        var currentToken = req.param('currentToken');
        console.log(currentToken);
        sess = req.session;
        res.render('firebase-clientview',{session:sess});

    })


    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://ecrm-fh-kiel.firebaseio.com"
    });
// This registration token comes from the client FCM SDKs.
    var registrationToken = "duK5r1yuYSY:APA91bFIOhQ73YZ3rihJ8Qw764eRi15sftbNn5zccQYPQ_yA4Nbx9ZqhVyp8mfHLuntLa-bWcvmsvrTjosr_gNBNS-9sDXzVarbOAQ1FNk0Nc34GH7XnsOHyQ6hmsECooSSoh3Iboiz0";

// Defining the message payload
    var payload = {
        notification: {
            title: "Urgent action needed!",
            body: "Urgent action is needed to prevent your account from being disabled! ESAM is happy",
            icon: "images/logo.png"
        }
    };
// Send a message to the device corresponding to the provided registration token.

        admin.messaging().sendToDevice(registrationToken, payload)
            .then(function (response) {
                // can add contents of response.
                console.log("Successfully sent message:", response);
            })
            .catch(function (error) {
                console.log("Error sending message:", error);
            });
};