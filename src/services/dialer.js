const VError = require('verror');
const fetch = require('node-fetch');

const logger = require('../infra/logger');

function makeRequest(participant) {
  const TERAVOZ_URL = 'https://api.teravoz.com.br';
  const TERAVOZ_ACCESS_TOKEN = '';

  return fetch(`${TERAVOZ_URL}/actions`, {
    method: 'POST',
    headers: {
      authorization: `Basic ${TERAVOZ_ACCESS_TOKEN}`,
      'content-type': 'application/json',
    },
    body: {
      type: 'dialer',
      numbers: [participant.number],
      destination: '900',
      destination_type: 'queue',
      code: `${participant.name}-${participant.number}`,
      retries: '0',
      retry_gap: '0s',
      ttl: '60s',
    },
  });
}

async function dial(participants) {
  try {
    await Promise.all(participants.map(makeRequest));
  } catch (e) {
    const error = new VError(e, 'Failed to fetch POST /actions');
    logger.error(error);

    throw error;
  }
}

module.exports = {
  dial,
};
