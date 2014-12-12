var helpers = require('./helpers');

module.exports = function (app, API) {

    var navControl = {
        doPublish: false
    };

    app.get('/', function (req, res) {
        res.render(helpers.authenticated(req.cookies) ? "home" : "login", navControl);
    });

    app.get(API.editBlog, function(req, res) {
        res.render('edit', navControl);
    });

    app.get(API.home, function(req, res) {
        res.render(helpers.authenticated(req.cookies) ? 'home' : 'login', navControl);
    });

    app.get(API.write, function(req, res){
        var page;
        if(helpers.authenticated(req.cookies)){
            page = "write";
            navControl.doPublish = true;
        }
        else{
            page = "login";
        }
        res.render(helpers.authenticated(req.cookies) ? 'write' : 'login', navControl);
        navControl.doPublish = false;
    });
};
