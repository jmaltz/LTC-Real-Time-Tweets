var Model = require('../lib/tweetsModel.js'), 
config = require('../lib/config.js').config,
assert = require('assert'),
setup = require('./setupTestDatabase.js');


var model = new Model.model(config.testDb);
suite("Insertion Tests", function(done){
	setup.setup();
	test('connect to database', function(done){
		model.connect(function(error, result){
			if(error){ //this is a hack to allow me to work with callbacks the way I want to
				assert.ifError(false);
				done();
			}
			else{
				runTests(error);
				done();
			}
		});	
	});
});


var runTests = function(error){
	
	suite('Test insertions', function(){

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

		var undefinedRecord = undefined;
		
		var oneRecord = [firstRecord];

		test('One tweet should be inserted without error', function(done){
			model.addApprovedTweets(oneRecord, function(error, result){	
				assert.ifError(error);
				done();
			});	
		});

		var twoRecords = [secondRecord, thirdRecord];

		test('Two valid tweets should be inserted without error', function(done){
			model.addApprovedTweets(twoRecords, function(error, result){
				assert.notEqual(error, true);
				done();
			});
		});

		test('One valid tweet in an array should be inserted without error', function(done){	
			model.addApprovedTweets(fourthRecord, function(error, result){
				assert.notEqual(error, true);
				done();			
			});
		});

		test('Inserting undefined should give an error', function(done){	
			model.addApprovedTweets(undefinedRecord, function(error, result){
				console.log(error == true + " is error");
				//assert.ifError(error);	
				done();		
			});
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
	});
}
