interface Extractor {
    extract(html:string, callback:(err:any, result:any) => void):void;
}
export default Extractor;