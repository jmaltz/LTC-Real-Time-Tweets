var cronJob = require('cron').CronJob,
request = require('request');
config = require('./config').config;

var searchingHashtags = {};
var hashtagSubscribers = {};


var messager = {};
messager.subscribers = new Array();
messager.messages = new Array();
messager.messages.push({'id':-1});

hashtagSubscribers.photography = messager;

function addHashtagToSearch(hashtag){
  if(searchingHashtags[hashtag] == undefined || searchingHashtags[hashtag] == null){
	var options = {
	    "cronTime": "0/30 * * * * *",
	    "onTick": function() { 
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
	hashtagMessaging = {};
	hashtagMessaging.subscribers = new Array();
	hashtagMessaging.messages = new Array();
	hashtagSubscribers[hashtag] = hashtagMessaging;
    }
    
    var subscriberList = hashtagSubscribers[hashtag];
    subscriberList.subscribers.push(socket);
    updateHashtag(hashtag);
    escapeAndEmitTweets(socket, subscriberList.messages, 'seed-messages'); 
}

/*Removes the socket so that it is only sitting on one hashtag*/
function removeSocket(socket){

    for(var key in hashtagSubscribers){ //get all the keys in our hashtag subscribers
	var subscribers = hashtagSubscribers[key];
	for(var i = 0; i<subscribers.length; i++){ //iterate over all of the subscribers and remove all sockets that match the parameter
	    if(subscribers[i] == socket){
		subscribers.splice(i,1);
		i--; //subtract one to make up for the shorter length
	    }
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
	escapeAndEmitTweets(hashtagMessager.subscribers[i], resultsToAdd, 'new-tweets'); 	
    }
    var newMessages = spliceArrayToLength(storedMessages, resultsToAdd);
    hashtagMessager.messages = newMessages;
 
}

function escapeAndEmitTweets(socket, tweetsToEmit, socketEvent){
    var stringifiedResults = JSON.stringify(tweetsToEmit);
    var cleanStringified = filterUnicode(stringifiedResults);
   
    socket.emit(socketEvent, {'new-tweets': cleanStringified});
}

function spliceArrayToLength(arrayToSplice, arrayToAdd){
    if (arrayToSplice.length == config.tweetsToCache){
	arrayToSplice.splice(config.tweetsToCache  - arrayToAdd.length, arrayToAdd.length);
    }else if(arrayToSplice.length + arrayToAdd.length > config.tweetsToCache){
	var combinedLen = arrayToSplice.length + arrayToAdd.length;
	var locationToStart = config.tweetsToCache - combinedLen;
	arrayToSplice.splice(locationToStart, locationToStart * -1);
    }
    for(var i = 0; i<arrayToSplice.length; i++){
	arrayToAdd.push(arrayToSplice[i]);
    }
    return arrayToAdd;

}

function getTweetsForHashtag(hashtag){
    return hashtagSubscribers[hashtag].messages;
}



function filterUnicode(quoted){
    var escapable = /[\x00-\x1f\ud800-\udfff\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufff0-\uffff]/g;

    escapable.lastIndex = 0;
    if( !escapable.test(quoted)) return quoted;

    return quoted.replace( escapable, function(a){
	return '';
    });
}

function updateHashtag(hashtag){
    request("http://search.twitter.com/search.json?q=" + encodeURIComponent('#' + hashtag) + "&" + "rpp="+config.tweetsToCache, function(error, response, body){
		    if(error || response.statusCode != 200){
			console.log("error while searching for " + hashtag);
		    }
		    else{
			onRequestComplete(body, hashtag);
		    }
		});
}

exports.spliceArrayToLength = spliceArrayToLength;
exports.requestComplete = onRequestComplete;
exports.addHashtag = addHashtagToSearch;
exports.subscribe = subscribeToHashtag;