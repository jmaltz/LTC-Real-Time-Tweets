var Model = require('../lib/tweetsModel.js');
var config = require('../lib/config.js').config;


var model = new Model.model(config.mongo);
model.connect(function(error, result){
		if(!error){
				console.log('No error!!!');
		}

});

var badModel = new Model.model(config.badMongo);
badModel.connect(function(error, result){
		console.log('Error is ' + error);

});
