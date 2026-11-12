const { body, param } = require('express-validator');

const codeParam = param('code')
  .matches(/^\d{6}$/)
  .withMessage('code must be six digits');

const nickname = body('nickname')
  .exists()
  .withMessage('nickname is required')
  .bail()
  .isString()
  .withMessage('nickname must be text')
  .bail()
  .trim()
  .isLength({ min: 2, max: 24 })
  .withMessage('nickname must be 2 to 24 characters');

const joinRules = [codeParam, nickname];
const listRules = [codeParam];

module.exports = {
  joinRules,
  listRules,
};