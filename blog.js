var helpers = require('./helpers');

module.exports = function(app, API, blogsdb) {

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
                       helpers.response(res, 201);
                     }
                     else {
                       blogsdb.insert(
                         {
                           name: req.body.key,
                           value: req.body.value
                         },
                         function(err, docs){
                           helpers.response(res, err ? 500 : 202);
                         });
                     }
                   }
                   else {
                     helpers.response(res, 500);
                   }
                 });
  });
};
