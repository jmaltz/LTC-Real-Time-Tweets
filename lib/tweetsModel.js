var mongo = require('mongodb'),
Server = mongo.Server,
Db = mongo.Db;
var config = require("./config").config;

var server = new Server('alex.mongohq.com', 10053, {auto_reconnect: true});
var dbConnection = new Db('LTCTwitter', server, {safe: false});

dbConnection.open(function(error, connection){
		console.log('succesfully opened the connection');
		if(error){
				console.log('But there were errors');
		}
		else{
				console.log('And there were no errors');
		}
});

function addApprovedTweets(tweets){
    Db.connect(config.mongoHqUrl, function(error, client){
				if(!error){
						console.log('No Error!!');
						client.collection('tweets', function(err, collection){
								collection.insert(tweets);
						});
				}
				else{
						console.log('Error connecting to the db');
				}
    });
}

function getApprovedTweets(hashtag){
    Db.connect(config.mongoHqUrl, {safe:false}, function(error, client){
				
    });
}


var tweetOne = {'text': 'test'};
var tweetTwo = {'text': 'testtwo'};
var tweetThree = {'text': 'testthree'};
var tweetFour = {'text': 'testfour'};
var tweetFive = {'text': 'testfive'};

var arrayOfTweets = [tweetFour, tweetFive];
var arrayOfOneTweet = [tweetThree];
var emptyArray = [];

//addApprovedTweets(tweetOne);
/*addApprovedTweets(arrayOfTweets);
addApprovedTweets(arrayOfOneTweet);
addApprovedTweets(emptyArray);
addApprovedTweets(null);*/
