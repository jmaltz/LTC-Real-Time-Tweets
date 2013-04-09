var fs = require('fs')
    , util = require('./util')
    , twitter = require('./twitterRequest')
    _ = require('underscore');
    

function index(response){
	
	fs.readFile(__dirname + '/../views/index.html', function(error, data){
		
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

function tweets(response, path, query){

    if(!query.hashtag){
        response.writeHead(400, {'Content-Type': 'text/Plain'});
        response.write('Error, you must supply a hashtag');
        response.end();
        return;
    }
    twitter.getHashtag(query.hashtag, function(error, res, body){
        
        if(error){
           response.writeHead(400, {'Content-Type': 'text/Plain'});
           response.write(error);
           response.end();
           return;
        }
        else{
            response.writeHead(res.statusCode, {'Content-Type': 'application/json'});
            response.write(body);
            response.end();
            return;
        }
    });
}

function admin(response){
	
	fs.readFile(__dirname  + '/../views/admin.html', function(error, data){
		
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

function asset(response, pathname){

    var imageTypes = ['jpeg', 'gif', 'png'];
    
	fs.readFile(__dirname + '/..' +pathname, function(error, data){

		if(!error){
			var assetType = util.getAssetType(pathname);
			if(assetType !== undefined && _.indexOf(imageTypes, assetType) === -1){
                response.writeHead(200, {'content-type': 'text/' + assetType});
			}
            else if(_.indexOf(imageTypes, assetType) >= 0){
               response.writeHead(200, {'content-type': 'image/' + assetType}) 
            }
			else{
                response.writeHead(200, {'content-type': 'text/plain'});
			}
			response.write(data);
		   	response.end();
		}
		else{
		    response.writeHead(500);
		    response.write("Error, that requested asset file wasn't stored");
		    response.end();
		}
    	});
}



exports.asset = asset;
exports.admin = admin;
exports.index = index;
exports.tweets = tweets;
