'use strict';

const express = require('express');

const expect = require('chai').expect;
require('co-mocha');

const FakeExpressHttp = require('../fake-express-http');

const controllerFactory = require('../controller');

describe('fake', () => {
  describe('response.end', () => {
    it('should return 200', function *() {
      const controller = controllerFactory(express.Router());

      const http = new FakeExpressHttp();
      http.request.url = '/end';
      controller(http.request, http.response, http.next);

      yield http.response.onEnd();
      expect(http.response.statusCode).to.equal(200);
    });
  });

  describe('response.status', () => {
    it('should return the status code', function *() {
      const controller = controllerFactory(express.Router());

      const http = new FakeExpressHttp();
      http.request.url = '/status';
      controller(http.request, http.response, http.next);

      yield http.response.onEnd();
      expect(http.response.statusCode).to.equal(203);
    });
  });

  describe('response.sendStatus', () => {
    it('should return the status code', function *() {
      const controller = controllerFactory(express.Router());

      const http = new FakeExpressHttp();
      http.request.url = '/send-status';
      controller(http.request, http.response, http.next);

      yield http.response.onEnd();
      expect(http.response.statusCode).to.equal(204);
    });
  });

  describe('response.send', () => {
    it('should send a body', function *() {
      const controller = controllerFactory(express.Router());

      const http = new FakeExpressHttp();
      http.request.url = '/send';
      controller(http.request, http.response, http.next);

      yield http.response.onEnd();
      expect(http.response.content).to.equal('Send it my way.');
    });
  });

  describe('response.json', () => {
    it('should send a json body', function *() {
      const controller = controllerFactory(express.Router());

      const http = new FakeExpressHttp();
      http.request.url = '/json';
      controller(http.request, http.response, http.next);

      yield http.response.onEnd();
      expect(http.response.statusCode).to.equal(200);
      expect(http.response.headers['content-type']).to.equal('application/json');
      expect(http.response.content).to.equal(JSON.stringify({
        content: 'I am a JSON document.'
      }));
    });
  });

  describe('request.is', () => {
    it('returns the content type on match', function *() {
      const controller = controllerFactory(express.Router());

      const http = new FakeExpressHttp();
      http.request.method = 'POST';
      http.request.url = '/is';
      http.request.headers['content-type'] = 'made/up';
      controller(http.request, http.response, http.next);

      yield http.response.onEnd();
      expect(http.response.content).to.equal('made/up');
    });

    it('returns false when content type does not match', function *() {
      const controller = controllerFactory(express.Router());

      const http = new FakeExpressHttp();
      http.request.method = 'POST';
      http.request.url = '/is';
      http.request.headers['content-type'] = 'not/matching';
      controller(http.request, http.response, http.next);

      yield http.response.onEnd();
      expect(http.response.content).to.equal('false');
    });
  });

  describe('request.body', () => {
    it('should contain the result from the body parser', function *() {
      const controller = controllerFactory(express.Router());

      const http = new FakeExpressHttp();
      http.request.method = 'POST';
      http.request.url = '/post-json';
      http.request.body = {
        message: 'Repeat after me.'
      };
      controller(http.request, http.response, http.next);

      yield http.response.onEnd();
      expect(http.response.statusCode).to.equal(200);
      expect(http.response.headers['content-type']).to.equal('application/json');
      expect(http.response.content).to.equal(JSON.stringify({
        message: 'Repeat after me.'
      }));
    });
  });
});
