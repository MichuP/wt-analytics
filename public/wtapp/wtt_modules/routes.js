var db = require('./db');

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

	app.post('/wtapp/thankyou', function(req, res) {
    	var name = req.body.username,
        login = req.body.login,
        password = req.body.password;
        
		function redirectOnRegistrationResultReady(regResult) {
			if (regResult.type == 'username taken') {
        		
  				//res.send({ msg: JSON.stringify({message:'Username is already taken! Try another one.'}) });
        		res.contentType('json');
  				//console.log("sending message " + res.json);
  				res.json(JSON.stringify({message:'Username is already taken! Try another one.'}));
  				res.redirect('/wtapp/signup.html');
        		
        	}
        	else if (regResult.type == 'error') {
        		res.redirect('/wtapp/error.html');
        	}
        	else {
        		res.render('thankyou', {login: login});
        	}	
		};
		
		db.checkRegistrationData("mongodb://localhost/wtapp", {name: name, login: login, password: password}, redirectOnRegistrationResultReady);
	});
	
	app.post('/wtapp/visitor', function(req, res) {
    	var login = req.body.login,
        password = req.body.password;
        
	});
};