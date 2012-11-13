var request = require('request');


request('https://api.twitter.com/1.1/search/tweets.json?q=%23cantstopthesignal', function(error, response, body){
    console.log(body);

});