const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');

// Init App
const app = express();

var http=require('http');
var http = require('http').Server(app);

//bring in customers models
let Customers = require('./model/customer');

//app.use(express.static('views'));
app.use(express.static(path.join(__dirname, 'views')));

/*app.set('view engine', 'ejs');
var path = __dirname + '/views/';*/

var routes = require('./server/routes')(app);
var productroutes = require('./server/Product-Server')(app);

var configDB = require('./server/config');

// view engine setup
app.set('views', path.join(__dirname, 'views/customers'));
app.set('view engine', 'ejs');

// express-session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

// express-messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// express validator middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        let namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));



// Customers Route
app.get('/customers', function (req, res){
    Customers.find({}, function (err, customers){
        if(err){
            console.log(err);
        }else{
            res.render('index',{
                title: 'Customers',
                customers: customers
            });
        }
    });
});

// route files
let customers =require('./routes/customers');
app.use('/customers',customers);

// Server Start
const port = process.env.PORT || 8080;
http.listen(port);
console.log('server started on: 8080');