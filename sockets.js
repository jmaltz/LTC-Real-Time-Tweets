var io = require("socket.io"),
twitterRequest = require("./twitterRequest");
var server = null;



function listenOnServer(serverToListen){
    io.listen(serverToListen);
    io.sockets.on('connection', onConnectionReceived);
}

function onConnectionReceived(socket){
    socket.on('subscribe', function(message){
	var messageReceived = JSON.parse(message);
	twitterRequest.subscribeToHashtag(messageReceived.hashtag, socket);	
    }
}

exports.listen = listenOnServer;