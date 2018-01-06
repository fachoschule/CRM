var http=require('http');
const express = require('express');
const socketio = require('socket.io');
var session = require('express-session');
var request = require('request');
var fs = require('fs');
var multer = require('multer');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var http = require('http').Server(app);

app.use(express.static('views'));
app.set('view engine', 'ejs');

app.use(session({
    secret: "secret",
    //  name: cookie_name,
    //store: sessionStore, // connect-mongo session store
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
var path = __dirname + '/views/';
var routes = require('./server/NewFeed-Server')(app);
var productroutes = require('./server/Product-Server')(app);
var externalProductCoderoutes = require('./server/External-Product-Server')(app);
var purchaseOrderroutes = require('./server/Purchase-Order-Server')(app);
var userroutes = require('./server/User-Server')(app);
var supplier = require('./server/Supplier-Server')(app);
var employee = require('./server/Employee')(app);
var department = require('./server/Department')(app);
var tasks =require('./server/tasks')(app);
var customerorder = require('./server/Cutomer-Order')(app);

const customerRoutes = require('./routes/customers')(app);
const smsService = require('./server/sms-server')(app);
const FCMnotification = require('./server/FCM-Notifications')(app);


//config database
const configDB = require('./server/config');

// start server
const port = process.env.PORT || 8080;
const server = http.listen(port);

// Connect to socket.io
var io = socketio(server);
io.on('connection', (socket) => {
    console.log('Connected');
    io.on('disconnect', () => {
        console.log('Disconnected');
    })
});



app.set('io', io);