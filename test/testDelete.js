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
