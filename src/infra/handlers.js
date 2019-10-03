const VError = require('verror');
const logger = require('./logger');

const getReqInfo = (req) => ({
  method: req.method,
  status: req.status,
  headers: req.headers,
  url: req.url,
  body: req.body,
  params: req.params,
  query: req.query,
});

function errors(error, req, res, next) {
  logger.error(new VError({
    cause: error,
    info: getReqInfo(req),
  }, `${req.method} ${req.url}`));

  res.status(error.status || 500).json({ error: error.message });
  next();
}

function logging(req, res, next) {
  logger.info(getReqInfo(req), `${req.method} ${req.url}`);

  next();
}

module.exports = {
  errors,
  logging,
};
