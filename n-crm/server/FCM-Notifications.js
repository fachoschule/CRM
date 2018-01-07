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


    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://ecrm-fh-kiel.firebaseio.com"
    });
// This registration token comes from the client FCM SDKs.
    var registrationToken = "csDfzjm0re8:APA91bFZ_bXG41mdLVIfLeImwQboQ3oFyXTKFshwBaGueCNXuBOO4SXHhe-kjq4K1oqPXLX3yGAHRnkinsKIJZqTr8M8pgJEMDKjygIxPJZAFP5GqjzF13o2-zVS6jw2UNXZTuENbI0b";

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