var http=require('http');
var express = require('express');
var app = express();
var http = require('http').Server(app);

app.use(express.static('views'));
app.set('view engine', 'ejs');
var path = '/views';
var routes = require('./app/routes')(app);  // added router file


var port = process.env.PORT || 8080;
http.listen(port);
