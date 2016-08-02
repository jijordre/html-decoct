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
describe('HTMLDecoct', function () {
    var SimplifiedHTMLExtractor = null;
    var CleanTextExtractor = null;
    var ImageURLExtractor = null;
    var HTTPRequestor = null;
    var decoct = null;
    beforeEach(function () {
        requestStub = sinon.stub().yields(null, {});
        extractStub = sinon.stub().yields(null, {});
        SimplifiedHTMLExtractor = mockSimplifiedHTMLExtractor();
        CleanTextExtractor = mockCleanTextExtractor();
        ImageURLExtractor = mockImageURLExtractor();
        HTTPRequestor = mockHTTPRequestor();
        var HTMLDecoct = proxyquire('../src/index', {
            './extract/simplified-html-extractor': SimplifiedHTMLExtractor,
            './extract/clean-text-extractor': CleanTextExtractor,
            './extract/image-url-extractor': ImageURLExtractor,
            './request/http-requestor': HTTPRequestor
        })['default'];
        decoct = new HTMLDecoct();
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
function mockSimplifiedHTMLExtractor() {
    var SimplifiedHTMLExtractor = (function () {
        function SimplifiedHTMLExtractor() {
        }
        SimplifiedHTMLExtractor.prototype.extract = function (html, callback) {
            extractStub(html, callback);
        };
        return SimplifiedHTMLExtractor;
    }());
    return mockDefaultWrapped(SimplifiedHTMLExtractor);
}
function mockCleanTextExtractor() {
    var CleanTextExtractor = (function () {
        function CleanTextExtractor() {
        }
        CleanTextExtractor.prototype.extract = function (html, callback) {
            extractStub(html, callback);
        };
        return CleanTextExtractor;
    }());
    return mockDefaultWrapped(CleanTextExtractor);
}
function mockImageURLExtractor() {
    var ImageURLExtractor = (function () {
        function ImageURLExtractor() {
        }
        ImageURLExtractor.prototype.extract = function (html, callback) {
            extractStub(html, callback);
        };
        return ImageURLExtractor;
    }());
    return mockDefaultWrapped(ImageURLExtractor);
}
function mockHTTPRequestor() {
    var HTTPRequestor = (function () {
        function HTTPRequestor() {
        }
        HTTPRequestor.prototype.request = function (url, callback) {
            requestStub(url, callback);
        };
        return HTTPRequestor;
    }());
    return mockDefaultWrapped(HTTPRequestor);
}
function mockDefaultWrapped(defaultValue) {
    var wrapper = {
        'default': defaultValue
    };
    return wrapper;
}
//# sourceMappingURL=index.js.map