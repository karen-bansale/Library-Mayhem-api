const { Router } = require('express');
const requireUser = require('../middlewares/require-user');
const validate = require('../middlewares/validate');
const rules = require('../validators/session.validator');
const sessionController = require('../controllers/session.controller');
const playerController = require('../controllers/player.controller');

const router = Router();

router.post(
  '/',
  requireUser('HOST', 'ADMIN'),
  rules.createRules,
  validate,
  sessionController.create
);

router.get(
  '/:code',
  rules.codeRules,
  validate,
  sessionController.get
);


router.patch(
  '/:code',
  requireUser('HOST', 'ADMIN'),
  rules.statusRules,
  validate,
  sessionController.changeStatus
);


router.post(
  '/:code/players',
  requireUser(),
  rules.joinRules,
  validate,
  playerController.join
);


router.get(
  '/:code/players',
  rules.codeRules,
  validate,
  playerController.list
);

module.exports = router;