var assert = require('assert')
, Model = require('../lib/tweetsModel.js')
, dbSetup = require('./setupTestDatabase.js')
, config = require('../lib/config.js').config;

var model = new Model.model(config.testDb); 
suite('Setup delete tests', function(){
	
	dbSetup.setup();	

	test('Setup test db', function(done){
		
		model.connect(function(error){
	
			assert.ifError(error);
			if(error){
				done();
			}
			else{
				runTests();
				done();
			}
		});
	});
});


var runTests = function(){
	
	suite('Deletion Tests', function(){
		deleteByHashtag();
		deleteByTimestamp();
	});
}

var deleteByTimestamp = function(){

	suite('Delete by timestamp', function(){

		var beforeEverything;
		var inBetweenTweets;
		var beforeNothing;
		var equalToATweet;
	
		var nullTime;
		var undefinedTime;
		var wrongTypeString;
		var wrongTypeInt;

		var timestampHashtag;

		var allRecords;
		var lastThreeRecords;
		var lastRecord;
		var noRecords;
		
		setup(function(){
			dbSetup.setup();
			
			beforeEverything = new Date(0);
			inBetweenTweets = new Date(2012, 5, 1);
			beforeNothing = new Date(2012, 6, 1);
			equalToATweet = new Date(2012, 5, 15);

			nullTime = null;
			undefinedTime = undefined;
			wrongTypeString = "HERPDERP";
			wrongTypeInt = 12233;

			timestampHashtag = 'timeStamp';

			var tweetOne = {
				id: -10
				,username: 'negative ten'
				,text: 'Test #timeStamp'
				,image: 'undefined'
			};
			var tweetTwo = {
				id: -11
				,username: 'negative eleven'
				,text: 'Test #timeStamp'
				,image: 'undefined'
			};
			var tweetThree = {
				id: -12
				,username: 'negative twelve'
				,text: 'Test #timeStamp'
				,image: 'undefined'
			};
			var tweetFour = {
				id: -13
				,username: 'negative thirteen'
				,text: 'Test #timeStamp'
				,image: 'undefined'
			};

			allRecords = [tweetOne, tweetTwo, tweetThree, tweetFour];
			lastThreeRecords = [tweetTwo, tweetThree, tweetFour];
			lastRecord = [tweetFour];
			noRecords = [];
		});

		test('Deleteing with a Date that is before all records should delete nothing', function(done){
			
			model.deletePriorTweets(beforeEverything, function(error, results){
				assert.ifError(error);		
				assert.equal(results.affectedRows, 0);
				
				model.getApprovedTweets(timestampHashtag, function(error, results){
					
					assert.ifError(error);
					assert.deepEqual(results, allRecords);
					done();
				});
			});
		});

		test('Deleting with a date that is in between records should keep all the records before it', function(done){
			
			model.deletePriorTweets(inBetweenTweets, function(error, results){
				assert.ifError(error);
				assert.equal(results.affectedRows, 1);
	
				model.getApprovedTweets(timestampHashtag, function(error, results){
				
					assert.ifError(error);
					assert.deepEqual(lastThreeRecords, results);
					done();
				});	
			});
		});

		test('Deleting should delete all tweets less than or equal to the time', function(done){
			
			model.deletePriorTweets(equalToATweet, function(error, results){
				assert.ifError(error);
				assert.equal(results.affectedRows, 3);
	
				model.getApprovedTweets(timestampHashtag, function(error, results){

				assert.ifError(error);
				assert.deepEqual(results, lastRecord);	
				done();
				});
			});
		});

		test('Deleting after a given time should delete all tweets', function(done){

			model.deletePriorTweets(beforeNothing, function(error, results){
				assert.ifError(error);
				assert.equal(results.affectedRows, 4);
				
				model.getApprovedTweets(timestampHashtag, function(error, results){
					
					assert.ifError(error);
					assert.deepEqual(noRecords, results);
					done();
				});
			});
		});

		test('Deleting with null time should give an error', function(done){
			
			model.deletePriorTweets(nullTime, function(error, results){

				assert.ok(error);
				done();
			});
		});
	
		test('Deleting with undefined time should give an error', function(done){

			model.deletePriorTweets(undefinedTime, function(error, results){

				assert.ok(error);
				done();
			});
		});

		test('Passing a string as the date should give an error', function(done){

			model.deletePriorTweets(wrongTypeString, function(error, results){
				
				assert.ok(error);
				done();
			});
		});

		test('Passing an int as the date should give an error', function(done){

			model.deletePriorTweets(wrongTypeInt, function(error, results){
				
				assert.ok(error);
				done();
			});
		});

	});

}

var deleteByHashtag = function(){

	suite('Delete by hashtag', function(){	
		var hashtagWithOneRecord;
		var hashtagWithMultipleRecords;
		var hashtagWithCamelCase;
		var hashtagWithNoRecords;	
			
		var nullHashtag;
		var undefinedHashtag;
		var emptyHashtag

		setup(function(){
			
			hashtagWithOneRecord = 'single';
			hashtagWithMultipleRecords = 'multiple';
			hashtagWithCamelCase = 'camelCase';
			hashtagWithNoRecords = 'none';

			nullHashtag = null;
			undefinedHashtag = null;
			emptyHashtag = '';
		});

		test('Delete should remove a hashtag with one record', function(done){
		
			model.deleteTweetsByHashtag(hashtagWithOneRecord, function(error, results){
			
				assert.ifError(error);
				assert.equal(results.affectedRows, 1);
				model.getApprovedTweets(hashtagWithOneRecord, function(error, results){
				
					assert.equal(results.length, 0);
					done();		
				});
			});
		});
		
		test('Delete should remove all records when there are multiple for a given hashtag', function(done){
	
			model.deleteTweetsByHashtag(hashtagWithMultipleRecords, function(error, results){
				assert.ifError(error);
				assert.equal(results.affectedRows, 3);
				model.getApprovedTweets(hashtagWithMultipleRecords, function(error, results){
				
					assert.ifError(error);
					assert.equal(results.length, 0);	
					done();
				});
			});
		});

		test('Delete should remove records in a case insensitive fashion', function(done){
		
			model.deleteTweetsByHashtag(hashtagWithCamelCase, function(error, results){
		
				assert.ifError(error);
				assert.equal(results.affectedRows, 2);
				model.getApprovedTweets(hashtagWithCamelCase, function(error, results){
					assert.ifError(error);	
					assert.equal(results.length, 0);
					done();
				});	
			});
		});

		test('Delete should delete nothing when there are no records', function(done){

			model.deleteTweetsByHashtag(hashtagWithNoRecords, function(error, results){
			
				assert.ifError(error);
				assert.equal(results.affectedRows, 0);
				model.getApprovedTweets(hashtagWithNoRecords, function(error, results){
	
					assert.ifError(error);
					assert.equal(results.length, 0);
					done();
				});
			});
		});

		test('Delete should throw an error with an undefined input', function(done){
			
			model.deleteTweetsByHashtag(undefinedHashtag, function(error, results){
			
				assert.ok(error);
				done();
			});
		});

		test('Delete should throw an error with a null input', function(done){
	
			model.deleteTweetsByHashtag(nullHashtag, function(error, results){
			
				assert.ok(error);
				done();
			});
		});

		test('Delete should throw an error with an empty input', function(done){
	
			model.deleteTweetsByHashtag(emptyHashtag, function(error, results){

				assert.ok(error);
				done();
			});
		});
	});
}
