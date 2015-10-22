'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const request = require('supertest-as-promised');

const controllerFactory = require('../controller');

describe('real', () => {
  describe('response.end', () => {
    it('should return 200', () => {
      const application = express();
      application.use('/', controllerFactory(express.Router()));

      return request(application)
        .get('/end')
        .expect(200);
    });
  });

  describe('response.status', () => {
    it('should return the status code', () => {
      const application = express();
      application.use('/', controllerFactory(express.Router()));

      return request(application)
        .get('/status')
        .expect(203);
    });
  });

  describe('response.sendStatus', () => {
    it('should return the status code', () => {
      const application = express();
      application.use('/', controllerFactory(express.Router()));

      return request(application)
        .get('/send-status')
        .expect(204);
    });
  });

  describe('response.send', () => {
    it('should send a body', () => {
      const application = express();
      application.use('/', controllerFactory(express.Router()));

      return request(application)
        .get('/send')
        .expect('Send it my way.');
    });
  });

  describe('response.json', () => {
    it('should send a json body', () => {
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
  });

  describe('request.is', () => {
    it('returns the content type on match', () => {
      const application = express();
      application.use('/', controllerFactory(express.Router()));

      return request(application)
        .post('/is')
        .type('made/up')
        .send('')
        .expect('made/up');
    });

    it('returns false when content type does not match', () => {
      const application = express();
      application.use('/', controllerFactory(express.Router()));

      return request(application)
        .post('/is')
        .type('not/matching')
        .send('')
        .expect('false');
    });
  });

  describe('request.body', () => {
    it('should contain the result from the body parser', () => {
      const application = express();
      application.use(bodyParser.json());
      application.use('/', controllerFactory(express.Router()));

      return request(application)
        .post('/post-json')
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
});
