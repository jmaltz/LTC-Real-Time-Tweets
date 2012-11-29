var io = require("socket.io"),
twitterRequest = require("./twitterRequest");
var server = null;

function listenOnServer(serverToListen){

    server = io.listen(serverToListen, {'transports': ['xhr-polling'],
																			 'Polling Duration': 10});
    server.sockets.on('connection', onConnectionReceived);
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
				socket.broadcast.emit('approved', approvedTweet);
				twitterRequest.addApprovedTweet(approvedHashtag.toLowerCase(), approvedTweet);
    });
}


exports.listen = listenOnServer;