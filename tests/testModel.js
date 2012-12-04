var Model = require('../lib/tweetsModel.js');
var config = require('../lib/config.js').config;


var model = new Model.model(config.mysql);
model.connect(function(error, result){
	if(!error){
		console.log('No error!!!');
	}
	else{
		console.log('Error :( ' + error);
	}

});

/*var badModel = new Model.model(config.badMongo);
badModel.connect(function(error, result){
		console.log('Error is ' + error);

});*/
