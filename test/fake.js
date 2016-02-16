'use strict';

const expect = require('chai').expect;
require('co-mocha');

const FakeExpressHttp = require('../fake-express-http');

const Controller = require('./controller');

describe('fake', () => {
  describe('response', () => {
    describe('end', () => {
      it('should return 200', function *() {
        const controller = Controller();

        const http = FakeExpressHttp();
        http.request.url = '/end';
        controller(http.request, http.response);

        yield http.response.onEnd();
        expect(http.response.statusCode).to.equal(200);
      });
    });

    describe('status', () => {
      it('should return the status code', function *() {
        const controller = Controller();

        const http = FakeExpressHttp();
        http.request.url = '/status';
        controller(http.request, http.response);

        yield http.response.onEnd();
        expect(http.response.statusCode).to.equal(203);
      });
    });

    describe('sendStatus', () => {
      it('should return the status code', function *() {
        const controller = Controller();

        const http = FakeExpressHttp();
        http.request.url = '/send-status';
        controller(http.request, http.response);

        yield http.response.onEnd();
        expect(http.response.statusCode).to.equal(204);
      });
    });

    describe('send', () => {
      it('should send a body', function *() {
        const controller = Controller();

        const http = FakeExpressHttp();
        http.request.url = '/send';
        controller(http.request, http.response);

        yield http.response.onEnd();
        expect(http.response.content).to.equal('Send it my way.');
      });
    });

    describe('json', () => {
      it('should send a json body', function *() {
        const controller = Controller();

        const http = FakeExpressHttp();
        http.request.url = '/json';
        controller(http.request, http.response);

        yield http.response.onEnd();
        expect(http.response.statusCode).to.equal(200);
        expect(http.response.headers['content-type']).to.equal('application/json');
        expect(http.response.content).to.equal(JSON.stringify({
          content: 'I am a JSON document.'
        }));
      });
    });
  });

  describe('request', () => {
    describe('is', () => {
      it('returns the content type on match', function *() {
        const controller = Controller();

        const http = FakeExpressHttp();
        http.request.method = 'POST';
        http.request.url = '/is';
        http.request.headers['content-type'] = 'made/up';
        controller(http.request, http.response);

        yield http.response.onEnd();
        expect(http.response.content).to.equal('made/up');
      });

      it('returns false when content type does not match', function *() {
        const controller = Controller();

        const http = FakeExpressHttp();
        http.request.method = 'POST';
        http.request.url = '/is';
        http.request.headers['content-type'] = 'not/matching';
        controller(http.request, http.response);

        yield http.response.onEnd();
        expect(http.response.content).to.equal('false');
      });
    });

    describe('params', () => {
      it('should contain the path params', function *() {
        const controller = Controller();

        const http = FakeExpressHttp();
        http.request.url = '/params/fred';
        controller(http.request, http.response);

        yield http.response.onEnd();
        expect(http.response.content).to.equal('fred');
      });

      it('should contain the path params', function *() {
        const controller = Controller();

        const http = FakeExpressHttp();
        http.request.url = '/no-params';
        controller(http.request, http.response);

        yield http.response.onEnd();
        expect(http.response.content).to.equal('{}');
      });
    });

    describe('body', () => {
      it('should contain the result from the body parser', function *() {
        const controller = Controller();

        const http = FakeExpressHttp();
        http.request.method = 'POST';
        http.request.url = '/post-json';
        http.request.body = {
          message: 'Repeat after me.'
        };
        controller(http.request, http.response);

        yield http.response.onEnd();
        expect(http.response.statusCode).to.equal(200);
        expect(http.response.headers['content-type']).to.equal('application/json');
        expect(http.response.content).to.equal(JSON.stringify({
          message: 'Repeat after me.'
        }));
      });
    });
  });
});
