'use strict';

const express = require('express');

const expect = require('chai').expect;
require('co-mocha');

const FakeExpressHttp = require('../fake-express-http');

const controllerFactory = require('../controller');

describe('fake', () => {
  it('has a response.status', function *() {
    const controller = controllerFactory(express.Router());

    const http = new FakeExpressHttp();
    http.request.url = '/status';
    controller(http.request, http.response, http.next);

    yield http.response.onEnd();
    expect(http.response.statusCode).to.equal(203);
  });

  it('has a response.sendStatus', function *() {
    const controller = controllerFactory(express.Router());

    const http = new FakeExpressHttp();
    http.request.url = '/send-status';
    controller(http.request, http.response, http.next);

    yield http.response.onEnd();
    expect(http.response.statusCode).to.equal(204);
  });

  it('has a response.json', function *() {
    const controller = controllerFactory(express.Router());

    const http = new FakeExpressHttp();
    http.request.url = '/json';
    controller(http.request, http.response, http.next);

    yield http.response.onEnd();
    expect(http.response.statusCode).to.equal(200);
    expect(http.response.headers['Content-Type']).to.equal('application/json');
    expect(http.response.content).to.equal(JSON.stringify({
      content: 'I am a JSON document.'
    }));
  });

  it('has a request.body with parsed json', function *() {
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
    expect(http.response.headers['Content-Type']).to.equal('application/json');
    expect(http.response.content).to.equal(JSON.stringify({
      message: 'Repeat after me.'
    }));
  });
});
