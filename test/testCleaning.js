var DbCleaner = require('../lib/dbCleaner.js').DbCleaner
, dbSetup = require('./setupTestDatabase.js')
, config = require('../lib/config.js').config
, assert= require('assert')
, Model = require('../lib/tweetsModel.js').model;

var model = new Model(config.testDb);
suite('Setup DB Cleaner Tests', function(){
	
	test('Connect to the test database', function(done){
		
		model.connect(function(error){
		
			assert.ifError(error);
			if(!error){
				runTests();
			}
			done();
		});

	});
});


var runTests = function(){

	suite('Database cleaning tests', function(){

		var validOptions;
		var validCronExpression;	

		var largeFrequency;

		var negativeFreq;

		var negativeThresh;

		var cleaningHashtag;
	
		var newTweets;
	
		setup(function(){

			dbSetup.setupCleaningData();	
			validOptions = {
				frequency: 10
				,threshold: 120
			};

			validCronExpression = '0 */10 * * * *';	
						

			largeFrequency = {
				frequency: 100
				,threshold: 120
			};
	
			negativeFreq = {
				frequency: -10
				,threshold: 120
			};

			negativeThresh = {
				frequency: 10
				,threshold: -10
			};

			cleaningHashtag = 'cleaning';

			newTweets = [{
				id: 1
				,username: 'test'
				,text: 'Test #' + cleaningHashtag
				,image: 'undefined'
			}
			,{
				id: 2
				,username: 'test'
				,text: 'Test #' + cleaningHashtag
				,image: 'undefined'
			}];

		});

		test('Creating a db cleaner with valid information should work as expected', function(done){
		
			var validCleaner = new DbCleaner(model, validOptions);
			assert.ok(validCleaner);
			assert.equal(validCronExpression, validCleaner.getCronExpression());
			done();
		});

		test('Creating a db cleaner with an invalid frequency should throw an error', function(done){

			assert.throws(function(){
		
				var largeCleaner = new DbCleaner(model, largeFrequency);
				});
			done();
		});
	
		test('Creating a db with a negative frequency should throw an error', function(done){
	
			assert.throws(function(){
			
				var negativeFreqCleaner = new DbCleaner(model, negativeFreq);
				});
			done();
		});

		test('Creating a db with a negative threshold should throw an error', function(done){
			
			assert.throws(function(){

				var negativeThresholdCleaner = new DbCleaner(model, negativeThresh);
			});
			done();
		});

		test('Cleaning a db where everything is past the input date should clear everything', function(done){
			
			var validCleaner = new DbCleaner(model, validOptions);
			
			validCleaner.cleanDb(function(error, results){

				assert.ifError(error);
				assert.equal(results.affectedRows, 7);
				
				model.getApprovedTweets(cleaningHashtag, function(error, results){
					
					assert.ifError(error);
					assert.equal(results.length, 0);
					done();
				});
			});
		}); 
	
		test('Cleaning a db with new tweets shouldn\'t remove them', function(done){

			model.addApprovedTweets(newTweets, function(error, results){
				
				assert.ifError(error);
				assert.equal(results.length, 2);
				
				var validCleaner = new DbCleaner(model, validOptions);
				validCleaner.cleanDb(function(error, results){

					assert.ifError(error);
					assert.equal(results.affectedRows, 7);
					
					model.getApprovedTweets(cleaningHashtag, function(error, results){
						
						assert.ifError(error);
						assert.equal(results.length, 2);
						done();
					});
				});
			});

		});

	});

}

//need to figure out how to test that the cron job runs when it is supposed to
