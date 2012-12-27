var assert = require('assert')
, Model = require('../lib/tweetsModel.js')
, dbSetup = require('./setupTestDatabase.js')
, config = require('../lib/config.js').config;

var model = new Model.model(config.testDb);
suite('Read tests setup', function(){
	//dbSetup.setup();

	test('connect to database', function(done){

		model.connect(function(error){
			if(error){
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

	suite('Read tests run', function(){
		
		var hashtagWithOneRecord;
		var oneRecordExpectation;

		var hashtagWithCamelCase;
		var camelCaseExpectation;
	
		var hashtagWithUnderscores;
		var underscoresExpectation;
	
		var hashtagWithMultipleRecords;
		var multipleRecordsExpectation;
	
		var hashtagWithNoRecords;	
		var noRecordsExpectation;	
	
		var undefinedHashtag;
		
		var nullHashtag;
		setup(function(){
			hashtagWithOneRecord = 'single';
			oneRecordExpectation = [{
				id: '-6'
				,text: 'Test #single'
				,username: 'negative six'
				,image: 'undefined'
			}];
			
			
			hashtagWithCamelCase = 'camelCase';
			camelCaseExpectation = [{
				id: -7
				,text: 'Test #camelCase'
				,username: 'negative seven'
				,image: 'undefined'
			}
			,{
				id: -8
				,text: 'Test #camelcase'
				,username: 'negative eight'
				,image: 'undefined'
			}];
			
			hashtagWithUnderscores = 'unique_hashtag';
			underscoresExpectation = [{
				id: -4
				,text: 'Test #unique_hashtag'
				,username: 'negative four'
				,image: 'undefined'
			}];
			
			hashtagWithMultipleRecords = 'multiple';
			multipleRecordsExpectation = [{
				id: -1
				,text: 'Test #multiple'
				,username: 'negative one'
				,image: 'undefined'
			}
			,{
				id: -2
				,text: 'Test #multiple'
				,username: 'negative two'
				,image: 'undefined'
			}
			,{
				id: -3
				,text: 'Test #multiple'
				,username: 'negative three'
				,image: 'undefined'
			}];
			
			hashtagWithNoRecords = 'none';
			noRecordsExpectation = [];

			undefinedHashtag = undefined;
			nullHashtag = null;
		});

			
		test('Get from a hashtag with one record should return just one record', function(done){
			model.getApprovedTweets(hashtagWithOneRecord, function(error, results){
				assert.ifError(error);
				assert.equal(results.length, 1);
				assert.deepEqual(results, oneRecordExpectation); 
				done();
			});
		});

		test('Hashtag with camel case should return case insensitive results', function(done){
			model.getApprovedTweets(hashtagWithCamelCase, function(error, results){
				assert.ifError(error);
				assert.equal(results.length, 2);
				assert.deepEqual(results, camelCaseExpectation);	
				done();
			});
		});

		test('Hashtag with underscores should just return a result with underscores', function(done){
			model.getApprovedTweets(hashtagWithUnderscores, function(error, results){
				assert.ifError(error);
				assert.equal(results.length, 1);	
				assert.deepEqual(results, underscoresExpectation);	
				done();
			});	
		});

		test('Hashtag with a normal record and multiple entries should return all entries', function(done){
			model.getApprovedTweets(hashtagWithMultipleRecords, function(error, results){
				assert.ifError(error);
				assert.equal(results.length, 3);
				assert.deepEqual(results, multipleRecordsExpectation);
				done();
			});	
		});

		test('Get from a hashtag with no records should return no records', function(done){
			model.getApprovedTweets(hashtagWithNoRecords, function(error, results){
				assert.ifError(error);
				assert.equal(results.length, 0);
				assert.deepEqual(noRecordsExpectation, results);
				done();	
			});
		});

		test('Undefined hashtag should give an error', function(done){
			model.getApprovedTweets(undefinedHashtag, function(error, results){
				assert.ok(error);
				done();
			});
		});


		test('Null hashtag should give an error', function(done){
			model.getApprovedTweets(nullHashtag, function(error, results){
				assert.ok(error);
				done();
			});
		});
	});
}
