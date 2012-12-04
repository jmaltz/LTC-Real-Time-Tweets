var Model = require('../lib/tweetsModel.js');
var config = require('../lib/config.js').config;


var model = new Model.model(config.mysql);
model.connect(function(error){
	if(!error){
		console.log('No error!!!');
	}
	else{
		console.log('Error :( ' + error);
	}

});

var badModel = new Model.model(config.badMysql);
badModel.connect(function(error){
	if(error){
		console.log('Error is ' + error);
	}
	else{
		console.log('Failure, the bad database still connected');
	}
});

var badAuth = new Model.model(config.badAuth);
badAuth.connect(function(error){
	if(error){
		console.log('We got an error with the bad Auth ' + error);
	}
	else{
		console.log('Successfully authed when we should not have');
	}
});
