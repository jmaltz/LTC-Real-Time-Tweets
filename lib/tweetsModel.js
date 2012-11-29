var async = require('async'),
mongo = require('mongodb'),
Server = mongo.Server,
Db = mongo.Db,
ObjectId = mongo.ObjectId;
var config = require("./config").config;


function tweetsModel(config){
		this.serverName = config.server;
		this.port = config.port;
		this.dbName = config.databaseName;

		console.log('DBName is ' + this.dbName);
		
		this.mongoServer = new Server(this.serverName, this.port, {auto_reconnect: true});
		this.db = new Db(this.dbName, this.mongoServer, {safe: false});
		this.collectionNames = config.collections;
		this.collections = {};


		this.username = config.username;
		this.password = config.password;
		this.isConnected = false;
}

tweetsModel.prototype.connect = function(cb){
		var self = this;
		var callback = cb || function() {};
		var callbackArgs = callback.arguments;

		this.db.open(function(error, connection){
				if(error){
						console.log('Error, unable to connect to database');
				}
				else{
						console.log('Successfully connected to the database');
						connection.authenticate(self.username, self.password, function(error, data){
								
								if(!error){
										self.findCollections(function(error){
												if(error){
														callback(error);
												}
												else{
														callback(null, data);
														self.connected = true;
												}
										});
								}
								else{
										callback(error);
								}
						});
				}
		});
}

tweetsModel.prototype.findCollections = function(cb){
		var callback = cb || function() { };
		var self = this;

		async.map(this.collectionNames, function(item, itemCallback){
				self.db.collection(item, function(error, data){
						if(error){
								console.log('Error loading collection ' + item);
								itemCallback(error);
						}
						else{
								self.collections[item] = data;
								itemCallback(null, item);
						}
				});
		}, callback);
}


tweetsModel.prototype.addApprovedTweets = function(tweets, cb){
		var self = this;
		var callback = cb || function(){ };
		if(this.isConnected == false){
				error = 'Error, db is not connected';
				callback(error);
		}


		async.map(tweets, function(item, itemCallback){
				var tweet = item.tweet;
				var hashtag = item.hashtag;
				self.collections.tweets.insert({
						'hashtag': hashtag,
						'tweet': tweet,
						'_id' : new ObjectId()
				}, {safe: true}, function(error, obj){
						if(error){
								callback(error);
						}
						else{
								callback(null, obj);
						}
				});							
		}, callback);
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