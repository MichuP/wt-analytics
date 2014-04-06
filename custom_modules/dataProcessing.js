var express = require('express');
var app = express.createServer();
var socket = require('socket.io');
var io = socket.listen(app);


var //global settings
	visitDuration,
	// storage variables
	visitorsActiveOnWebsite = new Array();
	trackingObject = {};

//utils
var addActiveVisitor = function(visitorID) {
	visitorsActiveOnWebsite.push(visitorID);
};

var removeInactiveVisitor = function(visitorID) {
	var index = visitorsActiveOnWebsite.indexOf(visitorID);
	visitorsActiveOnWebsite.splice(index, 1);
};

// function to calculate timestamp differences 
function calculateTimestampDifference(date1, date2, maxAllowedMinutesDifference){
	var oneMinute = 1000 * 60;
	var date1Miliseconds = date1.getTime();
	var date2Miliseconds = date2.getTime();
	var milisecondsDifference = date2Miliseconds - date1Miliseconds;
	var minutesDifference = Math.round(milisecondsDifference / oneMinute);
	if (minutesDifference > maxAllowedMinutesDifference) {
		return true;
	}
	else {
		return false;
	}
};

//data processing methods
var recordUserActivities = function(accountName) {
	/* eventToListen - clientSide emits pageData (and in future others) events. This in theory could be changed to any other event name. This method listens to a parameter
	 * passed here. In future this might be an options object, which will pass an array of multiple events - trackLinks, customEvents, etc.
	 * 
	 * visitDuration - allows to set the time period in mins, after which, in case of user inactivity, the visit will be ended
	 * 
	 * acountName - ingore requests that are coming from hostnames other then specified in accountName
	 * */
	
	// on client connect, check active Vis array, if not there add to array and append data to the tracking object. Object format similar to:
	// { visitorID = val,
	//   visJourney = Array of PageData objects (in future other tracking)
	//   currentPage = val,
	//   ?? visitDuration }
	io.sockets.on('connection', function(client) {
		client.on('sendPageData', function(pageData) {
			
		});
		
		
		client.on('sendLinkData', function(linkData) {
			
		});
		/*
		 * client.on('sendLinkData', function(linkData));
		 * 
		 * client.on('sendCustomData', function(customData));
		 */
	});	
};

//getters
var getNumOfActiveVisitors = function() {
	return visitorsActiveOnWebsite.length;
};

var getActiveVisitors = function() {
	return visitorsActiveOnWebsite;
};

var getTrackingObject = function() {
	return trackingObject;
};

//setters
function setServerPortForApp(server) {
	app.listen(server);
}

function setVisitDuration(timeInMinutes) {
	visitDuration = timeInMinutes;
}

exports.getNumOfActiveVisitors = getNumOfActiveVisitors;
exports.getTrackingObject = getTrackingObject;
//settings
exports.appListenOn = setServerPortForApp;
exports.setVisitDuration = setVisitDuration;