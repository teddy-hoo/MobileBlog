var helpers = require('./helpers');

module.exports = function (app, API, usersdb) {

    app.post(API.auth, function (req, res) {

        if (helpers.authenticated(req.cookies)) {
            helpers.response(res, 202);
            return;
        }

        usersdb.find({email: req.body.email},
            'email',
            function (err, docs) {
                if (!err) {
                    if (docs && docs.length === 0) {
                        usersdb.insert(
                            {
                                email: req.body.email,
                                penName: req.body.penName,
                                password: req.body.password
                            },
                            function (err, docs) {
                                if (!err) {
                                    res.cookie('auth', 'mobile');
                                }
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
