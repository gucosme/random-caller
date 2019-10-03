const { Router } = require('express');
const VError = require('verror');
const fetch = require('node-fetch');

const logger = require('../infra/logger');

const router = Router();

router.get('/health', (req, res) => {
  res.json({ status: 'alive' });
});

router.get('/file/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const response = await fetch(`https://docs.google.com/spreadsheets/d/e/${id}/pub?output=csv`);
    const buffer = await response.buffer();
    const content = buffer.toString();

    const [head, ...lines] = content.split('\r\n').map((line) => line.split(','));
    const entries = lines.map((line) => line.map((item, index) => [head[index], item]));

    const participants = entries.map((entry) => Object.assign(
      {},
      ...Array.from(entry, ([k, v]) => ({ [k]: v })),
    ));

    res.json({ id, participants });
  } catch (e) {
    const error = new VError(e, 'Failed to get participants list');
    logger.error(error);

    next(error);
  }
});

router.all('*', (req, res, next) => {
  const error = new VError('Not found');
  error.status = 404;

  next(error);
});

module.exports = router;
