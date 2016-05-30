'use strict';

module.exports = () => {
  return {
    request: FakeHttpRequest(),
    response: FakeHttpResponse()
  };
};

const FakeHttpRequest = () => {
  return {
    method: 'GET',
    url: '/',
    headers: {},
    is(expectedContentType) {
      return this.headers['content-type'] === expectedContentType ? expectedContentType : false;
    }
  };
};

const FakeHttpResponse = () => {
  const self = {
    headers: {},
    statusCode: 200,
    content: undefined,
    redirectPath: undefined,
    status(statusCode) {
      self.statusCode = statusCode;
      return self;
    },
    sendStatus(statusCode) {
      self.statusCode = statusCode;
      self.end();
    },
    send(data) {
      if (typeof data === 'string') {
        self.content = data;
      } else {
        self.content = JSON.stringify(data);
      }

      self.end();
    },
    redirect(status, path) {
      if (!path) {
        path = status;
        status = 302;
      }
      self.statusCode = status;
      self.redirectPath = path;
      self.end();
    },
    json(document) {
      self.headers['content-type'] = 'application/json';
      self.content = JSON.stringify(document);
      self.end();
    },
    end() {
      setImmediate(self.resolveEnd);
    },
    onEnd() {
      return self.endPromise;
    }
  };

  self.endPromise = new Promise((resolve) => {
    self.resolveEnd = resolve;
  });

  return self;
};
