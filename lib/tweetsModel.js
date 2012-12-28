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
		'host': self.host
		,'port': self.port
		,'user': self.username
		,'password': self.password
		,'database': self.dbName
	});	

}

tweetsModel.prototype.connect = function(cb){
	
	var self = this;
	var callback = cb || function() {};

	//make sure we aren't already connected	
	if(self.isConnected){
		var error = 'Already connected';
		callback(new Error(error));
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

	var tweetsArray = tweets;
	
	 //make sure they passed me in a real value
	if(!tweets){
		var error = 'Tweets is undefined';
		callback(new Error(error));
		return;	
	}

	//make async play nice with single objects by checking if there is a tweets field
	if( Object.prototype.toString.call( tweets ) !== '[object Array]' ) {
		tweetsArray = [tweets];
	}



	async.map(tweetsArray, function(item, itemCallback){

			//if the user passed in something invalid, throw an error
			if (!validateTweet(item)){
				var error = 'Invalid input';
				itemCallback(new Error(error));
				return;	
			}				

			var tweet = item;
			
			//populate the necessary fields
			var record = {
				'id': tweet.id
				,'text': tweet.text
				,'username': tweet.username
				,'image': tweet.image
				,'timestamp': new Date()
			};

			var query = self.connection.query('INSERT INTO tweets SET ? ', record, function(error, result){	
					if(error){
						 return itemCallback(error, record);
					}
					else{
						return itemCallback(null, result);
					}
				});
			}, callback);
}


tweetsModel.prototype.getApprovedTweets = function(hashtag, cb){

	var callback = cb || function() { };
	var self = this;

	//check for hashtag being valid
	if(!hashtag){
		callback(new Error('Hashtag is undefined'));
		return;
	}

	var sql = 'SELECT ' +
			' text, ' +
			' username, ' +
			' image, ' +
			' id ' +
			' FROM ' +
			' tweets ' +
			' WHERE ' +
			' text LIKE ' + self.connection.escape('%#' + hashtag + '%') +
			' ORDER BY ID DESC';


	this.connection.query(sql, function(error, fields, results){
		if(error){
			callback(error);
		}
		else{
			callback(null, fields);				
		}
	});			
}

tweetsModel.prototype.deleteTweetsByHashtag = function(hashtag, cb){
	
	var callback = cb || function(){};
	var self = this;

	if(!hashtag){
		callback(new Error('Hashtag is not defined'));
		return;
	}

	var sql = 'DELETE ' +
			' FROM ' +
			' tweets ' +
			' WHERE ' +
			' text LIKE ' + self.connection.escape('%#' + hashtag + '%');
	
	this.connection.query(sql, function(error, fields, results){
		
		if(error){
			callback(error);
		}
		else{
			callback(null, fields);
		}

	});	
}

tweetsModel.prototype.deletePriorTweets = function(time, cb){

	var self = this;
	var callback = cb || function() { };

	if(!time){
		callback(new Error('Time is not defined'));
		return;
	}

	//Check that the user entered a valid date
	if(Object.prototype.toString.call(time) !== '[object Date]'){
		callback(new Error('Type of time is not a date'));
		return;
	}
	
	var sql = 'DELETE ' +
			' FROM ' +
			' tweets ' +
			' WHERE ' +
			' timestamp <= ' + self.connection.escape(time);

	this.connection.query(sql, function(error, results){

		if(error){
			callback(error);
		}
		else{
			callback(null, results);
		}
	});

}

function validateTweet(tweet){

	return tweet &&
		tweet.id &&
		tweet.username &&
		tweet.text &&
		tweet.image;
}


exports.model = tweetsModel;
