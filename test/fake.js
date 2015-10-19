'use strict';

const express = require('express');

const expect = require('chai').expect;
require('co-mocha');

const FakeExpressHttp = require('../fake-express-http');

const jsonController = require('../controller/json.js');

describe('fake', () => {
  describe('json', () => {
    it('accept a json object', function *() {
      const controller = jsonController(express.Router());

      const http = new FakeExpressHttp();
      controller(http.request, http.response);

      yield http.response.onEnd();
      expect(http.response.statusCode).to.equal(200);
      expect(http.response.headers['Content-Type']).to.equal('application/json');
      expect(http.response.data).to.eql({
        content: 'I am a JSON document.'
      });
    });
  });
});
