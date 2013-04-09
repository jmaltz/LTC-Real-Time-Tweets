var cronJob = require('cron').CronJob
, request = require('request')
, config = require('./config').config
, util = require('./util')
, tweetsModel = require('./tweetsModel').model;

var searchingHashtags = {};
var hashtagSubscribers = {};
var approvedCache = {};
var model = new tweetsModel(config.mysql);

model.connect(function(error){
	if(error){
		console.log('Error, couldn\'t connect to the database, you might have a bad time');
	}
	else{
		console.log('Successfully connected to the db');
	}
});

function addHashtagToSearch(hashtag){
	if(searchingHashtags[hashtag] == undefined || searchingHashtags[hashtag] == null){
		var options = {
			"cronTime": "0/30 * * * * *"
			,"onTick": function() { 
				updateHashtag(hashtag);
			}
			,"start": true
	};

	searchingHashtags[hashtag] = new cronJob(options);
	return true;
    }
    return false;
}

function subscribeToHashtag(hashtag, socket){

	var lowerHashtag = hashtag.toLowerCase();
	var added = addHashtagToSearch(lowerHashtag);
	removeSocket(socket);

	//if the hashtag isn't currently in memory, add it
	if(added){
		approvedCache[lowerHashtag] = new Array();
		hashtagMessaging = {};
		hashtagMessaging.subscribers = new Array();
		hashtagMessaging.messages = new Array();
		hashtagSubscribers[lowerHashtag] = hashtagMessaging;
	}

	var subscriberList = hashtagSubscribers[lowerHashtag];
	subscriberList.subscribers.push(socket);


	if(added){
		model.getApprovedTweets(hashtag, function(error, results){

			if(error){
				console.log('Error retrieving approved tweets from the db for hashtag ' + hashtag);
			}
			else{
				console.log('Successfully pulled seed approvals from the db for hashtag ' + hashtag);
				socket.emit('seed-approvals', {'approvals': results});
			}
		});
		updateHashtag(hashtag);
	}
	else{
		console.log('Already have hashtags stored in memory for hashtag ' + lowerHashtag);
		socket.emit('seed-approvals', {'approvals': approvedCache[lowerHashtag]});
	}
	util.escapeAndEmitTweets(socket, subscriberList.messages, 'seed-messages'); 
}

/*Removes the socket so that it is only sitting on one hashtag*/
function removeSocket(socket){

	console.log('removing socket from the list');
		
	//get all the keys in our hashtag subscribers
	for(var key in hashtagSubscribers){ 
		var subscribers = hashtagSubscribers[key].subscribers;

		//iterate over all of the subscribers and remove all matching sockets
		for(var i = 0; i<subscribers.length; i++){ 
			if(subscribers[i] == socket){
				subscribers.splice(i,1);
				i--; //subtract one to make up for the shorter length
			}
		}

		//clean up if there are no more subscribers on a hashtag	
		if(subscribers.length == 0){
			console.log('No more subscribers on ' + key + ' adding its approved tweets to the db');	
	
			searchingHashtags[key].stop();
			delete hashtagSubscribers[key];
			delete searchingHashtags[key];
		
			model.addApprovedTweets(approvedCache[key], function(error, results){
				if(error){
					console.log('Error adding tweets from ' + key + ' to the database');
				}
				else{
					console.log('Successfully wrote tweets from ' + key + ' to the database');
				}
				delete approvedCache[key];
			});
		}
	}

}

function onRequestComplete(body, upperHashtag){
	var hashtag = upperHashtag.toLowerCase();
		
	var tweets = JSON.parse(body).results;
	var hashtagMessager = hashtagSubscribers[hashtag];
	var storedMessages = hashtagMessager.messages;

	var resultsToAdd = new Array();
	for(var i = 0; i<tweets.length; i++){
		if(storedMessages[0] != undefined && storedMessages[0].id == tweets[i].id){
				break;
		}

		var tweetToAdd = {
				'id':tweets[i].id,
				'text':tweets[i].text,
				'image':tweets[i].profile_image_url,
				'username':tweets[i].from_user
		};
		resultsToAdd.push(tweetToAdd);
    	}

    	for(var i = 0; i < hashtagMessager.subscribers.length; i++){
		util.escapeAndEmitTweets(hashtagMessager.subscribers[i], resultsToAdd, 'new-tweets'); 	
    	}

	var newMessages = util.spliceArrayToLength(storedMessages, resultsToAdd);
    	hashtagMessager.messages = newMessages;
}

/*Returns the currently cached tweets for a given hashtag*/
function getTweetsForHashtag(upperHashtag){
		
	var hashtag = upperHashtag.toLowerCase();
	return hashtagSubscribers[hashtag].messages;
}


/*Sends a request to twitter and gets the latest tweets for a given hashtag*/
function updateHashtag(upperHashtag){
	var hashtag = upperHashtag.toLowerCase();
		
	request("http://search.twitter.com/search.json?q=" + encodeURIComponent('#' + hashtag) + "&" + "rpp="+config.tweetsToCache, function(error, response, body){
		
		if(error || response.statusCode != 200){
			console.log("error while searching for " + hashtag);
			console.log(error + " is the error");
			console.log(body + " is the body");
	}
		else{
			onRequestComplete(body, hashtag);
		}
	});
}

function getHashtag(hashtag, callback){

    var cb = callback || function (){};
    request('http://search.twitter.com/search.json?q=' + encodeURIComponent('#' + hashtag) + '&rpp=50', function(error, response, body){
           
            return cb(error, response, body);
    });
}

/*Adds a tweet to the list of ones approved for that hashtag*/
function addApprovedTweet(upperHashtag, tweetInformation){
	
	var hashtag = upperHashtag.toLowerCase();
	
	if(approvedCache[hashtag] == undefined){
		return false;
	}

	var listOfApprovedTweets = approvedCache[hashtag];
	listOfApprovedTweets.push(tweetInformation);
	return true;
}

/*Gets all the approved tweets currently in memory*/
function getApprovedTweets(){
	
	var approvedTweets = new Array();
	for(var key in approvedCache){
		for(var i = 0; i<approvedCache[key].length; i++){
			approvedTweets.push(approvedCache[key][i]);
		}
	}

	return approvedTweets;
}

function getSocketsForHashtag(upperHashtag){
		var hashtag = upperHashtag.toLowerCase();
		
		var subscribers = hashtagSubscribers[hashtag];
		return subscribers != undefined ? subscribers : [];
		
}

exports.getSocketsForHashtag = getSocketsForHashtag;
exports.getApprovedTweets = getApprovedTweets;
exports.addApprovedTweet = addApprovedTweet;
exports.removeSocket = removeSocket;
exports.requestComplete = onRequestComplete;
exports.addHashtag = addHashtagToSearch;
exports.subscribe = subscribeToHashtag;
exports.getHashtag = getHashtag;
