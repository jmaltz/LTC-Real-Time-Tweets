function appendTweets(tweetsToAppend){
    var newTweets = tweetsToAppend["new-tweets"];
    console.log(newTweets + " is newTweets");
    try{
	tweetsToAppend = JSON.parse(newTweets);
    }catch(error){
	console.log("JSON Error");
    }
    for(var i = 0; i < 2 && i < tweetsToAppend.length; i++){
	$('#tweets').append('<div class="tweet">' +
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
			    '</div>');
    }
    
}