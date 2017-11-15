var http=require('http');
var express = require('express');
var app = express();
var http = require('http').Server(app);

var bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(express.static('views'));
app.set('view engine', 'ejs');
var path = __dirname + '/views/';
var routes = require('./server/routes')(app);
var user = require('./server/userServer')(app);
var login = require('./server/login')(app);
var register = require('./server/emp-register')(app);
var manage = require('./server/emp-manage')(app);

//app.use(bodyparser);
//var productroutes = require('./server/add_product')(app);
var configDB = require('./server/config');

var port = process.env.PORT || 8080;
http.listen(port);
