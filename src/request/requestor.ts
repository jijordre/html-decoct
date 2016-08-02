interface Requestor {
    request(url:string, callback:(err:any, result:any) => void):void;
}
export default Requestor;