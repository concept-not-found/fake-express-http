'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const request = require('supertest-as-promised');

const Controller = require('./controller');

describe('real', () => {
  describe('response', () => {
    describe('end', () => {
      it('should return 200', () => {
        const application = express();
        application.use('/', Controller());

        return request(application)
          .get('/end')
          .expect(200);
      });
    });

    describe('status', () => {
      it('should return the status code', () => {
        const application = express();
        application.use('/', Controller());

        return request(application)
          .get('/status')
          .expect(203);
      });
    });

    describe('sendStatus', () => {
      it('should return the status code', () => {
        const application = express();
        application.use('/', Controller());

        return request(application)
          .get('/send-status')
          .expect(204);
      });
    });

    describe('send', () => {
      it('should send a body', () => {
        const application = express();
        application.use('/', Controller());

        return request(application)
          .get('/send')
          .expect('Send it my way.');
      });
    });

    describe('json', () => {
      it('should send a json body', () => {
        const application = express();
        application.use('/', Controller());

        return request(application)
          .get('/json')
          .expect(200)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(JSON.stringify({
            content: 'I am a JSON document.'
          }));
      });
    });
  });

  describe('request', () => {
    describe('is', () => {
      it('returns the content type on match', () => {
        const application = express();
        application.use('/', Controller());

        return request(application)
          .post('/is')
          .type('made/up')
          .send('')
          .expect('made/up');
      });

      it('returns false when content type does not match', () => {
        const application = express();
        application.use('/', Controller());

        return request(application)
          .post('/is')
          .type('not/matching')
          .send('')
          .expect('false');
      });
    });

    describe('params', () => {
      it('should contain the path params', () => {
        const application = express();
        application.use(bodyParser.json());
        application.use('/', Controller());

        return request(application)
          .get('/params/fred')
          .expect('fred');
      });

      it('should be empty when there are no paths', () => {
        const application = express();
        application.use(bodyParser.json());
        application.use('/', Controller());

        return request(application)
          .get('/no-params')
          .expect('{}');
      });
    });

    describe('body', () => {
      it('should contain the result from the body parser', () => {
        const application = express();
        application.use(bodyParser.json());
        application.use('/', Controller());

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
});
