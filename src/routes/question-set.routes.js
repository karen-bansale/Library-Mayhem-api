const express = require('express');
const router = express.Router();

const { 
  list, 
  get, 
  create, 
  update, 
  remove 
} = require('../controllers/question-set.controller');

const { 
  idParam, 
  createQuestionSetRules, 
  updateQuestionSetRules 
} = require('../validators/question-set.validator');

const validate = require('../middlewares/validate');

router.route('/')
  .get(list)
  .post(createQuestionSetRules, validate, create);

router.route('/:id')
  .get(idParam, validate, get)
  .patch(updateQuestionSetRules, validate, update)
  .delete(idParam, validate, remove);

module.exports = router;