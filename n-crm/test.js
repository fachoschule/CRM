var http=require('http');
var express = require('express');
var app = express();
var http = require('http').Server(app);

app.use(express.static('views'));
app.set('view engine', 'ejs');
var path = __dirname + '/views/';
var routes = require('./server/routes')(app);  // added router file


var port = process.env.PORT || 3000;
http.listen(port);
