function route(path, query, handlers, response){

    var route = path.match(/\/[a-zA-Z]*/)[0];
    if(route.indexOf('/js') === 0){
        handlers['/js'](response, path);
    }
    else if(route.indexOf('/css') === 0){
        handlers['/css'](response, path);
    }
    else if(route.indexOf('/img') === 0){
        handlers['/img'](response, path);
    }
    else if(typeof handlers[route] == 'function'){
        handlers[route](response, path, query);
    }
    else{
        response.writeHead(404, {'Content-Type': 'text/HTML'});
        response.write('Error: That page was not found');
        response.end();
    }
}

exports.route = route;
