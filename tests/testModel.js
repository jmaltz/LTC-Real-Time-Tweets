var Model = require('../lib/tweetsModel.js');
var config = require('../lib/config.js').config;

console.log(Model.model);

var model = new Model.model(config.mongo);
model.connect();
