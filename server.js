var express = require('express');
var _ = require('underscore');
var app = express();
var server = require('http').createServer(app);
var parseCookie = require('./lib/cookie_parser');
var config = require('./lib/config');
var API = require('./public/api');
var helpers = require('./helpers');

app.set('view engine', 'ejs');
app.set('view options', { layout: false });
app.use('/public', express.static('public'));

app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret: helpers.guid()}));

app.use(app.router);

var db = require('monk')('localhost/mobileBlog');
var blogsdb = db.get('blogs');

var web = require('./web')(app, API);
var blog = require('./blog')(app, API, blogsdb);

app.get('/', function (req, res) {
  res.render('index');
});

server.listen(3000);
