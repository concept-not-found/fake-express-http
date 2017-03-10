'use strict';

const FakeExpressHttp = require('./fake-express-http');

const Controller = require('./test-controller');

describe('fake', () => {
  describe('response', () => {
    describe('end', () => {
      it('should return 200', async () => {
        const controller = Controller();

        const http = FakeExpressHttp();
        http.request.url = '/end';
        controller(http.request, http.response, http.next);

        await http.response.onEnd();
        expect(http.response.statusCode).toBe(200);
      });
    });

    describe('status', () => {
      it('should return the status code', async () => {
        const controller = Controller();

        const http = FakeExpressHttp();
        http.request.url = '/status';
        controller(http.request, http.response, http.next);

        await http.response.onEnd();
        expect(http.response.statusCode).toBe(203);
      });
    });

    describe('sendStatus', () => {
      it('should return the status code', async () => {
        const controller = Controller();

        const http = FakeExpressHttp();
        http.request.url = '/send-status';
        controller(http.request, http.response, http.next);

        await http.response.onEnd();
        expect(http.response.statusCode).toBe(204);
      });
    });

    describe('send', () => {
      it('should send a body', async () => {
        const controller = Controller();

        const http = FakeExpressHttp();
        http.request.url = '/send';
        controller(http.request, http.response, http.next);

        await http.response.onEnd();
        expect(http.response.content).toBe('Send it my way.');
      });
    });

    describe('redirect', () => {
      it('should redirect temporarily', async () => {
        const controller = Controller();

        const http = FakeExpressHttp();
        http.request.url = '/redirect';
        controller(http.request, http.response, http.next);

        await http.response.onEnd();
        expect(http.response.statusCode).toBe(302);
        expect(http.response.redirectPath).toBe('Its over there for now.');
      });

      it('should redirect permanently', async () => {
        const controller = Controller();

        const http = FakeExpressHttp();
        http.request.url = '/permanent-redirect';
        controller(http.request, http.response, http.next);

        await http.response.onEnd();
        expect(http.response.statusCode).toBe(301);
        expect(http.response.redirectPath).toBe('Its over there forever.');
      });
    });

    describe('type', () => {
      it('should set the content-type', async () => {
        const controller = Controller();

        const http = FakeExpressHttp();
        http.request.url = '/type-png';
        controller(http.request, http.response, http.next);

        await http.response.onEnd();
        expect(http.response.statusCode).toBe(200);
        expect(http.response.headers['content-type']).toBe('image/png');
      });
    });

    describe('json', () => {
      it('should send a json body', async () => {
        const controller = Controller();

        const http = FakeExpressHttp();
        http.request.url = '/json';
        controller(http.request, http.response, http.next);

        await http.response.onEnd();
        expect(http.response.statusCode).toBe(200);
        expect(http.response.headers['content-type']).toBe('application/json');
        expect(http.response.content).toBe(JSON.stringify({
          content: 'I am a JSON document.'
        }));
      });
    });
  });

  describe('request', () => {
    describe('is', () => {
      it('returns the content type on match', async () => {
        const controller = Controller();

        const http = FakeExpressHttp();
        http.request.method = 'POST';
        http.request.url = '/is';
        http.request.headers['content-type'] = 'made/up';
        controller(http.request, http.response, http.next);

        await http.response.onEnd();
        expect(http.response.content).toBe('made/up');
      });

      it('returns false when content type does not match', async () => {
        const controller = Controller();

        const http = FakeExpressHttp();
        http.request.method = 'POST';
        http.request.url = '/is';
        http.request.headers['content-type'] = 'not/matching';
        controller(http.request, http.response, http.next);

        await http.response.onEnd();
        expect(http.response.content).toBe('false');
      });
    });

    describe('params', () => {
      it('should contain the path params', async () => {
        const controller = Controller();

        const http = FakeExpressHttp();
        http.request.url = '/params/fred';
        controller(http.request, http.response, http.next);

        await http.response.onEnd();
        expect(http.response.content).toBe('fred');
      });

      it('should contain the path params', async () => {
        const controller = Controller();

        const http = FakeExpressHttp();
        http.request.url = '/no-params';
        controller(http.request, http.response, http.next);

        await http.response.onEnd();
        expect(http.response.content).toBe('{}');
      });
    });

    describe('body', () => {
      it('should contain the result from the body parser', async () => {
        const controller = Controller();

        const http = FakeExpressHttp();
        http.request.method = 'POST';
        http.request.url = '/post-json';
        http.request.body = {
          message: 'Repeat after me.'
        };
        controller(http.request, http.response, http.next);

        await http.response.onEnd();
        expect(http.response.statusCode).toBe(200);
        expect(http.response.headers['content-type']).toBe('application/json');
        expect(http.response.content).toBe(JSON.stringify({
          message: 'Repeat after me.'
        }));
      });
    });
  });
});
