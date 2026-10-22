const { body, param } = require('express-validator');

const idParam = param('id')
  .isInt({ min: 1 }).withMessage('id must be a positive whole number')
  .toInt();

const createQuestionSetRules = [
  body('title')
    .exists().withMessage('title is required')
    .bail()
    .isString().withMessage('title must be text')
    .bail()
    .trim()
    .isLength({ min: 3, max: 150 }).withMessage('title must be 3 to 150 characters long'),
  
  body('subject')
    .optional({ values: 'null' })
    .isString().withMessage('subject must be text')
    .bail()
    .trim()
    .isLength({ max: 60 }).withMessage('subject must be at most 60 characters long'),

  body('is_public')
    .optional()
    .isBoolean({ strict: true }).withMessage('is_public must be true or false')
];

const updateQuestionSetRules = [
  idParam,
  body('title')
    .optional()
    .isString().withMessage('title must be text')
    .bail()
    .trim()
    .isLength({ min: 3, max: 150 }).withMessage('title must be 3 to 150 characters long'),

  body('subject')
    .optional({ values: 'null' })
    .isString().withMessage('subject must be text')
    .bail()
    .trim()
    .isLength({ max: 60 }).withMessage('subject must be at most 60 characters long'),

  body('is_public')
    .optional()
    .isBoolean({ strict: true }).withMessage('is_public must be true or false')
];

module.exports = {
  idParam,
  createQuestionSetRules,
  updateQuestionSetRules,
};