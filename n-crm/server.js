const express = require('express');
const app = express();
var http=require('http');
var http = require('http').Server(app);
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//bring in customers models
let Customers = require('./model/Customer');

//view engine setup
app.use(express.static('views'));
app.set('view engine', 'ejs');

//set routes
var supplier = require('./server/supplier')(app);
const customerRoutes = require('./routes/customers')(app);
var path = __dirname + '/views/';
var routes = require('./server/routes')(app);
//var productroutes = require('./server/Product-Server')(app);

var configDB = require('./server/config');
//server start
var port = process.env.PORT || 8080;
http.listen(port);
console.log('server started on: 8080');
