var io = require("socket.io"),
twitterRequest = require("./twitterRequest");
var server = null;

function listenOnServer(serverToListen){

	server = io.listen(serverToListen, {'transports': ['xhr-polling']											 
					,'Polling Duration': 10});
	server.sockets.on('connection', onConnectionReceived);
	server.of('/indexSocket')
	.on('connection', function(socket){
		console.log('Got a connection on /test');
	});
}

function onConnectionReceived(socket){

	socket.on('subscribe', function(message){
		twitterRequest.subscribe(message.hashtag, socket);	
	});

	socket.on('get-cache', function(message){
		var allApproved = twitterRequest.getApprovedTweets();
		for(var i = 0; i<allApproved.length; i++){
			socket.emit('approved', allApproved[i]);
		}
	});

	socket.on('disconnect', function(){
		twitterRequest.removeSocket(this);
	});

	socket.on('approve', function(message){
		var approvedHashtag = message.hashtag;
		var approvedTweet = message.tweet;
		var sockets = twitterRequest.getSocketsForHashtag(approvedHashtag);
		socket.broadcast.emit('approved', approvedTweet);

		for(var i = 0; i < sockets.length; i++){
			socket.broadcast.emit('approved', approvedTweet);
		}
		
		socket.emit('approved', approvedTweet, {
			that: 'only'
			,'/indexSocket': 'will get'
		});

		twitterRequest.addApprovedTweet(approvedHashtag.toLowerCase(), approvedTweet);
	});
}


exports.listen = listenOnServer;
