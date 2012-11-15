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

exports.admin = admin;
exports.index = index;