"use strict";
var simplified_html_extractor_1 = require("./extract/simplified-html-extractor");
var clean_text_extractor_1 = require("./extract/clean-text-extractor");
var image_url_extractor_1 = require("./extract/image-url-extractor");
var http_requestor_1 = require("./request/http-requestor");
var HTMLDecoct = (function () {
    function HTMLDecoct() {
        this.requestor = new http_requestor_1["default"]();
    }
    HTMLDecoct.prototype.getSimplifiedHTML = function (src, callback) {
        var html = this.isHTML(src);
        var extractor = new simplified_html_extractor_1["default"]();
        if (!html) {
            this.requestAndExtract(src, extractor, callback);
        }
        else {
            extractor.extract(src, callback);
        }
    };
    HTMLDecoct.prototype.getCleanHTML = function (src, callback) {
        var html = this.isHTML(src);
        var extractor = new clean_text_extractor_1["default"]();
        if (!html) {
            this.requestAndExtract(src, extractor, callback);
        }
        else {
            extractor.extract(src, callback);
        }
    };
    HTMLDecoct.prototype.getImages = function (src, callback) {
        var html = this.isHTML(src);
        var extractor = new image_url_extractor_1["default"]();
        if (!html) {
            this.requestAndExtract(src, extractor, callback);
        }
        else {
            extractor.extract(src, callback);
        }
    };
    HTMLDecoct.prototype.isHTML = function (src) {
        return src.match(HTMLDecoct.HTML_PATTERN);
    };
    HTMLDecoct.prototype.requestAndExtract = function (url, extractor, callback) {
        this.requestor.request(url, function (err, html) {
            if (err) {
                callback(err, null);
            }
            else {
                extractor.extract(html, callback);
            }
        });
    };
    HTMLDecoct.HTML_PATTERN = /^\s*</;
    return HTMLDecoct;
}());
exports.__esModule = true;
exports["default"] = HTMLDecoct;
//# sourceMappingURL=index.js.map