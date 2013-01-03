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
		var tweetToDuplicate;
		var unfilledTweet;

		var oneRecordHashtag;
		var twoRecordsHashtag;
		var nonArrayHashtag;
		var mixedRecordsHashtag;
		var unfilledRecordHashtag;
		var duplicateTweetHashtag;

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
			duplicateTweetHashtag = 'duplicateTweet';

			tweetOne = {
				'text': 'tweet one #' + oneRecordHashtag
				,'username': 'jmaltz'
				,'image': 'http://google.com'
				,'id': 1
			};
			
			tweetTwo = {
				'text': 'tweet two #' + twoRecordsHashtag
				,'username': 'not jmaltz'
				,'image': 'http://google.com'
				,'id': 2
			};

			tweetThree = {
				'text': 'tweet three #' + twoRecordsHashtag
				,'username': 'sometimes jmaltz'
				,'image': 'http://google.com'
				,'id': 3
			};

			tweetFour = {
				'text': 'tweet four #' + nonArrayHashtag
				,'username': 'jmaltz'
				,'image': 'http://google.com'
				,'id': 4
			};

			tweetFive = {
				'text': 'tweet five #' + mixedRecordsHashtag
				,'username': 'jmaltz'
				,'image': 'http://google.com'
				,'id': 5
			};

			tweetToDuplicate = {
				'text': 'Duplicate tweet #' + duplicateTweetHashtag
				,'username': 'jmaltz'
				,'image': 'http://google.com'
				,'id': 6
			};
			
			unfilledTweet = {
				'username': 'jmaltz'
				,'image': 'http://google.com'
				,'id': 7
			};

			undefinedRecord = undefined;
			
			oneRecord = [tweetOne];

			twoRecords = [tweetThree, tweetTwo];
			mixedRecords = [tweetFive, undefined];
			unfilledRecord = [unfilledTweet];
		});

		test('One tweet should be inserted without error', function(done){
			model.addApprovedTweets(oneRecord, function(error, results){
			
				assert.equal(results.length, 1);	
				assert.equal(results[0].affectedRows, 1);	
				assert.ifError(error);
				
				model.getApprovedTweets(oneRecordHashtag, function(error, results){
					assert.ifError(error);
					assert.deepEqual(results, oneRecord);	
					done();
				});	
			});	
		});


		test('Two valid tweets should be inserted without error', function(done){
			model.addApprovedTweets(twoRecords, function(error, results){
				
				assert.ifError(error);
				assert.equal(results.length, 2);

				for(var i = 0; i < results.length; i++){
					assert.equal(results[i].affectedRows, 1);
				}

				model.getApprovedTweets(twoRecordsHashtag, function(error, results){
				
					assert.ifError(error);
					assert.deepEqual(results, twoRecords);	
					done();
				});		
			});
		});

		test('One valid tweet in an array should be inserted without error', function(done){	
			model.addApprovedTweets(tweetFour, function(error, results){
				
				assert.ifError(error);
				assert.equal(results.length, 1);
				assert.equal(results[0].affectedRows, 1);
				
				model.getApprovedTweets(nonArrayHashtag, function(error, results){
					
					assert.ifError(error);
					assert.deepEqual(results, [tweetFour]);	
					done();
				});
			});
		});

		test('Inserting a duplicate record should update the old record', function(done){

			model.addApprovedTweets(tweetToDuplicate, function(error, results){
				
				assert.ifError(error);
				assert.equal(results.length, 1);
				assert.equal(results[0].affectedRows, 1);

				model.addApprovedTweets(tweetToDuplicate, function(error, results){
					
					assert.ifError(error);
					done();
				});	
			});
		});

		test('Inserting undefined should give an error', function(done){	
			model.addApprovedTweets(undefinedRecord, function(error, results){
				assert.ok(error);	
				done();		
			});
		});

		test('Inserting records where one of them is undefined should throw an error', function(done){	
			model.addApprovedTweets(mixedRecords, function(error, results){
				assert.ok(error);	
				done();		
			});
		});
		

		test('Inserting records with incomplete tweets should throw an error', function(done){	
			model.addApprovedTweets(unfilledRecord, function(error, results){
				assert.ok(error);
				done();
			});
		});
	});
}
