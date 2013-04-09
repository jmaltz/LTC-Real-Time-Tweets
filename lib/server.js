var http = require("http"),
url = require("url"),
sockets = require("./sockets");

function startup(router, handlers){
	
	var server = http.createServer(function(request, response){
	    var parsedUrl = url.parse(request.url, true); 
        var query = parsedUrl.query;
	    router.route(parsedUrl.pathname, query, handlers, response);
	});
	sockets.listen(server);
	
	var port = process.env.PORT || 8080;
	server.listen(port);
}

exports.startServer = startup;

