var express = require('express');
var _ = require('underscore');
var app = express();
var server = require('http').createServer(app);
var parseCookie = require('./lib/cookie_parser');
var config = require('./lib/config');
var API = require('./public/js/api');
var helpers = require('./helpers');

app.set('view engine', 'ejs');
app.set('view options', { layout: false });
app.use('/public', express.static('public'));

app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(express.cookieParser());

app.use(app.router);

var db = require('monk')('localhost/mobileBlog');
var blogsdb = db.get('blogs');
var usersdb = db.get('users');

var web = require('./web')(app, API);
var blog = require('./blog')(app, API, blogsdb);
var auth = require('./auth')(app, API, usersdb);

app.get('/', function (req, res) {
  if(helpers.authenticated(req.cookies)){
    res.render('home');
  }
  res.render('login');
});

server.listen(3000);
