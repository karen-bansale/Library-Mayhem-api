'use strict';

const questionSetRepository = require('../repositories/question-set.repository');
const { notFound, forbidden } = require('../errors/app-error');

async function findOrFail(id) {
  const questionSet = await questionSetRepository.findById(id);

  if (!questionSet) {
    throw notFound(
      'QUESTION_SET_NOT_FOUND',
      `No question set has the id ${id}.`
    );
  }

  return questionSet;
}

function isOwnerOrAdmin(questionSet, user) {
  return (
    user.role === 'ADMIN' ||
    Number(questionSet.host_id) === Number(user.user_id)
  );
}

// Hosts see their own sets. Admins see every set.
function list(user) {
  if (user.role === 'ADMIN') {
    return questionSetRepository.findAll();
  }

  return questionSetRepository.findAllByHost(user.user_id);
}

// Only the owner or an admin may read a set.
async function get(id, user) {
  const questionSet = await findOrFail(id);

  if (!isOwnerOrAdmin(questionSet, user)) {
    throw forbidden('This question set belongs to another host.');
  }

  return questionSet;
}

// The client cannot choose host_id; the authenticated user becomes the host.
function create(data, user) {
  const { title, subject, description } = data;

  return questionSetRepository.create({
    title,
    subject,
    description,
    host_id: user.user_id,
  });
}

// Only the owner or an admin may update a set.
async function update(id, changes, user) {
  const questionSet = await findOrFail(id);

  if (!isOwnerOrAdmin(questionSet, user)) {
    throw forbidden('This question set belongs to another host.');
  }

  const allowedChanges = {};
  for (const field of ['title', 'subject', 'description']) {
    if (Object.prototype.hasOwnProperty.call(changes, field)) {
      allowedChanges[field] = changes[field];
    }
  }

  return questionSetRepository.update(questionSet, allowedChanges);
}

// Only the owner or an admin may delete a set.
async function remove(id, user) {
  const questionSet = await findOrFail(id);

  if (!isOwnerOrAdmin(questionSet, user)) {
    throw forbidden('This question set belongs to another host.');
  }

  await questionSetRepository.remove(questionSet);
}

module.exports = {
  list,
  get,
  create,
  update,
  remove,
};