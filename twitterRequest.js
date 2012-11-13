var cronJob = require('cron').CronJob,
request = require('request');

var searchingHashtags = {};
var hashtagSubscribers = {};


function addHashtagToSearch(hashtag){
  if(searchingHashtags[hashtag] == undefined || searchingHashtags[hashtag] == null){

	var options = {
	    "cronTime": "* * * * * *",
	    "onTick": function() { 
		request("http://search.twitter.com/search.json?q=" + encodeURIComponent('#' + hashtag), function(error, response, body){
		    if(error || response.statusCode != 200){
			console.log("error while searching for " + hashtag);
		    }
		    else{
			onRequestComplete(body, hashtag);
		    }
		});
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
	hashtagSubscribers[hashtag] = hashtagMessaging
    }
    var subscriberList = hashtagSubscribers[hashtag].subscribers;
    subscriberList.push(socket);
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
    var tweets = JSON.parse(body);
}

exports.addHashtag = addHashtagToSearch;
exports.subscribe = subscribeToHashtag;