const { Router } = require('express');
const currentUser = require('../middlewares/current-user');

const router = Router();

router.use('/health', require('./health.routes'));
router.use('/game-info', require('./game-info.routes'));
router.use('/results', require('./results.routes'));

// Ilagay ang currentUser middleware dito para ma-apply sa mga susunod na routes
router.use(currentUser);

router.use('/question-sets', require('./question-set.routes'));

module.exports = router;