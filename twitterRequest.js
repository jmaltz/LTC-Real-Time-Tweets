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

}


function onRequestComplete(body, hashtag){
    
}

exports.addHashtag = addHashtagToSearch;
exports.subscribe = subscribeToHashtag;