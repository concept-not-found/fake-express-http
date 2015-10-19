'use strict';

const express = require('express');

const request = require('supertest-as-promised');

const jsonController = require('../controller/json.js');

describe('real', () => {
  describe('json', () => {
    it('accept a json object', () => {
      const application = express();
      application.use('/', jsonController(express.Router()));

      return request(application)
        .get('')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(JSON.stringify({
          content: 'I am a JSON document.'
        }));
    });
  });
});
