var router = require("../router");
var handlers = require("../handlers");
var server = require("../server");

var requestHandlers = {};
requestHandlers["/"] = handlers.index;
requestHandlers["/index"] = handlers.index;
requestHandlers["/admin"] = handlers.admin;

server.startServer(router, requestHandlers);