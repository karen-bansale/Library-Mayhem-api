// The single place that maps URLs to route files.
const { Router } = require('express');
const router = Router();
const currentUser = require('../middlewares/current-user');
const healthRoutes = require('./health.routes');
const resultRoutes = require('./results.routes');

// Hub Contract endpoints: open to everyone, so they come before currentUser.
router.use('/health', healthRoutes);
router.use('/game-info', require('./game-info.routes'));

// From here on, req.user says who is calling (or null).
router.use(currentUser);
router.use('/results', resultRoutes);
router.use('/question-sets', require('./question-set.routes'));

module.exports = router;