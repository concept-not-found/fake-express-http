'use strict';

const express = require('express');

module.exports = () => {
  const router = express.Router();

  router.get('/end', (request, response) => {
    response.end();
  });

  router.get('/params/:name', (request, response) => {
    response.send(request.params.name);
  });

  router.get('/no-params', (request, response) => {
    response.send(request.params);
  });

  router.get('/status', (request, response) => {
    response.status(203).end();
  });

  router.get('/send-status', (request, response) => {
    response.sendStatus(204);
  });

  router.get('/send', (request, response) => {
    response.send('Send it my way.');
  });

  router.get('/json', (request, response) => {
    response.json({
      content: 'I am a JSON document.'
    });
  });

  router.post('/is', (request, response) => {
    response.send(request.is('made/up'));
  });

  router.post('/post-json', (request, response) => {
    response.json(request.body);
  });

  return router;
};
