const express = require('express');
const hubKey = require('../middlewares/hub-key');
const resultsController = require('../controllers/results.controller');

const router = express.Router();

router.get('/', hubKey, resultsController.getResults);

module.exports = router;