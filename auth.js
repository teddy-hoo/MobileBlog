var helpers = require('./helpers');

module.exports = function(app, API, usersdb) {

  app.post(API.auth, function(req, res) {
    usersdb.find({email: req.body.email},
                 'email',
                 function(err, docs){
                   if(!err){
                     if(docs === []){
                        usersdb.insert(
                         {
                           email: req.body.email,
                           penName: req.body.penName,
                           password: req.body.password
                         },
                         function(err, docs){
                           helpers.response(res, err ? 500 : 202);
                         });
                     }
                     else {
                       helpers.response(res, 409);
                     }
                   }
                   else {
                     helpers.response(res, 500);
                   }
                 });
  });
};
