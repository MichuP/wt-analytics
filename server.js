// use express and socket.io
// listen for tracking events
var dp = require('./custom_modules/dataProcessing');
var express = require('express');
var http = require('http');

// server settings
var app = express();

var server = http.createServer(app).listen(3000, function(){
  console.log('Express server listening on port 3000');
});

// starting data gathering for server with app
dp.listenToVisitorActivities(server);
// set processing of tracking object to fire every X secs
dp.clearTrackingObject(20);
// set visit duration for 30 mins
dp.setVisitDuration(1);

//serve static content
app.use(express.static(__dirname + '/public'));