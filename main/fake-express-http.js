'use strict';

const mime = require('mime');
const VError = require('verror');

module.exports = () => {
  return {
    request: FakeHttpRequest(),
    response: FakeHttpResponse(),
    /* istanbul ignore next */next(error) {
      /* istanbul ignore next */
      throw new Error(VError.fullStack(new VError(error, 'unexpected call to next')));
    }
  };
};

const FakeHttpRequest = () => {
  const self = {
    method: 'GET',
    url: '/',
    headers: {},
    is(expectedContentType) {
      return self.headers['content-type'] === expectedContentType ? expectedContentType : false;
    }
  };

  return self;
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
      self.end(data);
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

    type(type) {
      self.headers['content-type'] = mime.lookup(type);

      return self;
    },

    json(document) {
      self.headers['content-type'] = 'application/json';
      self.content = JSON.stringify(document);
      self.end();
    },

    end(data, encoding) {
      if (data !== undefined) {
        if (typeof data === 'string') {
          self.content = data;
        } else {
          self.content = JSON.stringify(data);
        }
      }
      self.encoding = encoding;
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
