var Model = require('../lib/tweetsModel.js') 
,config = require('../lib/config.js').config
,assert = require('assert')
,dbSetup = require('./setupTestDatabase.js');


var model = new Model.model(config.testDb);
suite('Insertion Tests Connection', function(){
	dbSetup.setup();

	test('connect to database', function(done){
		model.connect(function(error, result){
			if(error){ //this is a hack to allow me to work with callbacks the way I want to
				assert.ifError(error);
			}
			else{
				runTests();
			}

			done();
		});	
	});
});


var runTests = function(){
	
	suite('Test insertions', function(){

		var tweetOne;
		var tweetTwo;
		var tweetThree;
		var tweetFour;
		var tweetFive;
		var unfilledTweet;

		var oneRecordHashtag;
		var twoRecordsHashtag;
		var nonArrayHashtag;
		var mixedRecordsHashtag;
		var unfilledRecordHashtag;

		var oneRecord;
		var oneRecordTweets;

		var twoRecords;
		var twoRecordsTweets;

		var mixedRecords;
		var mixedRecordsTweets;
	
		var undefinedRecord;
		var unfilledRecord;
		setup(function(){

			oneRecordHashtag = 'testOne';
			twoRecordsHashtag = 'testTwo';
			nonArrayHashtag = 'testThree';
			mixedRecordsHashtag = 'testFour';
			unfilledRecordHashtag = 'testFive';


			tweetOne = {
				'text': 'tweet one #' + oneRecordHashtag,
				'username': 'jmaltz',
				'image': 'http://google.com',
				'id': 1
			};
			
			tweetTwo = {
				'text': 'tweet two #' + twoRecordsHashtag,
				'username': 'jmaltz',
				'image': 'http://google.com',
				'id': 2
			};

			tweetThree = {
				'text': 'tweet three #' + twoRecordsHashtag,
				'username': 'jmaltz',
				'image': 'http://google.com',
				'id': 3
			};

			tweetFour = {
				'text': 'tweet four #' + nonArrayHashtag,
				'username': 'jmaltz',
				'image': 'http://google.com',
				'id': 4
			};

			tweetFive = {
				'text': 'tweet five #' + mixedRecordsHashtag,
				'username': 'jmaltz',
				'image': 'http://google.com',
				'id': 5
			};


			unfilledTweet = {
				'username': 'jmaltz',
				'image': 'http://google.com',
				'id': 5
			};

			undefinedRecord = undefined;
			
			oneRecord = [tweetOne];

			twoRecords = [tweetThree, tweetTwo];
			mixedRecords = [tweetFive, undefined];
			unfilledRecord = [unfilledTweet];
		});

		test('One tweet should be inserted without error', function(done){
			model.addApprovedTweets(oneRecord, function(error, result){
			
				assert.equal(result.length, 1);	
				assert.equal(result[0].affectedRows, 1);	
				assert.ifError(error);
				
				model.getApprovedTweets(oneRecordHashtag, function(error, results){
					assert.ifError(error);
					assert.deepEqual(results, oneRecord);	
					done();
				});	
			});	
		});


		test('Two valid tweets should be inserted without error', function(done){
			model.addApprovedTweets(twoRecords, function(error, result){
				
				assert.ifError(error);
				assert.equal(result.length, 2);

				for(var i = 0; i < result.length; i++){
					assert.equal(result[i].affectedRows, 1);
				}

				model.getApprovedTweets(twoRecordsHashtag, function(error, results){
				
					assert.ifError(error);
					assert.deepEqual(results, twoRecords);	
					done();
				});		
			});
		});

		test('One valid tweet in an array should be inserted without error', function(done){	
			model.addApprovedTweets(tweetFour, function(error, result){
				
				assert.ifError(error);
				assert.equal(result.length, 1);
				assert.equal(result[0].affectedRows, 1);
				
					model.getApprovedTweets(nonArrayHashtag, function(error, results){
					
					assert.ifError(error);
					assert.deepEqual(results, [tweetFour]);	
					done();
				});
			});
		});

		test('Inserting undefined should give an error', function(done){	
			model.addApprovedTweets(undefinedRecord, function(error, result){
				assert.ok(error);	
				done();		
			});
		});

		test('Inserting records where one of them is undefined should throw an error', function(done){	
			model.addApprovedTweets(mixedRecords, function(error, result){
				assert.ok(error);	
				done();		
			});
		});
		

		test('Inserting records with incomplete tweets should throw an error', function(done){	
			model.addApprovedTweets(unfilledRecord, function(error, result){
				assert.ok(error);
				done();
			});
		});
	});
}
