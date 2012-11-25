var util = require("../lib/util");

var pathname = "/css/herpderp.css"
var pathnameJs = "/js/herpder.js"
console.log(util.getAssetType(pathname));
console.log(util.getAssetType(pathnameJs));
