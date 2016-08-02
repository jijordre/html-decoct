import {Extractor} from "./extractor";

export default class SimplifiedHTMLExtractor implements Extractor {

    constructor() {
    }

    extract(html:string, callback:(err:any, result:any) => void):void {
        console.log('Logging from SimplifiedHTMLExtractor.extract()');
        callback(null, null);
    }
}