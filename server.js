// use express and socket.io
// listen for tracking events
var dp = require('./custom_modules/dataProcessing');
var express = require('express');

// server settings
var app = express();
app.listen(3000);
// starting data gathering for server with app
dp.listenToVisitorActivities(app);
// set processing of tracking object to fire every 60 secs
dp.clearTrackingObject(60);
// set visit duration for 30 mins
dp.setVisitDuration(30);

//serve static content
app.use(express.static(__dirname + '/public'));