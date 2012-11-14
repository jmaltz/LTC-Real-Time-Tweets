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

var firstSet = [tweetOne, tweetTwo];
var secondSet = [tweetTwo, tweetThree];

var arrayToLength = twitterRequest.spliceArrayToLength(new Array(), firstSet);
console.log(arrayToLength);
arrayToLength = twitterRequest.spliceArrayToLength(arrayToLength, secondSet);
console.log(arrayToLength);
