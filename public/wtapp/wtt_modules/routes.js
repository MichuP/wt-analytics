var wtLogin = require('./login');

var loginStatus = function (req, res) {
	if (!req.session.user) {
		res.redirect('/wtapp/login');
	}
};

module.exports = function(app, dataObject) {

    
    app.get('/wtapp/index', function(req, res) {
        // handle multiple paths like index, index.html and /
        loginStatus(req, res);
        res.render('index', {login: req.session.login,
        					 numOfVisitors: dataObject.getNumOfActiveVisitors(),
        					 totalNumberOfPages: dataObject.getTotalNumberOfPagesViewed() });
    });

    app.get('/wtapp/visitor', function(req, res) {
        loginStatus(req, res);
        res.render('visitor', {login: req.session.login,
        					   test: 'my test string second'});
    });
    
    app.get('/wtapp/page', function(req, res) {
        loginStatus(req, res);
        res.render('page', {login: req.session.login,
        					   test: 'my test string second'});
    });
    
    app.get('/wtapp/login', function(req, res) {
        if (!req.session.user) {
        	res.render('login' ,{authenticated: false});
        }
        else {
        	res.render('login', {login: req.session.login,
        						 authenticated: true});
        }
    });

	app.post('/test-page', function(req, res) {
    	var name = req.body.name,
        color = req.body.color;
	});
};