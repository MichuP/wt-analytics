var mongoose = require('mongoose');
var registrationResult = {};
var User = {};

var openDatabase = function(database) {
    mongoose.connect(database);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback() {
        console.log('connected to mongo');
    });
    if (!UserSchema) {
        var UserSchema = new mongoose.Schema({
            username : String,
            login : String,
            password: String,
            registryDate: Date,
            lastLogin: Date
        });
    }
    User = mongoose.model('User', UserSchema);
};

var checkLogin = function(database, credentials) {
   
};

var checkRegistrationData = function(database, credentials, callback) {
    	User.findOne({ 'username': credentials.name}, 'username login password registryDate lastLogin', function (err, user) {
          	if (err) {
          		registrationResult.type = 'failure';
          		registrationResult.message = 'error: ' + err;
          		callback(registrationResult);
          	}
          	if (user == undefined || user == null) {
          		var newUser = new User({username: credentials.name, login: credentials.login, password: credentials.password, registryDate: new Date(), lastLogin: new Date() });
          		newUser.save(function (err, newUser) {
  					if (err) { 
  						registrationResult.type = 'failure';
          				registrationResult.message = 'error: ' + err;
          				callback(registrationResult);
  					} 
				});
          		registrationResult.type = 'success';
          		registrationResult.message = 'User ' + credentials.name + ' registered.';
          		callback(registrationResult);
          	}
          	else {
          		console.log(user.username + ' ' + user.password + ' ' + user.registryDate + ' ' + user.lastLogin );
          		registrationResult.type = 'username taken';
          		registrationResult.message = 'Username ' + credentials.name + ' is already taken.';
          		callback(registrationResult);
        	  }
    	}); 
};

exports.openDatabase = openDatabase;
exports.checkLogin = checkLogin;
exports.checkRegistrationData = checkRegistrationData;
exports.registrationResult = registrationResult;	