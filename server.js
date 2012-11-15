var http = require("http"),
url = require("url"),
sockets = require("./sockets");


function startup(router, handlers){

		http.createServer(function(request, response){
				var parsedUrl = url.parse(request.url); 
				router.route(parsedUrl.pathname, handlers, response);
		});

}