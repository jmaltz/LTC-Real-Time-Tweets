var twitterRequest = require("./twitterRequest");

console.log(twitterRequest.addHashtag);
var result = twitterRequest.addHashtag("hello");
console.log("result 1 is " + result);
result = twitterRequest.addHashtag("hello");
console.log("result 2 is " + result);
result = twitterRequest.addHashtag("goodbye");
console.log("result 3 is " + result);

