var util = require("../lib/util");
var assert = require('assert');

suite('Util Methods Tests', function(done){
	var pathnameValidCss;
	var pathnameValidJs;
	var pathnameInvalid;
	setup(function(){
		pathnameValidJs = '/js/herpder.js';
		pathnameValidCss = '/css/herpderp.css';
		pathnameInvalid = '/noname/herpderp.css';
	});

	test('Valid Css should return css', function(done){
		assert.equal(util.getAssetType(pathnameValidCss), 'css');
		done();	
	});

	test('Valid js should return js', function(done){
		assert.equal(util.getAssetType(pathnameValidJs), 'javascript');
		done();
	});

	test('Invalid path should return nothing', function(done){
		assert.notEqual(util.getAssetType(pathnameInvalid), true);
		done();
	});
});
