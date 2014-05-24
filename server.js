var dp = require('./custom_modules/dataProcessing'),
express = require('express'),
http = require('http'),
db = require('./public/wtapp/wtt_modules/db');


var app = express(),
server = http.createServer(app).listen(3000, function(){
  console.log('Express server listening on port 3000');
});

// starting mongodb - connect to wtapp database
db.openDatabase('mongodb://localhost/wtapp');
// starting data gathering for server with app
dp.listenToVisitorActivities(server);
// set processing of tracking object to fire every 60 secs
dp.clearTrackingObject(60);
// set visit duration for 30 mins
dp.setVisitDuration(30);

//app settings
app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/public/wtapp/views');
	app.set('view engine', 'ejs');
	app.use(express.json());       // to support JSON-encoded bodies
	app.use(express.urlencoded()); // to support URL-encoded bodies
    app.use(express.cookieParser('Authentication'));
    app.use(express.session());
	app.use(express.static(__dirname + '/public'));
});

//module with route definitions
require('./public/wtapp/wtt_modules/routes.js')(app, dp);
