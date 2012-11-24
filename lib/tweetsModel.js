var mongo = require('mongodb'),
Server = mongo.Server,
Db = mongo.Db;
var config = require("./config").config;


function tweetsModel(server, port, dbName, username, password){
		this.serverName = server;
		this.port = port;
		this.dbName = dbName;
		this.mongoServer = new Server(this.serverName, this.port, {auto_reconnect: true});
		this.db = new Db(dbName, this.mongoServer, {safe: false});
		

		this.username = username;
		this.password = password;
		this.connection = null;
}

tweetsModel.prototype.connect = function(){
		var model = this;
		this.db.open(function(error, connection){
				if(error){
						console.log('Error, unable to connect to database');
				}
				else{
						console.log('Successfully connected to the database');
						connection.authenticate(model.username, model.password, function(error, data){
								
								if(!error){
										console.log('Succesfully authenticated');
										model.connection = data;
								}
								else{
										console.log(error);
										console.log('Unsuccessfully authenticated');
								}
						});
				}
		});
}

var model = new tweetsModel(config.mongo.server, config.mongo.port, config.mongo.databaseName, config.mongo.username, config.mongo.password);
model.connect();

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

