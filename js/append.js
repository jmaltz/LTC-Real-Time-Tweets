function appendTweets(tweetsToAppend){
    var newTweets = tweetsToAppend["new-tweets"];
    console.log(newTweets + " is newTweets");
    try{
	tweetsToAppend = JSON.parse(newTweets);
    }catch(error){
	console.log("JSON Error");
    }
    for(var i = 0; i < tweetsToAppend.length; i++){
	console.log("Looping like a bawz");
	$('#tweets').append('<div class="tweet">' +
			    '<div class="left-image"> ' +
			    '<img src="' + tweetsToAppend[i].image + '"/>' +
			    '</div>' +
			    '<div class="individual-tweet">' +
			    '<div class="user">' + tweetsToAppend[i] +
			    '</div>' +
			    '<div class="tweet-content">' +
			    tweetsToAppend[i].text +
			    '</div>' +
			    '</div>' +
			    '</div>');
    }
    
}