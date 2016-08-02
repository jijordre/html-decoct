/// <reference path='../typings/mocha/mocha.d.ts' />
/// <reference path='../typings/sinon/sinon.d.ts' />
/// <reference path='../typings/should/should.d.ts' />
/// <reference path='../typings/proxyquire/proxyquire.d.ts' />
import sinon = require('sinon');
import should = require('should');
import proxyquire = require('proxyquire');
import Requestor from "../src/request/requestor";
import Extractor from "../src/extract/extractor";

interface HTMLDecoct {
    getSimplifiedHTML(src:string, callback:(err:any, result:any) => void):void;
    getCleanHTML(src:string, callback:(err:any, result:any) => void):void;
    getImages(src:string, callback:(err:any, result:any) => void):void;
}

let requestStub;
let extractStub;

class SimplifiedHTMLExtractor implements Extractor {
    extract(html:string, callback:(err:any, result:any)=>void):void {
        extractStub(html, callback);
    }
}

class CleanTextExtractor implements Extractor {
    extract(html:string, callback:(err:any, result:any)=>void):void {
        extractStub(html, callback);
    }
}

class ImageURLExtractor implements Extractor {
    extract(html:string, callback:(err:any, result:any)=>void):void {
        extractStub(html, callback);
    }
}

class HTTPRequestor implements Requestor {
    request(url:string, callback:(err:any, result:any)=>void):void {
        requestStub(url, callback);
    }
}

interface DefaultWrapped<T> {
    'default':T
}

describe('HTMLDecoct', function () {

    let HTMLDecoct = proxyquire('../src/index', {
        './extract/simplified-html-extractor': mockDefaultWrapped(SimplifiedHTMLExtractor),
        './extract/clean-text-extractor': mockDefaultWrapped(CleanTextExtractor),
        './extract/image-url-extractor': mockDefaultWrapped(ImageURLExtractor),
        './request/http-requestor': mockDefaultWrapped(HTTPRequestor)
    })['default'];

    let decoct:HTMLDecoct = new HTMLDecoct();

    beforeEach(function () {
        requestStub = sinon.stub().yields(null, {});
        extractStub = sinon.stub().yields(null, {});
    });

    describe('#getSimplifiedHTML', function () {

        describe('with URL src', function () {

            it('extracts simplified HTML when requestor succeeds', function (done) {
                requestStub = sinon.stub().yields(null, '<html>some HTML</html>');
                decoct.getSimplifiedHTML('some URL', function (err, result) {
                    sinon.assert.calledOnce(requestStub);
                    sinon.assert.calledWith(extractStub, '<html>some HTML</html>');
                    should.not.exist(err);
                    should.exist(result);
                    done();
                });
            });

            it('does not extract simplified HTML when requestor fails', function (done) {
                requestStub = sinon.stub().yields('some error');
                decoct.getSimplifiedHTML('some URL', function (err, result) {
                    sinon.assert.calledOnce(requestStub);
                    sinon.assert.notCalled(extractStub);
                    err.should.equal('some error');
                    should.not.exist(result);
                    done();
                });
            });
        });

        describe('with HTML src', function () {

            it('extracts simplified HTML', function (done) {
                decoct.getSimplifiedHTML('<html>some HTML</html>', function (err, result) {
                    sinon.assert.notCalled(requestStub);
                    sinon.assert.calledOnce(extractStub);
                    should.not.exist(err);
                    should.exist(result);
                    done();
                });
            });
        });
    });

    describe('#getCleanHTML', function () {

        describe('with URL src', function () {

            it('extracts clean HTML when requestor succeeds', function (done) {
                requestStub = sinon.stub().yields(null, '<html>some HTML</html>');
                decoct.getCleanHTML('some URL', function (err, result) {
                    sinon.assert.calledOnce(requestStub);
                    sinon.assert.calledWith(extractStub, '<html>some HTML</html>');
                    should.not.exist(err);
                    should.exist(result);
                    done();
                });
            });

            it('does not extract clean HTML when requestor fails', function (done) {
                requestStub = sinon.stub().yields('some error');
                decoct.getCleanHTML('some URL', function (err, result) {
                    sinon.assert.calledOnce(requestStub);
                    sinon.assert.notCalled(extractStub);
                    err.should.equal('some error');
                    should.not.exist(result);
                    done();
                });
            });
        });

        describe('with HTML src', function () {

            it('extracts clean HTML', function (done) {
                decoct.getCleanHTML('<html>some HTML</html>', function (err, result) {
                    sinon.assert.notCalled(requestStub);
                    sinon.assert.calledOnce(extractStub);
                    should.not.exist(err);
                    should.exist(result);
                    done();
                });
            });
        });
    });

    describe('#getImages', function () {

        describe('with URL src', function () {

            it('extracts image URLs when requestor succeeds', function (done) {
                requestStub = sinon.stub().yields(null, '<html>some HTML</html>');
                decoct.getImages('some URL', function (err, result) {
                    sinon.assert.calledOnce(requestStub);
                    sinon.assert.calledWith(extractStub, '<html>some HTML</html>');
                    should.not.exist(err);
                    should.exist(result);
                    done();
                });
            });

            it('does not extracts image URLs when requestor fails', function (done) {
                requestStub = sinon.stub().yields('some error');
                decoct.getImages('some URL', function (err, result) {
                    sinon.assert.calledOnce(requestStub);
                    sinon.assert.notCalled(extractStub);
                    err.should.equal('some error');
                    should.not.exist(result);
                    done();
                });
            });
        });

        describe('with HTML src', function () {

            it('extracts image URLs', function (done) {
                decoct.getImages('<html>some HTML</html>', function (err, result) {
                    sinon.assert.notCalled(requestStub);
                    sinon.assert.calledOnce(extractStub);
                    should.not.exist(err);
                    should.exist(result);
                    done();
                });
            });
        });
    });
});

function mockDefaultWrapped<T>(defaultValue:T):DefaultWrapped<T> {
    let wrapper:DefaultWrapped<T> = {
        'default': defaultValue
    };
    return wrapper;
}