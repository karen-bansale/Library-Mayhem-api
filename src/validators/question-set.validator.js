'use strict';

const { body, param } = require('express-validator');

const idParam = param('id')
  .isInt({ min: 1 })
  .withMessage('id must be a positive whole number.')
  .toInt();

function textField(field, options = {}) {
  const {
    required = false,
    nullable = false,
    allowEmpty = false,
  } = options;

  const chain = body(field);

  if (required) {
    chain
      .exists()
      .withMessage(`${field} is required.`)
      .bail();
  } else {
    chain.optional({ values: nullable ? 'null' : 'undefined' });
  }

  return chain
    .isString()
    .withMessage(`${field} must be text.`)
    .bail()
    .trim()
    .isLength({ min: allowEmpty ? 0 : 1, max: 255 })
    .withMessage(`${field} must be at most 255 characters and cannot be empty.`);
}

const createRules = [
  textField('title', { required: true }),
   textField('subject', { required: true }),
  textField('description', { nullable: true, allowEmpty: true }),
];

const updateRules = [
  idParam,
  textField('title'),
  textField('subject'),
  textField('description', { nullable: true, allowEmpty: true }),
  body().custom((value) => {
    const allowedFields = ['title', 'subject', 'description'];
    const hasChange =
      value &&
      typeof value === 'object' &&
      allowedFields.some((field) =>
        Object.prototype.hasOwnProperty.call(value, field)
      );

    if (!hasChange) {
      throw new Error('Send at least one of: title, subject, description.');
    }

    return true;
  }),
];

module.exports = {
  idParam,
  createRules,
  updateRules,
};