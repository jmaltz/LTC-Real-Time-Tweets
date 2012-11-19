var mongo = require('mongodb'),
Server = mongo.Server,
Db = mongo.Db;
var config = require("./config").config;

function addApprovedTweets(tweets){
    Db.connect(config.mongoHqUrl, function(error, client){
	if(!error){
	    client.collection('tweets', function(err, collection){
		collection.insert(tweets);
	    });
	}
    });
}

function getApprovedTweets(hashtag){
    Db.connect(config.mongoHqUrl, function(error, client){
	
    });
}

addApprovedTweets(null);