
function appendTweets(tweetsToAppend){
    var newTweets = tweetsToAppend["new-tweets"];
    try{
	tweetsToAppend = JSON.parse(newTweets);
    }catch(error){
	console.log("JSON Error");
	return;
    }
    for(var i = 0; i < tweetsToAppend.length; i++){
	$('#tweets-content').prepend($('<div class="tweet">' +
			    '<button class="btn btn-success approve-btn">Approve</button>' +
			    '<div class="left-image pull-left"> ' +
			    '<img src="' + tweetsToAppend[i].image + '"/>' +
			    '</div>' +
			    '<div class="individual-tweet">' +
			    '<div class="user">' + tweetsToAppend[i].from +
			    '</div>' +
			    '<div class="tweet-content">' +
			    tweetsToAppend[i].text +
			    '</div>' +
			    '</div>' +
			       '</div>').fadeIn('fast'));
    }    
}

function appendApproved(tweetToAppend, appendTo){
    appendTo.prepend($('<div class="tweet">'+
		       '<div class="approved-tweet">' +
		       '<div class="left-image pull-left">' +
		       '<img src="' + tweetToAppend.image +'"/>' +
		       '</div>' +
		       '<div class="approved-information">' +
		       '<div class="user">' + tweetToAppend.username + '</div>' +
		       '<div class="individual-tweet">' + tweetToAppend.tweet + '</div>'+
		       '</div>').fadeIn('fast'));
		       

}