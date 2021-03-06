Fake Express HTTP
=================

[![Circle CI](https://circleci.com/gh/concept-not-found/fake-express-http.svg?style=shield)](https://circleci.com/gh/concept-not-found/fake-express-http)

Fake Express HttpRequest and HttpResponse for unit testing.  Supports Express 4, requires Node 4.x or newer.

Supports asynchronous functions by returning a promise from `response.onEnd()`.

Includes fake and real tests using same controllers to ensure fake is accurate.

What is a Fake?
---------------

The real thing is substituted by a fake.  Where as mocks only partially substitute aspects of the real thing.

Fakes ahear to [Liskov substitution principle](https://en.wikipedia.org/wiki/Liskov_substitution_principle).

State of the Art
----------------

The existence of this library is justified, as state of the art libraries are deficient.

* [node-mocks-http](https://github.com/howardabrams/node-mocks-http) (AKA express-mocks-http)
    * Does not support Express 4.
* [mock-express-request](https://github.com/lykmapipo/mock-express-request) + [mock-express-response](https://github.com/lykmapipo/mock-express-response)
    * Unit testing requires both a fake request and response.  Should be a single library.
    * [Node.js Stream API](https://nodejs.org/api/stream.html) callback style events are exposed to allow for asynchronous testing.
    * As a result does not support promises and has a leaky abstraction with a Stream API `finish` event.
