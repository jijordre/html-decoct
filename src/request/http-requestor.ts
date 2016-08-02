import Requestor from './requestor';

export default class HTTPRequestor implements Requestor {
    request(url:string, callback:(err:any, result:any)=>void):void {
    }
}