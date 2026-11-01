const { body, param } = require('express-validator');

const title = () => body('title')
  .exists().withMessage('title is required')
  .bail()
  .isString().withMessage('title must be text')
  .bail()
  .trim()
  .isLength({ min: 3, max: 150 }).withMessage('title must be 3 to 150 characters long');

const subject = () => body('subject')
  .optional()
  .isString().withMessage('subject must be text')
  .bail()
  .trim()
  .isLength({ max: 60 }).withMessage('subject must be at most 60 characters long');

const isPublic = () => body('is_public')
  .optional()
  .isBoolean({ strict: true }).withMessage('is_public must be true or false');

const idParam = [
  param('id').isInt({ min: 1 }).withMessage('id must be a positive whole number').toInt()
];

const createRules = [title(), subject(), isPublic()];
const updateRules = [idParam[0], title().optional(), subject(), isPublic()];

module.exports = { createRules, updateRules, idParam };