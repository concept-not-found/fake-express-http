'use strict';

module.exports = (router) => {
  router.get('*', (request, response) => {
    response.json({
      content: 'I am a JSON document.'
    });
  });

  return router;
};
