function appendTweets(tweetsToAppend){
    var newTweets = tweetsToAppend["new-tweets"], html;

    try {
    
       tweetsToAppend = JSON.parse(newTweets);
    
    } catch(error) {
    
        console.log("JSON Error");
        return;

    }
    

    for(var i = 0; i < tweetsToAppend.length; i++) {
				adminTweets.add(tweetsToAppend[i]);
    }
}

function appendApproved(tweetToAppend, appendTo) {
    var html;
    
    html = '<div class="tweet">'+
             '<div class="approved-tweet">' +
               '<div class="left-image pull-left">' +
                 '<img src="' + tweetToAppend.image +'">' +
               '</div>' +
             '</div>' +
             '<div class="approved-information">' +
               '<div class="user">' + tweetToAppend.username + '</div>' +
               '<div class="individual-tweet">' + tweetToAppend.tweet.text + '</div>'+
             '</div>' +
           '</div>';

    appendTo.prepend(html);
}

function displayTweets(tweetToAppend) {

    var html = '<div class="tweet">' +
                 '<div class="approved-tweet">' +
                   '<div class="approved-information">' +
                     '<div class="user">@' + tweetToAppend.username + '</div>' +
                     '<div class="individual-tweet">' + tweetToAppend.text + '</div>' +
                   '</div>' +
                 '</div>' +
               '</div>';

    $('#tweets .tweet').fadeOut();

    $('#tweets').html(html).fadeIn();
}
