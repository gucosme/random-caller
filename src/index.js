const logger = require('./infra/logger');
const makeServer = require('./infra/http-server');
const router = require('./api/router');

const server = makeServer();
server.setErrorListener((error) => {
  logger.error(error);
});

server.setRouter(router);

server.start();
