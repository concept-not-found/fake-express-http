'use strict';

class FakeExpressHttp {
  constructor() {
    this.request = new FakeHttpRequest();
    this.response = new FakeHttpResponse();
    this.next = (error) => {
      /* istanbul ignore next */
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(`unexpected call to next with ${JSON.stringify(arguments)}`);
      }
    };
  }
}

class FakeHttpRequest {
  constructor() {
    this.method = 'GET';
    this.url = '/';
    this.headers = {};
  }

  is(expectedContentType) {
    return this.headers['content-type'] === expectedContentType ? expectedContentType : false;
  }
}

class FakeHttpResponse {
  constructor() {
    this.headers = {};
    this.statusCode = 200;
    this.content = undefined;
    this.endPromise = new Promise((resolve) => {
      this.resolveEnd = resolve;
    });
  }

  status(statusCode) {
    this.statusCode = statusCode;
    return this;
  }

  sendStatus(statusCode) {
    this.statusCode = statusCode;
    this.end();
  }

  send(data) {
    if (typeof data === 'string') {
      this.content = data;
    } else {
      this.content = JSON.stringify(data);
    }

    this.end();
  }

  json(document) {
    this.headers['content-type'] = 'application/json';
    this.content = JSON.stringify(document);
    this.end();
  }

  end() {
    setImmediate(this.resolveEnd);
  }

  onEnd() {
    return this.endPromise;
  }
}

module.exports = FakeExpressHttp;
