function route(path, handlers, response){
		if(typeof handlers[path] == 'function'){
				handlers[path](response);
		}
		else{
				response.writeHead(404, {'Content-Type': 'text/HTML'});
				response.write('Error: That page was not found');
				response.end();
		}
}

exports.route = route;