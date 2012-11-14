var fs = require("fs");

function index(response){
		fs.readFile(__dirname + '/views/index.html', function(error, data){
				if(error){
						response.writeHead(500, {'Content-Type': 'text/HTML'});
						response.write('Error, an error occurred while loading the requested page, please try again');
						response.end();
				}
				else{
						response.writeHead(200, {'Content-Type':'text/HTML'});
						response.write(data);
						response.end();
				}
		});
}

function admin(response){
		fs.readFile(__dirname  + '/views/admin.html', function(error, data){
				if(error){
						response.writeHead(500, {'Content-Type': 'text/HTML'});
						response.write('Error: an error occurred while loading the requested page, please try again');
						response.end();
				}
				else{
						response.writeHead(200, {'Content-Type':'text/HTML'});
						response.write(data);
						response.end();
				}
		});
}

function javascript(response, pathname){
    fs.readFile(__dirname + pathname, function(error, data){
	if(!error){
	    response.writeHead(200);
	    response.write(data);
	    response.end();
	}
	else{
	    response.writeHead(500);
	    response.write("Error, that requested javascript file wasn't stored");
	    response.end();
	}

    });

}

exports.javascript = javascript;
exports.admin = admin;
exports.index = index;