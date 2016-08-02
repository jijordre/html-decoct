"use strict";
var SimplifiedHTMLExtractor = (function () {
    function SimplifiedHTMLExtractor() {
    }
    SimplifiedHTMLExtractor.prototype.extract = function (html, callback) {
        console.log('Logging from SimplifiedHTMLExtractor.extract()');
        callback(null, null);
    };
    return SimplifiedHTMLExtractor;
}());
exports.__esModule = true;
exports["default"] = SimplifiedHTMLExtractor;
//# sourceMappingURL=simplified-html-extractor.js.map