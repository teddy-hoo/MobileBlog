var express = require('express');
var _ = require('underscore');
var app = express();
var server = require('http').createServer(app);
var parseCookie = require('./lib/cookie_parser');
var config = require('./lib/config');
var redis = require("redis");
var secret = require('./lib/secret');
var mongodb = require('mongodb');

var mongodbServer = new mongodb.Server('localhost', 27017, { auto_reconnect: true, poolSize: 10 });
var db = new mongodb.Db('blogs', mongodbServer);

app.set('view engine', 'ejs');
app.set('view options', { layout: false });
app.use('/public', express.static('public'));

app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret: guid()}));

app.use(app.router);

//helper method for writing out json payloads
var json = function(res, data) {
  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });

  if(typeof data === "string") res.write(data);

  else res.write(JSON.stringify(data));

  res.end();
};

function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
  });
}

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/blogs', function(req, res) {
});

app.post('/blogs/create', function(req, res) {
});

server.listen(process.env.PORT || config.port);
