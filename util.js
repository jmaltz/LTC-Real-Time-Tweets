
function spliceArrayToLength(arrayToSplice, arrayToAdd){
    if (arrayToSplice.length == config.tweetsToCache){
	arrayToSplice.splice(config.tweetsToCache  - arrayToAdd.length, arrayToAdd.length);
    }else if(arrayToSplice.length + arrayToAdd.length > config.tweetsToCache){
	var combinedLen = arrayToSplice.length + arrayToAdd.length;
	var locationToStart = config.tweetsToCache - combinedLen;
	arrayToSplice.splice(locationToStart, locationToStart * -1);
    }
    for(var i = 0; i<arrayToSplice.length; i++){
	arrayToAdd.push(arrayToSplice[i]);
    }
    return arrayToAdd;
}


function filterUnicode(quoted){
    var escapable = /[\x00-\x1f\ud800-\udfff\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufff0-\uffff]/g;

    escapable.lastIndex = 0;
    if( !escapable.test(quoted)) return quoted;

    return quoted.replace( escapable, function(a){
	return '';
    });
}

function escapeAndEmitTweets(socket, tweetsToEmit, socketEvent){
    var stringifiedResults = JSON.stringify(tweetsToEmit);
    var cleanStringified = filterUnicode(stringifiedResults);
   
    socket.emit(socketEvent, {'new-tweets': cleanStringified});
}

exports.escapeandEmitTweets = escapeAndEmitTweets;
exports.spliceArrayToLength = spliceArrayToLength;
exports.filterUnicode = filterUnicode;