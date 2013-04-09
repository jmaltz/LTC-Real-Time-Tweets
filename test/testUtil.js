var util = require("../lib/util");
var assert = require('assert');

suite('Util Methods Tests', function(){
	var pathnameValidCss;
	var pathnameValidJs;
	var pathnameInvalid;

    var pathnameJpg;
    var pathnamePng;
    var pathnameGif;
    var invalidImage;

	setup(function(){
		pathnameValidJs = '/js/herpder.js';
		pathnameValidCss = '/css/herpderp.css';
		pathnameInvalid = '/noname/herpderp.css';

        pathnameJpg = '/img/noName.jpg';
        pathnamePng = '/img/noName.png';
        pathnameGif = '/img/noName.gif';
        invalidImage = '/img/noName.herpderp';
	});

	test('Valid Css should return css', function(done){
		assert.equal(util.getAssetType(pathnameValidCss), 'css');
		done();	
	});

	test('Valid js should return js', function(done){
		assert.equal(util.getAssetType(pathnameValidJs), 'javascript');
		done();
	});

    test('jpg path should return jpeg', function(done){
        
        assert.equal(util.getAssetType(pathnameJpg), 'jpeg');
        done();
    });

    test('gif path should return png', function(done){
   
        assert.equal(util.getAssetType(pathnamePng), 'png');
        done();
    });

    test('gif path should return gif', function(done){
       
        assert.equal(util.getAssetType(pathnameGif), 'gif');
        done();
    });

    test('Invalid image path should be undefined', function(done){
        
        assert.ifError(util.getAssetType(invalidImage));
        done();
    });

	test('Invalid path should return nothing', function(done){
		assert.notEqual(util.getAssetType(pathnameInvalid), true);
		done();
	});
});
