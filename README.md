Fake Express HTTP
=================

Fake Express HttpRequest and HttpResponse for unit testing.  Supports Express 4, requires Node 4.x.

Supports asynchronous functions by returning a promise from `response.onEnd()`.

What is a Fake?
---------------

The real thing is substituted by a fake.  Where as mocks only partially substitute aspects of the real thing.

Fakes ahear to [Liskov substitution principle](https://en.wikipedia.org/wiki/Liskov_substitution_principle).

State of the Art
----------------

The existence of this library is justified, as state of the art libraries are deficient.

* [node-mocks-http](https://github.com/howardabrams/node-mocks-http) (a.k.a. express-mocks-http)
    * Does not support Express 4.
* [mock-express-request](https://github.com/lykmapipo/mock-express-request) + [mock-express-response](https://github.com/lykmapipo/mock-express-response)
    * Unit testing requires both a fake request and response.  Should be a single library.
    * Does not support asynchronous functions.
