var twitterRequest = require("./twitterRequest");

//result = twitterRequest.addHashtag("photography");

var tweetOne = {
    'id':1,
    'text': "hi",
    'image': "herp"
};
var tweetTwo= {
    'id':2,
    'text': "hi",
    'image': "herp"
};
var tweetThree = {
    'id':3,
    'text': "hi",
    'image': "herp"
};

var tweetFour = {
    'id':4,
    'text': "hi",
    'image': "herp"
};

var firstSet = [tweetOne, tweetTwo, tweetThree];
var secondSet = [tweetTwo, tweetThree, tweetFour];

twitterRequest.requestComplete(JSON.stringify({results: firstSet}), "photography");
twitterRequest.requestComplete(JSON.stringify({results: secondSet}), "photography");