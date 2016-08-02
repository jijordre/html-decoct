import Extractor from "./extractor";

export default class CleanTextExtractor implements Extractor {

    constructor() {
    }

    extract(html:string, callback:(err:any, result:any) => void):void {
        callback(null, null);
    }
}