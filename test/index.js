"use strict";
/// <reference path='../typings/mocha/mocha.d.ts' />
/// <reference path='../typings/sinon/sinon.d.ts' />
/// <reference path='../typings/should/should.d.ts' />
/// <reference path='../typings/proxyquire/proxyquire.d.ts' />
var sinon = require('sinon');
var should = require('should');
var proxyquire = require('proxyquire');
var requestStub;
var extractStub;
var SimplifiedHTMLExtractor = (function () {
    function SimplifiedHTMLExtractor() {
    }
    SimplifiedHTMLExtractor.prototype.extract = function (html, callback) {
        extractStub(html, callback);
    };
    return SimplifiedHTMLExtractor;
}());
var CleanTextExtractor = (function () {
    function CleanTextExtractor() {
    }
    CleanTextExtractor.prototype.extract = function (html, callback) {
        extractStub(html, callback);
    };
    return CleanTextExtractor;
}());
var ImageURLExtractor = (function () {
    function ImageURLExtractor() {
    }
    ImageURLExtractor.prototype.extract = function (html, callback) {
        extractStub(html, callback);
    };
    return ImageURLExtractor;
}());
var HTTPRequestor = (function () {
    function HTTPRequestor() {
    }
    HTTPRequestor.prototype.request = function (url, callback) {
        requestStub(url, callback);
    };
    return HTTPRequestor;
}());
describe('HTMLDecoct', function () {
    var HTMLDecoct = proxyquire('../src/index', {
        './extract/simplified-html-extractor': mockDefaultWrapped(SimplifiedHTMLExtractor),
        './extract/clean-text-extractor': mockDefaultWrapped(CleanTextExtractor),
        './extract/image-url-extractor': mockDefaultWrapped(ImageURLExtractor),
        './request/http-requestor': mockDefaultWrapped(HTTPRequestor)
    })['default'];
    var decoct = new HTMLDecoct();
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
    describe('#getImageURLs', function () {
        describe('with URL src', function () {
            it('extracts image URLs when requestor succeeds', function (done) {
                requestStub = sinon.stub().yields(null, '<html>some HTML</html>');
                decoct.getImageURLs('some URL', function (err, result) {
                    sinon.assert.calledOnce(requestStub);
                    sinon.assert.calledWith(extractStub, '<html>some HTML</html>');
                    should.not.exist(err);
                    should.exist(result);
                    done();
                });
            });
            it('does not extracts image URLs when requestor fails', function (done) {
                requestStub = sinon.stub().yields('some error');
                decoct.getImageURLs('some URL', function (err, result) {
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
                decoct.getImageURLs('<html>some HTML</html>', function (err, result) {
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
function mockDefaultWrapped(defaultValue) {
    var wrapper = {
        'default': defaultValue
    };
    return wrapper;
}
//# sourceMappingURL=index.js.map