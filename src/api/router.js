const { Router } = require('express');
const VError = require('verror');

const router = Router();

router.get('/health', (req, res) => {
  res.json({ status: 'alive' });
});

router.all('*', (req, res, next) => {
  const error = new VError('Not found');
  error.status = 404;

  next(error);
});

module.exports = router;
