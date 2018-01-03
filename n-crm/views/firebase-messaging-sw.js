importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

var config = {
    apiKey: "AIzaSyD4BLZ6CRso3hFh_0bN7HpekHarbO1UewQ",
    authDomain: "ecrm-fh-kiel.firebaseapp.com",
    databaseURL: "https://ecrm-fh-kiel.firebaseio.com",
    projectId: "ecrm-fh-kiel",
    storageBucket: "ecrm-fh-kiel.appspot.com",
    messagingSenderId: "180973527418"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});