import Extractor from "./extract/extractor";
import SimplifiedHTMLExtractor from "./extract/simplified-html-extractor";
import CleanTextExtractor from "./extract/clean-text-extractor";
import ImageURLExtractor from "./extract/image-url-extractor";
import Requestor from "./request/requestor";
import HTTPRequestor from "./request/http-requestor";

export default class HTMLDecoct {

    private static HTML_PATTERN = /^\s*</;

    private requestor:Requestor = new HTTPRequestor();

    getSimplifiedHTML(src:string, callback:(err:any, result:any) => void):void {
        let html = this.isHTML(src);
        let extractor:Extractor = new SimplifiedHTMLExtractor();
        if (!html) {
            this.requestAndExtract(src, extractor, callback);
        } else {
            extractor.extract(src, callback)
        }
    }

    getCleanHTML(src:string, callback:(err:any, result:any) => void):void {
        let html = this.isHTML(src);
        let extractor:Extractor = new CleanTextExtractor();
        if (!html) {
            this.requestAndExtract(src, extractor, callback);
        } else {
            extractor.extract(src, callback)
        }
    }

    getImageURLs(src:string, callback:(err:any, result:any) => void):void {
        let html = this.isHTML(src);
        let extractor:Extractor = new ImageURLExtractor();
        if (!html) {
            this.requestAndExtract(src, extractor, callback);
        } else {
            extractor.extract(src, callback)
        }
    }

    private isHTML(src:string) {
        return src.match(HTMLDecoct.HTML_PATTERN);
    }

    private requestAndExtract(url:string, extractor:Extractor, callback:(err:any, result:any) => void):void {
        this.requestor.request(url, function (err:any, html:any) {
            if (err) {
                callback(err, null);
            } else {
                extractor.extract(html, callback);
            }
        });
    }
}