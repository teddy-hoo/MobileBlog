var helpers = require('./helpers');

module.exports = function (app, API) {

    app.get(API.editBlog, function(req, res) {
        res.render('edit');
    });

    app.get(API.home, function(req, res) {
        res.render(helpers.authenticated(req.cookies) ? 'home' : 'login');
    });

    app.get(API.write, function(req, res){
        res.render(helpers.authenticated(req.cookies) ? 'write' : 'login');
    });
};
