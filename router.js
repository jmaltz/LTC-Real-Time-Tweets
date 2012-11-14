function route(path, handlers, response){
    if(path.indexOf("/js") === 0){
	console.log("are we here??");
	handlers['/js'](response, path);
    }		   	
    else if(typeof handlers[path] == 'function'){
	handlers[path](response);
    }
    else{
	response.writeHead(404, {'Content-Type': 'text/HTML'});
	response.write('Error: That page was not found');
	response.end();
    }
}

exports.route = route;