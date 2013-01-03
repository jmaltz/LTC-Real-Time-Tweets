var config = require('../lib/config.js').config.testDb,
exec = require('execSync');


function setupTestDb(){
	var command = 'mysql -u ' + config.username + ' --password=' + config.password + ' ' + config.databaseName + '  < test/testData.sql';
	exec.code(command);
	return; 
}

function setupCleaningData(){
	var command = 'mysql -u ' + config.username + ' --password=' + config.password + ' ' + config.databaseName + '  < test/testCleaningData.sql';
	exec.code(command);
	return; 
}

exports.setup = setupTestDb;
exports.setupCleaningData = setupCleaningData;
