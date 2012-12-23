var config = require('../lib/config.js').config.testDb,
exec = require('execSync');


function setupTestDb(){
	var command = 'mysql -u ' + config.username + ' --password=' + config.password + ' ' + config.databaseName + '  < test/testData.sql';
	var res = exec.code(command);
	return; 
}

setupTestDb();

exports.setup = setupTestDb;
