var express = require('express');
var _ = require('underscore');
var app = express();
var server = require('http').createServer(app);
var parseCookie = require('./lib/cookie_parser');
var config = require('./lib/config');
var API = require('./public/api');

var web = require('./web')(app, API);

var db = require('monk')('localhost/mobileBlog');
var blogsdb = db.get('blogs');

blogsdb.insert({ name: 'Tobi', bigdata: {} }, function(){});
blogsdb.find({ name: 'Loki' }, '-bigdata', function () {
  // exclude bigdata field
});
blogsdb.remove({ name: 'Loki' });

//db.close();

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

app.post(API.updateBlog, function(req, res) {
  blogsdb.find({name: req.body.key},
               'value',
               function(err, docs){
                 if(!err){
                   if(docs === []){
                     blogsdb.update(
                       {
                         name: req.body.key,
                         value: req.body.value
                       });
                     response(res, 201);
                   }
                   else {
                     blogsdb.insert(
                       {
                         name: req.body.key,
                         value: req.body.value
                       },
                       function(err, docs){
                         response(res, err ? 500 : 202);
                       });
                   }
                 }
                 else {
                   response(res, 500);
                 }
               });
});

var response = function(res, code){
  if(code === 500){
    res.status(500).send("Internal error!");
  }
  else if(code === 201){
    res.status(201).send("Created!");
  }
  else if(code === 202){
    res.status(202).send("Updated!");
  }
};

server.listen(process.env.PORT || config.port);
