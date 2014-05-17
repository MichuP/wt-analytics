var mongoose = require('mongoose');

var openDatabase = function(database) {
	mongoose.connect(database);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback() {
		console.log('connected');
	});
	if (!UserSchema) {
		var UserSchema = new Schema({
			username : String,
			login : String,
			password: String,
			registryDate: Date,
			lastLogin: Date
		});
	}
	if (!User) {
		var User = mongoose.model('User', UserSchemaSchema);
	}
};

var checkLogin = function(database, credentials) {
	
};

var checkRegistrationData = function(database, credentials) {
	
};

exports.openDatabase = openDatabase;
exports.checkLogin = checkLogin;

