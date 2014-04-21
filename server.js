var dp = require('./custom_modules/dataProcessing');
var express = require('express');
var http = require('http');

var app = express();
var server = http.createServer(app).listen(3000, function(){
  console.log('Express server listening on port 3000');
});
// starting data gathering for server with app
dp.listenToVisitorActivities(server);
// set processing of tracking object to fire every X secs
dp.clearTrackingObject(60);
// set visit duration for 30 mins
dp.setVisitDuration(30);

//app settings
app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.static(__dirname + '/public'));
});