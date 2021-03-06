const VError = require('verror');
const fetch = require('node-fetch');

const { SPREADSHEET_URL } = require('../infra/config');
const logger = require('../infra/logger');
const { fromCsv, pickWinners } = require('../services/participants');
const dialer = require('../services/dialer');

function health(req, res) {
  res.json({ status: 'alive' });
}

async function getParticipants(req, res, next) {
  const { id } = req.params;

  try {
    const response = await fetch(`${SPREADSHEET_URL}/${id}/pub?output=csv`);
    const buffer = await response.buffer();

    const participants = fromCsv(buffer.toString());
    const winners = pickWinners(participants);

    await dialer.dial(winners);

    res.json({ status: 'ok' });
  } catch (e) {
    const error = new VError(e, 'Failed to get winners list');
    logger.error(error);

    next(error);
  }
}

function notFound(req, res, next) {
  const error = new VError('Not found');
  error.status = 404;

  next(error);
}

module.exports = {
  health,
  getParticipants,
  notFound,
};
