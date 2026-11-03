const express = require('express');
const router = express.Router();

const currentUser = require('../middlewares/current-user');
const healthRoutes = require('./health.routes');

router.use(currentUser);
router.use('/health', healthRoutes);

// I-comment muna ang mga routes na wala pa ang mga file:
// const questionSetRoutes = require('./question-set.routes');
// router.use('/question-sets', questionSetRoutes);

module.exports = router;