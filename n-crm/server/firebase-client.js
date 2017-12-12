var firebase = require("firebase");

// Initialize Firebase
var config = {
    apiKey: "AIzaSyD4BLZ6CRso3hFh_0bN7HpekHarbO1UewQ",
    authDomain: "ecrm-fh-kiel.firebaseapp.com",
    databaseURL: "https://ecrm-fh-kiel.firebaseio.com",
    projectId: "ecrm-fh-kiel",
    storageBucket: "",
    messagingSenderId: "180973527418"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging.requestPermission()
    .then(function() {
        console.log('Notification permission granted.');
        // TODO(developer): Retrieve an Instance ID token for use with FCM.
        // ...
    })
    .catch(function(err) {
        console.log('Unable to get permission to notify.', err);
    });