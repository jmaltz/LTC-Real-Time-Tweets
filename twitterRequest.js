var cronJob = require('cron').CronJob;
var request = require('request');
var config = require('./config').config;
var util = require('./util');

var searchingHashtags = {};
var hashtagSubscribers = {};
var approvedCache = {};


function addHashtagToSearch(hashtag){
		if(searchingHashtags[hashtag] == undefined || searchingHashtags[hashtag] == null){
				var options = {
						"cronTime": "0/30 * * * * *",
						"onTick": function() { 
								console.log("running le cron");
								updateHashtag(hashtag);
						},
						"start": true
				};
	    
				searchingHashtags[hashtag] = new cronJob(options);
				return true;
    }
    return false;
}

function subscribeToHashtag(hashtag, socket){
    var added = addHashtagToSearch(hashtag);
    removeSocket(socket);
    
    if(added){
				approvedCache[hashtag] = new Array();
				hashtagMessaging = {};
				hashtagMessaging.subscribers = new Array();
				hashtagMessaging.messages = new Array();
				hashtagSubscribers[hashtag] = hashtagMessaging;
    }
    
    var subscriberList = hashtagSubscribers[hashtag];
    subscriberList.subscribers.push(socket);
    if(added){
	updateHashtag(hashtag);
    }
    else{
	socket.emit('seed-approvals', {'approvals': approvedCache[hashtag]});
    }
    util.escapeAndEmitTweets(socket, subscriberList.messages, 'seed-messages'); 
}

/*Removes the socket so that it is only sitting on one hashtag*/
function removeSocket(socket){
    for(var key in hashtagSubscribers){ //get all the keys in our hashtag subscribers
				var subscribers = hashtagSubscribers[key].subscribers;
				for(var i = 0; i<subscribers.length; i++){ //iterate over all of the subscribers and remove all sockets that match the parameter
						if(subscribers[i] == socket){
								subscribers.splice(i,1);
								i--; //subtract one to make up for the shorter length
						}
				}
				if(subscribers.length == 0){
						delete hashtagSubscribers[key];
						searchingHashtags[key].stop();
						delete searchingHashtags[key];
				}
    }

}

function onRequestComplete(body, hashtag){
    var tweets = JSON.parse(body).results;
    var hashtagMessager = hashtagSubscribers[hashtag];
    var storedMessages = hashtagMessager.messages;
    
    var i = 0;
    var resultsToAdd = new Array();
    for(; i<tweets.length; i++){
				if(storedMessages[0] != undefined && storedMessages[0].id == tweets[i].id){
						break;
				}
	
				var tweetToAdd = {
						'id':tweets[i].id,
						'text':tweets[i].text,
						'image':tweets[i].profile_image_url,
						'from':tweets[i].from_user
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
function getTweetsForHashtag(hashtag){
    return hashtagSubscribers[hashtag].messages;
}

/*Sends a request to twitter and gets the latest tweets for a given hashtag*/
function updateHashtag(hashtag){
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

function addApprovedTweet(hashtag, tweetInformation){
    if(approvedCache[hashtag] == undefined){
				return false;
    }
    var listOfApprovedTweets = approvedCache[hashtag];
    listOfApprovedTweets.push(tweetInformation);
    console.log(listOfApprovedTweets);
    return true;
}

exports.addApprovedTweet = addApprovedTweet;
exports.removeSocket = removeSocket;
exports.requestComplete = onRequestComplete;
exports.addHashtag = addHashtagToSearch;
exports.subscribe = subscribeToHashtag;