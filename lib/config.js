var config = {};

config.host = process.env.host || 'localhost';
config.port = process.env.port || 3306;
config.databaseName = process.env.databaseName || 'LTC_Tweets';
config.username = process.env.username || 'root';
config.password = process.env.password || 'password';

config.testDb = {};
config.testDb.host = process.env.host || 'localhost';
config.testDb.port = process.env.port || 3306;
config.testDb.databaseName = process.env.databaseName || 'LTC_Tweets_Test';
config.testDb.username = process.env.username || 'root';
config.testDb.password = process.env.password || 'password';

config.mysql = {};
config.mysql.host = process.env.host || 'localhost';
config.mysql.port = process.env.port || 3306;
config.mysql.databaseName = process.env.databaseName || 'LTC_Tweets_Test';
config.mysql.username = process.env.username || 'root';
config.mysql.password = process.env.password || 'password';

config.badMysql = {};
config.badMysql.host = process.env.host || 'localhost';
config.badMysql.port = process.env.port || 3307;
config.badMysql.databaseName = process.env.databaseName || 'LTC_Tweets_Test';
config.badMysql.username = process.env.username || 'root';
config.badMysql.password = process.env.password || 'password';

config.badDbAuth = {};
config.badDbAuth.host = process.env.host || 'localhost';
config.badDbAuth.port = process.env.port || 3306;
config.badDbAuth.databaseName = process.env.databaseName || 'LTC_Tweets_Test';
config.badDbAuth.username = process.env.username || 'root';
config.badDbAuth.password = process.env.password || 'herpaderp';

config.validImageTypes = ['jpeg', 'gif', 'png'];

exports.config = config;

