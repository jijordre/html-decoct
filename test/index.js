"use strict";
/// <reference path='../typings/mocha/mocha.d.ts' />
/// <reference path='../typings/sinon/sinon.d.ts' />
/// <reference path='../typings/should/should.d.ts' />
/// <reference path='../typings/proxyquire/proxyquire.d.ts' />
var sinon = require('sinon');
var should = require('should');
var proxyquire = require('proxyquire');
describe('HTMLDecoct', function () {
    var SimplifiedHTMLExtractor = null;
    var CleanTextExtractor = null;
    var ImageURLExtractor = null;
    var HTTPRequestor = null;
    var decoct = null;
    beforeEach(function () {
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
                HTTPRequestor.default.prototype.request = sinon.stub().yields(null, '<html>some HTML</html>');
                decoct.getSimplifiedHTML('some URL', function (err, result) {
                    sinon.assert.calledOnce(HTTPRequestor.default.prototype.request);
                    sinon.assert.calledWith(SimplifiedHTMLExtractor.default.prototype.extract, '<html>some HTML</html>');
                    should.not.exist(err);
                    should.exist(result);
                    done();
                });
            });
            it('does not extract simplified HTML when requestor fails', function (done) {
                HTTPRequestor.default.prototype.request = sinon.stub().yields('some error');
                decoct.getSimplifiedHTML('some URL', function (err, result) {
                    sinon.assert.calledOnce(HTTPRequestor.default.prototype.request);
                    sinon.assert.notCalled(SimplifiedHTMLExtractor.default.prototype.extract);
                    err.should.equal('some error');
                    should.not.exist(result);
                    done();
                });
            });
        });
        describe('with HTML src', function () {
            it('extracts simplified HTML', function (done) {
                decoct.getSimplifiedHTML('<html>some HTML</html>', function (err, result) {
                    sinon.assert.notCalled(HTTPRequestor.default.prototype.request);
                    sinon.assert.calledOnce(SimplifiedHTMLExtractor.default.prototype.extract);
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
                HTTPRequestor.default.prototype.request = sinon.stub().yields(null, '<html>some HTML</html>');
                decoct.getCleanHTML('some URL', function (err, result) {
                    sinon.assert.calledOnce(HTTPRequestor.default.prototype.request);
                    sinon.assert.calledWith(CleanTextExtractor.default.prototype.extract, '<html>some HTML</html>');
                    should.not.exist(err);
                    should.exist(result);
                    done();
                });
            });
            it('does not extract clean HTML when requestor fails', function (done) {
                HTTPRequestor.default.prototype.request = sinon.stub().yields('some error');
                decoct.getCleanHTML('some URL', function (err, result) {
                    sinon.assert.calledOnce(HTTPRequestor.default.prototype.request);
                    sinon.assert.notCalled(CleanTextExtractor.default.prototype.extract);
                    err.should.equal('some error');
                    should.not.exist(result);
                    done();
                });
            });
        });
        describe('with HTML src', function () {
            it('extracts clean HTML', function (done) {
                decoct.getCleanHTML('<html>some HTML</html>', function (err, result) {
                    sinon.assert.notCalled(HTTPRequestor.default.prototype.request);
                    sinon.assert.calledOnce(CleanTextExtractor.default.prototype.extract);
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
                HTTPRequestor.default.prototype.request = sinon.stub().yields(null, '<html>some HTML</html>');
                decoct.getImages('some URL', function (err, result) {
                    sinon.assert.calledOnce(HTTPRequestor.default.prototype.request);
                    sinon.assert.calledWith(ImageURLExtractor.default.prototype.extract, '<html>some HTML</html>');
                    should.not.exist(err);
                    should.exist(result);
                    done();
                });
            });
            it('does not extracts image URLs when requestor fails', function (done) {
                HTTPRequestor.default.prototype.request = sinon.stub().yields('some error');
                decoct.getImages('some URL', function (err, result) {
                    sinon.assert.calledOnce(HTTPRequestor.default.prototype.request);
                    sinon.assert.notCalled(ImageURLExtractor.default.prototype.extract);
                    err.should.equal('some error');
                    should.not.exist(result);
                    done();
                });
            });
        });
        describe('with HTML src', function () {
            it('extracts image URLs', function (done) {
                decoct.getImages('<html>some HTML</html>', function (err, result) {
                    sinon.assert.notCalled(HTTPRequestor.default.prototype.request);
                    sinon.assert.calledOnce(ImageURLExtractor.default.prototype.extract);
                    should.not.exist(err);
                    should.exist(result);
                    done();
                });
            });
        });
    });
});
function mockSimplifiedHTMLExtractor() {
    var extractor = (function () {
        function SimplifiedHTMLExtractor() {
        }
        SimplifiedHTMLExtractor.prototype.extract = sinon.stub().yields(null, {});
        return SimplifiedHTMLExtractor;
    }());
    return mockDefaultWrapped(extractor);
}
function mockCleanTextExtractor() {
    var extractor = (function () {
        function CleanTextExtractor() {
        }
        CleanTextExtractor.prototype.extract = sinon.stub().yields(null, {});
        return CleanTextExtractor;
    }());
    return mockDefaultWrapped(extractor);
}
function mockImageURLExtractor() {
    var extractor = (function () {
        function ImageURLExtractor() {
        }
        ImageURLExtractor.prototype.extract = sinon.stub().yields(null, {});
        return ImageURLExtractor;
    }());
    return mockDefaultWrapped(extractor);
}
function mockHTTPRequestor() {
    var requestor = (function () {
        function HTTPRequestor() {
        }
        HTTPRequestor.prototype.request = sinon.stub().yields(null, {});
        return HTTPRequestor;
    }());
    return mockDefaultWrapped(requestor);
}
function mockDefaultWrapped(defaultValue) {
    var wrapper = {
        'default': defaultValue
    };
    return wrapper;
}
//# sourceMappingURL=index.js.map