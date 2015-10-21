'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const request = require('supertest-as-promised');

const controllerFactory = require('../controller');

describe('real', () => {
  it('has a response.json', function *() {
    const application = express();
    application.use('/', controllerFactory(express.Router()));

    return request(application)
      .get('/json')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(JSON.stringify({
        content: 'I am a JSON document.'
      }));
  });

  it('has a request.body with parsed json', function *() {
    const application = express();
    application.use(bodyParser.json());
    application.use('/', controllerFactory(express.Router()));

    return request(application)
      .post('/echo-json')
      .send({
        message: 'Repeat after me.'
      })
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(JSON.stringify({
        message: 'Repeat after me.'
      }));
  });
});
