var Model = require('../lib/tweetsModel.js'), 
config = require('../lib/config.js').config,
setup = require('./setupTestDatabase.js');

var model = new Model.model(config.testDb);
setup.setup(function(){
	test();
});

var test = function(){
	model.connect(function(error, result){
		runTests(error);
	});
};

var runTests = function(error){
	if(error){
		console.log('Unable to connect to the database, not testing anything :(');
		return;
	}

	var tweetOne = {
			'text': 'tweet one',
			'from': 'jmaltz',
			'image': 'http://google.com',
			'id': 1
	};
	var tweetTwo = {
			'text': 'tweet two',
			'from': 'jmaltz',
			'image': 'http://google.com',
			'id': 2
	};

	var tweetThree = {
			'text': 'tweet three',
			'from': 'jmaltz',
			'image': 'http://google.com',
			'id': 3
	};

	var tweetFour = {
			'text': 'tweet four',
			'from': 'jmaltz',
			'image': 'http://google.com',
			'id': 4
	};

	var tweetFive = {
			'text': 'tweet five',
			'from': 'jmaltz',
			'image': 'http://google.com',
			'id': 5
	};


	var unfilledTweet = {
			'from': 'jmaltz',
			'image': 'http://google.com',
			'id': 5
	};



	var firstRecord = {
		'hashtag': 'test',
		'tweet': tweetOne
	};

	var secondRecord = {
		'hashtag': 'test',
		'tweet': tweetTwo
	};

	var thirdRecord = {
		'hashtag': 'test',
		'tweet': tweetThree
	};

	var fourthRecord = {
		'hashtag': 'test',
		'tweet': tweetFour	
	};

	var fifthRecord = {
		'hashtag': 'test',
		'tweet': tweetFive
	};

	var sixthRecord = {
		'tweet': tweetFive
	};

	var seventhRecord = {
		'hashtag': 'test',
		'tweet': unfilledTweet
	};

	var oneRecord = [firstRecord];

	model.addApprovedTweets(oneRecord, function(error, result){
		if(!error){
			console.log('No errors approving one record');
		}
		else{
			console.log('We had an error with error ' + error)
		}
	});

	var twoRecords = [secondRecord, thirdRecord];

	model.addApprovedTweets(twoRecords, function(error, result){
		if(!error){
			console.log('No errors approving two records');
		}
		else{
			console.log('We had an error with error ' + error)
		}
	});

	model.addApprovedTweets(fourthRecord, function(error, result){
		
		if(!error){
			console.log('No errors approving just fourthRecord');
		}
		else{
			console.log('We had an error with error ' + error)
		}
	});

	var undefinedRecord = undefined;
	model.addApprovedTweets(undefinedRecord, function(error, result){
		if(!error){
			console.log('No error adding undefined record');
		}
		else{
			console.log('Error adding an unefined record');
		}
	});
	
	var mixedRecords = [fifthRecord, undefined];
	model.addApprovedTweets(mixedRecords, function(error, result){
		if(!error){
			console.log('No error on adding mixed records');
		}
		else{
			console.log('Error adding mixed records');
		}
	
	});
		
	model.addApprovedTweets(sixthRecord, function(error, result){
		if(!error){
			console.log('No errors approving sixthRecord');
		}
		else{
			console.log('We had an error with error ' + error)
		}
	});

	model.addApprovedTweets(seventhRecord, function(error, result){
		if(!error){
			console.log('No errors approving seventhRecord');
		}
		else{
			console.log('We had an error approving seventh record with error ' + error)
		}
	});


}
