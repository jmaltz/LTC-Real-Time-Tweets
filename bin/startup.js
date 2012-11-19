var router = require("../lib/router");
var handlers = require("../lib/handlers");
var server = require("../lib/server");

var requestHandlers = {};
requestHandlers["/"] = handlers.index;
requestHandlers["/index"] = handlers.index;
requestHandlers["/admin"] = handlers.admin;
requestHandlers["/js"] = handlers.asset;
requestHandlers["/css"] = handlers.asset

server.startServer(router, requestHandlers);