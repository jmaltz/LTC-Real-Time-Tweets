var async = require('async'),
mysql = require('mysql'),
config = require("./config").config;


function tweetsModel(config){
	var self = this;
	this.host = config.server;
	this.port = config.port;
	this.dbName = config.databaseName;
	
	this.username = config.username;
	this.password = config.password;
	this.isConnected = false;
	
		
	this.connection = mysql.createConnection({
		'host': self.host,
		'port': self.port,
		'user': self.username,
		'password' : self.password
	});	

}

tweetsModel.prototype.connect = function(cb){
	var self = this;
	var callback = cb || function() {};
	
	if(self.isConnected){
		var error = 'Already connected';
		callback(error);
	}
	else{
		this.connection.connect(function(error){
			if(error){
				callback(error);
			}
			else{
				self.isConnected = true;
				callback(null);
			}
		});	
	}	
}

tweetsModel.prototype.addApprovedTweets = function(tweets, cb){
		var self = this;
		var callback = cb || function(){ };
		if(this.isConnected == false){
				error = 'Error, db is not connected';
				callback(error);
		}
		else{
			async.map(tweets, function(item, itemCallback){
					var tweet = item.tweet;
					var hashtag = item.hashtag;
					var record = {
						'id': tweet.id,
						'text': tweet.text,
						'username': tweet.from,
						'image': tweet.image,
						'hashtag': hashtag,
						'timestamp': new Date()
					}; 					
					var query = this.connection.query('INSERT INTO tweets SET ? ', record, function(error, result){	
							if(error){
								itemCallback(error);
							}
							else{
								itemCallback(null, result);
							}
						});
					}, callback);
			}
}


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


exports.model = tweetsModel;
