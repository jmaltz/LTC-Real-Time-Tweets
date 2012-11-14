
function appendTweets(tweetsToAppend){
    var newTweets = tweetsToAppend["new-tweets"];
    try{
	tweetsToAppend = JSON.parse(newTweets);
    }catch(error){
	console.log("JSON Error");
    }
    for(var i = 0; i < 2 && i < tweetsToAppend.length; i++){
	$('#tweets').prepend($('<div class="tweet">' +
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
			       '</div>').fadein('fast'));
    }
    
}