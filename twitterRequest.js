var cronJob = require('cron').CronJob,
request = require('request');

var searchingHashtags = {};
var hashtagSubscribers = {};


var messager = {};
messager.subscribers = new Array();
messager.messages = new Array();
messager.messages.push({'id':1});

hashtagSubscribers.photography = messager;

function addHashtagToSearch(hashtag){
  if(searchingHashtags[hashtag] == undefined || searchingHashtags[hashtag] == null){

	var options = {
	    "cronTime": "0/30 * * * * *",
	    "onTick": function() { 
		request("http://search.twitter.com/search.json?q=" + encodeURIComponent('#' + hashtag) + "&" + "rpp=5", function(error, response, body){
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
    
    var subscriberList = hashtagSubscribers[hashtag];
    subscriberList.subscribers.push(socket);
    socket.emit({'message': subscriberList.messages}); 
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
    console.log(body);
    var tweets = JSON.parse(body).results;
    var hashtagMessager = hashtagSubscribers[hashtag];
    var storedMessages = hashtagMessager.messages;
    
    console.log("length of stored messages is " + storedMessages.length);
    
    var i = 0;
    var resultsToAdd = new Array();
    for(; i<tweets.length; i++){
	if(storedMessages[0].id == tweets[i].id){
	    break;
	}

	var tweetToAdd = {
	    'id':tweets[i].id,
	    'text':tweets[i].text,
	    'image':tweets[i].profile_image_url
	};
	resultsToAdd.push(tweetToAdd);
    }


    if(i < storedMessages.length){
	storedMessages.splice(storedMessages.length - 1 - i, i);
    }
    else{
	storedMessages = new Array();
    }
    console.log(" i is " + i);
    console.log("length of leftover messages is " + storedMessages.length);
    for(var j = 0; j< hashtagMessager.subscribers.length; j++){
	hashtagMessager.subscribers[j].emit({'update': resultsToAdd});
    }
    console.log("length of resultsToAdd is " + resultsToAdd.length);
    for(var j = 0; i<storedMessages.length; i++){
	resultsToAdd.push(storedMessages[j]);
    }
    hashtagSubscribers[hashtag].messages = resultsToAdd;
    
    
}

exports.addHashtag = addHashtagToSearch;
exports.subscribe = subscribeToHashtag;