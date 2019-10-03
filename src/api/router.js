const { Router } = require('express');

const controller = require('./controller');

const router = Router();

router.get('/health', controller.health);
router.get('/file/:id', controller.getParticipants);
router.all('*', controller.notFound);

module.exports = router;
