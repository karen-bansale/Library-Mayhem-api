const express = require('express');
const router = express.Router();

const currentUser = require('../middlewares/current-user');
const healthRoutes = require('./health.routes');
const gameInfoRoutes = require('./game-info.routes');
const resultsRoutes = require('./results.routes');

router.use(currentUser);
router.use('/health', healthRoutes);
router.use('/game-info', gameInfoRoutes);
router.use('/results', resultsRoutes);

module.exports = router;