var express = require('express');
var app = express.createServer();
var socket = require('socket.io');
var io = socket.listen(app);


var timestamp,
	// storage variables
	visitorsActiveOnWebsite = new Array();
	trackingObject = {};

var addActiveVisitor = function(visitorID) {
	visitorsActiveOnWebsite.push(visitorID);
};

var removeInactiveVisitor = function(visitorID) {
	var index = visitorsActiveOnWebsite.indexOf(visitorID);
	visitorsActiveOnWebsite.splice(index, 1);
};

var getNumOfActiveVisitors = function() {
	return visitorsActiveOnWebsite.length;
};

var getActiveVisitors = function() {
	return visitorsActiveOnWebsite;
};

//util
// function to calculate timestamp differences 

var recordVisit = function(eventToListen, visitDuration, accountName) {
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
	
};


exports.getNumOfActiveVisitorsForWebsite = getNumOfActiveVisitorsForWebsite;
