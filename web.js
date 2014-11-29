module.exports = function(app, API){

  app.get(API.editBlog, function(req, res){
    res.render('edit');
  });

  app.get(API.home, function(req, res){
    res.render('home');
  });
};
