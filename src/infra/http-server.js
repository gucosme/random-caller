const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

const logger = require('./logger');
const { logging, errors } = require('./handlers');

function makeServer() {
  const app = express();
  app.use(helmet());
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({ extended: true }));
  app.use(logging);

  function start() {
    app.listen(3000, () => {
      logger.info('Listening on 3000...');
    });
  }

  function setErrorListener(cb) {
    app.on('error', cb);
  }

  function setRouter(router) {
    app.use(router);
    app.use(errors);
  }

  return {
    start,
    setErrorListener,
    setRouter,
  };
}

module.exports = makeServer;
