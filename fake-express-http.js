'use strict';

class FakeExpressHttp {
  constructor() {
    this.request = new FakeHttpRequest();
    this.response = new FakeHttpResponse();
    this.nextArguments = undefined;
    this.next = () => {
      this.nextArguments = arguments;
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
    return this.headers['Content-Type'] === expectedContentType;
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

  body(data) {
    this.content = data;
    this.end();
  }

  send(data) {
    this.content = data;
    this.end();
  }

  json(document) {
    this.headers['Content-Type'] = 'application/json';
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
