var socket = require('socket.io');
var fs = require('fs');

var //global settings
	visitDuration,
	// storage variables
	visitorsActiveOnWebsite = new Array();
	trackingObject = {};

//utils
var storeVisitLog = function(directory, fileName, fileContents) {
	fs.writeFile(directory + fileName, fileContents, function (err,data) {
  		if (err) {
  	 		return console.log(err);
  		}
  	});
};

// function to calculate timestamp differences 
var calculateTimestampDifference = function(date1, date2, maxAllowedMinutesDifference){
	var oneMinute = 60*1000;
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

var addActiveVisitor = function(visitorID) {
	if (!visitorsActiveOnWebsite.indexOf(visitorID) > -1) {
		visitorsActiveOnWebsite.push(visitorID);
	}
};

// function to remove inactive visitors
var removeInactiveVisitors = function() {
	var lastUserActivityIndex,
		lastUserActivityData,
		timeNow,
		index,
		directory,
		fileName;
	
	for (var property in trackingObject) {
		timeNow = new Date();
		lastUserActivityIndex = property['journey'].length - 1;
		lastUserActivityData = property['journey'][lastUserActivityIndex];
		if (calculateTimestampDifference(lastUserActivityData.time, timeNow, visitDuration)) {
			index = visitorsActiveOnWebsite.indexOf(lastUserActivityData.vid);
			visitorsActiveOnWebsite.splice(index, 1);
			//before removing visitor data from trackingObject, save visitor activity in a file
			directory = '/trackingData/' + lastUserActivityData.vid;
			if (!fs.existsSync(directory)) {
    			fs.mkdir(directory, function(err) {
    				console.log(err);
    			});	
			}
			fileName = '/' + lastUserActivityData.vid + ' ' + lastUserActivityData.time.getTime() + '.txt';
			storeVisitLog(directory, fileName, JSON.stringify(lastUserActivityData));
			delete trackingObject[property];
		}
	};
};

var clearTrackingObject =  function(timeIntervalForProcessing) {
	setInterval(removeInactiveVisitors, timeIntervalForProcessing * 1000);
};
//data processing methods
var recordUserActivities = function(server) {
	/* acountName - ingore requests that are coming from hostnames other then specified in accountName
	 * */
	// on client connect, check active Vis array, if not there add to array and append data to the tracking object. Object format similar to:
	// { visitorID = val,
	//   visJourney = Array of PageData objects (in future other tracking)
	//   currentPage = val,
	//   ?? visitDuration }
	var io = socket.listen(server);
	io.sockets.on('connection', function(client) {
		client.on('sendPageData', function(pageData) {
			addActiveVisitor(pageData.vid);
			if (trackingObject.hasOwnProperty(pageData.vid)) {
				trackingObject[pageData.vid]['currentPage'] = pageData.url;
				trackingObject[pageData.vid]['journey'].push(pageData);
			}
			else {
				trackingObject[pageData.vid] = {
					journey: [pageData],
					currentPage : pageData.url
				};
			}
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
function setVisitDuration(timeInMinutes) {
	visitDuration = timeInMinutes * 60 * 1000;
}

exports.getNumOfActiveVisitors = getNumOfActiveVisitors;
exports.getTrackingObject = getTrackingObject;
exports.listenToVisitorActivities = recordUserActivities;
exports.clearTrackingObject = clearTrackingObject;
//settings
exports.setVisitDuration = setVisitDuration;
