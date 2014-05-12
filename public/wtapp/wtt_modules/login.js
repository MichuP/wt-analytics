var mongoose = require('mongoose');


var checkLogin = function(database) {
	mongoose.connect(database);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback() {
		console.log('connected');
	});
};

exports.checkLogin = checkLogin;

