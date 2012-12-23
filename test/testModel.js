var Model = require('../lib/tweetsModel.js');
var config = require('../lib/config.js').config;
var assert = require('assert');


suite('Test connecting to a database under various scenarious', function(){

	test('Model should successfully connect when it has valid credentials', function(done){
		var model = new Model.model(config.mysql);
		model.connect(function(error){
			assert.ifError(error);
			done();	
		});
	});
	
	test('Model should throw an error when it has bad connection information', function(done){
		var badModel = new Model.model(config.badMysql);
		badModel.connect(function(error){
			assert.ok(error);	
			done();	
		});
	});

	test('Model should throw an error when it has bad authorization credentials', function(done){
		var badAuth = new Model.model(config.badDbAuth);
		badAuth.connect(function(error){
			assert.ok(error);
			done();
		});
	});
});
