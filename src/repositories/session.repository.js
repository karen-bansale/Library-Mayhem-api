const { Session } = require('../models');

function create(data) {
  return Session.create(data);
}

function findByCode(code) {
  return Session.findOne({
    where: { session_code: code },
  });
}

function update(session, changes) {
  return session.update(changes);
}

module.exports = {
  create,
  findByCode,
  update,
};
