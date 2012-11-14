var io = require("socket.io"),
twitterRequest = require("./twitterRequest");
var server = null;

function listenOnServer(serverToListen){
    server = io.listen(serverToListen);
    server.sockets.on('connection', onConnectionReceived);
}

function onConnectionReceived(socket){
    socket.on('subscribe', function(message){
				twitterRequest.subscribe(message.hashtag, socket);	
    });

    socket.on('approve', function(message){
	var approvedHashtag = message.hashtag;
	var approvedTweet = message.tweet;
	socket.broadcast.emit('approved', approvedTweet);
	twitterRequest.addApprovedTweet(approvedHashtag, approvedTweet);
    });
}


exports.listen = listenOnServer;