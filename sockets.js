var io = require("socket.io"),
twitterRequest = require("./twitterRequest");
var server = null;

function listenOnServer(serverToListen){
    server = io.listen(serverToListen);
    server.sockets.on('connection', onConnectionReceived);
}

function onConnectionReceived(socket){
    socket.on('subscribe', function(message){
				var messageReceived = JSON.parse(message);
				
				twitterRequest.subscribeToHashtag(messageReceived.hashtag, socket);	
    });

		socket.on('approve', function(message){
				socket.broadcast.emit('approved', message);
		});
}


exports.listen = listenOnServer;