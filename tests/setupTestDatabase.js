var config = require('../lib/config.js').config.testDb,
exec = require('child_process').exec;


function setupTestDb(cb){
	var callback = cb || function() { };
	exec('mysql -u ' + config.username + ' --password=' + config.password + ' ' + config.databaseName + '  < testData.sql', function(error, stdout, stderr){
														console.log('Did we finish this???');
														if(error){
															callback(error);
														}
														else{
															console.log(stdout);
															console.log(stderr);
															callback();
														}
													});		
}

exports.setup = setupTestDb;
