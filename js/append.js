function appendApproved(tweetToAppend, appendTo) {
    var html;
    
    html = '<div class="tweet">'+
             '<div class="approved-tweet">' +
               '<div class="left-image pull-left">' +
                 '<img src="' + tweetToAppend.image +'">' +
               '</div>' +
             '<div class="approved-information">' +
               '<div class="user">' + tweetToAppend.username + '</div>' +
               '<div class="individual-tweet">' + tweetToAppend.tweet + '</div>'+
             '</div>';

    appendTo.prepend(html);
}


function appendTweets(tweetsToAppend){
    var newTweets = tweetsToAppend["new-tweets"];

    try {
	
	   tweetsToAppend = JSON.parse(newTweets);
    
    } catch(error) {
    
    	console.log("JSON Error");
    	return;
    
    }

    var i = Math.floor( (Math.random() * tweetsToAppend.length) + 1 );

    var html = '<div class="tweet">' +
                 '<button class="btn btn-success approve-btn">Approve</button>' +
                 '<div class="left-image pull-left">' +
                    '<img src="' + tweetsToAppend[i].image + '">' +
                 '</div>' +
                 '<div class="individual-tweet">' +
                   '<div class="user">' + tweetsToAppend[i].from + '</div>' +
                   '<div class="tweet-content">' + tweetsToAppend[i].text + '</div>' +
                 '</div>' +
               '</div>';


    $('#tweets-content').html(html);
}

