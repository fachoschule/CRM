var http=require('http');
var express = require('express');
var session = require('express-session');
var router = express.Router();
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
var routes = require('./server/routes')(app);
var productroutes = require('./server/Product-Server')(app);
var userroutes = require('./server/User-Server')(app);
var contactform = require('./server/contactform')(app);
var todolist = require('./server/todolist')(app);
var fileacomplaint = require('./server/fileacomplaint')(app);
var supplier = require('./server/Supplier-Server')(app);
var employee = require('./server/Employee')(app);
var customerRoutes = require('./routes/customers')(app);
// var promotion = require('./server/Promotion')(app);
// var TARGET = require('./server/TARGET')(app);

var configDB = require('./server/config' );

var port = process.env.PORT || 8080;
http.listen(port);
