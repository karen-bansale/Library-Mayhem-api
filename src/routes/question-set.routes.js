const express = require('express');
const router = express.Router();
const questionSetController = require('../controllers/question-set.controller');

router.get('/', (req, res, next) => questionSetController.getAll(req, res, next));
router.get('/:id', (req, res, next) => questionSetController.getById(req, res, next));
router.post('/', (req, res, next) => questionSetController.create(req, res, next));
router.put('/:id', (req, res, next) => questionSetController.update(req, res, next));
router.delete('/:id', (req, res, next) => questionSetController.delete(req, res, next));

module.exports = router;