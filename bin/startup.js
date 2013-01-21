var router = require('../lib/router')
, handlers = require('../lib/handlers')
, server = require('../lib/server')
, Model = require('../lib/tweetsModel')
, config = require('../lib/config').config
, cleaner = require('../lib/dbCleaner');


var requestHandlers = {};
requestHandlers['/'] = handlers.index;
requestHandlers['/index'] = handlers.index;
requestHandlers['/admin'] = handlers.admin;
requestHandlers['/js'] = handlers.asset;
requestHandlers['/css'] = handlers.asset

server.startServer(router, requestHandlers);

var database = new Model.model(config.mysql);

//connect to the database
database.connect(function(error){
	
	if(error){
		console.log('Error connecting to the database on startup ' + error);
	}
	else{
		try{
			var dbCleaner = new cleaner.DbCleaner(database, config.dbCleanOptions);
		}
		catch(error){
			console.log('Error creating the database cleaning job ' + error);
		}
	}
});
